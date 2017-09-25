#!/usr/bin/env node

const { promisify } = require('util');
const { basename, resolve } = require('path');
const fs = require('fs');

const { re } = require('re-template-tag');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const version = require('../package.json').version;

const ENC = 'utf-8';

const DOCS = [
  resolve(`./docs/${version}/index.md`),
  resolve(`./docs/${version}/install.md`),
  resolve(`./docs/${version}/upgrade.md`),
  resolve(`./docs/${version}/config.md`),
  resolve(`./docs/${version}/basics.md`),
  resolve(`./docs/${version}/writing.md`),
  resolve(`./docs/${version}/scripts.md`),
  resolve(`./docs/${version}/build.md`),
  resolve(`./docs/${version}/advanced.md`),
  // resolve('./LICENSE.md'),
  // resolve('./NOTICE.md'),
  // resolve('./CHANGELOG.md'),
];

const FRONT_MATTER = `---
layout: page
title: Documentation
redirect_from:
  - /docs/latest/complete/
  - /docs/latest/print/
  - /docs/print/
sitemap: false
---\n\n`;

const INTRO_POSTFIX = `
**NOTE**: This document was created using Hydejack's print layout.
If you prefer to read it the documentation in your browser,
you can find it [here]({{ site.baseurl }}{% link docs/${version}/index.md %}).
{:.message}

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}`;

const OPTS = DOCS.map(d => basename(d, '.md')).join('|');

const RE_FM_BEGIN = /^---/; // beginning front matter at beginning of file
const RE_FM_END = /---/;    // end of front matter

const RE_CONTENT = /(.|\n)*?/;  // arbitrary content, nongreedy (!), captured
const RE_IGNORE = /(?:.|\n)*?/; // arbitrary content, nongreedy (!), NOT caputred

const FRONT_MATTER_REGEX = re`/${RE_FM_BEGIN}${RE_CONTENT}${RE_FM_END}/u`;

const RE_HEADING = /#+\s.+\n/;       // heading, e.g. `## Heading`
const RE_NO_TOC = /\{:\.no_toc\}\n/; // {:.no_toc}
const RE_LIST = /0\.\s.+\n/;         // list, e.g. `0. this will be replaced`
const RE_TOC = /\{:toc\}/;           // {:toc}

const TOC_REGEX = re`/${RE_HEADING}${RE_NO_TOC}${RE_LIST}${RE_TOC}/u`;

const RE_TITLE = /title:\s['"]?(.+)['"]?/;
const TITLE_IN_FRONT_MATTER_REEGEX =
  re`/${RE_FM_BEGIN}${RE_IGNORE}${RE_TITLE}${RE_IGNORE}${RE_FM_END}/u`;

const CONTINUE_WITH_REGEX = /Continue with .*\n{:.read-more}/g;

const INC_HEADING_REGEX = /^(#+\s.*)/gm;

const RE_INLINE_LINK = /(\[.*\]\()/;  // linked text inside []
const RE_NAMED_LINK = /(\[.*\]:\s+)/; // label like [1]:

const RE_LINK = new RegExp(`(${OPTS})\\.md[^#]`);  // link without #
const RE_LINK_HASH = new RegExp(`(${OPTS})\\.md#(.*)`); // link with #

const INLINE_LINK =      re`/${RE_INLINE_LINK}${RE_LINK}/ugm`
const INLINE_LINK_HASH = re`/${RE_INLINE_LINK}${RE_LINK_HASH}/ugm`
const NAMED_LINK =       re`/${RE_NAMED_LINK}${RE_LINK}/ug`;
const NAMED_LINK_HASH =  re`/${RE_NAMED_LINK}${RE_LINK_HASH}/ug`;

function sep(title) {
  return `\n\n\n
{% comment %}****---------------------------------------------------------------
                    ${title.toUpperCase()}
----------------------------------------------------------------{% endcomment %}
`;
}

(async function main() {
  try {
    const text = await DOCS
      .map(f => [f, readFile(f, ENC)])
      .map(async ([f, p]) => {
        const name = basename(f);

        let content = await p;
        const [, title] = content.match(TITLE_IN_FRONT_MATTER_REEGEX);

        content = content
          .replace(FRONT_MATTER_REGEX, '')
          .replace(TOC_REGEX, '\n')
          .replace(CONTINUE_WITH_REGEX, '\n')
          .replace(INC_HEADING_REGEX, '#$1')
          .replace(INLINE_LINK, '$1#$2)')
          .replace(INLINE_LINK_HASH, '$1#$3)')
          .replace(NAMED_LINK, '$1#$2\n')
          .replace(NAMED_LINK_HASH, '$1#$3')
          .trim();

        if (name === 'index.md') {
          // remove everything from '## Getting started' onwards
          content = content.replace(/#+ getting started(.|\n)*$/ig, '\n');

          // add some content exclusive to the print layout
          content += INTRO_POSTFIX;
        } else {
          const mdTitle = `## ${title}`;
          content = [sep(title), mdTitle, content].join('\n');
        }

        return content;
      })
      .reduce(async (textp, p) => {
        const txt = await textp; // WAT
        const content = await p;
        return txt + content;
      }, FRONT_MATTER);

    await writeFile(resolve(`./docs/${version}/print.md`), text, ENC);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line
    process.exit(1);
  }
}());
