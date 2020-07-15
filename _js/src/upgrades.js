import { importTemplate, intersectOnce, loadCSS, stylesheetReady, once } from './common';
import { fromEvent } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
// import { createElement } from 'create-element-x/library';

// import LANG from './languages.json';

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
  // const CODE_BLOCK_SEL = 'pre.highlight > code';
  // const CODE_TITLE_RE = /(?:title|file):\s*['"`](([^'"`\\]|\\.)*)['"`]/iu;
  const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

  const IMG_FADE_DURATION = 500;
  const IMG_KEYFRAMES = [{ opacity: 0 }, { opacity: 1 }];
  const IMG_SETTINGS = {
    fill: 'forwards',
    duration: IMG_FADE_DURATION,
    easing: 'ease',
  };

  const pushStateEl = document.querySelector('hy-push-state');

  /** @param {(param0: HTMLElement|null) => void} fn
   *  @param {any=} opts */
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
    }
    fn(document.getElementById('_main'));
  }

  /** @param {(param0: HTMLElement|null) => void} fn
   *  @param {any=} opts */
  function load(fn, opts) {
    if (pushStateEl && !window._noPushState) {
      pushStateEl.addEventListener('hy-push-state-load', () => fn(document.getElementById('_main')), opts);
    }
    fn(document.getElementById('_main'));
  }

  let init = true;

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

    /*
    Array.from(main.querySelectorAll(CODE_BLOCK_SEL))
      .map((code) => code.children[0])
      .forEach((el) => {
        const result = CODE_TITLE_RE.exec(el?.innerText);
        if (!result) return;
        const [, fileName] = result;

        const code = el.parentNode;

        // Remove the first line
        const child0 = el.childNodes[0];
        const nli = child0.wholeText.indexOf('\n');
        if (nli > -1) {
          const restNode = child0.splitText(nli);
          code.insertBefore(restNode, code.firstChild);
        }

        // Remove element before making changes
        code.removeChild(el);

        // Remove newline
        code.childNodes[0].splitText(1);
        code.removeChild(code.childNodes[0]);

        const container = code.parentNode.parentNode;

        // Language
        const highlighter = container.parentNode;
        const [, lang] = highlighter.classList.value.match(/language-(\w*)/) ?? [];
        const language = LANG[lang];

        const header = createElement(
          'div',
          { class: 'pre-header break-layout' },
          createElement('span', { class: 'file' }, createElement('small', { class: 'icon-file-empty' }), ' ', fileName),
          !language ? null : createElement('small', { class: 'fr lang' }, language),
        );

        container.insertBefore(header, container.firstChild);
      });
    */

    if ('complete' in HTMLImageElement.prototype) {
      main.querySelectorAll('img[width][height][loading=lazy]').forEach((el) => {
        if (init && el.complete) return;
        el.style.opacity = '0';
        // TODO: replace with loading spinner
        el.addEventListener('load', () => el.animate(IMG_KEYFRAMES, IMG_SETTINGS), { once: true });
      });
      init = false;
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

    /*
    Array.from(main.querySelectorAll(CODE_BLOCK_SEL)).forEach((code) => {
      const sw = code.parentElement?.scrollWidth;
      Array.from(code.querySelectorAll('.c1'))
        .filter((c1) => c1.innerText.includes('!!'))
        .forEach((c1) => {
          const hl = createElement('span', {
            class: 'highlight-code-line',
            style: `width: ${sw ? `${sw}px` : '100%'}`,
          });
          const hasContent = c1.innerText?.match(/[\p{L}|\d]/u);
          if (!hasContent) {
            c1.parentElement?.replaceChild(hl, c1);
          } else {
            c1.innerText = c1.innerText.replace('!!', '');
            c1.parentElement?.insertBefore(hl, c1);
          }
        });
    });
    */

    const katexHref = document.getElementById('_katexPreload')?.href;
    if (!katexPromise && katexHref) {
      intersectOnce(main.querySelectorAll('.katex'), { rootMargin: '1440px' }).then(() => {
        katexPromise = loadCSS(katexHref);
      });
    }
  });

  const mathJaxEl = document.getElementById('_MathJax');
  if (pushStateEl && mathJaxEl) {
    const mathJax2To3 = ({
      detail: {
        replaceEls: [mainEl],
      },
    }) => {
      mainEl.querySelectorAll('script[type="math/tex; mode=display"]').forEach((el) => {
        el.outerHTML = el.innerText.replace('% <![CDATA[', '\\[').replace('%]]>', '\\]');
      });
      mainEl.querySelectorAll('script[type="math/tex"]').forEach((el) => {
        el.outerHTML = `\\(${el.innerText}\\)`;
      });
    };

    mathJax2To3({ detail: { replaceEls: [document] } });

    if (!('MathJax' in window)) await once(mathJaxEl, 'load');

    await MathJax.typesetPromise();

    if (!window._noPushState) {
      pushStateEl.addEventListener('ready', (e) => mathJax2To3(e));
      fromEvent(pushStateEl, 'after')
        .pipe(concatMap(() => MathJax.typesetPromise()))
        .subscribe();
    }
  }
})();
