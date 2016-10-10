import { loadCSS } from 'fg-loadcss/src/loadCSS';

import hasFeatures from '../lib/has-features';

export default function upgradeMathBlocks() {
  /* global katex */
  if (!global.katex) return;

  const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');

  Array.prototype.forEach.call(mathBlocks, (element) => {
    element.style.willChange = 'content'; // eslint-disable-line no-param-reassign
  });

  requestAnimationFrame(() => {
    // kramdown generates script tags with type "math/tex"
    Array.prototype.forEach.call(mathBlocks, (element) => {
      const el = element;

      const tex = el.textContent
        .replace('% <![CDATA[', '')
        .replace('%]]>', '');

      // replace the script tag with KaTeX
      try {
        const preview = el.previousElementSibling;

        el.outerHTML = katex.renderToString(tex, {
          displayMode: el.type === 'math/tex; mode=display',
        });

        // hide the preview only when successful
        preview.style.display = 'none';
        preview.style.visibility = 'hidden';

        el.style.willChange = '';
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    });
  });
}

// KaTeX support
if (hasFeatures(['queryselector',
                 'requestanimationframe',
               ])) {
  // enable math blocks using KaTeX
  loadCSS('https://unpkg.com/katex@0.6.0/dist/katex.min.css');
  loadJSDeferred('https://unpkg.com/katex@0.6.0/dist/katex.min.js', upgradeMathBlocks);
}
