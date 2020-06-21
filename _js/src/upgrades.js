import { importTemplate, intersectOnce, loadCSS, stylesheetReady } from './common';
import { fromEvent } from 'rxjs';
import { concatMap } from 'rxjs/operators';

(async () => {
  await Promise.all([
    ...('animate' in Element.prototype ? [] : [import(/* webpackChunkName: "webanimations" */ 'web-animations-js')]),
    ...('IntersectionObserver' in window
      ? []
      : [import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer')]),
  ]);

  await stylesheetReady;

  const FN_SEL = "li[id^='fn:']";
  const FN_LINK_SEL = "a[href^='#fn:']";
  const HORIZONTAL_SCROLL_SEL =
    'pre, table:not(.highlight), .katex-display, .break-layout, mjx-container[jax="CHTML"][display="true"]';
  const CODE_BLOCK_SEL = 'pre.highlight > code';
  const CODE_TITLE_REX = /(?:title|file):\s*['"`](.*)['"`]/i;
  const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

  const IMG_FADE_DURATION = 500;

  const pushStateEl = document.querySelector('hy-push-state');

  function ready(fn, opts) {
    if (pushStateEl && !window._noPushState) {
      pushStateEl.addEventListener(
        'hy-push-state-ready',
        ({
          detail: {
            replaceEls: [main],
          },
        }) => fn(main),
        opts,
      );
      document.addEventListener('DOMContentLoaded', () => () => fn(document.getElementById('_main')), {
        ...opts,
        once: true,
      });
    } else {
      fn(document.getElementById('_main'));
    }
  }

  function load(fn, opts) {
    if (pushStateEl && !window._noPushState) {
      pushStateEl.addEventListener('hy-push-state-load', () => fn(document.getElementById('_main')), opts);
    } else {
      fn(document.getElementById('_main'));
    }
  }

  ready((main) => {
    if (!main) return;

    main.querySelectorAll(HEADING_SELECTOR).forEach((h) => {
      const df = importTemplate('_permalink-template');
      const a = df.querySelector('.permalink');
      a.href = `#${h.id}`;
      h.appendChild(df);
    });

    const toc = main.querySelector('#markdown-toc');
    if (toc) toc.classList.add('toc-hide');

    Array.from(main.querySelectorAll(CODE_BLOCK_SEL))
      .map((el) => el.children[0])
      .filter((el) => CODE_TITLE_REX.test(el?.innerText))
      .forEach((el) => {
        const [, fileName] = CODE_TITLE_REX.exec(el.innerText);

        // Remove element before making changes
        const code = el.parentNode;
        code.removeChild(el);

        // Remove newline
        code.childNodes[0].splitText(1);
        code.removeChild(code.childNodes[0]);

        // Update DOM
        el.innerText = fileName;
        el.classList.add('pre-header');
        const container = code.parentNode.parentNode;
        container.insertBefore(el, container.firstChild);
      });

    if ('complete' in HTMLImageElement.prototype) {
      main.querySelectorAll('img[width][height][loading=lazy]').forEach((el) => {
        if (!el.complete) {
          el.style.opacity = '0';
          el.addEventListener(
            'load',
            () =>
              el.animate([{ opacity: 0 }, { opacity: 1 }], {
                fill: 'forwards',
                duration: IMG_FADE_DURATION,
                easing: 'ease',
              }),
            { once: true },
          );
        }
      });
    }

    // main.querySelectorAll(pushStateEl.linkSelector).forEach(anchor => {
    //   caches.match(anchor.href).then(m => {
    //     if (m) requestAnimationFrame(() => anchor.classList.add("visited"));
    //   });
    // });
  });

  /** @type {Promise<{}>|null} */
  let katexPromise = null;

  load(() => {
    const main = document.getElementById('_main');
    if (!main) return;

    const toc = main.querySelector('#markdown-toc');
    if (toc) {
      toc.classList.remove('toc-hide');
      toc.classList.add('toc-show');
    }

    main.querySelectorAll(FN_SEL).forEach((li) => (li.tabIndex = 0));

    main
      .querySelectorAll(FN_LINK_SEL)
      .forEach((a) =>
        a.addEventListener('click', (e) =>
          document.getElementById(e.currentTarget.getAttribute('href').substr(1))?.focus(),
        ),
      );

    main
      .querySelectorAll(HORIZONTAL_SCROLL_SEL)
      .forEach((el) =>
        el.addEventListener('touchstart', (e) => el.scrollLeft > 0 && e.stopPropagation(), { passive: false }),
      );

    const katexHref = document.getElementById('_katexPreload')?.href;
    if (!katexPromise && katexHref) {
      intersectOnce(main.querySelectorAll('.katex'), { rootMargin: '1440px' }).then(() => {
        katexPromise = loadCSS(katexHref);
      });
    }
  });

  if (pushStateEl && !window._noPushState) {
    fromEvent(pushStateEl, 'after')
      .pipe('MathJax' in window ? concatMap(() => MathJax.typesetPromise()) : (_) => _)
      .subscribe();
  }
})();
