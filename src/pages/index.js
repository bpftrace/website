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
            <p>bpftrace is a high-level tracing language for Linux and provides a quick and easy way for people to write observability-based <Link to="https://ebpf.io/what-is-ebpf/" target="_self">eBPF</Link> programs, especially those unfamiliar with the complexities of eBPF.</p> 
            <p><Link to="/tutorial-one-liners" target="_self">Learn</Link> more about bpftrace, check out all the great <Link to="https://github.com/bpftrace/bpftrace/blob/master/tools/README.md" target="_self">tools</Link> built with bpftrace, and please <Link to="https://github.com/bpftrace/bpftrace/blob/master/CONTRIBUTING.md" target="_self">contribute!</Link></p>
          </div>
          <div class="col col--6">
            <div class="col-demo hero--video">
            <video width="600" autoplay controls>
              <source src="img/bpftrace-homepage2.mp4" type="video/mp4" />
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
      title={`${siteConfig.title}: dynamic tracing for Linux`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}
