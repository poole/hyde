---
---

// ⚡️ DANGER ZONE ⚡️
// ================

// A shell cache that keeps "landmark" resources, like CSS and JS, start page, 404, etc.,
// which won't change between content updates.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
// increase the cache number, otherwise the changes will NEVER be visible to returning visitors.
// Will be overwritten with every change during development.
// {% assign cv = site.hydejack.offline.cache_version | default:"1" %}
const SHELL_CACHE = "shell--8.0.0-alpha.28--v{{ cv }}";

// A separate assets cache that won't be invalidated when there's a newer version of
const ASSETS_CACHE = "assets--v{{ cv }}";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--{{ site.time | date_to_xmlschema }}";

// A URL search parameter you can add to external assets to cache them in the service worker.
const CACHE_SEARCH_PARAM = "sw-cache";

// The search parameter used to bypass the disk cache.
// https://jakearchibald.com/2016/caching-best-practices/#a-service-worker-can-extend-the-life-of-these-bugs
const RAND_SEARCH_PARAM = "rand";

// The regular expression used to find URLs in webfont style sheets.
const RE = /url\(['"]?(.*?)['"]?\)/gi;

const ICON_FONT = "{{ '/assets/icomoon/style.css' | relative_url }}";

// {% assign google_fonts = site.google_fonts | default:"Roboto+Slab:700|Noto+Sans:400,400i,700,700i" %}
// {% unless site.hydejack.no_google_fonts or site.no_google_fonts %}
// {% assign gf = true %}
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family={{ google_fonts | uri_escape }}";
// {% endunless %}

const SHELL_FILES = [
  "{{ '/assets/js/hydejack-8.0.0-alpha.28.js' | relative_url }}",
  "{{ '/assets/css/hydejack-8.0.0-alpha.28.css' | relative_url }}",
  "{{ '/assets/bower_components/fontfaceobserver/fontfaceobserver.standalone.js' | relative_url }}",
  "{{ '/assets/manifest.json' | relative_url }}",
  "{{ '/assets/img/swipe.svg' | relative_url }}",
  ICON_FONT,
  /*{% if gf %}*/ GOOGLE_FONTS /*{% endif %}*/,
  /*{% if site.accent_image %}{% unless site.accent_image.background %}*/ "{% include smart-url.txt url=site.accent_image %}" /*{% endunless %}{% endif %}*/,
  /*{% if site.logo %}*/ "{% include smart-url.txt url=site.logo %}" /*{% endif %}*/,
  /*{% for file in site.hydejack.offline.precache %}*/ "{% include smart-url.txt url=file %}",
  /*{% endfor %}*/
];

// Files we add on every service worker installation.
const PAGES_TO_ADD = [
  "{{ '/' | relative_url }}",
  "{{ '/?utm_source=homescreen' | relative_url }}",
  "{{ '/404' | relative_url }}",
  /*{% for legal in site.legal %}*/ "{% include smart-url.txt url=legal.href %}",
  /*{% endfor %}*/
];

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

function dirname(path) {
  return path.replace(/[^/]*$/, "");
}

function getMatches(text, re, i = 0) {
  const res = [];
  let match;
  while ((match = re.exec(text))) {
    res.push(match[i]);
  }
  return res;
}

function noCache(url) {
  const url2 = new URL(url);
  url2.searchParams.append(
    RAND_SEARCH_PARAM,
    Math.random()
      .toString(36)
      .substr(2)
  );
  return url2;
}

function noSWParam(url) {
  const url2 = new URL(url);
  url2.searchParams.delete(CACHE_SEARCH_PARAM);
  return url2;
}

// TODO: transpile to ES5, or translate by hand.
async function getIconFontFiles() {
  const iconFontURL = new URL(ICON_FONT, self.location);
  const iconFontRes = await fetch(iconFontURL);
  const text = await iconFontRes.text();

  const dirPath = dirname(iconFontURL.pathname);

  return getMatches(text, RE, 1)
    .map(match => new URL(`${dirPath}${match}`, iconFontURL.origin))
    .concat(ICON_FONT);
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(GOOGLE_FONTS);
  const text = await googleFontRes.text();
  return getMatches(text, RE, 1).concat(GOOGLE_FONTS);
}

const toLocalURL = href => new URL(href, self.location);

async function cacheContent(cache) {
  const urls = PAGES_TO_ADD/*.map(toLocalURL)*/;
  return cache.addAll(urls);
  /*
  return Promise.all(
    urls.map(async url => {
      const response = await fetch(noCache(url));
      return cache.put(url, response);
    })
  );
  */
}

async function cacheShell(cache) {
  const [iconFontFiles, googleFontsFiles] = await Promise.all([
    getIconFontFiles(),
    /*{% if gf %}*/ getGoogleFontsFiles() /*{% endif %}*/,
  ]);

  const urls = SHELL_FILES/*.map(toLocalURL)*/.concat(iconFontFiles, googleFontsFiles);
  return cache.addAll(urls);
  /*
  return Promise.all(
    urls.map(async url => {
      const response = await fetch(noCache(url));
      return cache.put(url, response);
    })
  );
  */
}

async function precache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([cacheShell(shellCache), cacheContent(contentCache)]);
  }
}

async function onInstall(e) {
  await precache();
  self.skipWaiting();
}

function isSameSite({ origin, pathname }) {
  // TODO: polyfill...
  return (
    (origin.startsWith("{{ site.url }}") && pathname.startsWith("{{ site.baseurl }}")) ||
    // FIXME: remove from production
    origin.includes("localhost")
  );
}

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function fetchAndCache(e, request, cacheName) {
  const response = await fetch(noCache(noSWParam(request.url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function fromNetwork(e, request) {
  const url = new URL(request.url);

  // TODO: always cache GET requests from other domains!?
  // FIXME: separate cache for `CACHE_SEARCH_PARAM` requests...
  const hasSWParam = url.searchParams.has(CACHE_SEARCH_PARAM);
  if (isSameSite(url) || hasSWParam) {
    const isAsset = url.pathname.startsWith('{{ "assets" | relative_url }}');
    const cacheName = isAsset || hasSWParam ? ASSETS_CACHE : CONTENT_CACHE;
    return fetchAndCache(e, request, cacheName);
  }

  // If the requested file isn't whitelisted we just send a regular request
  return fetch(request);
}

async function onActivate(e) {
  await self.clients.claim();

  const keys = await caches.keys();

  await Promise.all(
    keys
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

async function onFetch(e) {
  const { request } = e;

  if (request.method !== "GET") return fetch(request);

  // NOTE: `encodeURI` wtf?
  const matching = await caches.match(encodeURI(request.url));
  if (matching) return matching;

  // FIXME: ...
  // try {
  return fromNetwork(e, request);
  // } catch (err) {
  //   const cache = await caches.open(CONTENT_CACHE);
  //   return await cache.match('{{ "/404" | relative_url }}');
  // }
}

const ALL_ASSETS = [
  /*{% for file in site.static_files %}*/ "{{ file.path | relative_url }}",
  /*{% endfor %}*/
];

const ALL_DOCUMENTS = [
  /*{% for doc in site.documents %}*/ "{{ doc.url | relative_url }}",
  /*{% endfor %}*/
];

const ALL_PAGES = [
  /*{% for doc in site.pages %}*/ "{{ doc.url | relative_url }}",
  /*{% endfor %}*/
];
