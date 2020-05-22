#!/usr/bin/env node

const { resolve } = require("path");
const { readdir, rename, unlink, readFile, writeFile } = require("fs").promises;

const vPrev = require("../assets/version.json").version;
const vNext = require("../package.json").version;

const ENC = "utf-8";

const FILES = [
  "./jekyll-theme-hydejack-pro.gemspec",
  "./_data/authors.yml",
  "./_includes/head/meta.html",
  "./_includes/head/links.html",
  "./_includes/head/styles.html",
  "./_includes/header.txt",
  "./_includes/body/scripts.html",
  "./_includes/body/footer.html",
  "./_includes/search.js",
  "./_includes/sw.js",
  "./_layouts/compress.html",
  "./_js/lib/version.js",
  "./assets/version.json",
  "./assets/js/search.js",
  "./assets/js/sw.js",
  "./CHANGELOG.md",
  "./download.md",
  "./README.md",
  "./thank-you.md",
].map(f => resolve(f));

// <https://stackoverflow.com/a/45130990/870615>
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

(async function main() {
  try {
    const prev = vPrev.replace(/\./g, "\\.");
    const prevRegExp = new RegExp(prev, "g");

    const args = await Promise.all([
      getFiles("./hyde/_posts"),
      getFiles("./hydejack/_posts"),
      getFiles("./_projects"),
      getFiles("./docs"),
    ]);
      
    const files = Array.prototype.concat.call(FILES, ...args);

    const pFiles = Promise.all(
      files
        .filter(([f]) => !f.startsWith("."))
        .map(f => [f, readFile(f, ENC)])
        .map(async ([f, p]) => {
          const content = await p;

          if (f.includes("CHANGELOG")) {
            const pattern = new RegExp(`([^v])${prev}`, "g");
            return [f, content.replace(pattern, `$1${vNext}`)];
          }

          return [f, content.replace(prevRegExp, vNext)];
        })
        .map(async p => {
          const [f, content] = await p;
          return writeFile(f, content, ENC);
        })
    );

    const pUnlink = Promise.all(
      (await getFiles('./assets/js'))
        .filter(f => f.includes(vPrev))
        .map(unlink)
    );

    const pJSCSS = rename(
      resolve(`./assets/css/hydejack-${vPrev}.css`),
      resolve(`./assets/css/hydejack-${vNext}.css`)
    );

    await Promise.all([pUnlink, pFiles, pJSCSS]);

    process.exit(0);
  } catch (e) {
    console.error(e); // eslint-disable-line
    process.exit(1);
  }
})();
