// # src / katex.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import "core-js/fn/array/for-each";

import { hasFeatures, hide } from "./common";

const REQUIREMENTS = ["classlist", "eventlistener", "queryselector"];

const featuresOk = hasFeatures(REQUIREMENTS);
let katexJSLoaded = false;
let katexCSSLoaded = false;

function renderKatex(el) {
  try {
    let prev = el.previousElementSibling;
    while (prev && !prev.classList.contains("MathJax_Preview")) prev = prev.previousElementSibling;

    const tex = el.textContent.replace("% <![CDATA[", "").replace("%]]>", "");

    el.outerHTML = window.katex.renderToString(tex, {
      displayMode: el.type === "math/tex; mode=display",
    });

    if (prev) hide.call(prev);
  } catch (e) {
    if (process.env.DEBUG) console.error(e);
  }
}

export const upgradeMathBlocks = !featuresOk
  ? () => {}
  : () => {
      const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
      if (mathBlocks.length) {
        if (katexJSLoaded && katexCSSLoaded) {
          Array.from(mathBlocks).forEach(renderKatex);
        } else {
          loadJS(document.getElementById("_hrefKatexJS").href).addEventListener("load", () => {
            katexJSLoaded = true;
            if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
          });
          loadCSS(document.getElementById("_hrefKatexCSS").href).addEventListener("load", () => {
            katexCSSLoaded = true;
            if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
          });
        }
      }
    };

upgradeMathBlocks();
