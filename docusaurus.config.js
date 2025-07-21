// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'bpftrace',
  tagline: 'Dynamic Tracing for Linux',
  favicon: 'img/bpftrace_Icon-Black-Yellow_BG.svg',

  // Set the production url of your site here
  url: 'https://bpftrace.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // baseUrl: '',
  trailingSlash: false,

  organizationName: 'bpftrace',
  projectName: 'website',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs',
            to: '/docs/latest',
          },
        ],
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-PDDZZ0QM0V',
        anonymizeIP: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        logo: {
          alt: 'bpftrace Logo',
         // replace with bpftrace svg
          src: 'img/bpftrace_Full_Logo-Black.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'About',
            to: 'about',
            position: 'left',
            items: [
              {
                label: 'About bpftrace',
                to: '/about'
              },
              {
                label: 'Release Schedule',
                href: 'https://github.com/bpftrace/bpftrace/blob/master/docs/release_process.md'
              },
              {
                label: 'Tools',
                href: 'https://github.com/bpftrace/bpftrace/blob/master/tools/README.md'
              },
              {
                label: 'How to Contribute',
                href: 'https://github.com/bpftrace/bpftrace/blob/master/CONTRIBUTING.md',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Learn',
            position: 'left',
            items: [
              {
                label: 'One-Liners',
                to: '/one-liners'
              },
              {
                label: 'One-Liner Tutorial',
                to: '/tutorial-one-liners'
              },
              {
                label: 'Hands On Lab',
                to: '/hol/intro'
              },
              {
                label: 'Glossary',
                to: '/glossary'
              },
              {
                label: 'Videos',
                to: '/videos'
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            to: '/docs/release_023/docs',
            items: [
              {
                label: 'The Language',
                to: '/docs/release_023/language'
              },
              {
                label: 'The Standard Library',
                to: '/docs/release_023/stdlib'
              },
              {
                label: 'The Command Line Tool',
                to: '/docs/release_023/cli'
              },
               {
                label: 'Pre-release docs',
                to: '/docs/pre-release/docs'
              },
              {
                label: '0.22 docs',
                to: '/docs/0.22'
              },
              {
                label: '0.21 docs',
                to: '/docs/0.21'
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            items: [
              {
                label: 'Discussion Forum',
                href: 'https://github.com/bpftrace/bpftrace/discussions',
              },
              {
                label: 'IRC',
                href: 'https://webchat.oftc.net/?nick=&channels=%23bpftrace',
              },
              {
                label: 'Office Hours',
                to: 'office-hours'
              },
            ],
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/bpftrace/bpftrace',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs + Tutorials',
            items: [
              {
                label: 'Documentation',
                to: '/docs/latest',
              },
              {
                label: 'One-Liner Tutorial',
                to: '/tutorial-one-liners',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'IRC',
                href: 'https://webchat.oftc.net/?nick=&channels=%23bpftrace',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bpftrace/bpftrace',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
    }),
};

export default config;
