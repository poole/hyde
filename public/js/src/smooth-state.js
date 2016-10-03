/* eslint-disable prefer-arrow-callback, func-names */

import $ from 'jquery';
import '../lib/smoothState';

import doKatex from './katex';

function resetScrollPostion() {
  const state = history.state || {};
  $(document.body).css({ minHeight: state.scrollHeight || 0 });
  $(window).scrollTop(state.scrollTop || 0);
}

function saveScrollPosition() {
  const state = history.state || {};
  state.scrollTop = $(window).scrollTop();
  state.scrollHeight = $(document).height();
  history.replaceState(state, document.title, window.location.href);
}

$(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  resetScrollPostion();

  $('#_smooth-state').smoothState({
    scroll: false,
    // cacheLength: 3,
    repeatDelay: 250,
    onBefore() {
      saveScrollPosition();

      // close the drawer if on mobile
      if (!window.isDesktop) {
        window.drawer.close();
      }
    },
    onReady: {
      render($container, $newContent) {
        resetScrollPostion();

        // set the content
        const main = $newContent.first();
        const header = $newContent.find('header');
        $container.find('main').replaceWith(main);
        $container.find('header').replaceWith(header);
      },
    },
    onAfter() {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      doKatex();
    },
  });

  window.addEventListener('beforeunload', () => {
    saveScrollPosition();
  }, { passive: true });

  window.addEventListener('popstate', () => {
    if (!window.isDesktop) {
      window.drawer.jumpTo(false);
    }
  });

  // Can no longer call `replaceState` on `poopstate` event -- useless
  // window.addEventListener('popstate', (e) => {
  //   console.log(e.state, history.state);
  //   console.log($(window).scrollTop());
  //   // if (typeof history.state.scrollTop === 'undefined') {
  //   //   history.state.scrollTop = $(document.body).scrollTop();
  //   //   console.log('popstate', history.state);
  //   //   history.replaceState(history.state, document.title, window.location.href);
  //   // }
  // });

  // Using the scroll event to store scroll position: very bad idea
  // function rememberScrollTop(e) {
  //   console.log(e.target.URL, window.location.href);
  //   history.state.scrollTop = $(window).scrollTop();
  //   history.state.scrollHeight = $(document).height();
  //   history.replaceState(history.state, document.title, window.location.href);
  // }
  //
  // document.addEventListener('scroll', debounce(rememberScrollTop, 100), { passive: true });
});
