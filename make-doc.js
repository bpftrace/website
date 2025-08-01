#!/usr/bin/env node

/*
 * This script takes an html file, specifically generated by asciidoctor
 * via this command:
 * `asciidoctor man/adoc/bpftrace.adoc -b html5 -o adoc.html`
 * and transforms it into a js file for the bpftrace website's docs section.
 *
 * Usage:
 * `./make-doc.js adoc.html 0.22` - to make docs from version 0.22
 * `./make-doc.js adoc.html` - to make the unreleased/master docs
 */

var fs = require('fs')
var path = require('path')
const { createReadStream } = require('node:fs')
const { createInterface } = require('node:readline')
const templatePath = path.join(__dirname, '/src/pages/docs/__template.js')

const arguments = process.argv

if (arguments.length < 3) {
	console.error("Need a adoc html file path e.g. adoc.html");
	process.exit(1);
}

const filePath = arguments[2]
const hasVersion = arguments.length == 4
const versionArg = hasVersion ? arguments[3] : "pre-release"
const PRE_START = "<pre>";
const PRE_END = "</pre>";
const PRE_CURLY_START = "<pre>{`"
const PRE_CURLY_END = "`}</pre>"

var body = []
var toc = []

function replaceCodeSnippetWord(str) {
	return str.replaceAll("\\n", "\\\\n")
		  .replaceAll("\\0", "\\\\0")
		  .replaceAll("&gt;", ">")
		  .replaceAll("&lt;", "<");

}

async function processAdoc() {

	const destinationPath = path.join(
		__dirname,
		'/src/pages/docs/',
		versionArg + '/cli.js');

	const fileStream = createReadStream(filePath);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	var insideToc = false;
	var insideBody = false;
	var insidePre = false;

	for await (var line of rl) {
		if (line.includes("<ul class=\"sectlevel1\">")) {
			insideToc = true;
			toc.push("<ul className=\"table-of-contents table-of-contents__left-border\">");
			continue;
		}
		if (line.includes("<div id=\"content\">")) {
			insideBody = true;
		}
		if (insideToc) {
			toc.push(line);
			if (line.includes("</ul>")) {
				insideToc = false;
			}
			continue;
		}
		if (insideBody) {
			if (line.includes("<div id=\"footer\">")) {
				break;
			}

			if (line.includes("<pre")) {
				if (line.includes(PRE_END)) {
					body.push(
						replaceCodeSnippetWord(line)
						.replace(PRE_START, PRE_CURLY_START)
					        .replace(PRE_END, PRE_CURLY_END)
					);
					continue;
				}
				insidePre = true;
				// For cases like <pre className="highlight"><code language="c++">
				let idx = line.lastIndexOf('>');
				line = PRE_CURLY_START + line.substring(idx + 1);
			}

			if (line.startsWith("<col ") || line === "<col>") {
				body.push("<col />")
			} else {
				if (insidePre) {
					if (line.includes(PRE_END)) {
						insidePre = false;
						line = line.replace(PRE_END, PRE_CURLY_END)
							   .replace("</code>", "");
					}
					body.push(replaceCodeSnippetWord(line));
				} else {
					body.push(
						line.replace(/<br>/ig, "<br />")
						.replace(/{/ig, "&#123;")
						.replace(/}/ig, "&#125;")
						.replace(/class="/ig, "className=\"")
						.replaceAll("https://github.com/bpftrace/bpftrace/blob/master/docs/language.md", "language")
						.replaceAll("https://github.com/bpftrace/bpftrace/blob/master/docs/stdlib.md", "stdlib")
						);
				}
			}

		}
	}

	fs.readFile(templatePath, {encoding: 'utf-8'}, function(err, data){
		if (err) {
			console.error("Error reading js template at path: ", templatePath);
			console.error(err);
			return;
		}

		const versionHeader = "<h1>The Command Line Tool (" + versionArg + ")</h1>"
		var versionPage = data.replace("<div id=\"version-content\" />", versionHeader)
				.replace("<div id=\"body-content\" />", body.join("\n"))
				.replace("<div id=\"toc-content\" />", toc.join("\n"))

		fs.writeFile(destinationPath, versionPage, err => {
			if (err) {
				console.error("Error writing new version doc to path: ", destinationPath);
			  	console.error(err);
				return;
			}

			console.log("Success.");
			console.log("Wrote: ", destinationPath);
		});
	});
}

async function processMarkdownDoc(filename) {

	const filePath = path.join(
		__dirname,
		'/bpftrace/docs/',
		filename);

	const destinationPath = path.join(
		__dirname,
		'/src/pages/docs/',
		versionArg,
		'/',
		filename)

	const fileStream = createReadStream(filePath);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	const newLines = [];
	let firstLine = true;

	for await (var line of rl) {
		if (firstLine) {
			newLines.push(line + ' (' + versionArg + ')');
			firstLine = false;
			continue;
		}
		newLines.push(
			line
			.replaceAll("../man/adoc/bpftrace.adoc", "cli")
			.replaceAll("stdlib.md", "stdlib")
			.replaceAll("language.md", "language")
		);
	}

	fs.writeFile(destinationPath, newLines.join('\n'), err => {
		if (err) {
			console.error("Error writing to path: ", destinationPath);
			console.error(err);
			return;
		}

		console.log("Success.");
		console.log("Wrote: ", destinationPath);
	});
}

processAdoc();
processMarkdownDoc("language.md");
processMarkdownDoc("stdlib.md");
