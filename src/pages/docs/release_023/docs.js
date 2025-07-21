import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReactPlayer from 'react-player'
import { useState } from 'react';

import Heading from '@theme/Heading';
import styles from '../../index.module.css';


function DocsBody() {
    const {siteConfig} = useDocusaurusContext();
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=18xPsqYjUhE');
    return (
<div className="container container--fluid margin-vert--lg">
        <div className="row docs-row">
        	<div className="col col--8">
			<h1>Documentation (Version: 0.23 - latest)</h1>
            <p>bpftrace documentation is divided into three sections. However for earlier bpftrace versions these sections are part of a single document, which are available in the dropdown.</p>
                <div className="container container--fluid margin-vert--lg">
                <div className="row">
                    <div className="col col--4">
                        <h3><a href="./language">The Language</a></h3>
                        <p>Everything you wanted to know about bpftrace's syntax, types, concepts, and structure.</p>
                        <p><a href="./language">Read More</a></p>
                    </div>
                    <div className="col col--4">
                        <h3><a href="./stdlib">The Standard Library</a></h3>
                        <p>This includes builtins, functions, and map functions.</p>
                        <p><a href="./stdlib">Read More</a></p>
                    </div>
                    <div className="col col--4">
                        <h3><a href="./cli">The Command Line Tool</a></h3>
                        <p>The man page. This include information on how to invoke bpftrace including all CLI options, ENV variables, and run modes.</p>
                        <p><a href="./cli">Read More</a></p>
                    </div>
                </div>
                </div>
          	</div>
        	<div className="col col--2">
			<div class="dropdown dropdown--hoverable">
                <button class="button button--primary releases-dropdown">0.23</button>
                <ul class="dropdown__menu">
                    <li>
                    <a class="dropdown__link" href="../pre-release/docs">pre-release</a>
                    </li>
                    <li>
                    <a class="dropdown__link" href="../0.22">0.22</a>
                    </li>
                    <li>
                    <a class="dropdown__link" href="../0.22">0.21</a>
                    </li>
                </ul>
                </div>
        	</div>
        </div>
</div>
    );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: dynamic tracing for Linux`}>
      <DocsBody />
    </Layout>
  );
}
