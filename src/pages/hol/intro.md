# bpftrace Hands On Lab

This hands-on lab is designed to be completed in half a day though that may vary depending upon how thorough you want to be with the exercises. It has been written as a "hands-on bootstrapping" guide for the bpftrace beginner and aims to give you enough information to kick-start your productivity with bpftrace. Note that it is by no means a complete treatment of the subject and many things are missed out for the sake of brevity.

We suggest that you complete the labs in the order they are presented below. The sections in each lab generally contain a mix of presented information and suggested exercises. We **strongly** suggest that you manually run any bpftrace scripts that are used in explanations and feel free to modify them and see what happens!

Finally, note that the lab is designed to be ran stand alone and without a lecturer but it is probably at its best when undertook in a shared learning environment (i.e, having people around to discuss your problems and ideas with!). For help later or on your own, please feel free to post any and all bpftrace questions in the [GitHub discussion section](https://github.com/bpftrace/bpftrace/discussions) or in the [bpftrace IRC channel](https://webchat.oftc.net/?nick=&channels=%23bpftrace).

---

## Prerequisites

**NOTE:** Attendees of the bpftrace Hands-on lab at the Scale 22x conference will be given access to systems with everything pre-installed.

1. You must have the `bpftrace` executable installed on your system and the package name will vary slightly between distros. 
2. Unless specified differently, all commands will be executed as the `root` user so ensure you have the appropriate access.
3. You must also have the load generator programs available to run. [Download](/bpftrace-hol.tar.gz) and unpack the archive or [build from source](https://github.com/tyroguru/BPFTrace-hol/tree/master/CODE).

**Warning**: The tarball binaries were compiled on a specific kernel verison, distro and architecture so YMMV when using it. Try building from source if you're having issues.

```sh
tar -xvzf bpftrace-hol.tar.gz && cd ~
```
Expected output:
```sh
bpftrace-hol/
bpftrace-hol/load_generators/
bpftrace-hol/load_generators/core/
bpftrace-hol/load_generators/core/core
bpftrace-hol/load_generators/kprobes/
bpftrace-hol/load_generators/kprobes/kprobeme
bpftrace-hol/load_generators/scripts/
bpftrace-hol/load_generators/syscalls/
bpftrace-hol/load_generators/syscalls/closeall
bpftrace-hol/load_generators/syscalls/tempfiles
bpftrace-hol/load_generators/syscalls/mapit
bpftrace-hol/load_generators/uprobes/
bpftrace-hol/load_generators/uprobes/uprobeme
bpftrace-hol/load_generators/usdt/
bpftrace-hol/load_generators/usdt/thrift/
bpftrace-hol/load_generators/usdt/thrift/cpp2/
bpftrace-hol/load_generators/usdt/thrift/if/
bpftrace-hol/load_generators/usdt/usdt-passwd
bpftrace-hol/load_generators/utils/
bpftrace-hol/load_generators/utils/allprobes.py
bpftrace-hol/bpfhol
```
Drop into the directory:
```sh
cd bpftrace-hol
```

## Load Generators

A number of exercises in the lab will make use of the `bpfhol` binary that is located at the top level directory of the `bpftrace-hol` package. Its purpose is to run load generators in the background that aid in demonstrating features of the bpftrace language. When executed, the `bpfhol` binary presents the following menu:

```sh
$ ./bpfhol
1. core
2. syscalls
3. kernel
4. usdt
4. uprobes
8. stop current generator
9. exit
```

Simply select the integer value corresponding to the area you have been told to run load generators for, e.g., `1` for core, `2` for syscalls, etc. If at any time you're not sure whether you already have load generators running you can simply select option `8` to kill all existing load generators that may be running.

Some of the lab exercises will give you a small hint as to what bpftrace language primitive to use to solve them. If this is the case then it is generally expected that you will look up the language feature in the [docs 📖](/docs/pre-release).

Example solutions for all lab exercises are provided in the [solutions document](./lab-solutions).

Please use your instructor (if there is one) to discuss any issues or problems you may have. Everyone, including them, is on a learning curve with bpftrace so your question or problem will always be valuable.

## Labs

1. [bpftrace: core language features](./core-language)
1. [Working with system calls](./system-calls)
1. [Working with kernel probes](./kernel-probes)
1. [Working with dynamic user probes](./user-probes)
1. [Solutions to lab exercises](./lab-solutions)
