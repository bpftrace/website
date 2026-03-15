# 0.25 Release Notes

Below are some highlights from this release. For a full list of changes, check out the release notes on github:
- [**0.25.0**](https://github.com/bpftrace/bpftrace/releases/tag/v0.25.0)

## What's New

There are some exciting new, but unstable, features in this release like [**imports**](blog/imports), [**c-interop**](blog/c-interop), and [**compile time**](blog/comptime) functions. They're marked as "unstable" because we're still polishing/testing the exact API but please feel free to experiment with them and [**give us your feedback**](https://github.com/bpftrace/bpftrace/issues).

Additionally, there are a lot of internal changes to bpftrace that are not noticeable on the surface. We've been working hard to clean up a lot of tech debt, especially in regards to the bpftrace compile pipeline, our type system (leaning into BTF), probe expansion, code generation, and our new [**standard library**](docs/release_025/stdlib). In fact there have been **397** commits between version 0.24.2 and 0.25.0 - that's huge!

### Records

Similar to tuples, except you can name fields and use those field names to access members:
```
interval:s:1 {
  $a = (color="green", size=2);
  print($a);        // { .color = "green", .size = 2 }
  print($a.size);   // 2
  $a = (size=10, color="blue");
  print($a.color);  // blue
}
```

### Script Formatting

bpftrace now provides canonical script formatting via the `--fmt` flag, e.g.
```
# bpftrace --fmt my_script.bt
```

### `build_id` Stack mode

```
ustack(build_id)
```

This is so users can get the build_id + file offset for stacks instead of just the instruction pointer, which is useful if you want to do symbolication after bpftrace has exited.

### Standard Library Additions
- `syscall_name` to convert system call numbers into names
- `pcomm` to get the name of the process for the passed task or the current task
- `signal_thread` to target the current thread
- `probetype` to get the current probe type, e.g. "kprobe", "uprobe"
- `find` to get map value if it exists
- `uaddr` now supports PIE and dynamic library symbols

## What's Changed
- Increase RLIMIT_NOFILE on startup as needed
- Root user check replaced with check for required capabilities (CAP_BPF, CAP_PERFMON, CAP_DAC_READ_SEARCH, CAP_DAC_OVERRIDE)
- Remove automatic type promotion for integers, making them more flexible
- Stabilize macros and map declarations

## What's Fixed
- Fix missing lines in `ustack`/`kstack` resolution
- Fix error in listing multiple probes
- Fix interval probe attachment when CPU 0 is offline
- Improved tuple binop comparison
- Fix handling of void ptr and function ptr BTF types

## Feedback

As always feedback is welcome and appreciated. Please [**let us know**](https://github.com/bpftrace/bpftrace/discussions) how we can improve your experience with bpftrace.
