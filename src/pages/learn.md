# Learn

## One-Liners

The following one-liners demonstrate different capabilities:

```
# Files opened by thread name
bpftrace -e 'tracepoint:syscalls:sys_enter_open { printf("%s %s\n", comm, str(args->filename)); }'

# Syscall count by thread name
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); }'

# Read bytes by thread name:
bpftrace -e 'tracepoint:syscalls:sys_exit_read /args->ret/ { @[comm] = sum(args->ret); }'

# Read size distribution by thread name:
bpftrace -e 'tracepoint:syscalls:sys_exit_read { @[comm] = hist(args->ret); }'

# Show per-second syscall rates:
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @ = count(); } interval:s:1 { print(@); clear(@); }'

# Trace disk size by PID and thread name
bpftrace -e 'tracepoint:block:block_rq_issue { printf("%d %s %d\n", pid, comm, args->bytes); }'

# Count page faults by thread name
bpftrace -e 'software:faults:1 { @[comm] = count(); }'

# Count LLC cache misses by thread name and PID (uses PMCs):
bpftrace -e 'hardware:cache-misses:1000000 { @[comm, pid] = count(); }'

# Profile user-level stacks at 99 Hertz for PID 189:
bpftrace -e 'profile:hz:99 /pid == 189/ { @[ustack] = count(); }'

# Files opened in the root cgroup-v2
bpftrace -e 'tracepoint:syscalls:sys_enter_openat /cgroup == cgroupid("/sys/fs/cgroup/unified/mycg")/ { printf("%s\n", str(args->filename)); }'
```

[**One Liner Tutorials**](./tutorial-one-liners)

## Videos

Note: some of the content in these videos may be out of date.

- [Making bpftrace more powerful - 2023](https://www.youtube.com/watch?v=19RZ7b6AZJ0)
- [Bpftrace Recipes: 5 Real Problems Solved - 2023](https://www.youtube.com/watch?v=wMtArNjRYXU)
- [Linux tracing made simpler with bpftrace - 2022](https://www.youtube.com/watch?v=gSxntAO2Iys)
- [Ahead-of-time compiled bpftrace programs - 2021](https://www.youtube.com/watch?v=C2n2i__YCcI)
- [Getting Started with BPF observability - 2021](https://www.youtube.com/watch?v=bGAVrtb_tFs)
- [bpftrace internals - 2020](https://www.youtube.com/watch?v=nDY4iC_ekQY&t=1477s)
- [Using bpftrace with Performance Co-Pilot & Grafana - 2020](https://www.youtube.com/watch?v=ZiGTbItyJyg)
- [An introduction to bpftrace tracing language - 2020](https://www.youtube.com/watch?v=93aHXYqZmU0)