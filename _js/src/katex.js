// Copyright (c) 2017 Florian Klampfer
// Licensed under MIT

/* eslint-disable no-param-reassign */

import katex from 'katex';

import { hasFeatures, hide, matches } from './common';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
];

function willChangeContent(mathBlocks) {
  Array.prototype.forEach.call(mathBlocks, (el) => {
    el.style.willChange = 'content'; // eslint-disable-line no-param-reassign
  });
}

function replaceMathBlock(el, tex) {
  el.outerHTML = katex.renderToString(tex, {
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
  if (hasFeatures(REQUIREMENTS)) {
    const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
    if (mathBlocks.length) {
      willChangeContent(mathBlocks);
      changeContent(mathBlocks);
    }
  }
}

if (hasFeatures(REQUIREMENTS)) {
  // TODO: load on demand?
  const ref = document.getElementsByTagName('style')[0];
  const style = loadCSS('https://unpkg.com/katex@0.7.1/dist/katex.min.css', ref);
  style.addEventListener('load', upgradeMathBlocks);
}
