import { loadCSS } from 'fg-loadcss/src/loadCSS';

function hasPreloadSupport() {
  try {
    return document.createElement('link').relList.supports('preload');
  } catch (e) {
    return false;
  }
}

// loop preload links and fetch using loadCSS
function polyfill() {
  const links = document.getElementsByTagName('link');

  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
      loadCSS(link.href, link);
      link.rel = null;
    }
  }
}

if (!hasPreloadSupport()) {
  polyfill();
}
