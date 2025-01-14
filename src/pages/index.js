import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import styles from './index.module.css';


function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
        <div class="row">
          <div class="col col--6">
            <img
                className={styles.heroImage}
                src={useBaseUrl('img/bpftrace_Full_Logo-Black.svg')}
                alt="bpftrace docs"
              />
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p>bpftrace uses LLVM as a backend to compile scripts to <Link to="https://ebpf.io/what-is-ebpf/" target="_self">eBPF</Link>-bytecode and makes use of <Link to="https://github.com/libbpf/libbpf" target="_self">libbpf</Link> and <Link to="https://github.com/iovisor/bcc" target="_self">bcc</Link> for interacting with the Linux BPF subsystem, as well as existing Linux tracing capabilities: kernel dynamic tracing (kprobes), user-level dynamic tracing (uprobes), tracepoints, etc. The bpftrace language is inspired by awk, C, and predecessor tracers such as DTrace and SystemTap. <br />bpftrace was created by Alastair Robertson.</p>
          </div>
          <div class="col col--6">
            <div class="col-demo hero--video">
            <video width="600" autoplay controls>
              <source src="img/bpftrace-homepage.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
            </div>
          </div>
        </div>
        </div>
      </header>
    );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: dynamic tracing for the Linux platform`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}
