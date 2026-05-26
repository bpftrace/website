# 0.26 Release Notes

Below are some highlights from this release. For a full list of changes, check
out the release notes on GitHub:
- [**0.26.0**](https://github.com/bpftrace/bpftrace/releases/tag/v0.26.0)

Note that this release does not adhere to the traditional [release
schedule](https://github.com/bpftrace/bpftrace/blob/master/docs/release_process.md#release-cadence) because it features several important bug fixes that would be hard to backport to the previous release branch. Despite being
primarily about fixes, there is a number of new and exciting features!

## What's New

Two features that have been introduced in the previous releases are now finally
coming out of the "unstable" status: **imports** and the **address-of
operator**; both are critical parts of
[C-interop](https://bpftrace.org/blog/c-interop). Next, there are several new
features that leverage the DWARF debugging information, such as **stack
unwinding** (unstable at the moment) and **statement probes**. The below
sub-sections describe the most significant features in detail.

In addition to new features, there is a number of internal changes, some of
which are surfaced to users. The most notable one is a new *recursive-descent
parser*, which replaces the previous, more traditional, LR parser. The new
parser allows us to define a clearer [structure of bpftrace
programs](docs/release_026/language) and resolve a lot of ambiguities of the
bpftrace language, mainly related to casts and `typeof`-like expressions (see
[Cast Parsing](docs/release_026/language#cast-parsing) for details).

### Imports

**Top-level imports** allow bpftrace scripts to import other files and therefore
share functionality among multiple programs. In addition to other bpftrace
files, it is possible to import *C headers* and *BPF C source files*, which
opens up new possibilities for extending the functionality of bpftrace. For more
details, refer to the [blog post](blog/imports) and
[documentation](docs/release_026/language#imports) on imports.

In general, the syntax for importing is:
```
import "<path>";
```
where `<path>` can be of three types, distinguished by the file extention:
- **bpftrace files** (`.bt`) - these may contain additional probes, macros, or
  map declarations, which are merged into the current script.
- **C headers** (`.h`) - any type definitions contained in these are made
  available to the current program.
- **BPF C sources** (`.bpf.c`) - these are compiled into BPF programs (object
  files), which are linked with the current program. This allows bpftrace to
  call subprograms specified in the BPF C programs.

### Address-of Operator

It is now possible to obtain the address of a bpftrace scratch or map variable
using the `&` operator:
```
$a = 1;
$b = &$a;
```

### DWARF-based Stack Unwinding

The new builtin `dw_ustack()` leverages DWARF `.eh_frame` debug information to
unwind userspace stacks. This allows to unwind stacks even for programs compiled
without frame pointers.

The feature is unstable for the moment, which means that it will print a warning
when used. It is possible to suppress the warning with the new config option:
```
config = { unstable_dw_ustack=enable }
```

See [documentation](docs/release_026/stdlib#dw_ustack) for more details.

### Statement Probes

When tracing a user-space binary that has DWARF information available, it is
possible to attach inside directly to source file statements by specifying the
line (and possibly column) number. The syntax is
`uprobe:binary@file:line[:col]`:
```
uprobe:/bin/bash@readline.c:362 { ... }
```

The file name may be absolute or relative and the `line[:col]` must refer to a
valid location in the source file.

### Standard Library Additions
- `signal_name` to convert a signal number to the corresponding signal name
- `write_user(dst, src, len)` to write to user-space memory using the
  `bpf_probe_write_user` helper (only usable with the `--unsafe` flag)
- `is_err` for detecting `ERR_PTR` values (mostly used in the kernel)
- `leader_{tid,comm}` to retrieve the thread group leader

## What's fixed
- Fixed `strerror()` and `signal_name()` failing BPF verification
- Fixed boolean-to-integer casts and per-cpu map aggregation on big-endian architectures
- Fix subtraction and decrement ops not producing the correct type
- Fix `for`-loop variable scope causing type merging across loops
- Fix un-aligned map key access for `hist`/`lhist`/`tseries` map types

## Feedback

As always feedback is welcome and appreciated. Please [**let us know**](https://github.com/bpftrace/bpftrace/discussions) how we can improve your experience with bpftrace.
