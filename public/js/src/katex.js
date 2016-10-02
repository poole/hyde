// eslint-globals katex
import { loadCSS } from 'fg-loadcss/src/loadCSS';

import hasFeatures from '../lib/has-features';

// KaTeX support
if (hasFeatures(['queryselector',
                 'classlist',
               ])) {
  const mathBlocks = document.querySelectorAll('script[type^="math/tex"]');

  // only load if math blocks are present
  if (mathBlocks.length) {
    // enable math blocks using KaTeX
    loadCSS('https://unpkg.com/katex@0.6.0/dist/katex.min.css');
    loadJSDeferred('https://unpkg.com/katex@0.6.0/dist/katex.min.js', () => {
      /* global katex */

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
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      });
    });
  }
}
