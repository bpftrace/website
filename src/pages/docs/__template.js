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
            <div id="version-content" />
            <div id="body-content" />
          </div>
          <div className="col col--2">
            <div className="docs-toc">
              <div id="toc-content" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
