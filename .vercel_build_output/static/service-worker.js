const build = [
  "/_app/start-92fd0bda.js",
  "/_app/pages/__layout.svelte-b274870b.js",
  "/_app/assets/pages/__layout.svelte-92ba4ef9.css",
  "/_app/assets/CircularStd-Book-f8605134.woff2",
  "/_app/assets/CircularStd-Book-c56c77f4.woff",
  "/_app/assets/CircularStd-Book-465f762f.ttf",
  "/_app/assets/CircularStd-Bold-42fd1723.woff2",
  "/_app/assets/CircularStd-Bold-5fd9d569.woff",
  "/_app/assets/CircularStd-Bold-bb799730.ttf",
  "/_app/assets/OperatorMonoLig-Medium-d37d7681.woff2",
  "/_app/assets/OperatorMonoLig-Medium-adee04c1.woff",
  "/_app/assets/OperatorMonoLig-Medium-982f69de.ttf",
  "/_app/assets/OperatorMonoLig-MediumItalic-3a26f574.woff2",
  "/_app/assets/OperatorMonoLig-MediumItalic-46ff8cf0.woff",
  "/_app/assets/OperatorMonoLig-MediumItalic-bc2c74b8.ttf",
  "/_app/error.svelte-260a9dc2.js",
  "/_app/pages/address/_city_.svelte-0396cfa7.js",
  "/_app/assets/pages/address/_city_.svelte-5978a40c.css",
  "/_app/pages/index.svelte-4bc5a8a3.js",
  "/_app/assets/pages/index.svelte-f0ba97ab.css",
  "/_app/pages/search/index.svelte-4483ca30.js",
  "/_app/assets/pages/search/index.svelte-f83a53ac.css",
  "/_app/pages/settings/index.svelte-073a0cc9.js",
  "/_app/assets/pages/settings/index.svelte-667d35ec.css",
  "/_app/chunks/index-66bb8367.js",
  "/_app/chunks/index-13b285a7.js",
  "/_app/chunks/singletons-d1fb5791.js",
  "/_app/chunks/utils-2cacb67e.js",
  "/_app/chunks/stores-225cf51e.js",
  "/_app/chunks/navigation-0e6511d1.js"
];
const files = [
  "/favicon.png",
  "/favicon.svg",
  "/geolocation.svg",
  "/home.svg",
  "/imago.svg",
  "/logo-192.png",
  "/logo-512.png",
  "/logo-w.svg",
  "/logo.svg",
  "/manifest.json",
  "/mobile.png",
  "/robots.txt",
  "/search.svg",
  "/settings.svg"
];
const timestamp = Date.now();
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
