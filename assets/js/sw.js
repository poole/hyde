---
---
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// {% if jekyll.environment == 'production' or site.hydejack.offline.development %}

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// {% assign cv = site.hydejack.offline.cache_version | default:"1" %}
const SHELL_CACHE = "shell-8.0.0--v{{ cv }}--sw{{ '/' | relative_url }}";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will NEVER be visible to returning visitors.
const ASSETS_CACHE = "assets--v{{ cv }}--sw{{ '/' | relative_url }}";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--{{ site.time | date_to_xmlschema }}--sw{{ '/' | relative_url }}";

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
  "{{ '/assets/bower_components/fontfaceobserver/fontfaceobserver.standalone.js' | relative_url }}",
  "{{ '/assets/js/hydejack-8.0.0.js' | relative_url }}",
  "{{ '/assets/css/hydejack-8.0.0.css' | relative_url }}",
  "{{ '/assets/img/swipe.svg' | relative_url }}",
  ICON_FONT,
  /*{% if gf %}*/ GOOGLE_FONTS /*{% endif %}*/,
];

const ASSET_FILES = [
  /*{% if site.accent_image %}{% unless site.accent_image.background %}*/ "{% include smart-url.txt url=site.accent_image %}" /*{% endunless %}{% endif %}*/,
  /*{% if site.logo %}*/ "{% include smart-url.txt url=site.logo %}" /*{% endif %}*/,
  /*{% for file in site.hydejack.offline.precache_assets %}*/ "{% include smart-url.txt url=file %}",
  /*{% endfor %}*/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "{{ '/' | relative_url }}",
  "{{ '/?utm_source=homescreen' | relative_url }}",
  "{{ '/assets/manifest.json' | relative_url }}",
  /*{% for legal in site.legal %}*/ "{% include smart-url.txt url=legal.href %}",
  /*{% endfor %}*/
];

const NOT_FOUND_PAGE = "{{ '/404.html' | relative_url }}";

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

const toLocalURL = url => new URL(url, self.location);

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => fetch(noCache(toLocalURL(url))).then(res => cache.put(url, res)))
  );
}

async function cache404(cache) {
  const url = new URL(NOT_FOUND_PAGE, self.location);
  const response = await fetch(noCache(url));
  return cache.put(
    url,
    new Response(response.body, {
      status: 598,
      statusText: "Offline",
      headers: response.headers,
    })
  );
}

async function cacheShell(cache) {
  const [iconFontFiles, googleFontsFiles] = await Promise.all([
    getIconFontFiles(),
    /*{% if gf %}*/ getGoogleFontsFiles() /*{% endif %}*/,
  ]);

  const urls = SHELL_FILES.concat(iconFontFiles, googleFontsFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = ASSET_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return Promise.all([addAll(cache, urls), cache404(cache)]);
}

async function precache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall(e) {
  await precache();
  return self.skipWaiting();
}

function isSameSite({ origin, pathname }) {
  return origin.startsWith("{{ site.url }}") && pathname.startsWith("{{ site.baseurl }}");
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

  // TODO: always cache GET requests from other domains!? Only images?
  const hasSWParam = url.searchParams.has(CACHE_SEARCH_PARAM);
  if (isSameSite(url) || hasSWParam) {
    const isAsset = url.pathname.startsWith("{{ 'assets' | relative_url }}");
    const cacheName = isAsset || hasSWParam ? ASSETS_CACHE : CONTENT_CACHE;
    return fetchAndCache(e, request, cacheName);
  }

  // If the requested file isn't whitelisted we just send a regular request
  return fetch(request);
}

async function onActivate(e) {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw{{ '/' | relative_url }}"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

async function onFetch(e) {
  const { request } = e;

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  if (
    request.method !== "GET" /*{% if site.google_analytics %}*/ ||
    request.url.startsWith("https://www.google-analytics.com/collect") /*{% endif %}*/
  ) {
    return fetch(request);
  }

  // Caches
  // ------
  // NOTE: `encodeURI` wtf?
  const url = encodeURI(request.url);

  // FIXME: don't wait for all promises to complete...
  const [matching1, matching2, matching3] = await Promise.all([
    caches.open(SHELL_CACHE).then(c => c.match(url)),
    caches.open(ASSETS_CACHE).then(c => c.match(url)),
    caches.open(CONTENT_CACHE).then(c => c.match(url)),
  ]);

  if (matching1 || matching2 || matching3) return matching1 || matching2 || matching3;

  // Network
  // -------
  // Got to network otherwise. Show 404 when there's a network error.
  // TODO: Use separate offline site instead of 404!?
  try {
    return await fromNetwork(e, request);
  } catch (err) {
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(NOT_FOUND_PAGE);
  }
}

// {% comment %}
// TODO: We could add support for downloading the entire page.
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
// {% endcomment %}

// {% else %}

self.addEventListener("activate", e => e.waitUntil(onDeactivate(e)));

async function onDeactivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw{{ '/' | relative_url }}"))
      // Delete *all* caches
      .map(key => caches.delete(key))
  );
}
// {% endif %}
