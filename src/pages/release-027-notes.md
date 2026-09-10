# 0.27 Release Notes

Below are some highlights from this release. For a full list of changes, check
out the release notes on GitHub:
- [**0.27.0**](https://github.com/bpftrace/bpftrace/releases/tag/v0.27.0)

## What's new

Compared to the previous releases, this one is more focused on numerous fixes
and does not introduce too much new functionality.

The most important additions are in the standard library, namely:
- `str_concat()` macro for concatenating strings
- `container_of()` macro for getting a pointer to the parent structure from
  a pointer to a structure field
- `config` builtin to access script's configuration variables

In addition, this is the first release that ships a statically built ARM64
binary (an AppImage), which can be found in [Release
Assets](https://github.com/bpftrace/bpftrace/releases/tag/v0.27.0). Since we now
ship static binaries for multiple architectures (x86_64 and ARM64), the assets
are suffixed with the corresponding architecture.

## What's changed
- Listing structure types in verbose mode (`bpftrace -lv 'struct ...'`) now also
  prints the name of the kernel module where the type is defined.
- A warning is printed when casting an expression to the exact same type.

## What's fixed
- Session probes now work on kernel versions >= 7.0.
- Fixed segfaults caused by debug locations leaking between generated functions.
- Numerous fixes for big endian architectures and particularly s390x.
- Fixed `print` for empty scalar maps.
- Fixed large string casts.
- Fixed `func` builtin for kretprobes using the session probes.
- Fix formatting of MAC address bytes with the high bit set. 

## Feedback

As always feedback is welcome and appreciated. Please [**let us know**](https://github.com/bpftrace/bpftrace/discussions) how we can improve your experience with bpftrace.
