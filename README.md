# Website

This is the home of the [bpftrace](https://bpftrace.org) website. The site itself is built using [Docusaurus](https://docusaurus.io/) with the `master` branch hosting the content which is automatically built and served through the GitHub pages infrastructure.

## Development

- Clone the website repo:
	- `git clone git@github.com:bpftrace/website.git`

- Setup node modules in repo (on first clone):
	- `npm install`

- Do your changes in your own branch.

- Test your changes locally defaults to `localhost:3000`:
	- `npm start`

- If everything is OK, push your branch, create a PR and merge to master.

## Staging

A staging website exists at https://staging.bpftrace.org/ to optionally validate changes before deploying them to the main website.

This staging website is hosted in a fork: https://github.com/bpftrace/website-staging/. When manually interacting with this repository, please ensure that the `CNAME` and `robots.txt` changes remain in place.

The easiest way to deploy changes to the staging site is to use the GitHub comment command `/stage`:
1. Create a PR against the main website repository, as normal
2. Create a comment containing just the text `/stage`

## Updating the Docs

From the main bpftrace repo (https://github.com/bpftrace/bpftrace):
```bash
$ asciidoctor man/adoc/bpftrace.adoc -b html5 -o adoc.html
```

From this repo:
```bash
$ ./make-doc.js PATH/TO/adoc.html
```

This will update the pre-release docs. To update a different version,
checkout the specific branch of the main repro and re-run the asciidoctor
command above then add the version to make-doc command above e.g.

```bash
$ ./make-doc.js PATH/TO/adoc.html 0.22
```

If updating the docs for the latest released version of bpftrace, in addition to
generating docs for the numbered version as above, you'll need to run the
command for a second time with the version name "latest":
```bash
$ ./make-doc.js PATH/TO/adoc.html latest
```
