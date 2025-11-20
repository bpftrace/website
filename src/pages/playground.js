import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Playground from '@site/src/components/playground';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReactPlayer from 'react-player'
import { useCallback, useRef, useState } from 'react';

import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: dynamic tracing for Linux`}>
        <div className="container container--fluid margin-vert--lg">
            <h1>Playground</h1>
            <p><b>Note: </b> Not all bpftrace features are supported in the playground yet.</p>
            <Playground />
        </div>
    </Layout>
  );
}
