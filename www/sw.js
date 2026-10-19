/* Offline support: cache the app files on first visit, then serve from cache. Bump VERSION to push an update. */
var VERSION = "gr-helper-v3";
var FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png",
  "icons/icon-maskable-192.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png",
  "icons/favicon-32.png", "icons/icon.svg"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
    if (hit) return hit;
    return fetch(e.request).then(function (r) {
      if (r && r.ok && new URL(e.request.url).origin === location.origin) { var cp = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, cp); }); }
      return r;
    }).catch(function () { return caches.match("index.html"); });
  }));
});
