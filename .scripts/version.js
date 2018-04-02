#!/usr/bin/env node

const { promisify } = require('util');

const { resolve } = require('path');
const fs = require('fs');

const vPrev = require('../assets/version.json').version;
const vNext = require('../package.json').version;

const readdir = promisify(fs.readdir);
const rename = promisify(fs.rename);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


const ENC = 'utf-8';

const FILES = [
  resolve('./_data/authors.yml'),
  resolve('./_includes/scripts.html'),
  resolve('./_includes/footer.html'),
  resolve('./_includes/head/meta.html'),
  resolve('./_includes/head/links.html'),
  resolve('./_includes/head/styles.html'),
  resolve('./_includes/header.txt'),
  resolve('./_js/lib/version.js'),
  resolve('./_layouts/compress.html'),
  resolve('./assets/version.json'),
  resolve('./.scripts/release.sh'), // TODO: name
];

// <https://stackoverflow.com/a/45130990/870615>
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

(async function main() {
  try {
    const prev = vPrev.replace(/\./g, '\\.');
    const prevRegExp = new RegExp(prev, 'g');

    const pFiles = Promise.all(FILES
      .map(f => [f, readFile(f, ENC)])
      .map(async ([f, p]) => {
        const content = await p;
        return [f, content.replace(prevRegExp, vNext)];
      })
      .map(async (p) => {
        const [f, content] = await p;
        return writeFile(f, content, ENC);
      }));

    const pJSCSS = Promise.all([
      unlink(
        resolve(`./assets/js/hydejack-${vPrev}.js`),
      ),
      rename(
        resolve(`./assets/css/hydejack-${vPrev}.css`),
        resolve(`./assets/css/hydejack-${vNext}.css`),
      ),
    ]);

    await Promise.all([pFiles, pJSCSS]);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line
    process.exit(1);
  }
}());
