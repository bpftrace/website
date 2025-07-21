import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from '../../index.module.css';

export default function Home() {
  return (
    <Layout title="docs">
	    <div className="container container--fluid margin-vert--lg">
        <div className="row docs-row">
          <div className="col docs-left-col col--8">
          <h1>The Command Line Tool (Version: 0.23)</h1>
            <div id="content">
<div className="sect1">
<h2 id="_synopsis">Synopsis</h2>
<div className="sectionbody">
<div className="paragraph">
<p><strong>bpftrace</strong> [<em>OPTIONS</em>] <em>FILENAME</em><br />
<strong>bpftrace</strong> [<em>OPTIONS</em>] -e 'program code'</p>
</div>
<div className="paragraph">
<p>When <em>FILENAME</em> is "<em>-</em>", bpftrace will read program code from stdin.</p>
</div>
<div className="paragraph">
<p>A program will continue running until Ctrl-C is hit, or an <code>exit</code> function is called.
When a program exits, all populated maps are printed (more details below).</p>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_description">Description</h2>
<div className="sectionbody">
<div className="paragraph">
<p>bpftrace is a high-level tracing language for Linux. bpftrace uses LLVM as
a backend to compile scripts to eBPF-bytecode and makes use of libbpf and bcc
for interacting with the Linux BPF subsystem, as well as existing Linux
tracing capabilities.</p>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_examples">Examples</h2>
<div className="sectionbody">
<div className="dlist">
<dl>
<dt className="hdlist1">Trace processes calling sleep</dt>
</dl>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'kprobe:do_nanosleep { printf("%d sleeping\\n", pid); }'`}</pre>
</div>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">Trace processes calling sleep while spawning <code>sleep 5</code> as a child process</dt>
</dl>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'kprobe:do_nanosleep { printf("%d sleeping\\n", pid); }' -c 'sleep 5'`}</pre>
</div>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">List all probes with "sleep" in their name</dt>
</dl>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -l '*sleep*'`}</pre>
</div>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">List all the probes attached in the program</dt>
</dl>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -l -e 'kprobe:do_nanosleep { printf("%d sleeping\\n", pid); }'`}</pre>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_options">Options</h2>
<div className="sectionbody">
<div className="sect2">
<h3 id="_b_mode"><strong>-B</strong> <em>MODE</em></h3>
<div className="paragraph">
<p>Set the buffer mode for stdout.</p>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">Valid values are</dt>
<dd>
<p><strong>none</strong> No buffering. Each I/O is written as soon as possible<br />
<strong>line</strong> Data is written on the first newline or when the buffer is full. This is the default mode.<br />
<strong>full</strong> Data is written once the buffer is full.</p>
</dd>
</dl>
</div>
</div>
<div className="sect2">
<h3 id="_c_command"><strong>-c</strong> <em>COMMAND</em></h3>
<div className="paragraph">
<p>Run <em>COMMAND</em> as a child process.
When the child terminates bpftrace will also terminate, as if 'exit()' had been called.
If bpftrace terminates before the child process does the child process will be terminated with a SIGTERM.
If used, 'USDT' probes will only be attached to the child process.
To avoid a race condition when using 'USDTs', the child is stopped after 'execve' using 'ptrace(2)' and continued when all 'USDT' probes are attached.
The child process runs with the same privileges as bpftrace itself (usually root).</p>
</div>
<div className="paragraph">
<p>Unless otherwise specified, bpftrace does not perform any implicit filtering. Therefore, if you are only interested in
events in <em>COMMAND</em>, you may want to filter based on the child PID. The child PID is available to programs as the 'cpid' builtin.
For example, you could add the predicate <code>/pid == cpid/</code> to probes with userspace context.</p>
</div>
</div>
<div className="sect2">
<h3 id="_d_stage"><strong>-d STAGE</strong></h3>
<div className="paragraph">
<p>Enable debug mode.
For more details see the <a href="#_debug_output">Debug Output</a> section.</p>
</div>
</div>
<div className="sect2">
<h3 id="_dry_run"><strong>--dry-run</strong></h3>
<div className="paragraph">
<p>Terminate execution right after attaching all the probes. Useful for testing
that the script can be parsed, loaded, and attached, without actually running
it.</p>
</div>
</div>
<div className="sect2">
<h3 id="_e_program"><strong>-e</strong> <em>PROGRAM</em></h3>
<div className="paragraph">
<p>Execute <em>PROGRAM</em> instead of reading the program from a file or stdin.</p>
</div>
</div>
<div className="sect2">
<h3 id="_f_format"><strong>-f</strong> <em>FORMAT</em></h3>
<div className="paragraph">
<p>Set the output format.</p>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">Valid values are</dt>
<dd>
<p><strong>json</strong><br />
<strong>text</strong></p>
</dd>
</dl>
</div>
<div className="paragraph">
<p>The JSON output is compatible with NDJSON and JSON Lines, meaning each line of the streamed output is a single blob of valid JSON.</p>
</div>
</div>
<div className="sect2">
<h3 id="_h_help"><strong>-h, --help</strong></h3>
<div className="paragraph">
<p>Print the help summary.</p>
</div>
</div>
<div className="sect2">
<h3 id="_i_dir"><strong>-I</strong> <em>DIR</em></h3>
<div className="paragraph">
<p>Add the directory <em>DIR</em> to the search path for C headers.
This option can be used multiple times.
For more details see the <a href="#_preprocessor_options">Preprocessor Options</a> section.</p>
</div>
</div>
<div className="sect2">
<h3 id="_include_filename"><strong>--include</strong> <em>FILENAME</em></h3>
<div className="paragraph">
<p>Add <em>FILENAME</em> as an include for the pre-processor.
This is equal to adding '#include <em>FILENAME</em>' at the top of the program.
This option can be used multiple times.
For more details see the <a href="#_preprocessor_options">Preprocessor Options</a> section.</p>
</div>
</div>
<div className="sect2">
<h3 id="_info"><strong>--info</strong></h3>
<div className="paragraph">
<p>Print detailed information about features supported by the kernel and the bpftrace build.</p>
</div>
</div>
<div className="sect2">
<h3 id="_k"><strong>-k</strong></h3>
<div className="paragraph">
<p>This flag enables runtime warnings for errors from 'probe_read_*' and map lookup BPF helpers.
When errors occur bpftrace will log an error containing the source location and the error code:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`stdin:48-57: WARNING: Failed to probe_read_user_str: Bad address (-14)
u:lib.so:"fn(char const*)" { printf("arg0:%s\\n", str(arg0));}
                                                 ~~~~~~~~~`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_l_searchfilename"><strong>-l</strong> [<em>SEARCH</em>|<em>FILENAME</em>]</h3>
<div className="paragraph">
<p>List all probes that match the <em>SEARCH</em> pattern.
If the pattern is omitted all probes will be listed.
This pattern supports wildcards in the same way that probes do.
E.g. '-l kprobe:*file*' to list all 'kprobes' with 'file' in the name.
This can be used with a program, which will list all probes in that program.
For more details see the <a href="#_listing_probes">Listing Probes</a> section.</p>
</div>
</div>
<div className="sect2">
<h3 id="_no_feature_featurefeature"><strong>--no-feature</strong> <em>feature,feature,&#8230;&#8203;</em></h3>
<div className="dlist">
<dl>
<dt className="hdlist1">Disable use of detected features, valid values are</dt>
<dd>
<p><strong>uprobe_multi</strong> to disable uprobe_multi link<br />
<strong>kprobe_multi</strong> to disable kprobe_multi link<br />
<strong>kprobe_session</strong> to disable automatic collapse of kprobe/kretprobe into kprobe session</p>
</dd>
</dl>
</div>
</div>
<div className="sect2">
<h3 id="_no_warnings"><strong>--no-warnings</strong></h3>
<div className="paragraph">
<p>Suppress all warning messages created by bpftrace.</p>
</div>
</div>
<div className="sect2">
<h3 id="_o_filename"><strong>-o</strong> <em>FILENAME</em></h3>
<div className="paragraph">
<p>Write bpftrace tracing output to <em>FILENAME</em> instead of stdout.
This doesn&#8217;t include child process (<strong>-c</strong> option) output.
Errors are still written to stderr.</p>
</div>
</div>
<div className="sect2">
<h3 id="_p_pid"><strong>-p</strong> <em>PID</em></h3>
<div className="paragraph">
<p>Attach to the process with or filter actions by <em>PID</em>.
If the process terminates, bpftrace will also terminate.
When using USDT, uprobes, uretprobes, hardware, software, profile, interval, watchpoint, or asyncwatchpoint probes they will be attached to only this process.
For all other probes, except BEGIN/END, the pid will act like a predicate to filter out events not from that pid.
For listing uprobes/uretprobes set the target to '*' and the process&#8217;s address space will be searched for the symbols.</p>
</div>
</div>
<div className="sect2">
<h3 id="_q"><strong>-q</strong></h3>
<div className="paragraph">
<p>Keep messages quiet.</p>
</div>
</div>
<div className="sect2">
<h3 id="_unsafe"><strong>--unsafe</strong></h3>
<div className="paragraph">
<p>Some calls, like 'system', are marked as unsafe as they can have dangerous side effects ('system("rm -rf")') and are disabled by default.
This flag allows their use.</p>
</div>
</div>
<div className="sect2">
<h3 id="_usdt_file_activation"><strong>--usdt-file-activation</strong></h3>
<div className="paragraph">
<p>Activate usdt semaphores based on file path.</p>
</div>
</div>
<div className="sect2">
<h3 id="_v_version"><strong>-V, --version</strong></h3>
<div className="paragraph">
<p>Print bpftrace version information.</p>
</div>
</div>
<div className="sect2">
<h3 id="_v"><strong>-v</strong></h3>
<div className="paragraph">
<p>Enable verbose messages.
For more details see the <a href="#_verbose_output">Verbose Output</a> section.</p>
</div>
</div>
<div className="sect2">
<h3 id="_program_options">Program Options</h3>
<div className="paragraph">
<p>You can also pass custom options to a bpftrace program/script itself via positional or named parameters.
Positional parameters can be placed before or after a double dash but named parameters can ONLY come after a double dash; e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'BEGIN { print(($1, $2, getopt("aa", 1), getopt("bb"))); }' p1 -- --aa=20 --bb p2

// (p1, p2, 20, true) is printed`}</pre>
</div>
</div>
<div className="paragraph">
<p>or</p>
</div>
<div className="listingblock">
<div className="content">
<pre class="highlight"><code># bpftrace myscript.bt -- p1 --aa=20 --bb p2</code>`}</pre>
</div>
</div>
<div className="paragraph">
<p>In these examples there are two positional parameters (<code>p1</code>, <code>p2</code>) and two named parameters (<code>aa</code>, which is set to <code>20</code>, and <code>bb</code>, which is set to <code>true</code>).
Named program parameters require the <code>=</code> to set their value unless they are boolean parameters (like 'bb' above).
Read about how to access <a href="#builtins-positional-parameters">positional</a> or <a href="#functions-getopt">named</a> parameters in a bpftrace script below.</p>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_the_language">The Language</h2>
<div className="sectionbody">
<div className="paragraph">
<p>Syntax, types, and concepts for bpftrace are <a href="language">available here</a>.</p>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_probes">Probes</h2>
<div className="sectionbody">
<div className="paragraph">
<p>bpftrace supports various probe types which allow the user to attach BPF programs to different types of events.
Each probe starts with a provider (e.g. <code>kprobe</code>) followed by a colon (<code>:</code>) separated list of options.
The amount of options and their meaning depend on the provider.
<a href="language#probes">Full list of probe types</a>.</p>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_standard_library">Standard library</h2>
<div className="sectionbody">
<div className="paragraph">
<p>The standard library of all <a href="stdlib#builtins">builtins</a>, <a href="stdlib#functions">functions</a>, and <a href="stdlib#map-functions">map functions</a> is <a href="stdlib">available here</a>.</p>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_configuration">Configuration</h2>
<div className="sectionbody">
<div className="sect2">
<h3 id="_config_variables">Config Variables</h3>
<div className="paragraph">
<p>Some behavior can only be controlled through config variables, which are <a href="language#config-variables">listed here</a>.
These can be set via the Config Block directly in a script (before any probes) or via their environment variable equivalent, which is upper case and includes the `BPFTRACE_` prefix e.g. ``stack_mode``'s environment variable would be `BPFTRACE_STACK_MODE`.</p>
</div>

</div>
<div className="sect2">
<h3 id="_environment_variables">Environment Variables</h3>
<div className="paragraph">
<p>These are not available as part of the standard set of <a href="language#config-variables">Config Variables</a> and can only be set as environment variables.</p>
</div>
<div className="sect3">
<h4 id="_bpftrace_btf">BPFTRACE_BTF</h4>
<div className="paragraph">
<p>Default: None</p>
</div>
<div className="paragraph">
<p>The path to a BTF file. By default, bpftrace searches several locations to find a BTF file.
See src/btf.cpp for the details.</p>
</div>
</div>
<div className="sect3">
<h4 id="_bpftrace_debug_output">BPFTRACE_DEBUG_OUTPUT</h4>
<div className="paragraph">
<p>Default: 0</p>
</div>
<div className="paragraph">
<p>Outputs bpftrace&#8217;s runtime debug messages to the trace_pipe. This feature can be turned on by setting
the value of this environment variable to <code>1</code>.</p>
</div>
</div>
<div className="sect3">
<h4 id="_bpftrace_kernel_build">BPFTRACE_KERNEL_BUILD</h4>
<div className="paragraph">
<p>Default: <code>/lib/modules/$(uname -r)</code></p>
</div>
<div className="paragraph">
<p>Only used with <code>BPFTRACE_KERNEL_SOURCE</code> if it is out-of-tree Linux kernel build.</p>
</div>
</div>
<div className="sect3">
<h4 id="_bpftrace_kernel_source">BPFTRACE_KERNEL_SOURCE</h4>
<div className="paragraph">
<p>Default: <code>/lib/modules/$(uname -r)</code></p>
</div>
<div className="paragraph">
<p>bpftrace requires kernel headers for certain features, which are searched for in this directory.</p>
</div>
</div>
<div className="sect3">
<h4 id="_bpftrace_vmlinux">BPFTRACE_VMLINUX</h4>
<div className="paragraph">
<p>Default: None</p>
</div>
<div className="paragraph">
<p>This specifies the vmlinux path used for kernel symbol resolution when attaching kprobe to offset.
If this value is not given, bpftrace searches vmlinux from pre defined locations.
See src/attached_probe.cpp:find_vmlinux() for details.</p>
</div>
</div>
<div className="sect3">
<h4 id="_bpftrace_color">BPFTRACE_COLOR</h4>
<div className="paragraph">
<p>Default: auto</p>
</div>
<div className="paragraph">
<p>Colorize the bpftrace log output message. Valid values are auto, always and never.</p>
</div>
</div>
</div>
<div className="sect2">
<h2 id="_options_expanded">Options Expanded</h2>
<div className="sect3">
<h3 id="_debug_output">Debug Output</h3>
<div className="paragraph">
<p>The <code>-d STAGE</code> option produces debug output. It prints the output of the
bpftrace execution stage given by the <em>STAGE</em> argument. The option can be used
multiple times (with different stage names) and the special value <code>all</code> prints
the output of all the supported stages. The option also takes multiple stages
in one invocation as comma separated values.</p>
</div>
<div className="paragraph">
<p>Note: This is primarily used for bpftrace developers.</p>
</div>
<div className="paragraph">
<p>The supported options are:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>ast</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Prints the Abstract Syntax Tree (AST) after every pass.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>codegen</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Prints the unoptimized LLVM IR as produced by <code>CodegenLLVM</code>.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>codegen-opt</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Prints the optimized LLVM IR, i.e. the code which will be compiled into BPF
bytecode.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>dis</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Disassembles and prints out the generated bytecode that <code>libbpf</code> will see.
Only available in debug builds.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>libbpf</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Captures and prints libbpf log for all libbpf operations that bpftrace uses.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>verifier</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Captures and prints the BPF verifier log.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>all</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Prints the output of all of the above stages.</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect3">
<h3 id="_listing_probes">Listing Probes</h3>
<div className="paragraph">
<p>Probe listing is the method to discover which probes are supported by the current system.
Listing supports the same syntax as normal attachment does and alternatively can be
combined with <code>-e</code> or filename args to see all the probes that a program would attach to.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -l 'kprobe:*'
# bpftrace -l 't:syscalls:*openat*
# bpftrace -l 'kprobe:tcp*,trace
# bpftrace -l 'k:*socket*,tracepoint:syscalls:*tcp*'
# bpftrace -l -e 'tracepoint:xdp:mem_* { exit(); }'
# bpftrace -l my_script.bt
# bpftrace -lv 'enum cpu_usage_stat'`}</pre>
</div>
</div>
<div className="paragraph">
<p>The verbose flag (<code>-v</code>) can be specified to inspect arguments (<code>args</code>) for providers that support it:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -l 'fexit:tcp_reset,tracepoint:syscalls:sys_enter_openat' -v
fexit:tcp_reset
    struct sock * sk
    struct sk_buff * skb
tracepoint:syscalls:sys_enter_openat
    int __syscall_nr
    int dfd
    const char * filename
    int flags
    umode_t mode

# bpftrace -l 'uprobe:/bin/bash:rl_set_prompt' -v    # works only if /bin/bash has DWARF
uprobe:/bin/bash:rl_set_prompt
    const char *prompt

# bpftrace -lv 'struct css_task_iter'
struct css_task_iter {
        struct cgroup_subsys *ss;
        unsigned int flags;
        struct list_head *cset_pos;
        struct list_head *cset_head;
        struct list_head *tcset_pos;
        struct list_head *tcset_head;
        struct list_head *task_pos;
        struct list_head *cur_tasks_head;
        struct css_set *cur_cset;
        struct css_set *cur_dcset;
        struct task_struct *cur_task;
        struct list_head iters_node;
};`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h3 id="_preprocessor_options">Preprocessor Options</h3>
<div className="paragraph">
<p>The <code>-I</code> option can be used to add directories to the list of directories that bpftrace uses to look for headers.
Can be defined multiple times.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# cat program.bt
#include <foo.h>

BEGIN { @ = FOO }

# bpftrace program.bt

definitions.h:1:10: fatal error: 'foo.h' file not found

# /tmp/include
foo.h

# bpftrace -I /tmp/include program.bt

Attached 1 probe`}</pre>
</div>
</div>
<div className="paragraph">
<p>The <code>--include</code> option can be used to include headers by default.
Can be defined multiple times.
Headers are included in the order they are defined, and they are included before any other include in the program being executed.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace --include linux/path.h --include linux/dcache.h \
    -e 'kprobe:vfs_open { printf("open path: %s\\n", str(((struct path *)arg0)->dentry->d_name.name)); }'

Attached 1 probe
open path: .com.google.Chrome.ASsbu2
open path: .com.google.Chrome.gimc10
open path: .com.google.Chrome.R1234s`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h3 id="_verbose_output">Verbose Output</h3>
<div className="paragraph">
<p>The <code>-v</code> option prints more information about the program as it is run:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -v -e 'tracepoint:syscalls:sys_enter_nanosleep { printf("%s is sleeping.\\n", comm); }'
AST node count: 7
Attached 1 probe

load tracepoint:syscalls:sys_enter_nanosleep, with BTF, with func_infos: Success

Program ID: 111
Attaching tracepoint:syscalls:sys_enter_nanosleep
iscsid is sleeping.
iscsid is sleeping.
[...]`}</pre>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_terminology">Terminology</h2>
<div className="sectionbody">
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">BPF</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Berkeley Packet Filter: a kernel technology originally developed for optimizing the processing of packet filters (eg, tcpdump expressions).</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">BPF map</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">A BPF memory object, which is used by bpftrace to create many higher-level objects.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">BTF</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">BPF Type Format: the metadata format which encodes the debug info related to BPF program/map.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">dynamic tracing</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Also known as dynamic instrumentation, this is a technology that can instrument any software event, such as function calls and returns, by live modification of instruction text. Target software usually does not need special capabilities to support dynamic tracing, other than a symbol table that bpftrace can read. Since this instruments all software text, it is not considered a stable API, and the target functions may not be documented outside of their source code.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">eBPF</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Enhanced BPF: a kernel technology that extends BPF so that it can execute more generic programs on any events, such as the bpftrace programs listed below. It makes use of the BPF sandboxed virtual machine environment. Also note that eBPF is often just referred to as BPF.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">kprobes</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">A Linux kernel technology for providing dynamic tracing of kernel functions.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">probe</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">An instrumentation point in software or hardware, that generates events that can execute bpftrace programs.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">static tracing</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Hard-coded instrumentation points in code. Since these are fixed, they may be provided as part of a stable API, and documented.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">tracepoints</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">A Linux kernel technology for providing static tracing.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uprobes</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">A Linux kernel technology for providing dynamic tracing of user-level functions.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">USDT</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User Statically-Defined Tracing: static tracing points for user-level software. Some applications support USDT.</p></td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="sect1">
<h2 id="_program_files">Program Files</h2>
<div className="sectionbody">
<div className="paragraph">
<p>Programs saved as files are often called scripts and can be executed by specifying their file name.
It is convention to use the <code>.bt</code> file extension but it is not required.</p>
</div>
<div className="paragraph">
<p>For example, listing the sleepers.bt file using <code>cat</code>:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# cat sleepers.bt

tracepoint:syscalls:sys_enter_nanosleep {
  printf("%s is sleeping.\\n", comm);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>And then calling it:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace sleepers.bt

Attached 1 probe
iscsid is sleeping.
iscsid is sleeping.`}</pre>
</div>
</div>
<div className="paragraph">
<p>It can also be made executable to run stand-alone.
Start by adding an interpreter line at the top (<code>#!</code>) with either the path to your installed bpftrace (/usr/local/bin is the default) or the path to <code>env</code> (usually just <code>/usr/bin/env</code>) followed by <code>bpftrace</code> (so it will find bpftrace in your <code>$PATH</code>):</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`#!/usr/local/bin/bpftrace

tracepoint:syscalls:sys_enter_nanosleep {
  printf("%s is sleeping.\\n", comm);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Then make it executable:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# chmod 755 sleepers.bt
# ./sleepers.bt

Attached 1 probe
iscsid is sleeping.
iscsid is sleeping.`}</pre>
</div>
</div>
</div>
</div>
</div>
          </div>
        <div className="col col--2">
            <div className="docs-toc">
              <ul className="table-of-contents table-of-contents__left-border">
<li><a href="#_synopsis">Synopsis</a></li>
<li><a href="#_description">Description</a></li>
<li><a href="#_examples">Examples</a></li>
<li><a href="#_options">Options</a></li>
<li><a href="#_the_language">The Language</a></li>
<li><a href="#_probes">Probes</a></li>
<li><a href="#_standard_library">Standard library</a></li>
<li><a href="#_configuration">Configuration</a></li>
<li><a href="#_options_expanded">Options Expanded</a></li>
<li><a href="#_terminology">Terminology</a></li>
<li><a href="#_program_files">Program Files</a></li>
</ul>
</div>
            </div>
          </div>
      </div>
    </Layout>
  );
}
