# Website

This is the home of the [bpftrace](https://bpftrace.org) website. The site itself is built using [Docusaurus](https://docusaurus.io/) with the `main` branch hosting the content and the `gh-pages` branch hosting the actual static content that is served through the GitHub pages infrastructure.

Steps to develop, test and deploy website changes:

- Clone the website repo:
	- `git clone git@github.com:bpftrace/website.git`

- Setup node modules in repo (on first clone):
	- `npm install`

- Do your changes in your own branch.

- Test your changes locally defaults to `localhost:3000`:
	- `npm start`

- If everything is OK, push your branch, create a PR and merge to main.

