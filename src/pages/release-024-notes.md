# 0.24 Release Notes

Below are some highlights from this release. For a full list of changes, check out the release notes on github:
- [**0.24.0**](https://github.com/bpftrace/bpftrace/releases/tag/v0.24.0)
- [**0.24.1**](https://github.com/bpftrace/bpftrace/releases/tag/v0.24.1)

## What's New

In this release, bpftrace introduced some experimental features and with them an "unstable" flag. You are free to use these features but, as per the flag, they are unstable and you'll get a warning. [Read more](./docs/release_024/language#unstable-features).

### Macros

Finally a mechanism to dedupe bpftrace code! Macros, specifically hygienic macros, are a powerful new bpftrace feature already powering some internal functions/builtins. Quick Example:
```
macro add_one(x) {
  x + 1
}

BEGIN {
  print(add_one(1)); // prints 2
}
```

[Read More >>](blog/hygiene-macros)

### Named Parameters

No more saving default positional params to maps (yick). Now all you have to do is write `getopt("my_named_param", "my_default_value")` - that’s it!

Named parameters are passed on the command line after a double dash (--), e.g.
```
# bpftrace -e 'begin { print(getopt("today", "Monday")); }' –- -–today=Friday.
```

[Read More >>](./docs/release_024/language#named-parameters)

### Time Series (tseries)

This is a new map function (like `hist`) that outputs a time series graph on the command line showing how a value has changed over time.
Example output:
```
            ___________________________________________________
20:41:03   o                                                   | 10
20:41:03   o                                                   | 10
20:41:03   o                                                   | 10
20:41:03   |       o                                           | 265
20:41:03   |              o                                    | 477
20:41:03   |              o                                    | 477
20:41:03   |              o                                    | 477
20:41:03   |              o                                    | 477
20:41:03   |              o                                    | 477
20:41:03   |              o                                    | 477
20:41:03   |                   o                               | 659
20:41:03   |                      o                            | 725
20:41:03   |                      o                            | 725
20:41:03   |                             o                     | 939
20:41:03   |                                    o              | 1172
20:41:03   |                                    o              | 1172
20:41:03   |                                                   o 1620
...
20:41:03   |                                                   o 1620
20:41:03   |                                                   o 1620
           v___________________________________________________v
           10                                               1620
```

[Read More >>](./docs/release_024/stdlib#tseries)

### Map Declarations

You can now declare different map types in the global scope and specify the max number of entries. Example:

```
let @a = lruhash(100); // uses the BPF_MAP_TYPE_LRU_HASH with 100 max entries
```

[Read More >>](./docs/release_024/language#map-declarations)

### New Syntax

- [Range based for loops](./docs/release_024/language#for), e.g., `for ($i : 0..ncpus)`
- Booleans e.g. `true` and `false`
- Duration literals, e.g., you can now type an interval probe like `interval:1s`
- Non-constant array access, e.g., `$a->x[$y]`

### Many New Standard Library Additions

- [assert](./docs/release_024/stdlib#assert)
- [ncpus](./docs/release_024/stdlib#ncpus)
- [ppid](./docs/release_024/stdlib#ppid)
- [socket_cookie](./docs/release_024/stdlib#socket_cookie)
- [usermode](./docs/release_024/stdlib#usermode)

## What's Changed

- `-p` (PID) CLI flag now applies to all probes (except begin, end, and interval)
- Introduce automatic session kprobes probes if available
- Issue a warning for discarded return values for some functions, e.g., `delete`
- Make probe provider names case insensitive, e.g. `begin {}`, `BEGIN {}` and `beGiN {}` are all equivalent
- Now only cache symbols from the targeted process when using `-p` to improve startup time and memory usage
- Error by default if any probe fails to attach - though this can be configured with the [`missing_probes`](./docs/release_024/language#missing_probes) config
- Rawtracepoints can now use `args` builtin and list params (though BTF is required)

## What's Fixed

- Fix incorrect reporting of attached count for multi probes
- Fix kstack/ustack on big-endian systems
- Fix codegen optimization bug with the modulo operator
- Don't crash if kernel isn't built with PID namespaces
- Fix execution watchpoints

## Feedback

As always feedback is welcome and appreciated. Please [**let us know**](https://github.com/bpftrace/bpftrace/discussions) how we can improve your experience with bpftrace.
