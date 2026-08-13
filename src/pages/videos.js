import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReactPlayer from 'react-player'
import { useState } from 'react';

import Heading from '@theme/Heading';
import styles from './index.module.css';


function VideosBody() {
    const {siteConfig} = useDocusaurusContext();
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=18xPsqYjUhE');
    return (
<div className="container container--fluid margin-vert--lg">
        <div className="row video-row">
        	<div className="col col--8">
			<h1>Videos</h1>
			<div className="video_wrapper">
				<ReactPlayer className="video_player" height="100%" url={url} width="100%"/>
			</div>
			<br />
			<p><b>Note</b>: some of the content in these videos may be out of date.</p>
          	</div>
        	<div className="col col--4">
			<ul className="video-list">
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=fAfuBiIMWLU"); }}>Bpftrace: learning to be a language - 2026</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=18xPsqYjUhE"); }}>Bpftrace OOM profiler - 2025</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=esfcBJAc8qI&t=50s"); }}>Evolving a DSL: How bpftrace makes language design decisions - 2025</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=19RZ7b6AZJ0"); }}>Making bpftrace more powerful - 2023</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=wMtArNjRYXU"); }}>Bpftrace Recipes: 5 Real Problems Solved - 2023</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=gSxntAO2Iys"); }}>Linux tracing made simpler with bpftrace - 2022</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=C2n2i__YCcI"); }}>Ahead-of-time compiled bpftrace programs - 2021</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=bGAVrtb_tFs"); }}>Getting Started with BPF observability - 2021</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=nDY4iC_ekQY&t=1477s"); }}>bpftrace internals - 2020</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=ZiGTbItyJyg"); }}>Using bpftrace with Performance Co-Pilot & Grafana - 2020</a></li>
				<li><a onClick={() => { setUrl("https://www.youtube.com/watch?v=93aHXYqZmU0"); }}>An introduction to bpftrace tracing language - 2020</a></li>
			</ul>
        	</div>
        </div>
</div>
    );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: dynamic tracing for Linux`}
      description="Description will go into a meta tag in <head />">
      <VideosBody />
    </Layout>
  );
}
