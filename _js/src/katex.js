// Copyright (c) 2017 Florian Klampfer
// Licensed under MIT

import { hasFeatures, hide, matches } from './common';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
];

const featuresOk = hasFeatures(REQUIREMENTS);
let katexJSLoaded = false;
let katexCSSLoaded = false;

function replaceMathBlock(el, tex) {
  el.outerHTML = window.katex.renderToString(tex, {
    displayMode: el.type === 'math/tex; mode=display',
  });
}

function renderKatex(el, tex) {
  try {
    const prev = el.previousElementSibling;
    replaceMathBlock(el, tex);
    if (prev && matches(prev, '.MathJax_Preview')) hide(prev);
  } catch (e) {
    // TODO: remove in production builds?
    console.error(e); // eslint-disable-line no-console
  } finally {
    el.style.willChange = '';
  }
}

function readTexSource(el) {
  return el.textContent.replace('% <![CDATA[', '').replace('%]]>', '');
}

function changeContent(mathBlocks) {
  // kramdown generates script tags with type "math/tex"
  Array.prototype.forEach.call(mathBlocks, (script) => {
    const tex = readTexSource(script);
    renderKatex(script, tex);
  });
}

export default function upgradeMathBlocks() {
  if (featuresOk) {
    const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
    if (mathBlocks.length) {
      if (katexJSLoaded && katexCSSLoaded) {
        changeContent(mathBlocks);
      } else {
        loadJSDeferred(document.getElementById('_katexJS').href, () => {
          katexJSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        });
        loadCSS(document.getElementById('_katexCSS').href).onload = () => {
          katexCSSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        };
      }
    }
  }
}

upgradeMathBlocks();
