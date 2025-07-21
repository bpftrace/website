import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from '../index.module.css';

export default function Home() {
  return (
    <Layout title="docs">
	    <div className="container container--fluid margin-vert--lg">
        <div className="row docs-row">
          <div className="col docs-left-col col--8">
          <h1>Documentation (Version: 0.22)</h1>
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
</div>
</div>
<div className="sect1">
<h2 id="_description">Description</h2>
<div className="sectionbody">
<div className="paragraph">
<p>bpftrace is a high-level tracing language and runtime for Linux based on eBPF.
It supports static and dynamic tracing for both the kernel and user-space.</p>
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
<h2 id="_supported_architectures">Supported architectures</h2>
<div className="sectionbody">
<div className="paragraph">
<p>x86_64, arm64, s390x, arm32, loongarch64, mips64, ppc64, riscv64</p>
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
<p>Errors from bpf-helpers(7) are silently ignored by default which can lead to strange results.</p>
</div>
<div className="paragraph">
<p>This flag enables the detection of errors (except for errors from 'probe_read_*' BPF helpers).
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
<h3 id="_kk"><strong>-kk</strong></h3>
<div className="paragraph">
<p>Same as '-k' but also includes the errors from 'probe_read_*'  BPF helpers.</p>
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
<dt className="hdlist1">Disable detected features, valid values are</dt>
<dd>
<p><strong>uprobe_multi</strong> to disable uprobe_multi link<br />
<strong>kprobe_multi</strong> to disable kprobe_multi link</p>
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
<p>Attach to the process with <em>PID</em>.
If the process terminates, bpftrace will also terminate.
When using USDT probes, uprobes, and uretprobes they will be attached to only this process.
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
We use a <code>.bt</code> file extension, short for bpftrace, but the extension is not required.</p>
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

Attaching 1 probe...
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

Attaching 1 probe...
iscsid is sleeping.
iscsid is sleeping.`}</pre>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_bpftrace_language">bpftrace Language</h2>
<div className="sectionbody">
<div className="paragraph">
<p>The <code>bpftrace</code> (<code>bt</code>) language is inspired by the D language used by <code>dtrace</code> and uses the same program structure.
Each script consists of a preamble and one or more action blocks.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`preamble

actionblock1
actionblock2`}</pre>
</div>
</div>
<div className="paragraph">
<p>Preprocessor and type definitions take place in the preamble:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`#include <linux/socket.h>
#define RED "\\033[31m"

struct S {
  int x;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Each action block consists of three parts:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`probe[,probe]
/predicate/ {
  action
}`}</pre>
</div>
</div>
<div className="dlist">
<dl>
<dt className="hdlist1">Probes</dt>
<dd>
<p>A probe specifies the event and event type to attach too. <a href="#_probes">Probes list</a>.</p>
</dd>
<dt className="hdlist1">Predicate</dt>
<dd>
<p>The predicate is an optional condition that must be met for the action to be executed.</p>
</dd>
<dt className="hdlist1">Action</dt>
<dd>
<p>  Actions are the programs that run when an event fires (and the predicate is met).
An action is a semicolon (<code>;</code>) separated list of statements and always enclosed by brackets <code>&#123;&#125;</code>.</p>
</dd>
</dl>
</div>
<div className="paragraph">
<p>A program will continue running until Ctrl-C is hit, or an <code>exit</code> function is called.
When a program exits, all populated maps are printed (this behavior and maps are explained in later sections).</p>
</div>
<div className="paragraph">
<p>A basic script that traces the <code>open(2)</code> and <code>openat(2)</code> system calls can be written as follows:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
	printf("Tracing open syscalls... Hit Ctrl-C to end.\\n");
}

tracepoint:syscalls:sys_enter_open,
tracepoint:syscalls:sys_enter_openat {
	printf("%-6d %-16s %s\\n", pid, comm, str(args.filename));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>The above script has two action blocks and a total of 3 probes.</p>
</div>
<div className="paragraph">
<p>The first action block uses the special <code>BEGIN</code> probe, which fires once during <code>bpftrace</code> startup.
This probe is used to print a header, indicating that the tracing has started.</p>
</div>
<div className="paragraph">
<p>The second action block uses two probes, one for <code>open</code> and one for <code>openat</code>, and defines an action that prints the file being <code>open</code> ed as well as the <code>pid</code> and <code>comm</code> of the process that execute the syscall.
See the <a href="#_probes">Probes</a> section for details on the available probe types.</p>
</div>
<div className="sect2">
<h3 id="_arrays">Arrays</h3>
<div className="paragraph">
<p>bpftrace supports accessing one-dimensional arrays like those found in <code>C</code>.</p>
</div>
<div className="paragraph">
<p>Constructing arrays from scratch, like <code>int a[] = &#123;1,2,3&#125;</code> in <code>C</code>, is not supported.
They can only be read into a variable from a pointer.</p>
</div>
<div className="paragraph">
<p>The <code>[]</code> operator is used to access elements.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`struct MyStruct {
  int y[4];
}

kprobe:dummy {
  $s = (struct MyStruct *) arg0;
  print($s->y[0]);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_comments">Comments</h3>
<div className="paragraph">
<p>Both single line and multi line comments are supported.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`// A single line comment
interval:s:1 { // can also be used to comment inline
/*
 a multi line comment

*/
  print(/* inline comment block */ 1);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_conditionals">Conditionals</h3>
<div className="paragraph">
<p>Conditional expressions are supported in the form of if/else statements and the ternary operator.</p>
</div>
<div className="paragraph">
<p>The ternary operator consists of three operands: a condition followed by a <code>?</code>, the expression to execute when the condition is true followed by a <code>:</code> and the expression to execute if the condition is false.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`condition ? ifTrue : ifFalse`}</pre>
</div>
</div>
<div className="paragraph">
<p>Both the <code>ifTrue</code> and <code>ifFalse</code> expressions must be of the same type, mixing types is not allowed.</p>
</div>
<div className="paragraph">
<p>The ternary operator can be used as part of an assignment.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$a == 1 ? print("true") : print("false");
$b = $a > 0 ? $a : -1;`}</pre>
</div>
</div>
<div className="paragraph">
<p>If/else statements, like the one in <code>C</code>, are supported.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`if (condition) {
  ifblock
} else if (condition) {
  if2block
} else {
  elseblock
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_config_block">Config Block</h3>
<div className="paragraph">
<p>To improve script portability, you can set bpftrace <a href="#_config_variables">Config Variables</a> via the config block,
which can only be placed at the top of the script before any probes (even <code>BEGIN</code>).</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`config = {
    stack_mode=perf;
    max_map_keys=2
}

BEGIN { ... }

uprobe:./testprogs/uprobe_test:uprobeFunction1 { ... }`}</pre>
</div>
</div>
<div className="paragraph">
<p>The names of the config variables can be in the format of environment variables
or their lowercase equivalent without the <code>BPFTRACE_</code> prefix. For example,
<code>BPFTRACE_STACK_MODE</code>, <code>STACK_MODE</code>, and <code>stack_mode</code> are equivalent.</p>
</div>
<div className="paragraph">
<p><strong>Note</strong>: Environment variables for the same config take precedence over those set
inside a script config block.</p>
</div>
<div className="paragraph">
<p><a href="#_config_variables">List of All Config Variables</a></p>
</div>
</div>
<div className="sect2">
<h3 id="_data_types">Data Types</h3>
<div className="paragraph">
<p>The following fundamental types are provided by the language.
Note: Integers are by default represented as 64 bit signed but that can be
changed by either casting them or, for scratch variables, explicitly specifying
the type upon declaration.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Type</strong></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Description</strong></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint8</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Unsigned 8 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">int8</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Signed 8 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint16</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Unsigned 16 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">int16</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Signed 16 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Unsigned 32 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">int32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Signed 32 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Unsigned 64 bit integer</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">int64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Signed 64 bit integer</p></td>
</tr>
</tbody>
</table>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN { $x = 1<<16; printf("%d %d\\n", (uint16)$x, $x); }

/*
 * Output:
 * 0 65536
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_filtering">Filtering</h3>
<div className="paragraph">
<p>Filters (also known as predicates) can be added after probe names.
The probe still fires, but it will skip the action unless the filter is true.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:vfs_read /arg2 < 16/ {
  printf("small read: %d byte buffer\\n", arg2);
}

kprobe:vfs_read /comm == "bash"/ {
  printf("read by %s\\n", comm);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_floating_point">Floating-point</h3>
<div className="paragraph">
<p>Floating-point numbers are not supported by BPF and therefore not by bpftrace.</p>
</div>
</div>
<div className="sect2">
<h3 id="_identifiers">Identifiers</h3>
<div className="paragraph">
<p>Identifiers must match the following regular expression: <code>[_a-zA-Z][_a-zA-Z0-9]*</code></p>
</div>
</div>
<div className="sect2">
<h3 id="_literals">Literals</h3>
<div className="paragraph">
<p>Integer and string literals are supported.</p>
</div>
<div className="paragraph">
<p>Integer literals can be defined in the following formats:</p>
</div>
<div className="ulist">
<ul>
<li>
<p>decimal (base 10)</p>
</li>
<li>
<p>octal (base 8)</p>
</li>
<li>
<p>hexadecimal (base 16)</p>
</li>
<li>
<p>scientific (base 10)</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Octal literals have to be prefixed with a <code>0</code> e.g. <code>0123</code>.
Hexadecimal literals start with either <code>0x</code> or <code>0X</code> e.g. <code>0x10</code>.
Scientific literals are written in the <code>&lt;m&gt;e&lt;n&gt;</code> format which is a shorthand for <code>m*10^n</code> e.g. <code>$i = 2e3;</code>.
Note that scientific literals are integer only due to the lack of floating point support e.g. <code>1e-3</code> is not valid.</p>
</div>
<div className="paragraph">
<p>To improve the readability of big literals an underscore <code>_</code> can be used as field separator e.g. 1_000_123_000.</p>
</div>
<div className="paragraph">
<p>Integer suffixes as found in the C language are parsed by bpftrace to ensure compatibility with C headers/definitions but they&#8217;re not used as size specifiers.
<code>123UL</code>, <code>123U</code> and <code>123LL</code> all result in the same integer type with a value of <code>123</code>.</p>
</div>
<div className="paragraph">
<p>Character literals are not supported at this time, and the corresponding ASCII code must be used instead:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  printf("Echo A: %c\\n", 65);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>String literals can be defined by enclosing the character string in double quotes e.g. <code>$str = "Hello world";</code>.</p>
</div>
<div className="paragraph">
<p>Strings support the following escape sequences:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">\n</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Newline</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">\t</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Tab</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">\0nn</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Octal value nn</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">\xnn</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Hexadecimal value nn</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect2">
<h3 id="_loops">Loops</h3>
<div className="sect3">
<h4 id="_for">For</h4>
<div className="paragraph">
<p>With Linux 5.13 and later, <code>for</code> loops can be used to iterate over elements in a map.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`for ($kv : @map) {
  block;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>The variable declared in the <code>for</code> loop will be initialised on each iteration with a tuple containing a key and a value from the map, i.e. <code>$kv = (key, value)</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@map[10] = 20;
for ($kv : @map) {
  print($kv.0); // key
  print($kv.1); // value
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>When a map has multiple keys, the loop variable will be initialised with nested tuple of the form: <code>((key1, key2, &#8230;&#8203;), value)</code></p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@map[10,11] = 20;
for ($kv : @map) {
  print($kv.0.0); // key 1
  print($kv.0.1); // key 2
  print($kv.1);   // value
}`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h4 id="_while">While</h4>
<div className="paragraph">
<p>Since kernel 5.3 BPF supports loops as long as the verifier can prove they&#8217;re bounded and fit within the instruction limit.</p>
</div>
<div className="paragraph">
<p>In bpftrace, loops are available through the <code>while</code> statement.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`while (condition) {
  block;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Within a while-loop the following control flow statements can be used:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">continue</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">skip processing of the rest of the block and jump back to the evaluation of the conditional</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">break</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Terminate the loop</p></td>
</tr>
</tbody>
</table>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $i = 0;
  while ($i <= 100) {
    printf("%d ", $i);
    if ($i > 5) {
      break;
    }
    $i++
  }
  printf("\\n");
}`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h4 id="_unroll">Unroll</h4>
<div className="paragraph">
<p>Loop unrolling is also supported with the <code>unroll</code> statement.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`unroll(n) {
  block;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>The compiler will evaluate the block <code>n</code> times and generate the BPF code for the block <code>n</code> times.
As this happens at compile time <code>n</code> must be a constant greater than 0 (<code>n &gt; 0</code>).</p>
</div>
<div className="paragraph">
<p>The following two probes compile into the same code:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  unroll(3) {
    print("Unrolled")
  }
}

interval:s:1 {
  print("Unrolled")
  print("Unrolled")
  print("Unrolled")
}`}</pre>
</div>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_operators_and_expressions">Operators and Expressions</h3>
<div className="sect3">
<h4 id="_arithmetic_operators">Arithmetic Operators</h4>
<div className="paragraph">
<p>The following operators are available for integer arithmetic:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">+</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">integer addition</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">-</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">integer subtraction</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">*</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">integer multiplication</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">/</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">integer division</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">%</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">integer modulo</p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p>Operations between a signed and an unsigned integer are allowed providing
bpftrace can statically prove a safe conversion is possible. If safe conversion
is not guaranteed, the operation is undefined behavior and a corresponding
warning will be emitted.</p>
</div>
<div className="paragraph">
<p>If the two operands are different size, the smaller integer is implicitly
promoted to the size of the larger one. Sign is preserved in the promotion.
For example, <code>(uint32)5 + (uint8)3</code> is converted to <code>(uint32)5 + (uint32)3</code>
which results in <code>(uint32)8</code>.</p>
</div>
</div>
<div className="sect3">
<h4 id="_logical_operators">Logical Operators</h4>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&amp;&amp;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Logical AND</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">||</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Logical OR</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">!</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Logical NOT</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect3">
<h4 id="_bitwise_operators">Bitwise Operators</h4>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&amp;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">AND</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">|</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">OR</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">^</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">XOR</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&lt;&lt;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Left shift the left-hand operand by the number of bits specified by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&gt;&gt;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Right shift the left-hand operand by the number of bits specified by the right-hand expression value</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect3">
<h4 id="_relational_operators">Relational Operators</h4>
<div className="paragraph">
<p>The following relational operators are defined for integers and pointers.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&lt;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression is less than right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&lt;=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression is less than or equal to right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&gt;</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression is bigger than right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&gt;=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression is bigger or equal to than right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">==</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression equal to right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">!=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand expression not equal to right-hand</p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p>The following relation operators are available for comparing strings and integer arrays.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">==</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand string equal to right-hand</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">!=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">left-hand string not equal to right-hand</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect3">
<h4 id="_assignment_operators">Assignment Operators</h4>
<div className="paragraph">
<p>The following assignment operators can be used on both <code>map</code> and <code>scratch</code> variables:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Assignment, assign the right-hand expression to the left-hand variable</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&lt;&lt;=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Update the variable with its value left shifted by the number of bits specified by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&gt;&gt;=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Update the variable with its value right shifted by the number of bits specified by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">+=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Increment the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">-=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Decrement the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">*=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Multiple the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">/=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Divide the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">%=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Modulo the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">&amp;=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Bitwise AND the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">|=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Bitwise OR the variable by the right-hand expression value</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">^=</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Bitwise XOR the variable by the right-hand expression value</p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p>All these operators are syntactic sugar for combining assignment with the specified operator.
<code>@ -= 5</code> is equal to <code>@ = @ - 5</code>.</p>
</div>
</div>
<div className="sect3">
<h4 id="_increment_and_decrement_operators">Increment and Decrement Operators</h4>
<div className="paragraph">
<p>The increment (<code>&#43;&#43;</code>) and decrement (<code>--</code>) operators can be used on integer and pointer variables to increment their value by one.
They can only be used on variables and can either be applied as prefix or suffix.
The difference is that the expression <code>x&#43;&#43;</code> returns the original value of <code>x</code>, before it got incremented while <code>&#43;&#43;x</code> returns the value of <code>x</code> post increment.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$x = 10;
$y = $x--; // y = 10; x = 9
$a = 10;
$b = --$a; // a = 9; b = 9`}</pre>
</div>
</div>
<div className="paragraph">
<p>Note that maps will be implicitly declared and initialized to 0 if not already declared or defined.
Scratch variables must be initialized before using these operators.</p>
</div>
<div className="paragraph">
<p>Note <code>&#43;&#43;</code>/<code>--</code> on a shared global variable can lose updates. See <a href="#map-functions-count"><code>count()</code></a> for more details.</p>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_pointers">Pointers</h3>
<div className="paragraph">
<p>Pointers in bpftrace are similar to those found in <code>C</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="_structs">Structs</h3>
<div className="paragraph">
<p><code>C</code> like structs are supported by bpftrace.
Fields are accessed with the <code>.</code> operator.
Fields of a pointer to a struct can be accessed with the <code>-&gt;</code> operator.</p>
</div>
<div className="paragraph">
<p>Custom structs can be defined in the preamble.</p>
</div>
<div className="paragraph">
<p>Constructing structs from scratch, like <code>struct X var = &#123;.f1 = 1&#125;</code> in <code>C</code>, is not supported.
They can only be read into a variable from a pointer.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`struct MyStruct {
  int a;
}

kprobe:dummy {
  $ptr = (struct MyStruct *) arg0;
  $st = *$ptr;
  print($st.a);
  print($ptr->a);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_tuples">Tuples</h3>
<div className="paragraph">
<p>bpftrace has support for immutable N-tuples (<code>n &gt; 1</code>).
A tuple is a sequence type (like an array) where, unlike an array, every element can have a different type.</p>
</div>
<div className="paragraph">
<p>Tuples are a comma separated list of expressions, enclosed in brackets, <code>(1,2)</code>
Individual fields can be accessed with the <code>.</code> operator.
Tuples are zero indexed like arrays are.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $a = (1,2);
  $b = (3,4, $a);
  print($a);
  print($b);
  print($b.0);
}

/*
 * Sample output:
 * (1, 2)
 * (3, 4, (1, 2))
 * 3
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_type_conversion">Type conversion</h3>
<div className="paragraph">
<p>Integer and pointer types can be converted using explicit type conversion with an expression like:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$y = (uint32) $z;
$py = (int16 *) $pz;`}</pre>
</div>
</div>
<div className="paragraph">
<p>Integer casts to a higher rank are sign extended.
Conversion to a lower rank is done by zeroing leading bits.</p>
</div>
<div className="paragraph">
<p>It is also possible to cast between integers and integer arrays using the same syntax:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$a = (uint8[8]) 12345;
$x = (uint64) $a;`}</pre>
</div>
</div>
<div className="paragraph">
<p>Both the cast and the destination type must have the same size.
When casting to an array, it is possible to omit the size which will be determined automatically from the size of the cast value.</p>
</div>
<div className="paragraph">
<p>Integers are internally represented as 64 bit signed. If you need another representation, you may cast to the supported <a href="#_data_types">Data Types</a>.</p>
</div>
<div className="sect3">
<h4 id="_array_casts">Array casts</h4>
<div className="paragraph">
<p>It is possible to cast between integer arrays and integers.
Both the source and the destination type must have the same size.
The main purpose of this is to allow casts from/to byte arrays.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  $a = (int8[8])12345;
  printf("%x %x\\n", $a[0], $a[1]);
  printf("%d\\n", (uint64)$a);
}

/*
 * Output:
 * 39 30
 * 12345
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>When casting to an array, it is possible to omit the size which will be determined automatically from the size of the cast value.</p>
</div>
<div className="paragraph">
<p>This feature is especially useful when working with IP addresses since various libraries, builtins, and parts of the kernel use different approaches to represent addresses (usually byte arrays vs. integers).
Array casting allows seamless comparison of such representations:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`fentry:tcp_connect {
    if (args->sk->__sk_common.skc_daddr == (uint32)pton("127.0.0.1"))
        ...
}`}</pre>
</div>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_variables_and_maps">Variables and Maps</h3>
<div className="paragraph">
<p>bpftrace knows two types of variables, 'scratch' and 'map'.</p>
</div>
<div className="paragraph">
<p>'scratch' variables are kept on the BPF stack and their names always start
with a <code>$</code>, e.g. <code>$myvar</code>.
'scratch' variables cannot be accessed outside of their lexical block e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$a = 1;
if ($a == 1) {
  $b = "hello"
  $a = 2;
}
// $b is not accessible here`}</pre>
</div>
</div>
<div className="paragraph">
<p>'scratch' variables can also declared before or during initialization with <code>let</code> e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`let $a = 1;
let $b;
if ($a == 1) {
  $b = "hello"
  $a = 2;
}
// $b IS accessible here and would be an empty string if the condition wasn't true`}</pre>
</div>
</div>
<div className="paragraph">
<p>If no assignment is specified variables will initialize to 0.</p>
</div>
<div className="paragraph">
<p>You can also specify the type in the declaration e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`let $x: uint8;
let $y: uint8 = 7;
let $a: string = "hiya";`}</pre>
</div>
</div>
<div className="paragraph">
<p>'map' variables use BPF 'maps'.
These exist for the lifetime of <code>bpftrace</code> itself and can be accessed from all action blocks and user-space.
Map names always start with a <code>@</code>, e.g. <code>@mymap</code>.</p>
</div>
<div className="paragraph">
<p>All valid identifiers can be used as <code>name</code>.</p>
</div>
<div className="paragraph">
<p>The data type of a variable is automatically determined during first assignment and cannot be changed afterwards.</p>
</div>
<div className="sect3">
<h4 id="_maps_without_explicit_keys">Maps without Explicit Keys</h4>
<div className="paragraph">
<p>Values can be assigned directly to maps without a key (sometimes refered to as scalar maps).
Note: you can&#8217;t iterate over these maps as they don&#8217;t have an accessible key.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@name = expression`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h4 id="_map_keys">Map Keys</h4>
<div className="paragraph">
<p>Setting single value map keys.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@name[key] = expression`}</pre>
</div>
</div>
<div className="paragraph">
<p>Map keys that are composed of multiple values are represented as tuples e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@name[(key1,key2)] = expression`}</pre>
</div>
</div>
<div className="paragraph">
<p>However, this, more concise, syntax is supported and the same as the explicit
tuple above:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@name[key1,key2] = expression`}</pre>
</div>
</div>
<div className="paragraph">
<p>Just like with any variable the type is determined on first use and cannot be modified afterwards.
This applies to both the key(s) and the value type.</p>
</div>
<div className="paragraph">
<p>The following snippets create a map with key signature <code>(int64, string[16])</code> and a value type of <code>int64</code>:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@[pid, comm]++
@[(pid, comm)]++`}</pre>
</div>
</div>
</div>
<div className="sect3">
<h4 id="_per_thread_variables">Per-Thread Variables</h4>
<div className="paragraph">
<p>These can be implemented as a map keyed on the thread ID. For example, <code>@start[tid]</code>:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:do_nanosleep {
  @start[tid] = nsecs;
}

kretprobe:do_nanosleep /has_key(@start, tid)/ {
  printf("slept for %d ms\\n", (nsecs - @start[tid]) / 1000000);
  delete(@start, tid);
}

/*
 * Sample output:
 * slept for 1000 ms
 * slept for 1009 ms
 * slept for 2002 ms
 * ...
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>This style of map may also be useful for capturing output parameters, or other context, between two different probes. For example:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:syscalls:sys_enter_wait4
{
  @out[tid] = args.ru;
}

tracepoint:syscalls:sys_exit_wait4
{
  $ru = @out[tid];
  delete(@out, tid);
  if ($ru != 0) {
    printf("got usage ...", ...);
  }
}`}</pre>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_builtins">Builtins</h2>
<div className="sectionbody">
<div className="paragraph">
<p>Builtins are special variables built into the language.
Unlike scratch and map variables they don&#8217;t need a <code>$</code> or <code>@</code> as prefix (except for the positional parameters).
The 'Kernel' column indicates the minimum kernel version required and the 'BPF Helper' column indicates the raw BPF helper function used for this builtin.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
<col />
<col />
</colgroup>
<thead>
<tr>
<th className="tableblock halign-left valign-top">Variable</th>
<th className="tableblock halign-left valign-top">Type</th>
<th className="tableblock halign-left valign-top">Kernel</th>
<th className="tableblock halign-left valign-top">BPF Helper</th>
<th className="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#builtins-positional-parameters"><code>$1</code>, <code>$2</code>, <code>&#8230;&#8203;$n</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">int64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The nth positional parameter passed to the bpftrace program.
If less than n parameters are passed this evaluates to <code>0</code>.
For string arguments use the <code>str()</code> call to retrieve the value.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>$#</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">int64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Total amount of positional parameters passed.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>arg0</code>, <code>arg1</code>, <code>&#8230;&#8203;argn</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">int64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">nth argument passed to the function being traced. These are extracted from the CPU registers. The amount of args passed in registers depends on the CPU architecture. (kprobes, uprobes, usdt).</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>args</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">struct args</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The struct of all arguments of the traced function. Available in <code>tracepoint</code>, <code>fentry</code>, <code>fexit</code>, and <code>uprobe</code> (with DWARF) probes. Use <code>args.x</code> to access argument <code>x</code> or <code>args</code> to get a record with all arguments.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">cgroup</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.18</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_cgroup_id</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">ID of the cgroup the current process belongs to. Only works with cgroupv2.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">comm</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">string[16]</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.2</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_comm</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Name of the current thread</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">cpid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Child process ID, if bpftrace is invoked with <code>-c</code></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">cpu</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.1</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">raw_smp_processor_id</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">ID of the processor executing the BPF program</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">curtask</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.8</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_task</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Pointer to <code>struct task_struct</code> of the current task</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">elapsed</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">(see nsec)</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">ktime_get_ns / ktime_get_boot_ns</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Nanoseconds elapsed since bpftrace initialization, based on <code>nsecs</code></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">func</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">string</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Name of the current function being traced (kprobes,uprobes)</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">gid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.2</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_uid_gid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Group ID of the current thread, as seen from the init namespace</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">jiffies</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">5.9</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_jiffies_64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Jiffies of the kernel. In 32-bit system, using this builtin might be slower.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">numaid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">5.8</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">numa_node_id</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">ID of the NUMA node executing the BPF program</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">pid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.2</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_pid_tgid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Process ID of the current thread (aka thread group ID), as seen from the init namespace</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">probe</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">string</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/na</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Name of the current probe</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">rand</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.1</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_prandom_u32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Random number</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">return</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The return keyword is used to exit the current probe. This differs from exit() in that it doesn&#8217;t exit bpftrace.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">retval</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">int64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">n/a</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Value returned by the function being traced (kretprobe, uretprobe, fexit)</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">tid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint32</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.2</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_pid_tgid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Thread ID of the current thread, as seen from the init namespace</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">uid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">uint64</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">4.2</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">get_current_uid_gid</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User ID of the current thread, as seen from the init namespace</p></td>
</tr>
</tbody>
</table>
<div className="sect2">
<h3 id="builtins-positional-parameters">Positional Parameters</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>$1</code>, <code>$2</code>, &#8230;&#8203;, <code>$N</code>, <code>$#</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are the positional parameters to the bpftrace program, also referred to as command line arguments.
If the parameter is numeric (entirely digits), it can be used as a number.
If it is non-numeric, it must be used as a string in the <code>str()</code> call.
If a parameter is used that was not provided, it will default to zero for numeric context, and "" for string context.
Positional parameters may also be used in probe argument and will be treated as a string parameter.</p>
</div>
<div className="paragraph">
<p>If a positional parameter is used in <code>str()</code>, it is interpreted as a pointer to the actual given string literal, which allows to do pointer arithmetic on it.
Only addition of a single constant, less or equal to the length of the supplied string, is allowed.</p>
</div>
<div className="paragraph">
<p><code>$#</code> returns the number of positional arguments supplied.</p>
</div>
<div className="paragraph">
<p>This allows scripts to be written that use basic arguments to change their behavior.
If you develop a script that requires more complex argument processing, it may be better suited for bcc instead, which
supports Python&#8217;s argparse and completely custom argument processing.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'BEGIN { printf("I got %d, %s (%d args)\\n", $1, str($2), $#); }' 42 "hello"

I got 42, hello (2 args)

# bpftrace -e 'BEGIN { printf("%s\\n", str($1 + 1)) }' "hello"

ello`}</pre>
</div>
</div>
<div className="paragraph">
<p>Script example, bsize.d:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`#!/usr/local/bin/bpftrace

BEGIN
{
	printf("Tracing block I/O sizes > %d bytes\\n", $1);
}

tracepoint:block:block_rq_issue
/args.bytes > $1/
{
	@ = hist(args.bytes);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>When run with a 65536 argument:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# ./bsize.bt 65536

Tracing block I/O sizes > 65536 bytes
^C

@:
[512K, 1M)             1 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|`}</pre>
</div>
</div>
<div className="paragraph">
<p>It has passed the argument in as <code>$1</code> and used it as a filter.</p>
</div>
<div className="paragraph">
<p>With no arguments, <code>$1</code> defaults to zero:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# ./bsize.bt
Attaching 2 probes...
Tracing block I/O sizes > 0 bytes
^C

@:
[4K, 8K)             115 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
[8K, 16K)             35 |@@@@@@@@@@@@@@@                                     |
[16K, 32K)             5 |@@                                                  |
[32K, 64K)             3 |@                                                   |
[64K, 128K)            1 |                                                    |
[128K, 256K)           0 |                                                    |
[256K, 512K)           0 |                                                    |
[512K, 1M)             1 |                                                    |`}</pre>
</div>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_functions">Functions</h2>
<div className="sectionbody">
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
</colgroup>
<thead>
<tr>
<th className="tableblock halign-left valign-top">Function Name</th>
<th className="tableblock halign-left valign-top">Description</th>
<th className="tableblock halign-left valign-top">Sync/Async/Compile Time</th>
</tr>
</thead>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-bswap"><code>bswap(uint[8|\16|32|64] n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Reverse byte order</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-buf"><code>buf(void *d [, int length])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Returns a hex-formatted string of the data pointed to by d</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-cat"><code>cat(char *filename)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Print file content</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-cgroupid"><code>cgroupid(char *path)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve cgroup ID</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile Time</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-cgroup_path"><code>cgroup_path(int cgroupid, string filter)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Convert cgroup id to cgroup path</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-exit"><code>exit([int code])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Quit bpftrace with an optional exit code</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-join"><code>join(char *arr[] [, char *delim])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Print the array</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-kaddr"><code>kaddr(char *name)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve kernel symbol name</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile Time</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-kptr"><code>kptr(void *p)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Annotate as kernelspace pointer</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-kstack"><code>kstack([StackMode mode, ][int level])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel stack trace</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-ksym"><code>ksym(void *p)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve kernel address</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-macaddr"><code>macaddr(char[6] addr)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Convert MAC address data</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-nsecs"><code>nsecs([TimestampMode mode])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Timestamps and Time Deltas</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-ntop"><code>ntop([int af, ]int|char[4|16] addr)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Convert IP address data to text</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-offsetof"><code>offsetof(struct, element)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Offset of element in structure</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile Time</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-override"><code>override(u64 rc)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Override return value</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-path"><code>path(struct path *path [, int32 size])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Return full path</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-percpu-kaddr"><code>percpu_kaddr(const string name [, int cpu])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve percpu kernel symbol name</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-print"><code>print(&#8230;&#8203;)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Print a non-map value with default formatting</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-printf"><code>printf(char *fmt, &#8230;&#8203;)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Print formatted</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-pton"><code>pton(const string *addr)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Convert text IP address to byte array</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile Time</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-reg"><code>reg(char *name)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Returns the value stored in the named register</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-signal"><code>signal(char[] signal | u32 signal)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Send a signal to the current process</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-sizeof"><code>sizeof(&#8230;&#8203;)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Return size of a type or expression</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-skboutput"><code>skboutput(const string p, struct sk_buff *s, &#8230;&#8203;)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Write skb 's data section into a PCAP file</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-str"><code>str(char *s [, int length])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Returns the string pointed to by s</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-strcontains"><code>strcontains(const char *haystack, const char *needle)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compares whether the string haystack contains the string needle.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-strerror"><code>strerror(uint64 error)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Get error message for errno code</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-strftime"><code>strftime(char *format, int nsecs)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Return a formatted timestamp</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-strncmp"><code>strncmp(char *s1, char *s2, int length)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compare first n characters of two strings</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-system"><code>system(char *fmt)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Execute shell command</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-time"><code>time(char *fmt)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Print formatted time</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-uaddr"><code>uaddr(char *name)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve user-level symbol name</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile Time</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-uptr"><code>uptr(void *p)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Annotate as userspace pointer</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-ustack"><code>ustack([StackMode mode, ][int level])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User stack trace</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#functions-usym"><code>usym(void *p)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Resolve user space address</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p>Functions that are marked <strong>async</strong> are asynchronous which can lead to unexpected behaviour, see the <a href="#_invocation_mode">Invocation Mode</a> section for more information.</p>
</div>
<div className="paragraph">
<p><strong>compile time</strong> functions are evaluated at compile time, a static value will be compiled into the program.</p>
</div>
<div className="paragraph">
<p><strong>unsafe</strong> functions can have dangerous side effects and should be used with care, the <code>--unsafe</code> flag is required for use.</p>
</div>
<div className="sect2">
<h3 id="functions-bswap">bswap</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>uint8 bswap(uint8 n)</code></p>
</li>
<li>
<p><code>uint16 bswap(uint16 n)</code></p>
</li>
<li>
<p><code>uint32 bswap(uint32 n)</code></p>
</li>
<li>
<p><code>uint64 bswap(uint64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>bswap</code> reverses the order of the bytes in integer <code>n</code>. In case of 8 bit integers, <code>n</code> is returned without being modified.
The return type is an unsigned integer of the same width as <code>n</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-buf">buf</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>buffer buf(void * data, [int64 length])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>buf</code> reads <code>length</code> amount of bytes from address <code>data</code>.
The maximum value of <code>length</code> is limited to the <code>BPFTRACE_MAX_STRLEN</code> variable.
For arrays the <code>length</code> is optional, it is automatically inferred from the signature.</p>
</div>
<div className="paragraph">
<p><code>buf</code> is address space aware and will call the correct helper based on the address space associated with <code>data</code>.</p>
</div>
<div className="paragraph">
<p>The <code>buffer</code> object returned by <code>buf</code> can safely be printed as a hex encoded string with the <code>%r</code> format specifier.</p>
</div>
<div className="paragraph">
<p>Bytes with values &gt;=32 and &lt;=126 are printed using their ASCII character, other bytes are printed in hex form (e.g. <code>\x00</code>). The <code>%rx</code> format specifier can be used to print everything in hex form, including ASCII characters. The similar <code>%rh</code> format specifier prints everything in hex form without <code>\x</code> and with spaces between bytes (e.g. <code>0a fe</code>).</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  printf("%r\\n", buf(kaddr("avenrun"), 8));
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`\x00\x03\x00\x00\x00\x00\x00\x00
\xc2\x02\x00\x00\x00\x00\x00\x00`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-cat">cat</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void cat(string namefmt, [&#8230;&#8203;args])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Dump the contents of the named file to stdout.
<code>cat</code> supports the same format string and arguments that <code>printf</code> does.
If the file cannot be opened or read an error is printed to stderr.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:syscalls:sys_enter_execve {
  cat("/proc/%d/maps", pid);
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`55f683ebd000-55f683ec1000 r--p 00000000 08:01 1843399                    /usr/bin/ls
55f683ec1000-55f683ed6000 r-xp 00004000 08:01 1843399                    /usr/bin/ls
55f683ed6000-55f683edf000 r--p 00019000 08:01 1843399                    /usr/bin/ls
55f683edf000-55f683ee2000 rw-p 00021000 08:01 1843399                    /usr/bin/ls
55f683ee2000-55f683ee3000 rw-p 00000000 00:00 0`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-cgroupid">cgroupid</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>uint64 cgroupid(const string path)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>compile time</strong></p>
</div>
<div className="paragraph">
<p><code>cgroupid</code> retrieves the cgroupv2 ID  of the cgroup available at <code>path</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  print(cgroupid("/sys/fs/cgroup/system.slice"));
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-cgroup_path">cgroup_path</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>cgroup_path_t cgroup_path(int cgroupid, string filter)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Convert cgroup id to cgroup path.
This is done asynchronously in userspace when the cgroup_path value is printed,
therefore it can resolve to a different value if the cgroup id gets reassigned.
This also means that the returned value can only be used for printing.</p>
</div>
<div className="paragraph">
<p>A string literal may be passed as an optional second argument to filter cgroup
hierarchies in which the cgroup id is looked up by a wildcard expression (cgroup2
is always represented by "unified", regardless of where it is mounted).</p>
</div>
<div className="paragraph">
<p>The currently mounted hierarchy at /sys/fs/cgroup is used to do the lookup. If
the cgroup with the given id isn&#8217;t present here (e.g. when running in a Docker
container), the cgroup path won&#8217;t be found (unlike when looking up the cgroup
path of a process via /proc/&#8230;&#8203;/cgroup).</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  $cgroup_path = cgroup_path(3436);
  print($cgroup_path);
  print($cgroup_path); /* This may print a different path */
  printf("%s %s", $cgroup_path, $cgroup_path); /* This may print two different paths */
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-exit">exit</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void exit([int code])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Terminate bpftrace, as if a <code>SIGTERM</code> was received.
The <code>END</code> probe will still trigger (if specified) and maps will be printed.
An optional exit code can be provided.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Or</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  exit(1);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-join">join</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void join(char *arr[], [char * sep = ' '])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p><code>join</code> joins all the string array <code>arr</code> with <code>sep</code> as separator into one string.
This string will be printed to stdout directly, it cannot be used as string value.</p>
</div>
<div className="paragraph">
<p>The concatenation of the array members is done in BPF and the printing happens in userspace.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:syscalls:sys_enter_execve {
  join(args.argv);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-kaddr">kaddr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>uint64 kaddr(const string name)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>compile time</strong></p>
</div>
<div className="paragraph">
<p>Get the address of the kernel symbol <code>name</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $avenrun = kaddr("avenrun");
  $load1 = *$avenrun;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>You can find all kernel symbols at <code>/proc/kallsyms</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-kptr">kptr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>T * kptr(T * ptr)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Marks <code>ptr</code> as a kernel address space pointer.
See the address-spaces section for more information on address-spaces.
The pointer type is left unchanged.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-kstack">kstack</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>kstack([StackMode mode, ][int limit])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are implemented using BPF stack maps.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:ip_output { @[kstack()] = count(); }

/*
 * Sample output:
 * @[
 *  ip_output+1
 *  tcp_transmit_skb+1308
 *  tcp_write_xmit+482
 *  tcp_release_cb+225
 *  release_sock+64
 *  tcp_sendmsg+49
 *  sock_sendmsg+48
 *  sock_write_iter+135
 *   __vfs_write+247
 *  vfs_write+179
 *  sys_write+82
 *   entry_SYSCALL_64_fastpath+30
 * ]: 1708
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>Sampling only three frames from the stack (limit = 3):</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:ip_output { @[kstack(3)] = count(); }

/*
 * Sample output:
 * @[
 *  ip_output+1
 *  tcp_transmit_skb+1308
 *  tcp_write_xmit+482
 * ]: 1708
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>You can also choose a different output format.
Available formats are <code>bpftrace</code>, <code>perf</code>, and <code>raw</code> (no symbolication):</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:ip_output { @[kstack(perf, 3)] = count(); }

/*
 * Sample output:
 * @[
 *  ffffffffb4019501 do_mmap+1
 *  ffffffffb401700a sys_mmap_pgoff+266
 *  ffffffffb3e334eb sys_mmap+27
 * ]: 1708
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-ksym">ksym</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>ksym_t ksym(uint64 addr)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Retrieve the name of the function that contains address <code>addr</code>.
The address to name mapping happens in user-space.</p>
</div>
<div className="paragraph">
<p>The <code>ksym_t</code> type can be printed with the <code>%s</code> format specifier.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:do_nanosleep
{
  printf("%s\\n", ksym(reg("ip")));
}

/*
 * Sample output:
 * do_nanosleep
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-macaddr">macaddr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>macaddr_t macaddr(char [6] mac)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Create a buffer that holds a macaddress as read from <code>mac</code>
This buffer can be printed in the canonical string format using the <code>%s</code> format specifier.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:arp_create {
  $stack_arg0 = *(uint8*)(reg("sp") + 8);
  $stack_arg1 = *(uint8*)(reg("sp") + 16);
  printf("SRC %s, DST %s\\n", macaddr($stack_arg0), macaddr($stack_arg1));
}

/*
 * Sample output:
 * SRC 18:C0:4D:08:2E:BB, DST 74:83:C2:7F:8C:FF
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-nsecs">nsecs</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>nsecs([TimestampMode mode])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Returns a timestamp in nanoseconds, as given by the requested kernel clock.
Defaults to <code>boot</code> if no clock is explicitly requested.</p>
</div>
<div className="ulist">
<ul>
<li>
<p><code>nsecs(monotonic)</code> - nanosecond timestamp since boot, exclusive of time the system spent suspended (CLOCK_MONOTONIC)</p>
</li>
<li>
<p><code>nsecs(boot)</code> - nanoseconds since boot, inclusive of time the system spent suspended (CLOCK_BOOTTIME)</p>
</li>
<li>
<p><code>nsecs(tai)</code> - TAI timestamp in nanoseconds (CLOCK_TAI)</p>
</li>
<li>
<p><code>nsecs(sw_tai)</code> - approximation of TAI timestamp in nanoseconds, is obtained through the "triple vdso sandwich" method. For older kernels without direct TAI timestamp access in BPF.</p>
</li>
</ul>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $sw_tai1 = nsecs(sw_tai);
  $tai = nsecs(tai);
  $sw_tai2 = nsecs(sw_tai);
  printf("sw_tai precision: %lldns\\n", ($sw_tai1 + $sw_tai2)/2 - $tai);
}

/*
 * Sample output:
 * sw_tai precision: -98ns
 * sw_tai precision: -99ns
 * ...
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-ntop">ntop</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>inet ntop([int64 af, ] int addr)</code></p>
</li>
<li>
<p><code>inet ntop([int64 af, ] char addr[4])</code></p>
</li>
<li>
<p><code>inet ntop([int64 af, ] char addr[16])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>ntop</code> returns the string representation of an IPv4 or IPv6 address.
<code>ntop</code> will infer the address type (IPv4 or IPv6) based on the <code>addr</code> type and size.
If an integer or <code>char[4]</code> is given, ntop assumes IPv4, if a <code>char[16]</code> is given, ntop assumes IPv6.
You can also pass the address type (e.g. AF_INET) explicitly as the first parameter.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-offsetof">offsetof</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>offsetof(STRUCT, FIELD)</code></p>
</li>
<li>
<p><code>offsetof(EXPRESSION, FIELD)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>compile time</strong></p>
</div>
<div className="paragraph">
<p>Returns offset of the field offset bytes in struct.
Similar to kernel <code>offsetof</code> operator.
Note that subfields are not yet supported.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-override">override</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>override(uint64 rc)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>unsafe</strong></p>
</div>
<div className="paragraph">
<p><strong>Kernel</strong> 4.16</p>
</div>
<div className="paragraph">
<p><strong>Helper</strong> <code>bpf_override</code></p>
</div>
<div className="ulist">
<div className="title">Supported probes</div>
<ul>
<li>
<p>kprobe</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>When using <code>override</code> the probed function will not be executed and instead <code>rc</code> will be returned.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:__x64_sys_getuid
/comm == "id"/ {
  override(2<<21);
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`uid=4194304 gid=0(root) euid=0(root) groups=0(root)`}</pre>
</div>
</div>
<div className="paragraph">
<p>This feature only works on kernels compiled with <code>CONFIG_BPF_KPROBE_OVERRIDE</code> and only works on functions tagged <code>ALLOW_ERROR_INJECTION</code>.</p>
</div>
<div className="paragraph">
<p>bpftrace does not test whether error injection is allowed for the probed function, instead if will fail to load the program into the kernel:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`ioctl(PERF_EVENT_IOC_SET_BPF): Invalid argument
Error attaching probe: 'kprobe:vfs_read'`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-path">path</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>char * path(struct path * path [, int32 size])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>Kernel</strong> 5.10</p>
</div>
<div className="paragraph">
<p><strong>Helper</strong> <code>bpf_d_path</code></p>
</div>
<div className="paragraph">
<p>Return full path referenced by struct path pointer in argument. If <code>size</code> is set,
the path will be clamped by <code>size</code> otherwise <code>BPFTRACE_MAX_STRLEN</code> is used.</p>
</div>
<div className="paragraph">
<p>This function can only be used by functions that are allowed to, these functions are contained in the <code>btf_allowlist_d_path</code> set in the kernel.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-percpu-kaddr">percpu_kaddr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void *percpu_kaddr(const string name)</code></p>
</li>
<li>
<p><code>void *percpu_kaddr(const string name, int cpu)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>sync</strong></p>
</div>
<div className="paragraph">
<p>Get the address of the percpu kernel symbol <code>name</code> for CPU <code>cpu</code>. When <code>cpu</code> is
omitted, the current CPU is used.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $proc_cnt = percpu_kaddr("process_counts");
  printf("% processes are running on CPU %d\\n", *$proc_cnt, cpu);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>The second variant may return NULL if <code>cpu</code> is higher than the number of
available CPUs. Therefore, it is necessary to perform a NULL-check on the result
when accessing fields of the pointed structure, otherwise the BPF program will
be rejected.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  $runqueues = (struct rq *)percpu_kaddr("runqueues", 0);
  if ($runqueues != 0) {         // The check is mandatory here
    print($runqueues->nr_running);
  }
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-print">print</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void print(T val)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void print(T val)</code></p>
</li>
<li>
<p><code>void print(@map)</code></p>
</li>
<li>
<p><code>void print(@map, uint64 top)</code></p>
</li>
<li>
<p><code>void print(@map, uint64 top, uint64 div)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>print</code> prints a the value, which can be a map or a scalar value, with the default formatting for the type.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  print(123);
  print("abc");
  exit();
}

/*
 * Sample output:
 * 123
 * abc
 */`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:ms:10 { @=hist(rand); }
interval:s:1 {
  print(@);
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Prints:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@:
[16M, 32M)             3 |@@@                                                 |
[32M, 64M)             2 |@@                                                  |
[64M, 128M)            1 |@                                                   |
[128M, 256M)           4 |@@@@                                                |
[256M, 512M)           3 |@@@                                                 |
[512M, 1G)            14 |@@@@@@@@@@@@@@                                      |
[1G, 2G)              22 |@@@@@@@@@@@@@@@@@@@@@@                              |
[2G, 4G)              51 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|`}</pre>
</div>
</div>
<div className="paragraph">
<p>Declared maps and histograms are automatically printed out on program termination.</p>
</div>
<div className="paragraph">
<p>Note that maps are printed by reference while scalar values are copied.
This means that updating and printing maps in a fast loop will likely result in bogus map values as the map will be updated before userspace gets the time to dump and print it.</p>
</div>
<div className="paragraph">
<p>The printing of maps supports the optional <code>top</code> and <code>div</code> arguments.
<code>top</code> limits the printing to the top N entries with the highest integer values</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  $i = 11;
  while($i) {
    @[$i] = --$i;
  }
  print(@, 2);
  clear(@);
  exit()
}

/*
 * Sample output:
 * @[9]: 9
 * @[10]: 10
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>The <code>div</code> argument scales the values prior to printing them.
Scaling values before storing them can result in rounding errors.
Consider the following program:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:f {
  @[func] += arg0/10;
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>With the following sequence as numbers for arg0: <code>134, 377, 111, 99</code>.
The total is <code>721</code> which rounds to <code>72</code> when scaled by 10 but the program would print <code>70</code> due to the rounding of individual values.</p>
</div>
<div className="paragraph">
<p>Changing the print call to <code>print(@, 5, 2)</code> will take the top 5 values and scale them by 2:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@[6]: 3
@[7]: 3
@[8]: 4
@[9]: 4
@[10]: 5`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-printf">printf</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void printf(const string fmt, args&#8230;&#8203;)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p><code>printf()</code> formats and prints data.
It behaves similar to <code>printf()</code> found in <code>C</code> and many other languages.</p>
</div>
<div className="paragraph">
<p>The format string has to be a constant, it cannot be modified at runtime.
The formatting of the string happens in user space.
Values are copied and passed by value.</p>
</div>
<div className="paragraph">
<p>bpftrace supports all the typical format specifiers like <code>%llx</code> and <code>%hhu</code>.
The non-standard ones can be found in the table below:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
</colgroup>
<thead>
<tr>
<th className="tableblock halign-left valign-top">Specifier</th>
<th className="tableblock halign-left valign-top">Type</th>
<th className="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">r</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">buffer</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Hex-formatted string to print arbitrary binary content returned by the <a href="#functions-buf">buf</a> function.</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">rh</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">buffer</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Prints in hex-formatted string without <code>\x</code> and with spaces between bytes (e.g. <code>0a fe</code>)</p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p><code>printf()</code> can also symbolize enums as strings. User defined enums as well as enums
defined in the kernel are supported. For example:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`enum custom {
  CUSTOM_ENUM = 3,
};

BEGIN {
  $r = SKB_DROP_REASON_SOCKET_FILTER;
  printf("%d, %s, %s\\n", $r, $r, CUSTOM_ENUM);
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>yields:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`6, SKB_DROP_REASON_SOCKET_FILTER, CUSTOM_ENUM`}</pre>
</div>
</div>
<div className="paragraph">
<p>Colors are supported too, using standard terminal escape sequences:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`print("\\033[31mRed\t\\033[33mYellow\\033[0m\\n")`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-pton">pton</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>char addr[4] pton(const string *addr_v4)</code></p>
</li>
<li>
<p><code>char addr[16] pton(const string *addr_v6)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>compile time</strong></p>
</div>
<div className="paragraph">
<p><code>pton</code> converts a text representation of an IPv4 or IPv6 address to byte array.
<code>pton</code> infers the address family based on <code>.</code> or <code>:</code> in the given argument.
<code>pton</code> comes in handy when we need to select packets with certain IP addresses.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-reg">reg</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>reg(const string name)</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">Supported probes</div>
<ul>
<li>
<p>kprobe</p>
</li>
<li>
<p>uprobe</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Get the contents of the register identified by <code>name</code>.
Valid names depend on the CPU architecture.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-signal">signal</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>signal(const string sig)</code></p>
</li>
<li>
<p><code>signal(uint32 signum)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>unsafe</strong></p>
</div>
<div className="paragraph">
<p><strong>Kernel</strong> 5.3</p>
</div>
<div className="paragraph">
<p><strong>Helper</strong> <code>bpf_send_signal</code></p>
</div>
<div className="paragraph">
<p>Probe types: k(ret)probe, u(ret)probe, USDT, profile</p>
</div>
<div className="paragraph">
<p>Send a signal to the process being traced.
The signal can either be identified by name, e.g. <code>SIGSTOP</code> or by ID, e.g. <code>19</code> as found in <code>kill -l</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:__x64_sys_execve
/comm == "bash"/ {
  signal(5);
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`$ ls
Trace/breakpoint trap (core dumped)`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-sizeof">sizeof</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>sizeof(TYPE)</code></p>
</li>
<li>
<p><code>sizeof(EXPRESSION)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>compile time</strong></p>
</div>
<div className="paragraph">
<p>Returns size of the argument in bytes.
Similar to C/C++ <code>sizeof</code> operator.
Note that the expression does not get evaluated.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-skboutput">skboutput</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>uint32 skboutput(const string path, struct sk_buff *skb, uint64 length, const uint64 offset)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>Kernel</strong> 5.5</p>
</div>
<div className="paragraph">
<p><strong>Helper</strong> bpf_skb_output</p>
</div>
<div className="paragraph">
<p>Write sk_buff <code>skb</code> 's data section to a PCAP file in the <code>path</code>, starting from <code>offset</code> to <code>offset</code> + <code>length</code>.</p>
</div>
<div className="paragraph">
<p>The PCAP file is encapsulated in RAW IP, so no ethernet header is included.
The <code>data</code> section in the struct <code>skb</code> may contain ethernet header in some kernel contexts, you may set <code>offset</code> to 14 bytes to exclude ethernet header.</p>
</div>
<div className="paragraph">
<p>Each packet&#8217;s timestamp is determined by adding <code>nsecs</code> and boot time, the accuracy varies on different kernels, see <code>nsecs</code>.</p>
</div>
<div className="paragraph">
<p>This function returns 0 on success, or a negative error in case of failure.</p>
</div>
<div className="paragraph">
<p>Environment variable <code>BPFTRACE_PERF_RB_PAGES</code> should be increased in order to capture large packets, or else these packets will be dropped.</p>
</div>
<div className="paragraph">
<p>Usage</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# cat dump.bt
fentry:napi_gro_receive {
  $ret = skboutput("receive.pcap", args.skb, args.skb->len, 0);
}

fentry:dev_queue_xmit {
  // setting offset to 14, to exclude ethernet header
  $ret = skboutput("output.pcap", args.skb, args.skb->len, 14);
  printf("skboutput returns %d\\n", $ret);
}

# export BPFTRACE_PERF_RB_PAGES=1024
# bpftrace dump.bt
...

# tcpdump -n -r ./receive.pcap  | head -3
reading from file ./receive.pcap, link-type RAW (Raw IP)
dropped privs to tcpdump
10:23:44.674087 IP 22.128.74.231.63175 > 192.168.0.23.22: Flags [.], ack 3513221061, win 14009, options [nop,nop,TS val 721277750 ecr 3115333619], length 0
10:23:45.823194 IP 100.101.2.146.53 > 192.168.0.23.46619: 17273 0/1/0 (130)
10:23:45.823229 IP 100.101.2.146.53 > 192.168.0.23.46158: 45799 1/0/0 A 100.100.45.106 (60)`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-str">str</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>str(char * data [, uint32 length)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>Helper</strong> <code>probe_read_str, probe_read_&#123;kernel,user&#125;_str</code></p>
</div>
<div className="paragraph">
<p><code>str</code> reads a NULL terminated (<code>\0</code>) string from <code>data</code>.
The maximum string length is limited by the <code>BPFTRACE_MAX_STRLEN</code> env variable, unless <code>length</code> is specified and shorter than the maximum.
In case the string is longer than the specified length only <code>length - 1</code> bytes are copied and a NULL byte is appended at the end.</p>
</div>
<div className="paragraph">
<p>When available (starting from kernel 5.5, see the <code>--info</code> flag) bpftrace will automatically use the <code>kernel</code> or <code>user</code> variant of <code>probe_read_&#123;kernel,user&#125;_str</code> based on the address space of <code>data</code>, see <a href="#Address-spaces">[Address-spaces]</a> for more information.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-strcontains">strcontains</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>int64 strcontains(const char *haystack, const char *needle)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>strcontains</code> compares whether the string haystack contains the string needle.
If needle is contained <code>1</code> is returned, else zero is returned.</p>
</div>
<div className="paragraph">
<p>bpftrace doesn&#8217;t read past the length of the shortest string.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-strerror">strerror</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>strerror_t strerror(int error)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Convert errno code to string.
This is done asynchronously in userspace when the strerror value is printed, hence the returned value can only be used for printing.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`#include <errno.h>
BEGIN {
  print(strerror(EPERM));
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-strftime">strftime</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>timestamp strftime(const string fmt, int64 timestamp_ns)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Format the nanoseconds since boot timestamp <code>timestamp_ns</code> according to the format specified by <code>fmt</code>.
The time conversion and formatting happens in user space, therefore  the <code>timestamp</code> value returned can only be used for printing using the <code>%s</code> format specifier.</p>
</div>
<div className="paragraph">
<p>bpftrace uses the <code>strftime(3)</code> function for formatting time and supports the same format specifiers.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  printf("%s\\n", strftime("%H:%M:%S", nsecs));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>bpftrace also supports the following format string extensions:</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
</colgroup>
<thead>
<tr>
<th className="tableblock halign-left valign-top">Specifier</th>
<th className="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>%f</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Microsecond as a decimal number, zero-padded on the left</p></td>
</tr>
</tbody>
</table>
</div>
<div className="sect2">
<h3 id="functions-strncmp">strncmp</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>int64 strncmp(char * s1, char * s2, int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>strncmp</code> compares up to <code>n</code> characters string <code>s1</code> and string <code>s2</code>.
If they&#8217;re equal <code>0</code> is returned, else a non-zero value is returned.</p>
</div>
<div className="paragraph">
<p>bpftrace doesn&#8217;t read past the length of the shortest string.</p>
</div>
<div className="paragraph">
<p>The use of the <code>==</code> and <code>!=</code> operators is recommended over calling <code>strncmp</code> directly.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-system">system</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void system(string namefmt [, &#8230;&#8203;args])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>unsafe</strong>
<strong>async</strong></p>
</div>
<div className="paragraph">
<p><code>system</code> lets bpftrace run the specified command (<code>fork</code> and <code>exec</code>) until it completes and print its stdout.
The <code>command</code> is run with the same privileges as bpftrace and it blocks execution of the processing threads which can lead to missed events and delays processing of async events.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  time("%H:%M:%S: ");
  printf("%d\\n", @++);
}
interval:s:10 {
  system("/bin/sleep 10");
}
interval:s:30 {
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Note how the async <code>time</code> and <code>printf</code> first print every second until the <code>interval:s:10</code> probe hits, then they print every 10 seconds due to bpftrace blocking on <code>sleep</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`Attaching 3 probes...
08:50:37: 0
08:50:38: 1
08:50:39: 2
08:50:40: 3
08:50:41: 4
08:50:42: 5
08:50:43: 6
08:50:44: 7
08:50:45: 8
08:50:46: 9
08:50:56: 10
08:50:56: 11
08:50:56: 12
08:50:56: 13
08:50:56: 14
08:50:56: 15
08:50:56: 16
08:50:56: 17
08:50:56: 18
08:50:56: 19`}</pre>
</div>
</div>
<div className="paragraph">
<p><code>system</code> supports the same format string and arguments that <code>printf</code> does.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:syscalls:sys_enter_execve {
  system("/bin/grep %s /proc/%d/status", "vmswap", pid);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-time">time</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void time(const string fmt)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Format the current wall time according to the format specifier <code>fmt</code> and print it to stdout.
Unlike <code>strftime()</code> <code>time()</code> doesn&#8217;t send a timestamp from the probe, instead it is the time at which user-space processes the event.</p>
</div>
<div className="paragraph">
<p>bpftrace uses the <code>strftime(3)</code> function for formatting time and supports the same format specifiers.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-uaddr">uaddr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>T * uaddr(const string sym)</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">Supported probes</div>
<ul>
<li>
<p>uprobes</p>
</li>
<li>
<p>uretprobes</p>
</li>
<li>
<p>USDT</p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>Does not work with ASLR, see issue <a href="https://github.com/bpftrace/bpftrace/issues/75">#75</a></strong></p>
</div>
<div className="paragraph">
<p>The <code>uaddr</code> function returns the address of the specified symbol.
This lookup happens during program compilation and cannot be used dynamically.</p>
</div>
<div className="paragraph">
<p>The default return type is <code>uint64*</code>.
If the ELF object size matches a known integer size (1, 2, 4 or 8 bytes) the return type is modified to match the width (<code>uint8*</code>, <code>uint16*</code>, <code>uint32*</code> or <code>uint64*</code> resp.).
As ELF does not contain type info the type is always assumed to be unsigned.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`uprobe:/bin/bash:readline {
  printf("PS1: %s\\n", str(*uaddr("ps1_prompt")));
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-uptr">uptr</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>T * uptr(T * ptr)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Marks <code>ptr</code> as a user address space pointer.
See the address-spaces section for more information on address-spaces.
The pointer type is left unchanged.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-ustack">ustack</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>ustack([StackMode mode, ][int limit])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are implemented using BPF stack maps.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:do_sys_open /comm == "bash"/ { @[ustack()] = count(); }

/*
 * Sample output:
 * @[
 *  __open_nocancel+65
 *  command_word_completion_function+3604
 *  rl_completion_matches+370
 *  bash_default_completion+540
 *  attempt_shell_completion+2092
 *  gen_completion_matches+82
 *  rl_complete_internal+288
 *  rl_complete+145
 *  _rl_dispatch_subseq+647
 *  _rl_dispatch+44
 *  readline_internal_char+479
 *  readline_internal_charloop+22
 *  readline_internal+23
 *  readline+91
 *  yy_readline_get+152
 *  yy_readline_get+429
 *  yy_getc+13
 *  shell_getc+469
 *  read_token+251
 *  yylex+192
 *  yyparse+777
 *  parse_command+126
 *  read_command+207
 *  reader_loop+391
 *  main+2409
 *  __libc_start_main+231
 *  0x61ce258d4c544155
 * ]: 9
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>Sampling only three frames from the stack (limit = 3):</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:ip_output { @[ustack(3)] = count(); }

/*
 * Sample output:
 * @[
 *  __open_nocancel+65
 *  command_word_completion_function+3604
 *  rl_completion_matches+370
 * ]: 20
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>You can also choose a different output format.
Available formats are <code>bpftrace</code>, <code>perf</code>, and <code>raw</code> (no symbolication):</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:ip_output { @[ustack(perf, 3)] = count(); }

/*
 * Sample output:
 * @[
 *  5649feec4090 readline+0 (/home/mmarchini/bash/bash/bash)
 *  5649fee2bfa6 yy_readline_get+451 (/home/mmarchini/bash/bash/bash)
 *  5649fee2bdc6 yy_getc+13 (/home/mmarchini/bash/bash/bash)
 * ]: 20
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>Note that for these examples to work, bash had to be recompiled with frame pointers.</p>
</div>
</div>
<div className="sect2">
<h3 id="functions-usym">usym</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>usym_t usym(uint64 * addr)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="ulist">
<div className="title">Supported probes</div>
<ul>
<li>
<p>uprobes</p>
</li>
<li>
<p>uretprobes</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Equal to <a href="#functions-ksym">ksym</a> but resolves user space symbols.</p>
</div>
<div className="paragraph">
<p>If ASLR is enabled, user space symbolication only works when the process is running at either the time of the symbol resolution or the time of the probe attachment. The latter requires <code>BPFTRACE_CACHE_USER_SYMBOLS</code> to be set to <code>PER_PID</code>, and might not work with older versions of BCC. A similar limitation also applies to dynamically loaded symbols.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`uprobe:/bin/bash:readline
{
  printf("%s\\n", usym(reg("ip")));
}

/*
 * Sample output:
 * readline
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="functions-unwatch">unwatch</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>void unwatch(void * addr)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Removes a watchpoint</p>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_map_functions">Map Functions</h2>
<div className="sectionbody">
<div className="paragraph">
<p>Map functions are built-in functions who&#8217;s return value can only be assigned to maps.
The data type associated with these functions are only for internal use and are not compatible with the (integer) operators.</p>
</div>
<div className="paragraph">
<p>Functions that are marked <strong>async</strong> are asynchronous which can lead to unexpected behavior, see the <a href="#_invocation_mode">Invocation Mode</a> section for more information.</p>
</div>
<div className="paragraph">
<p>See <a href="#_advanced_topics">Advanced Topics</a> for more information on <a href="#_map_printing">Map Printing</a>.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
</colgroup>
<thead>
<tr>
<th className="tableblock halign-left valign-top">Function Name</th>
<th className="tableblock halign-left valign-top">Description</th>
<th className="tableblock halign-left valign-top">Sync/async</th>
</tr>
</thead>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-avg"><code>avg(int64 n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Calculate the running average of <code>n</code> between consecutive calls.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-clear"><code>clear(map m)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Clear all keys/values from a map.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-count"><code>count()</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Count how often this function is called.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-delete"><code>delete(map m, mapkey k)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Delete a single key from a map.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-has_key"><code>has_key(map m, mapkey k)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Return true (1) if the key exists in this map. Otherwise return false (0).</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-hist"><code>hist(int64 n[, int k])</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Create a log2 histogram of n using buckets per power of 2, 0 &#8656; k &#8656; 5, defaults to 0.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-len"><code>len(map m)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Return the number of elements in a map.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-lhist"><code>lhist(int64 n, int64 min, int64 max, int64 step)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Create a linear histogram of n. lhist creates M ((max - min) / step) buckets in the range [min,max) where each bucket is step in size.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-max"><code>max(int64 n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Update the map with n if n is bigger than the current value held.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-min"><code>min(int64 n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Update the map with n if n is smaller than the current value held.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-stats"><code>stats(int64 n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Combines the count, avg and sum calls into one.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-sum"><code>sum(int64 n)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Calculate the sum of all n passed.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Sync</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#map-functions-zero"><code>zero(map m)</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Set all values for all keys to zero.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Async</p></td>
</tr>
</tbody>
</table>
<div className="sect2">
<h3 id="map-functions-avg">avg</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>avg(int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Calculate the running average of <code>n</code> between consecutive calls.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:s:1 {
  @x++;
  @y = avg(@x);
  print(@x);
  print(@y);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Internally this keeps two values in the map: value count and running total.
The average is computed in user-space when printing by dividing the total by the
count. However, you can get the average in kernel space in expressions like
<code>if (@y == 5)</code> but this is expensive as bpftrace needs to iterate over all the
cpus to collect and sum BOTH count and total.</p>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-clear">clear</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>clear(map m)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Clear all keys/values from map <code>m</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:ms:100 {
  @[rand % 10] = count();
}

interval:s:10 {
  print(@);
  clear(@);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-count">count</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>count()</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Count how often this function is called.</p>
</div>
<div className="paragraph">
<p>Using <code>@=count()</code> is conceptually similar to <code>@&#43;&#43;</code>.
The difference is that the <code>count()</code> function uses a map type optimized for
performance and correctness using cheap, thread-safe writes (PER_CPU). However, sync reads
can be expensive as bpftrace needs to iterate over all the cpus to collect and
sum these values.</p>
</div>
<div className="paragraph">
<p>Note: This differs from "raw" writes (e.g. <code>@&#43;&#43;</code>) where multiple writers to a
shared location might lose updates, as bpftrace does not generate any atomic instructions
for <code>&#43;&#43;</code>.</p>
</div>
<div className="paragraph">
<p>Example one:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  @ = count();
  @ = count();
  printf("%d\\n", (int64)@);   // prints 2
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Example two:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:ms:100 {
  @ = count();
}

interval:s:10 {
  // async read
  print(@);
  // sync read
  if (@ > 10) {
    print(("hello"));
  }
  clear(@);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-delete">delete</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>delete(map m, mapkey k)</code></p>
</li>
<li>
<p>deprecated <code>delete(mapkey k)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Delete a single key from a map.
For scalar maps (e.g. no explicit keys), the key is omitted and is equivalent to calling <code>clear</code>.
For map keys that are composed of multiple values (e.g. <code>@mymap[3, "hello"] = 1</code> - remember these values are represented as a tuple) the syntax would be: <code>delete(@mymap, (3, "hello"));</code></p>
</div>
<div className="paragraph">
<p>The, now deprecated, API (supported in version &#8656; 0.21.x) of passing map arguments with the key is still supported:
e.g. <code>delete(@mymap[3, "hello"]);</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:dummy {
  @scalar = 1;
  delete(@scalar); // ok
  @single["hello"] = 1;
  delete(@single, "hello"); // ok
  @associative[1,2] = 1;
  delete(@associative, (1,2)); // ok
  delete(@associative); // error
  delete(@associative, 1); // error

  // deprecated but ok
  delete(@single["hello"]);
  delete(@associative[1, 2]);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-has_key">has_key</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>int has_key(map m, mapkey k)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Return true (1) if the key exists in this map.
Otherwise return false (0).
Error if called with a map that has no keys (aka scalar map).
Return value can also be used for scratch variables and map keys/values.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:dummy {
  @associative[1,2] = 1;
  if (!has_key(@associative, (1,3))) { // ok
    print(("bye"));
  }

  @scalar = 1;
  if (has_key(@scalar)) { // error
    print(("hello"));
  }

  $a = has_key(@associative, (1,2)); // ok
  @b[has_key(@associative, (1,2))] = has_key(@associative, (1,2)); // ok
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-hist">hist</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>hist(int64 n[, int k])</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Create a log2 histogram of <code>n</code> using $2^k$ buckets per power of 2,
0 &#8656; k &#8656; 5, defaults to 0.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kretprobe:vfs_read {
  @bytes = hist(retval);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Prints:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@:
[1M, 2M)               3 |                                                    |
[2M, 4M)               2 |                                                    |
[4M, 8M)               2 |                                                    |
[8M, 16M)              6 |                                                    |
[16M, 32M)            16 |                                                    |
[32M, 64M)            27 |                                                    |
[64M, 128M)           48 |@                                                   |
[128M, 256M)          98 |@@@                                                 |
[256M, 512M)         191 |@@@@@@                                              |
[512M, 1G)           394 |@@@@@@@@@@@@@                                       |
[1G, 2G)             820 |@@@@@@@@@@@@@@@@@@@@@@@@@@@                         |`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-len">len</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>len(map m)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Return the number of elements in the map.</p>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-lhist">lhist</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>lhist(int64 n, int64 min, int64 max, int64 step)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Create a linear histogram of <code>n</code>.
<code>lhist</code> creates <code>M</code> (<code>(max - min) / step</code>) buckets in the range <code>[min,max)</code> where each bucket is <code>step</code> in size.
Values in the range <code>(-inf, min)</code> and <code>(max, inf)</code> get their get their own bucket too, bringing the total amount of buckets created to <code>M+2</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:ms:1 {
  @ = lhist(rand %10, 0, 10, 1);
}

interval:s:5 {
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Prints:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@:
[0, 1)               306 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         |
[1, 2)               284 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            |
[2, 3)               294 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          |
[3, 4)               318 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       |
[4, 5)               311 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        |
[5, 6)               362 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
[6, 7)               336 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    |
[7, 8)               326 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      |
[8, 9)               328 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     |
[9, 10)              318 |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       |`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-max">max</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>max(int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Update the map with <code>n</code> if <code>n</code> is bigger than the current value held.
Similar to <code>count</code> this uses a PER_CPU map (thread-safe, fast writes, slow reads).</p>
</div>
<div className="paragraph">
<p>Note: this is different than the typical userspace <code>max()</code> in that bpftrace&#8217;s <code>max()</code>
only takes a single argument. The logical "other" argument to compare to is the value
in the map the "result" is being assigned to.</p>
</div>
<div className="paragraph">
<p>For example, compare the two logically equivalent samples (C++ vs bpftrace):</p>
</div>
<div className="paragraph">
<p>In C++:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`int x = std::max(3, 33);  // x contains 33`}</pre>
</div>
</div>
<div className="paragraph">
<p>In bpftrace:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@x = max(3);
@x = max(33);   // @x contains 33`}</pre>
</div>
</div>
<div className="paragraph">
<p>Also note that bpftrace takes care to handle the unset case. In other words,
there is no default value. The first value you pass to <code>max()</code> will always
be returned.</p>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-min">min</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>min(int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Update the map with <code>n</code> if <code>n</code> is smaller than the current value held.
Similar to <code>count</code> this uses a PER_CPU map (thread-safe, fast writes, slow reads).</p>
</div>
<div className="paragraph">
<p>See <code>max()</code> above for how this differs from the typical userspace <code>min()</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-stats">stats</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>stats(int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>stats</code> combines the <code>count</code>, <code>avg</code> and <code>sum</code> calls into one.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:vfs_read {
  @bytes[comm] = stats(arg2);
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@bytes[bash]: count 7, average 1, total 7
@bytes[sleep]: count 5, average 832, total 4160
@bytes[ls]: count 7, average 886, total 6208
@`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-sum">sum</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>sum(int64 n)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Calculate the sum of all <code>n</code> passed.</p>
</div>
<div className="paragraph">
<p>Using <code>@=sum(5)</code> is conceptually similar to <code>@+=5</code>.
The difference is that the <code>sum()</code> function uses a map type optimized for
performance and correctness using cheap, thread-safe writes (PER_CPU). However, sync reads
can be expensive as bpftrace needs to iterate over all the cpus to collect and
sum these values.</p>
</div>
<div className="paragraph">
<p>Note: This differs from "raw" writes (e.g. <code>@+=5</code>) where multiple writers to a
shared location might lose updates, as bpftrace does not generate any implicit
atomic operations.</p>
</div>
<div className="paragraph">
<p>Example one:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  @ = sum(5);
  @ = sum(6);
  printf("%d\\n", (int64)@);   // prints 11
  clear(@);
  exit();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Example two:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`interval:ms:100 {
  @ = sum(5);
}

interval:s:10 {
  // async read
  print(@);
  // sync read
  if (@ > 10) {
    print(("hello"));
  }
  clear(@);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="map-functions-zero">zero</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>zero(map m)</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>async</strong></p>
</div>
<div className="paragraph">
<p>Set all values for all keys to zero.</p>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_probes">Probes</h2>
<div className="sectionbody">
<div className="paragraph">
<p>bpftrace supports various probe types which allow the user to attach BPF programs to different types of events.
Each probe starts with a provider (e.g. <code>kprobe</code>) followed by a colon (<code>:</code>) separated list of options.
The amount of options and their meaning depend on the provider and are detailed below.
The valid values for options can depend on the system or binary being traced, e.g. for uprobes it depends on the binary.
Also see <a href="#_listing_probes">Listing Probes</a>.</p>
</div>
<div className="paragraph">
<p>It is possible to associate multiple probes with a single action as long as the action is valid for all specified probes.
Multiple probes can be specified as a comma (<code>,</code>) separated list:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:tcp_reset,kprobe:tcp_v4_rcv {
  printf("Entered: %s\\n", probe);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Wildcards are supported too:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:tcp_* {
  printf("Entered: %s\\n", probe);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Both can be combined:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:tcp_reset,kprobe:*socket* {
  printf("Entered: %s\\n", probe);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Most providers also support a short name which can be used instead of the full name, e.g. <code>kprobe:f</code> and <code>k:f</code> are identical.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Probe Name</strong></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Short Name</strong></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Description</strong></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><strong>Kernel/User Level</strong></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-begin-end"><code>BEGIN/END</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">-</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Built-in events</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel/User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-self"><code>self</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">-</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Built-in events</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel/User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-hardware"><code>hardware</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>h</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Processor-level events</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-interval"><code>interval</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>i</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Timed output</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel/User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-iterator"><code>iter</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>it</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Iterators tracing</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-fentry"><code>fentry/fexit</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>f</code>/<code>fr</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel functions tracing with BTF support</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-kprobe"><code>kprobe/kretprobe</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>k</code>/<code>kr</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel function start/return</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-profile"><code>profile</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>p</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Timed sampling</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel/User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-rawtracepoint"><code>rawtracepoint</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>rt</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel static tracepoints with raw arguments</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-software"><code>software</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>s</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel software events</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-tracepoint"><code>tracepoint</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>t</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel static tracepoints</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-uprobe"><code>uprobe/uretprobe</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>u</code>/<code>ur</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User-level function start/return</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-usdt"><code>usdt</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>U</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User-level static tracepoints</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">User</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock"><a href="#probes-watchpoint"><code>watchpoint/asyncwatchpoint</code></a></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>w</code>/<code>aw</code></p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Memory watchpoints</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Kernel</p></td>
</tr>
</tbody>
</table>
<div className="sect2">
<h3 id="probes-begin-end">BEGIN/END</h3>
<div className="paragraph">
<p>These are special built-in events provided by the bpftrace runtime.
<code>BEGIN</code> is triggered before all other probes are attached.
<code>END</code> is triggered after all other probes are detached.</p>
</div>
<div className="paragraph">
<p>Note that specifying an <code>END</code> probe doesn&#8217;t override the printing of 'non-empty' maps at exit.
To prevent printing all used maps need be cleared in the <code>END</code> probe:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`END {
    clear(@map1);
    clear(@map2);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-self">self</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>self:signal:SIGUSR1</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are special built-in events provided by the bpftrace runtime.
The trigger function is called by the bpftrace runtime when the bpftrace process receives specific events, such as a <code>SIGUSR1</code> signal.
When multiple signal handlers are attached to the same signal, only the first one is used.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`self:signal:SIGUSR1 {
  print("abc");
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-hardware">hardware</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>hardware:event_name:</code></p>
</li>
<li>
<p><code>hardware:event_name:count</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>h</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are the pre-defined hardware events provided by the Linux kernel, as commonly traced by the perf utility.
They are implemented using performance monitoring counters (PMCs): hardware resources on the processor.
There are about ten of these, and they are documented in the perf_event_open(2) man page.
The event names are:</p>
</div>
<div className="ulist">
<ul>
<li>
<p><code>cpu-cycles</code> or <code>cycles</code></p>
</li>
<li>
<p><code>instructions</code></p>
</li>
<li>
<p><code>cache-references</code></p>
</li>
<li>
<p><code>cache-misses</code></p>
</li>
<li>
<p><code>branch-instructions</code> or <code>branches</code></p>
</li>
<li>
<p><code>branch-misses</code></p>
</li>
<li>
<p><code>bus-cycles</code></p>
</li>
<li>
<p><code>frontend-stalls</code></p>
</li>
<li>
<p><code>backend-stalls</code></p>
</li>
<li>
<p><code>ref-cycles</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>The <code>count</code> option specifies how many events must happen before the probe fires (sampling interval).
If <code>count</code> is left unspecified a default value is used.</p>
</div>
<div className="paragraph">
<p>This will fire once for every 1,000,000 cache misses.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`hardware:cache-misses:1e6 { @[pid] = count(); }`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-interval">interval</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>interval:us:count</code></p>
</li>
<li>
<p><code>interval:ms:count</code></p>
</li>
<li>
<p><code>interval:s:count</code></p>
</li>
<li>
<p><code>interval:hz:rate</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>i</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>The interval probe fires at a fixed interval as specified by its time spec.
Interval fires on one CPU at a time, unlike <a href="#probes-profile">profile</a> probes.</p>
</div>
<div className="paragraph">
<p>This prints the rate of syscalls per second.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:raw_syscalls:sys_enter { @syscalls = count(); }
interval:s:1 { print(@syscalls); clear(@syscalls); }`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-iterator">iterator</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>iter:task</code></p>
</li>
<li>
<p><code>iter:task:pin</code></p>
</li>
<li>
<p><code>iter:task_file</code></p>
</li>
<li>
<p><code>iter:task_file:pin</code></p>
</li>
<li>
<p><code>iter:task_vma</code></p>
</li>
<li>
<p><code>iter:task_vma:pin</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>it</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><strong>Warning</strong> this feature is experimental and may be subject to interface changes.</p>
</div>
<div className="paragraph">
<p>These are eBPF iterator probes that allow iteration over kernel objects.
Iterator probe can&#8217;t be mixed with any other probe, not even another iterator.
Each iterator probe provides a set of fields that could be accessed with the
ctx pointer. Users can display the set of available fields for each iterator via
-lv options as described below.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`iter:task { printf("%s:%d\\n", ctx->task->comm, ctx->task->pid); }

/*
 * Sample output:
 * systemd:1
 * kthreadd:2
 * rcu_gp:3
 * rcu_par_gp:4
 * kworker/0:0H:6
 * mm_percpu_wq:8
 */`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`iter:task_file {
  printf("%s:%d %d:%s\\n", ctx->task->comm, ctx->task->pid, ctx->fd, path(ctx->file->f_path));
}

/*
 * Sample output:
 * systemd:1 1:/dev/null
 * systemd:1 3:/dev/kmsg
 * ...
 * su:1622 2:/dev/pts/1
 * ...
 * bpftrace:1892 2:/dev/pts/1
 * bpftrace:1892 6:anon_inode:bpf-prog
 */`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`iter:task_vma {
  printf("%s %d %lx-%lx\\n", comm, pid, ctx->vma->vm_start, ctx->vma->vm_end);
}

/*
 * Sample output:
 * bpftrace 119480 55b92c380000-55b92c386000
 * ...
 * bpftrace 119480 7ffd55dde000-7ffd55de2000
 */`}</pre>
</div>
</div>
<div className="paragraph">
<p>It&#8217;s possible to pin an iterator by specifying the optional probe ':pin' part, that defines the pin file.
It can be specified as an absolute or relative path to /sys/fs/bpf.</p>
</div>
<div className="listingblock">
<div className="title">relative pin</div>
<div className="content">
<pre>{`iter:task:list { printf("%s:%d\\n", ctx->task->comm, ctx->task->pid); }

/*
 * Sample output:
 * Program pinned to /sys/fs/bpf/list
 */`}</pre>
</div>
</div>
<div className="listingblock">
<div className="title">absolute pin</div>
<div className="content">
<pre>{`iter:task_file:/sys/fs/bpf/files {
  printf("%s:%d %s\\n", ctx->task->comm, ctx->task->pid, path(ctx->file->f_path));
}

/*
 * Sample output:
 * Program pinned to /sys/fs/bpf/files
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-fentry">fentry and fexit</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>fentry[:module]:fn</code></p>
</li>
<li>
<p><code>fexit[:module]:fn</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short names</div>
<ul>
<li>
<p><code>f</code> (<code>fentry</code>)</p>
</li>
<li>
<p><code>fr</code> (<code>fexit</code>)</p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">requires (<code>--info</code>)</div>
<ul>
<li>
<p>Kernel features:BTF</p>
</li>
<li>
<p>Probe types:fentry</p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>fentry</code>/<code>fexit</code> probes attach to kernel functions similar to <a href="#probes-kprobe">kprobe and kretprobe</a>.
They make use of eBPF trampolines which allow kernel code to call into BPF programs with near zero overhead.
Originally, these were called <code>kfunc</code> and <code>kretfunc</code> but were later renamed to <code>fentry</code> and <code>fexit</code> to match
how these are referenced in the kernel and to prevent confusion with <a href="https://docs.kernel.org/bpf/kfuncs.html">BPF Kernel Functions</a>.
The original names are still supported for backwards compatibility.</p>
</div>
<div className="paragraph">
<p><code>fentry</code>/<code>fexit</code> probes make use of BTF type information to derive the type of function arguments at compile time.
This removes the need for manual type casting and makes the code more resilient against small signature changes in the kernel.
The function arguments are available in the <code>args</code> struct which can be inspected by doing verbose listing (see <a href="#_listing_probes">Listing Probes</a>).
These arguments are also available in the return probe (<code>fexit</code>), unlike <code>kretprobe</code>.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -lv 'fentry:tcp_reset'

fentry:tcp_reset
    struct sock * sk
    struct sk_buff * skb`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`fentry:x86_pmu_stop {
  printf("pmu %s stop\\n", str(args.event->pmu->name));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>The fget function takes one argument as file descriptor and you can access it via args.fd and the return value is accessible via retval:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`fexit:fget {
  printf("fd %d name %s\\n", args.fd, str(retval->f_path.dentry->d_name.name));
}

/*
 * Sample output:
 * fd 3 name ld.so.cache
 * fd 3 name libselinux.so.1
 */`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-kprobe">kprobe and kretprobe</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>kprobe[:module]:fn</code></p>
</li>
<li>
<p><code>kprobe[:module]:fn+offset</code></p>
</li>
<li>
<p><code>kretprobe[:module]:fn</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short names</div>
<ul>
<li>
<p><code>k</code></p>
</li>
<li>
<p><code>kr</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>kprobe</code>s allow for dynamic instrumentation of kernel functions.
Each time the specified kernel function is executed the attached BPF programs are ran.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:tcp_reset {
  @tcp_resets = count()
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Function arguments are available through the <code>argN</code> for register args. Arguments passed on stack are available using the stack pointer, e.g. <code>$stack_arg0 = <strong>(int64</strong>)reg("sp") + 16</code>.
Whether arguments passed on stack or in a register depends on the architecture and the number or arguments used, e.g. on x86_64 the first 6 non-floating point arguments are passed in registers and all following arguments are passed on the stack.
Note that floating point arguments are typically passed in special registers which don&#8217;t count as <code>argN</code> arguments which can cause confusion.
Consider a function with the following signature:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`void func(int a, double d, int x)`}</pre>
</div>
</div>
<div className="paragraph">
<p>Due to <code>d</code> being a floating point, <code>x</code> is accessed through <code>arg1</code> where one might expect <code>arg2</code>.</p>
</div>
<div className="paragraph">
<p>bpftrace does not detect the function signature so it is not aware of the argument count or their type.
It is up to the user to perform <a href="#_type_conversion">Type conversion</a> when needed, e.g.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`#include <linux/path.h>
#include <linux/dcache.h>

kprobe:vfs_open
{
	printf("open path: %s\\n", str(((struct path *)arg0)->dentry->d_name.name));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Here arg0 was cast as a (struct path *), since that is the first argument to vfs_open.
The struct support is the same as bcc and based on available kernel headers.
This means that many, but not all, structs will be available, and you may need to manually define structs.</p>
</div>
<div className="paragraph">
<p>If the kernel has BTF (BPF Type Format) data, all kernel structs are always available without defining them. For example:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:vfs_open {
  printf("open path: %s\\n", str(((struct path *)arg0)->dentry->d_name.name));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>You can optionally specify a kernel module, either to include BTF data from that module, or to specify that the traced function should come from that module.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:kvm:x86_emulate_insn
{
  $ctxt = (struct x86_emulate_ctxt *) arg0;
  printf("eip = 0x%lx\\n", $ctxt->eip);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>See <a href="#_btf_support">BTF Support</a> for more details.</p>
</div>
<div className="paragraph">
<p><code>kprobe</code> s are not limited to function entry, they can be attached to any instruction in a function by specifying an offset from the start of the function.</p>
</div>
<div className="paragraph">
<p><code>kretprobe</code> s trigger on the return from a kernel function.
Return probes do not have access to the function (input) arguments, only to the return value (through <code>retval</code>).
A common pattern to work around this is by storing the arguments in a map on function entry and retrieving in the return probe:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`kprobe:d_lookup
{
	$name = (struct qstr *)arg1;
	@fname[tid] = $name->name;
}

kretprobe:d_lookup
/@fname[tid]/
{
	printf("%-8d %-6d %-16s M %s\\n", elapsed / 1e6, pid, comm,
	    str(@fname[tid]));
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-profile">profile</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>profile:us:count</code></p>
</li>
<li>
<p><code>profile:ms:count</code></p>
</li>
<li>
<p><code>profile:s:count</code></p>
</li>
<li>
<p><code>profile:hz:rate</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>p</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Profile probes fire on each CPU on the specified interval.
These operate using perf_events (a Linux kernel facility, which is also used by the perf command).</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`profile:hz:99 { @[tid] = count(); }`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-rawtracepoint">rawtracepoint</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>rawtracepoint:event</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>rt</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>The hook point triggered by <code>tracepoint</code> and <code>rawtracepoint</code> is the same.
<code>tracepoint</code> and <code>rawtracepoint</code> are nearly identical in terms of functionality.
The only difference is in the program context.
<code>rawtracepoint</code> offers raw arguments to the tracepoint while <code>tracepoint</code> applies further processing to the raw arguments.
The additional processing is defined inside the kernel.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`rawtracepoint:block_rq_insert {
  printf("%llx %llx\\n", arg0, arg1);
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Tracepoint arguments are available via the <code>argN</code> builtins.
Each arg is a 64-bit integer.
The available arguments can be found in the relative path of the kernel source code <code>include/trace/events/</code>. For example:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`include/trace/events/block.h
DEFINE_EVENT(block_rq, block_rq_insert,
	TP_PROTO(struct request_queue *q, struct request *rq),
	TP_ARGS(q, rq)
);`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-software">software</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>software:event:</code></p>
</li>
<li>
<p><code>software:event:count</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>s</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>These are the pre-defined software events provided by the Linux kernel, as commonly traced via the perf utility.
They are similar to tracepoints, but there is only about a dozen of these, and they are documented in the perf_event_open(2) man page.
If the count is not provided, a default is used.</p>
</div>
<div className="paragraph">
<p>The event names are:</p>
</div>
<div className="ulist">
<ul>
<li>
<p><code>cpu-clock</code> or <code>cpu</code></p>
</li>
<li>
<p><code>task-clock</code></p>
</li>
<li>
<p><code>page-faults</code> or <code>faults</code></p>
</li>
<li>
<p><code>context-switches</code> or <code>cs</code></p>
</li>
<li>
<p><code>cpu-migrations</code></p>
</li>
<li>
<p><code>minor-faults</code></p>
</li>
<li>
<p><code>major-faults</code></p>
</li>
<li>
<p><code>alignment-faults</code></p>
</li>
<li>
<p><code>emulation-faults</code></p>
</li>
<li>
<p><code>dummy</code></p>
</li>
<li>
<p><code>bpf-output</code></p>
</li>
</ul>
</div>
<div className="listingblock">
<div className="content">
<pre>{`software:faults:100 { @[comm] = count(); }`}</pre>
</div>
</div>
<div className="paragraph">
<p>This roughly counts who is causing page faults, by sampling the process name for every one in one hundred faults.</p>
</div>
</div>
<div className="sect2">
<h3 id="probes-tracepoint">tracepoint</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>tracepoint:subsys:event</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>t</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Tracepoints are hooks into events in the kernel.
Tracepoints are defined in the kernel source and compiled into the kernel binary which makes them a form of static tracing.
Unlike <code>kprobe</code> s, new tracepoints cannot be added without modifying the kernel.</p>
</div>
<div className="paragraph">
<p>The advantage of tracepoints is that they generally provide a more stable interface than <code>kprobe</code> s do, they do not depend on the existence of a kernel function.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`tracepoint:syscalls:sys_enter_openat {
  printf("%s %s\\n", comm, str(args.filename));
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Tracepoint arguments are available in the <code>args</code> struct which can be inspected with verbose listing, see the <a href="#_listing_probes">Listing Probes</a> section for more details.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -lv "tracepoint:*"

tracepoint:xhci-hcd:xhci_setup_device_slot
  u32 info
  u32 info2
  u32 tt_info
  u32 state
...`}</pre>
</div>
</div>
<div className="paragraph">
<p>Alternatively members for each tracepoint can be listed from their /format file in /sys.</p>
</div>
<div className="paragraph">
<p>Apart from the filename member, we can also print flags, mode, and more.
After the "common" members listed first, the members are specific to the tracepoint.</p>
</div>
<div className="ulist">
<div className="title">Additional information</div>
<ul>
<li>
<p><a href="https://www.kernel.org/doc/html/latest/trace/tracepoints.html" className="bare">https://www.kernel.org/doc/html/latest/trace/tracepoints.html</a></p>
</li>
</ul>
</div>
</div>
<div className="sect2">
<h3 id="probes-uprobe">uprobe, uretprobe</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>uprobe:binary:func</code></p>
</li>
<li>
<p><code>uprobe:binary:func+offset</code></p>
</li>
<li>
<p><code>uprobe:binary:offset</code></p>
</li>
<li>
<p><code>uretprobe:binary:func</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short names</div>
<ul>
<li>
<p><code>u</code></p>
</li>
<li>
<p><code>ur</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p><code>uprobe</code> s or user-space probes are the user-space equivalent of <code>kprobe</code> s.
The same limitations that apply <a href="#probes-kprobe">kprobe and kretprobe</a> also apply to <code>uprobe</code> s and <code>uretprobe</code> s, namely: arguments are available via the <code>argN</code> and <code>sargN</code> builtins and can only be accessed with a uprobe (<code>sargN</code> is more common for older versions of golang).
retval is the return value for the instrumented function and can only be accessed with a uretprobe.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`uprobe:/bin/bash:readline { printf("arg0: %d\\n", arg0); }`}</pre>
</div>
</div>
<div className="paragraph">
<p>What does arg0 of readline() in /bin/bash contain?
I don&#8217;t know, so I&#8217;ll need to look at the bash source code to find out what its arguments are.</p>
</div>
<div className="paragraph">
<p>When tracing libraries, it is sufficient to specify the library name instead of
a full path. The path will be then automatically resolved using <code>/etc/ld.so.cache</code>:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`uprobe:libc:malloc { printf("Allocated %d bytes\\n", arg0); }`}</pre>
</div>
</div>
<div className="paragraph">
<p>If the traced binary has DWARF included, function arguments are available in the <code>args</code> struct which can be inspected with verbose listing, see the <a href="#_listing_probes">Listing Probes</a> section for more details.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -lv 'uprobe:/bin/bash:rl_set_prompt'

uprobe:/bin/bash:rl_set_prompt
    const char* prompt`}</pre>
</div>
</div>
<div className="paragraph">
<p>When tracing C&#43;&#43; programs, it&#8217;s possible to turn on automatic symbol demangling by using the <code>:cpp</code> prefix:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace:cpp:"bpftrace::BPFtrace::add_probe" { ... }`}</pre>
</div>
</div>
<div className="paragraph">
<p>It is important to note that for <code>uretprobe</code> s to work the kernel runs a special helper on user-space function entry which overrides the return address on the stack.
This can cause issues with languages that have their own runtime like Golang:</p>
</div>
<div className="listingblock">
<div className="title">example.go</div>
<div className="content">
<pre>{`func myprint(s string) {
  fmt.Printf("Input: %s\\n", s)
}

func main() {
  ss := []string{"a", "b", "c"}
  for _, s := range ss {
    go myprint(s)
  }
  time.Sleep(1*time.Second)
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="title">bpftrace</div>
<div className="content">
<pre>{`# bpftrace -e 'uretprobe:./test:main.myprint { @=count(); }' -c ./test
runtime: unexpected return pc for main.myprint called from 0x7fffffffe000
stack: frame={sp:0xc00008cf60, fp:0xc00008cfd0} stack=[0xc00008c000,0xc00008d000)
fatal error: unknown caller pc`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="probes-usdt">usdt</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>usdt:binary_path:probe_name</code></p>
</li>
<li>
<p><code>usdt:binary_path:[probe_namespace]:probe_name</code></p>
</li>
<li>
<p><code>usdt:library_path:probe_name</code></p>
</li>
<li>
<p><code>usdt:library_path:[probe_namespace]:probe_name</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short name</div>
<ul>
<li>
<p><code>U</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Where probe_namespace is optional if probe_name is unique within the binary.</p>
</div>
<div className="paragraph">
<p>You can target the entire host (or an entire process&#8217;s address space by using the <code>-p</code> arg) by using a single wildcard in place of the binary_path/library_path:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`usdt:*:loop { printf("hi\\n"); }`}</pre>
</div>
</div>
<div className="paragraph">
<p>Please note that if you use wildcards for the probe_name or probe_namespace and end up targeting multiple USDTs for the same probe you might get errors if you also utilize the USDT argument builtin (e.g. arg0) as they could be of different types.</p>
</div>
<div className="paragraph">
<p>Arguments are available via the <code>argN</code> builtins:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`usdt:/root/tick:loop { printf("%s: %d\\n", str(arg0), arg1); }`}</pre>
</div>
</div>
<div className="paragraph">
<p>bpftrace also supports USDT semaphores.
If both your environment and bpftrace support uprobe refcounts, then USDT semaphores are automatically activated for all processes upon probe attachment (and --usdt-file-activation becomes a noop).
You can check if your system supports uprobe refcounts by running:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace --info 2>&amp;1 | grep "uprobe refcount"
bcc bpf_attach_uprobe refcount: yes
  uprobe refcount (depends on Build:bcc bpf_attach_uprobe refcount): yes`}</pre>
</div>
</div>
<div className="paragraph">
<p>If your system does not support uprobe refcounts, you may activate semaphores by passing in -p $PID or --usdt-file-activation.
--usdt-file-activation looks through /proc to find processes that have your probe&#8217;s binary mapped with executable permissions into their address space and then tries to attach your probe.
Note that file activation occurs only once (during attach time).
In other words, if later during your tracing session a new process with your executable is spawned, your current tracing session will not activate the new process.
Also note that --usdt-file-activation matches based on file path.
This means that if bpftrace runs from the root host, things may not work as expected if there are processes execved from private mount namespaces or bind mounted directories.
One workaround is to run bpftrace inside the appropriate namespaces (i.e. the container).</p>
</div>
</div>
<div className="sect2">
<h3 id="probes-watchpoint">watchpoint and asyncwatchpoint</h3>
<div className="ulist">
<div className="title">variants</div>
<ul>
<li>
<p><code>watchpoint:absolute_address:length:mode</code></p>
</li>
<li>
<p><code>watchpoint:function+argN:length:mode</code></p>
</li>
</ul>
</div>
<div className="ulist">
<div className="title">short names</div>
<ul>
<li>
<p><code>w</code></p>
</li>
<li>
<p><code>aw</code></p>
</li>
</ul>
</div>
<div className="paragraph">
<p>This feature is experimental and may be subject to interface changes.
Memory watchpoints are also architecture dependent.</p>
</div>
<div className="paragraph">
<p>These are memory watchpoints provided by the kernel.
Whenever a memory address is written to (<code>w</code>), read
from (<code>r</code>), or executed (<code>x</code>), the kernel can generate an event.</p>
</div>
<div className="paragraph">
<p>In the first form, an absolute address is monitored.
If a pid (<code>-p</code>) or a command (<code>-c</code>) is provided, bpftrace takes the address as a userspace address and monitors the appropriate process.
If not, bpftrace takes the address as a kernel space address.</p>
</div>
<div className="paragraph">
<p>In the second form, the address present in <code>argN</code> when <code>function</code> is entered is
monitored.
A pid or command must be provided for this form.
If synchronous (<code>watchpoint</code>), a <code>SIGSTOP</code> is sent to the tracee upon function entry.
The tracee will be <code>SIGCONT</code>ed after the watchpoint is attached.
This is to ensure events are not missed.
If you want to avoid the <code>SIGSTOP</code> + <code>SIGCONT</code> use <code>asyncwatchpoint</code>.</p>
</div>
<div className="paragraph">
<p>Note that on most architectures you may not monitor for execution while monitoring read or write.</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'watchpoint:0x10000000:8:rw { printf("hit!\\n"); }' -c ./testprogs/watchpoint`}</pre>
</div>
</div>
<div className="paragraph">
<p>Print the call stack every time the <code>jiffies</code> variable is updated:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`watchpoint:0x$(awk '$3 == "jiffies" {print $1}' /proc/kallsyms):8:w {
  @[kstack] = count();
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>"hit" and exit when the memory pointed to by <code>arg1</code> of <code>increment</code> is written to:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# cat wpfunc.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

__attribute__((noinline))
void increment(__attribute__((unused)) int _, int *i)
{
  (*i)++;
}

int main()
{
  int *i = malloc(sizeof(int));
  while (1)
  {
    increment(0, i);
    (*i)++;
    usleep(1000);
  }
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -e 'watchpoint:increment+arg1:4:w { printf("hit!\\n"); exit() }' -c ./wpfunc`}</pre>
</div>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_config_variables">Config Variables</h2>
<div className="sectionbody">
<div className="paragraph">
<p>Some behavior can only be controlled through config variables, which are listed here.
These can be set via the <a href="#_config_block">Config Block</a> directly in a script (before any probes) or via their environment variable equivalent, which is upper case and includes the <code>BPFTRACE_</code> prefix e.g. <code>stack_mode</code>'s environment variable would be <code>BPFTRACE_STACK_MODE</code>.</p>
</div>
<div className="sect2">
<h3 id="_cache_user_symbols">cache_user_symbols</h3>
<div className="paragraph">
<p>Default: PER_PROGRAM if ASLR disabled or <code>-c</code> option given, PER_PID otherwise.</p>
</div>
<div className="ulist">
<ul>
<li>
<p>PER_PROGRAM - each program has its own cache. If there are more processes with enabled ASLR for a single program, this might produce incorrect results.</p>
</li>
<li>
<p>PER_PID - each process has its own cache. This is accurate for processes with ASLR enabled, and enables bpftrace to preload caches for processes running at probe attachment ti
me.
If there are many processes running, it will consume a lot of a memory.</p>
</li>
<li>
<p>NONE - caching disabled. This saves the most memory, but at the cost of speed.</p>
</li>
</ul>
</div>
</div>
<div className="sect2">
<h3 id="_cpp_demangle">cpp_demangle</h3>
<div className="paragraph">
<p>Default: 1</p>
</div>
<div className="paragraph">
<p>C++ symbol demangling in userspace stack traces is enabled by default.</p>
</div>
<div className="paragraph">
<p>This feature can be turned off by setting the value of this environment variable to <code>0</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="_lazy_symbolication">lazy_symbolication</h3>
<div className="paragraph">
<p>Default: 0</p>
</div>
<div className="paragraph">
<p>For user space symbols, symbolicate lazily/on-demand (1) or symbolicate everything ahead of time (0).</p>
</div>
</div>
<div className="sect2">
<h3 id="_log_size">log_size</h3>
<div className="paragraph">
<p>Default: 1000000</p>
</div>
<div className="paragraph">
<p>Log size in bytes.</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_bpf_progs">max_bpf_progs</h3>
<div className="paragraph">
<p>Default: 512</p>
</div>
<div className="paragraph">
<p>This is the maximum number of BPF programs (functions) that bpftrace can generate.
The main purpose of this limit is to prevent bpftrace from hanging since generating a lot of probes
takes a lot of resources (and it should not happen often).</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_cat_bytes">max_cat_bytes</h3>
<div className="paragraph">
<p>Default: 10000</p>
</div>
<div className="paragraph">
<p>Maximum bytes read by cat builtin.</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_map_keys">max_map_keys</h3>
<div className="paragraph">
<p>Default: 4096</p>
</div>
<div className="paragraph">
<p>This is the maximum number of keys that can be stored in a map.
Increasing the value will consume more memory and increase startup times.
There are some cases where you will want to, for example: sampling stack traces, recording timestamps for each page, etc.</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_probes">max_probes</h3>
<div className="paragraph">
<p>Default: 512</p>
</div>
<div className="paragraph">
<p>This is the maximum number of probes that bpftrace can attach to.
Increasing the value will consume more memory, increase startup times, and can incur high performance overhead or even freeze/crash the
system.</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_strlen">max_strlen</h3>
<div className="paragraph">
<p>Default: 64</p>
</div>
<div className="paragraph">
<p>The maximum length (in bytes) for values created by <code>str()</code>, <code>buf()</code> and <code>path()</code>.</p>
</div>
<div className="paragraph">
<p>This limit is necessary because BPF requires the size of all dynamically-read strings (and similar) to be declared up front. This is the size for all strings (and similar) in bpftrace unless specified at the call site.
There is no artificial limit on what you can tune this to. But you may be wasting resources (memory and cpu) if you make this too high.</p>
</div>
</div>
<div className="sect2">
<h3 id="_max_type_res_iterations">max_type_res_iterations</h3>
<div className="paragraph">
<p>Default: 0</p>
</div>
<div className="paragraph">
<p>Maximum number of levels of nested field accesses for tracepoint args.
0 is unlimited.</p>
</div>
</div>
<div className="sect2">
<h3 id="_missing_probes">missing_probes</h3>
<div className="paragraph">
<p>Default: <code>warn</code></p>
</div>
<div className="paragraph">
<p>Controls handling of probes with multiple kprobe or uprobe attach points which
cannot be attached to some functions because they do not exist in the kernel or
in the traced binary.</p>
</div>
<div className="paragraph">
<p>The possible options are:
- <code>error</code> - always fail on missing probes
- <code>warn</code> - print a warning but continue execution
- <code>ignore</code> - silently ignore missing probes</p>
</div>
</div>
<div className="sect2">
<h3 id="_on_stack_limit">on_stack_limit</h3>
<div className="paragraph">
<p>Default: 32</p>
</div>
<div className="paragraph">
<p>The maximum size (in bytes) of individual objects that will be stored on the BPF stack. If they are larger than this limit they will be stored in pre-allocated memory.</p>
</div>
<div className="paragraph">
<p>This exists because the BPF stack is limited to 512 bytes and large objects make it more likely that we&#8217;ll run out of space. bpftrace can store objects that are larger than the <code>on_stack_limit</code> in pre-allocated memory to prevent this stack error. However, storing in pre-allocated memory may be less memory efficient. Lower this default number if you are still seeing a stack memory error or increase it if you&#8217;re worried about memory consumption.</p>
</div>
</div>
<div className="sect2">
<h3 id="_perf_rb_pages">perf_rb_pages</h3>
<div className="paragraph">
<p>Default: 64</p>
</div>
<div className="paragraph">
<p>Number of pages to allocate per CPU perf ring buffer.
The value must be a power of 2.
If you&#8217;re getting a lot of dropped events bpftrace may not be processing events in the ring buffer fast enough.
It may be useful to bump the value higher so more events can be queued up.
The tradeoff is that bpftrace will use more memory.</p>
</div>
</div>
<div className="sect2">
<h3 id="_stack_mode">stack_mode</h3>
<div className="paragraph">
<p>Default: bpftrace</p>
</div>
<div className="paragraph">
<p>Output format for ustack and kstack builtins.
Available modes/formats:</p>
</div>
<div className="ulist">
<ul>
<li>
<p>bpftrace</p>
</li>
<li>
<p>perf</p>
</li>
<li>
<p>raw: no symbolication</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>This can be overwritten at the call site.</p>
</div>
</div>
<div className="sect2">
<h3 id="_str_trunc_trailer">str_trunc_trailer</h3>
<div className="paragraph">
<p>Default: <code>..</code></p>
</div>
<div className="paragraph">
<p>Trailer to add to strings that were truncated.
Set to empty string to disable truncation trailers.</p>
</div>
</div>
<div className="sect2">
<h3 id="_print_maps_on_exit">print_maps_on_exit</h3>
<div className="paragraph">
<p>Default: 1</p>
</div>
<div className="paragraph">
<p>Controls whether maps are printed on exit. Set to <code>0</code> in order to change the default behavior and not automatically print maps at program exit.</p>
</div>
</div>
<div className="sect2">
<h3 id="_symbol_source">symbol_source</h3>
<div className="paragraph">
<p>Default: <code>dwarf</code> if <code>bpftrace</code> is compiled with LLDB, <code>symbol_table</code> otherwise</p>
</div>
<div className="paragraph">
<p>Choose how bpftrace will resolve all <code>uprobe</code> symbol locations.</p>
</div>
<div className="paragraph">
<p>Available options:</p>
</div>
<div className="ulist">
<ul>
<li>
<p><code>dwarf</code> - locate uprobes using DebugInfo, which yields more accurate stack traces (<code>ustack</code>). Fall back to the Symbol Table if it can&#8217;t locate the probe using DebugInfo.</p>
</li>
<li>
<p><code>symbol_table</code> - don&#8217;t use DebugInfo and rely on the ELF Symbol Table instead.</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>If the DebugInfo was rewritten by a post-linkage optimisation tool (like BOLT or AutoFDO), it might yield an incorrect address for a probe location.
This config can force using the Symbol Table, for when the DebugInfo returns invalid addresses.</p>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_environment_variables">Environment Variables</h2>
<div className="sectionbody">
<div className="paragraph">
<p>These are not available as part of the standard set of <a href="#_config_variables">Config Variables</a> and can only be set as environment variables.</p>
</div>
<div className="sect2">
<h3 id="_bpftrace_btf">BPFTRACE_BTF</h3>
<div className="paragraph">
<p>Default: None</p>
</div>
<div className="paragraph">
<p>The path to a BTF file. By default, bpftrace searches several locations to find a BTF file.
See src/btf.cpp for the details.</p>
</div>
</div>
<div className="sect2">
<h3 id="_bpftrace_debug_output">BPFTRACE_DEBUG_OUTPUT</h3>
<div className="paragraph">
<p>Default: 0</p>
</div>
<div className="paragraph">
<p>Outputs bpftrace&#8217;s runtime debug messages to the trace_pipe. This feature can be turned on by setting
the value of this environment variable to <code>1</code>.</p>
</div>
</div>
<div className="sect2">
<h3 id="_bpftrace_kernel_build">BPFTRACE_KERNEL_BUILD</h3>
<div className="paragraph">
<p>Default: <code>/lib/modules/$(uname -r)</code></p>
</div>
<div className="paragraph">
<p>Only used with <code>BPFTRACE_KERNEL_SOURCE</code> if it is out-of-tree Linux kernel build.</p>
</div>
</div>
<div className="sect2">
<h3 id="_bpftrace_kernel_source">BPFTRACE_KERNEL_SOURCE</h3>
<div className="paragraph">
<p>Default: <code>/lib/modules/$(uname -r)</code></p>
</div>
<div className="paragraph">
<p>bpftrace requires kernel headers for certain features, which are searched for in this directory.</p>
</div>
</div>
<div className="sect2">
<h3 id="_bpftrace_vmlinux">BPFTRACE_VMLINUX</h3>
<div className="paragraph">
<p>Default: None</p>
</div>
<div className="paragraph">
<p>This specifies the vmlinux path used for kernel symbol resolution when attaching kprobe to offset.
If this value is not given, bpftrace searches vmlinux from pre defined locations.
See src/attached_probe.cpp:find_vmlinux() for details.</p>
</div>
</div>
</div>
</div>
<div className="sect1">
<h2 id="_options_expanded">Options Expanded</h2>
<div className="sectionbody">
<div className="sect2">
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
<div className="sect2">
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
<div className="sect2">
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

Attaching 1 probe...`}</pre>
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

Attaching 1 probe...
open path: .com.google.Chrome.ASsbu2
open path: .com.google.Chrome.gimc10
open path: .com.google.Chrome.R1234s`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_verbose_output">Verbose Output</h3>
<div className="paragraph">
<p>The <code>-v</code> option prints more information about the program as it is run:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# bpftrace -v -e 'tracepoint:syscalls:sys_enter_nanosleep { printf("%s is sleeping.\\n", comm); }'
AST node count: 7
Attaching 1 probe...

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
<div className="sect1">
<h2 id="_advanced_topics">Advanced Topics</h2>
<div className="sectionbody">
<div className="sect2">
<h3 id="_address_spaces">Address Spaces</h3>
<div className="paragraph">
<p>Kernel and user pointers live in different address spaces which, depending on the CPU architecture, might overlap.
Trying to read a pointer that is in the wrong address space results in a runtime error.
This error is hidden by default but can be enabled with the <code>-kk</code> flag:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`stdin:1:9-12: WARNING: Failed to probe_read_user: Bad address (-14)
BEGIN { @=*uptr(kaddr("do_poweroff")) }
        ~~~`}</pre>
</div>
</div>
<div className="paragraph">
<p>bpftrace tries to automatically set the correct address space for a pointer based on the probe type, but might fail in cases where it is unclear.
The address space can be changed with the <a href="#functions-kptr">kptrs</a> and <a href="#functios-uptr">uptr</a> functions.</p>
</div>
</div>
<div className="sect2">
<h3 id="_btf_support">BTF Support</h3>
<div className="paragraph">
<p>If the kernel version has BTF support, kernel types are automatically available and there is no need to include additional headers to use them.
It is not recommended to mix definitions from multiple sources (ie. BTF and header files).
If your program mixes definitions, bpftrace will do its best but can easily get confused due to redefinition conflicts.
Prefer to exclusively use BTF as it can never get out of sync on a running system. BTF is also less susceptible to parsing failures (C is constantly evolving).
Almost all current linux deployments will support BTF.</p>
</div>
<div className="paragraph">
<p>To allow users to detect this situation in scripts, the preprocessor macro <code>BPFTRACE_HAVE_BTF</code> is defined if BTF is detected.
See <code>tools/</code> for examples of its usage.</p>
</div>
<div className="paragraph">
<p>Requirements for using BTF for vmlinux:</p>
</div>
<div className="ulist">
<ul>
<li>
<p>Linux 4.18+ with CONFIG_DEBUG_INFO_BTF=y</p>
<div className="ulist">
<ul>
<li>
<p>Building requires dwarves with pahole v1.13+</p>
</li>
</ul>
</div>
</li>
<li>
<p>bpftrace v0.9.3+ with BTF support (built with libbpf v0.0.4+)</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>Additional requirements for using BTF for kernel modules:</p>
</div>
<div className="ulist">
<ul>
<li>
<p>Linux 5.11+ with CONFIG_DEBUG_INFO_BTF_MODULES=y</p>
<div className="ulist">
<ul>
<li>
<p>Building requires dwarves with pahole v1.19+</p>
</li>
</ul>
</div>
</li>
</ul>
</div>
<div className="paragraph">
<p>See kernel documentation for more information on BTF.</p>
</div>
</div>
<div className="sect2">
<h3 id="_clang_environment_variables">Clang Environment Variables</h3>
<div className="paragraph">
<p>bpftrace parses header files using libclang, the C interface to Clang.
Thus environment variables affecting the clang toolchain can be used.
For example, if header files are included from a non-default directory, the <code>CPATH</code> or <code>C_INCLUDE_PATH</code> environment variables can be set to allow clang to locate the files.
See clang documentation for more information on these environment variables and their usage.</p>
</div>
</div>
<div className="sect2">
<h3 id="_complex_tools">Complex Tools</h3>
<div className="paragraph">
<p>bpftrace can be used to create some powerful one-liners and some simple tools.
For complex tools, which may involve command line options, positional parameters, argument processing, and customized output, consider switching to bcc.
bcc provides Python (and other) front-ends, enabling usage of all the other Python libraries (including argparse), as well as a direct control of the kernel BPF program.
The down side is that bcc is much more verbose and laborious to program.
Together, bpftrace and bcc are complimentary.</p>
</div>
<div className="paragraph">
<p>An expected development path would be exploration with bpftrace one-liners, then and ad hoc scripting with bpftrace, then finally, when needed, advanced tooling with bcc.</p>
</div>
<div className="paragraph">
<p>As an example of bpftrace vs bcc differences, the bpftrace xfsdist.bt tool also exists in bcc as xfsdist.py. Both measure the same functions and produce the same summary of information.
However, the bcc version supports various arguments:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# ./xfsdist.py -h
usage: xfsdist.py [-h] [-T] [-m] [-p PID] [interval] [count]

Summarize XFS operation latency

positional arguments:
  interval            output interval, in seconds
  count               number of outputs

optional arguments:
  -h, --help          show this help message and exit
  -T, --notimestamp   don't include timestamp on interval output
  -m, --milliseconds  output in milliseconds
  -p PID, --pid PID   trace this PID only

examples:
    ./xfsdist            # show operation latency as a histogram
    ./xfsdist -p 181     # trace PID 181 only
    ./xfsdist 1 10       # print 1 second summaries, 10 times
    ./xfsdist -m 5       # 5s summaries, milliseconds`}</pre>
</div>
</div>
<div className="paragraph">
<p>The bcc version is 131 lines of code. The bpftrace version is 22.</p>
</div>
</div>
<div className="sect2">
<h3 id="_errors">Errors</h3>
<div className="olist arabic">
<ol className="arabic">
<li>
<p>Looks like the BPF stack limit of 512 bytes is exceeded BPF programs that operate on many data items may hit this limit.
There are a number of things you can try to stay within the limit:</p>
<div className="olist loweralpha">
<ol className="loweralpha" type="a">
<li>
<p>Find ways to reduce the size of the data used in the program. Eg, avoid strings if they are unnecessary: use pid instead of comm. Use fewer map keys.</p>
</li>
<li>
<p>Split your program over multiple probes.</p>
</li>
<li>
<p>Check the status of the BPF stack limit in Linux (it may be increased in the future, maybe as a tuneable).</p>
</li>
<li>
<p>(advanced): Run -d and examine the LLVM IR, and look for ways to optimize src/ast/codegen_llvm.cpp.</p>
</li>
</ol>
</div>
</li>
<li>
<p>Kernel headers not found
bpftrace requires kernel headers for certain features, which are searched for by default in: <code>/lib/modules/$(uname -r)</code>.
The default search directory can be overridden using the environment variable BPFTRACE_KERNEL_SOURCE and also BPFTRACE_KERNEL_BUILD if it is out-of-tree Linux kernel build.</p>
</li>
</ol>
</div>
</div>
<div className="sect2">
<h3 id="_invocation_mode">Invocation Mode</h3>
<div className="paragraph">
<p>There are three invocation modes for bpftrace built-in functions.</p>
</div>
<table className="tableblock frame-all grid-all stretch">
<colgroup>
<col />
<col />
<col />
</colgroup>
<tbody>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">Mode</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Description</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">Example functions</p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">Synchronous</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The value/effect of the built-in function is determined/handled right away by the bpf program in the kernel space.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>reg(), str(), ntop()</code></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">Asynchronous</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The value/effect of the built-in function is determined/handled later by the bpftrace process in the user space.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>printf(), clear(), exit()</code></p></td>
</tr>
<tr>
<td className="tableblock halign-left valign-top"><p className="tableblock">Compile-time</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock">The value of the built-in function is determined before bpf programs are running.</p></td>
<td className="tableblock halign-left valign-top"><p className="tableblock"><code>kaddr(), cgroupid(), offsetof()</code></p></td>
</tr>
</tbody>
</table>
<div className="paragraph">
<p>While BPF in the kernel can do a lot there are still things that can only be done from user space, like the outputting (printing) of data.
The way bpftrace handles this is by sending events from the BPF program which user-space will pick up some time in the future (usually in milliseconds).
Operations that happen in the kernel are 'synchronous' ('sync') and those that are handled in user space are 'asynchronous' ('async')</p>
</div>
<div className="paragraph">
<p>The asynchronous behaviour can lead to some unexpected behavior as updates can happen before user space had time to process the event. The following situations may occur:</p>
</div>
<div className="ulist">
<ul>
<li>
<p>event loss: when using printf(), the amount of data printed may be less than the actual number of events generated by the kernel during BPF program&#8217;s execution.</p>
</li>
<li>
<p>delayed exit: when using the exit() to terminate the program, bpftrace needs to handle the exit signal asynchronously causing the BPF program may continue to run for some additional time.</p>
</li>
</ul>
</div>
<div className="paragraph">
<p>One example is updating a map value in a tight loop:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
    @=0;
    unroll(10) {
      print(@);
      @++;
    }
    exit()
}`}</pre>
</div>
</div>
<div className="paragraph">
<p>Maps are printed by reference not by value and as the value gets updated right after the print user-space will likely only see the final value once it processes the event:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`@: 10
@: 10
@: 10
@: 10
@: 10
@: 10
@: 10
@: 10
@: 10
@: 10`}</pre>
</div>
</div>
<div className="paragraph">
<p>Therefore, when you need precise event statistics, it is recommended to use synchronous functions (e.g. count() and hist()) to ensure more reliable and accurate results.</p>
</div>
</div>
<div className="sect2">
<h3 id="_map_printing">Map Printing</h3>
<div className="paragraph">
<p>By default when a bpftrace program exits it will print all maps to stdout.
If you don&#8217;t want this, you can either override the <code>print_maps_on_exit</code> configuration option or you can specify an <code>END</code> probe and <code>clear</code> the maps you don&#8217;t want printed.</p>
</div>
<div className="paragraph">
<p>For example, these two scripts are equivalent and will print nothing on exit:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`config = {
  print_maps_on_exit=0
}

BEGIN {
  @a = 1;
  @b[1] = 1;
}`}</pre>
</div>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  @a = 1;
  @b[1] = 1;
}

END {
  clear(@a);
  clear(@b);
}`}</pre>
</div>
</div>
</div>
<div className="sect2">
<h3 id="_systemd_support">Systemd support</h3>
<div className="dlist">
<dl>
<dt className="hdlist1">To run bpftrace in the background using systemd</dt>
</dl>
</div>
<div className="listingblock">
<div className="content">
<pre>{`# systemd-run --unit=bpftrace --service-type=notify bpftrace -e 'kprobe:do_nanosleep { printf("%d sleeping\\n", pid); }'`}</pre>
</div>
</div>
<div className="paragraph">
<p>In the above example, systemd-run will not finish until bpftrace has attached
its probes, so you can be sure that all following commands will be traced. To
stop tracing, run <code>systemctl stop bpftrace</code>.</p>
</div>
<div className="paragraph">
<p>To debug early boot issues, bpftrace can be invoked via a systemd service
ordered before the service that needs to be traced. A basic unit file to run
bpftrace before another service looks as follows::</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`[Unit]
Before=service-i-want-to-trace.service

[Service]
Type=notify
ExecStart=bpftrace -e 'kprobe:do_nanosleep { printf("%d sleeping\\n", pid); }'`}</pre>
</div>
</div>
<div className="paragraph">
<p>Similarly to the systemd-run example, the service to be traced will not start
until bpftrace started by the systemd unit has attached its probes.</p>
</div>
</div>
<div className="sect2">
<h3 id="_per_cpu_types">PER_CPU types</h3>
<div className="paragraph">
<p>For bpftrace PER_CPU types (search this document for "PER_CPU"), you may coerce
(and thus force a more expensive synchronous read) the type to an integer using
a cast or by doing a comparison. This is useful for when you need an integer
during comparisons, <code>printf()</code>, or other.</p>
</div>
<div className="paragraph">
<p>For example:</p>
</div>
<div className="listingblock">
<div className="content">
<pre>{`BEGIN {
  @c = count();
  @s = sum(3);
  @s = sum(9);

  if (@s == 12) {                             // Coerces @s
    printf("%d %d\\n", (int64)@c, (int64)@s);  // Coerces @c and @s and prints "1 12"
  }
}`}</pre>
</div>
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
<li><a href="#_supported_architectures">Supported architectures</a></li>
<li><a href="#_options">Options</a></li>
<li><a href="#_terminology">Terminology</a></li>
<li><a href="#_program_files">Program Files</a></li>
<li><a href="#_bpftrace_language">bpftrace Language</a></li>
<li><a href="#_builtins">Builtins</a></li>
<li><a href="#_functions">Functions</a></li>
<li><a href="#_map_functions">Map Functions</a></li>
<li><a href="#_probes">Probes</a></li>
<li><a href="#_config_variables">Config Variables</a></li>
<li><a href="#_environment_variables">Environment Variables</a></li>
<li><a href="#_options_expanded">Options Expanded</a></li>
<li><a href="#_advanced_topics">Advanced Topics</a></li>
</ul>
            </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
