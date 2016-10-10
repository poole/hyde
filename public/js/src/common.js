export function defineCustomElement(tagName, CustomHTMLElement) {
  if ('customElements' in global) {
    customElements.define(tagName, CustomHTMLElement);
  } else if ('registerElement' in document) {
    document.registerElement(tagName, CustomHTMLElement);
  }
}

export function ensureCustomElements(f) {
  if ('customElements' in global || 'registerElement' in document) {
    f();
  } else {
    if (!global.loadingCustomElements) loadJSDeferred('https://unpkg.com/webcomponents.js@0.7.22/CustomElements.min.js');
    global.loadingCustomElements = true;
    global.addEventListener('WebComponentsReady', f);
  }
}
