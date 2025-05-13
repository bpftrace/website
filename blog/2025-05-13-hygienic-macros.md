---
slug: hygiene-macros
title: Keeping bpftrace DRY with Hygienic Macros
authors: [jordalgo]
tags: [new_features]
---

It may seem strange that a language that prides itself on terseness didn’t have a way to reduce duplicate code. These days almost all popular, general-purpose programming languages provide at least one mechanism for this: functions, macros, gotos, etc. But bpftrace is a domain-specific language (DSL); known for one-liners. But it seems people have started to write long bpftrace programs (have you seen [bpfsnake?](https://github.com/amiremohamadi/bpfsnake)) and, as a result, started to crave the ability to not repeat themselves in order to reduce errors, reading, and writing.

This post is about the journey to adding macros to bpftrace.

<!--truncate-->

In 2023 an RFC was opened to discuss adding user-defined functions to the language e.g.

```
function add($a, $b) {
    return $a + $b;
}

BEGIN {
   print(add(1, 1)); // prints 2
}
```

Unfortunately, two years running and this feature has yet to land. Why? Well it raised a lot of good questions about both the syntax of user-defined functions (UDFs from now on), how they handle local and global context, if they’re polymorphic, etc. It also made us (the maintainers) think more about the shape of the language and what it should prioritize. For example: one discussion topic was the addition of types in the function signature.

It was once thought that it would be simpler to include types in the function signature as this would remove type ambiguity and reduce semantic analysis. Example:

```
function add($a: int64, $b:int64): int64 {
    return $a + $b;
}
```

If you’re unfamiliar with bpftrace, you might guess that an `int64` is a 64 bit signed integer type. But what about `ksym_t`, which is the type returned by the builtin function `ksym`. This type is pretty unadvertised in bpftrace documentation and underutilized; meaning it’s not written out by users. There are a lot of these internal types.

bpftrace is a statically typed but inferred language (e.g. `$x = ksym(123434)`). Think of the `auto` keyword in C++. This is part of how bpftrace stays terse. The only time when you might have to interact with internal bpftrace types is in casting or reading an error message about type mismatch.

The other problem with forcing users to specify types is that bpftrace supports interop with C types BUT doesn’t fully support C type parsing (unintentionally). bpftrace gets this mostly correct but there are a lot of holes that would be exposed if we made explicit typing a requirement for UDFs.

So not only is the addition of explicit types a bit antithetical to the language but it also surfaces issues that are hard to fix.

As time moved on and more questions/issues for UDFs kept coming up, we wanted to try to add something simple that would still provide users the ability to share code. Since bpftrace already supported C-macros, we thought it could support its own macros. This idea seemed promising because:
- it didn’t include any explicit types
- didn’t require plumbing to add callable static functions to bpftrace code generation; we would just be doing a syntax-aware text replacement
- we could worry less about reference semantics

Additionally, we would adopt ideas from “hygienic” macros, which for bpftrace means that macros do not have implicit access to the scope in which they are called or the global scope. To put it more concretely, if you want to access a scratch variable or map inside a macro you must explicitly pass it in as a parameter. Let’s look at some examples:

```
macro add_one($x) {
  $x += 1;
  $x
}

BEGIN {
  $a = 1;
  add_one($a);

  print($a); // prints 2
}
```

In this example, we are passing the scratch variable `$a` into the `add_one` macro so the macro is free to read and mutate `$a`. When expanded the code actually looks like this:

```
BEGIN {
  $a = 1;
  {
    $a += 1;
    $a
  };

  print($a);
}
```

This also works for maps e.g.

```
macro add_one(@a) {
  @a[2] = 2;
  @a
}

BEGIN {
  @a[1] = 1;
  add_one(@a);

  print(@a[2]); // prints 2
}
```

Getting back to our scratch variable example. If we modify the code where we don’t pass `$a` in as a parameter and instead try to reference it directly, it won’t be mutated at all e.g.

```
macro add_one($a) {
  $a += 1;
  $a
}

BEGIN {
  $a = 1;
  add_one(1 + 2);

  print($a); // prints 1
}
```

Here the macro doesn’t fail or trigger an error. Instead it creates a temporary variable which it assigns to the passed in expression (in this case `1 + 2`) and safely changes the variable name inside the macro expansion so as not to conflict with any other variables in the outer or inner scope e.g.

```
BEGIN {
  $a = 1;

  {
    $_magical_prefix_a = 1 + 2;
    $_magical_prefix_a += 1;
    $_magical_prefix_a
  };

  print($a)
}
```

This safe replacement doesn’t work for maps, however, because maps are globally scoped and also have special behavior (e.g. printed by default at program termination), so something like this will cause an error.

```
macro add_one(@a) {
  @a += 1;
  @a
}

BEGIN {
  @a = 1;
  add_one(1 + 2);
}

// ERROR: Unhygienic access to map: @a. Maps must be passed into the macro as arguments.
```

You might be asking: what is the point of this restriction on variable and map access. At the moment bpftrace does not have references or the ability to make pointers to scratch variables or maps. Looking again at UDFs, if we were to have an `add_one` function, would variables be passed by reference or copied?

```
function add_one($a) {
    $a += 1;
}
```

The language, as it is today, makes this ambiguous. However, for macros, because we’re just doing a text replacement, variables and maps are always passed by reference. The “hygiene” part is to ensure that all interactions with variables and maps outside of the scope of a macro are intentional; foot-gun prevention. Inside of a macro, authors are free to declare and create new variables (but not maps), which never escape the scope of the macro e.g.

```
macro add_one($x) {
  let $y = 5;
  $x > 0 ? $x : $y
}
```

Now you might have noticed that the macros in the examples above all end with a bare expression:

```
macro add_one($a) {
  $a += 1;
  $a // no trailing semi-colon
}
```

In this case the scratch variable `$a`. This is because bpftrace has the concept of  “block expressions”. A block expression, without macros, can look like this:

```
let $a = {
  let $b = 1;
  $b
};

// $a is 1
```

The variable `$a` is being assigned to the last expression in the block. This proved particularly useful for macros which are defined in the bpftrace parser as:

```
MACRO IDENT "(" macro_args ")" block_expr
```

This creates an implicit scope within the macro itself so users don’t have to add additional curly braces inside their macros. It also allows bpftrace to do safe, temporary variable creation for expressions passed in as arguments (remember the `$_magical_prefix_a` variable).

**Note**: assignments (e.g. `$x += 1`) should be a valid final expression in a block expression but this causes ambiguity in the parser so at the moment it’s not allowed.

bpftrace macros also have the ability to call other macros e.g.

```
macro add_one($x) {
  $x + 1
}

macro add_two($x) {
  add_one($x) + 1
}

BEGIN {
  $a = 1;

  print(add_two($a)); // prints 3
}
```

The last important feature we wanted macros to have was the ability to show the macro call chain if a semantic error happens deep in a macro. Take this example:

```
macro add_one($x) {
  $x + 1
}

macro add_two($x) {
  1 + add_one($x)
}

BEGIN {
  $a = "string";
  add_two($a);
}
```

Since macros are just expanding text, the above example turns into this:

```
BEGIN {
  $a = "string";
  {
    1 + { $a + 1 }
  };
}
```

This shows we’re incorrectly adding a string to an integer but this type check doesn’t happen until a later “pass” and we want to make sure the user understands the root of the issue. So the resulting error looks like this.

```
stdin:1:24-25: ERROR: Type mismatch for '+': comparing string[7] with int64
macro add_one($x) { $x + 1 } macro add_two($x) { 1 + add_one($x) } BEGIN { $a = "string"; add_two($a); }
                       ~
stdin:1:21-23: ERROR: left (string[7])
macro add_one($x) { $x + 1 } macro add_two($x) { 1 + add_one($x) } BEGIN { $a = "string"; add_two($a); }
                    ~~
stdin:1:26-27: ERROR: right (int64)
macro add_one($x) { $x + 1 } macro add_two($x) { 1 + add_one($x) } BEGIN { $a = "string"; add_two($a); }
                         ~
stdin:1:91-102: ERROR: expanded from
macro add_one($x) { $x + 1 } macro add_two($x) { 1 + add_one($x) } BEGIN { $a = "string"; add_two($a); }
                                                                                          ~~~~~~~~~~~
stdin:1:54-65: ERROR: expanded from
macro add_one($x) { $x + 1 } macro add_two($x) { 1 + add_one($x) } BEGIN { $a = "string"; add_two($a); }
                                                     ~~~~~~~~~~~
```

This shows where the error occurs and how we got there, which is pretty neat.

There is still a use-case for UDFs, especially to reduce BPF code size (possibly preventing verifier errors), but macros is a good start and will teach us, without a lot of investment, what code sharing features we’re still lacking and if this fills the majority of the user need.

This is still an experimental feature, meaning we want to incorporate user feedback to make sure the design is correct, but it will be available in the next bpftrace release in September 2025 (v0.24). You can try it out now on the master branch and, as always, we’d love to [hear your feedback](https://github.com/bpftrace/bpftrace/discussions).
