window.requestIdleCallback = window.requestIdleCallback || (f => window.setTimeout(f, 0));
window.cancelIdleCallback = window.cancelIdleCallback || window.clearTimeout;
