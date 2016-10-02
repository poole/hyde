import hasFeatures from './has-features';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

// KaTeX support
if (hasFeatures(['queryselector',
                 'classlist',
               ])) {

  var mathBlocks = document.querySelectorAll('script[type^="math/tex"]');

  // only load if math blocks are present
  if (mathBlocks.length) {
    // enable math blocks using KaTeX
    loadCSS("https://unpkg.com/katex@0.6.0/dist/katex.min.css");
    loadJSDeferred("https://unpkg.com/katex@0.6.0/dist/katex.min.js", function () {
      // kramdown generates script tags with type "math/tex"
      Array.prototype.forEach.call(mathBlocks, function(el) {
        var tex = el.textContent
          .replace('% <![CDATA[', '')
          .replace('%]]>', '');

        // replace the script tag with KaTeX
        try {
          var preview = el.previousElementSibling;

          el.outerHTML = katex.renderToString(tex, {
            displayMode: el.type === 'math/tex; mode=display'
          });

          // hide the preview only when successful
          preview.style.display = 'none';
          preview.style.visibility = 'hidden';
        } catch (e) {
          console.error(e);
        }
      });
    });
  }
}
