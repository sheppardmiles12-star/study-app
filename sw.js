// Offline support. Saves every file the gym needs on the device, so it opens without internet.
// The class list comes from classes/index.js and the cache name from app/version.js, so adding a
// class or bumping the version updates the offline copy automatically. Nothing to edit here.
self.window = self;
importScripts('app/version.js', 'classes/index.js');

var CACHE = 'gym-v' + self.GYM_VERSION;
var FONTS = 'gym-fonts';
var FILES = ['./', 'index.html', 'app.html', 'app/style.css', 'app/engine.js', 'app/version.js', 'app/offline.js', 'classes/index.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.CLASSES.forEach(function (c) {
  FILES.push('classes/' + c.id + '/content.js');
  if (c.extras) FILES.push('classes/' + c.id + '/extras.js');
});

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    // cache: 'reload' skips the browser's HTTP cache so the copy matches this version.
    return Promise.all(FILES.map(function (f) {
      return fetch(new Request(f, { cache: 'reload' })).then(function (r) { if (r.ok) return cache.put(f, r); });
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE && k !== FONTS; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;

  // Google Fonts: use the saved copy, refresh it in the background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(function (cache) {
      return cache.match(req).then(function (hit) {
        var net = fetch(req).then(function (r) { if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r; });
        return hit || net;
      });
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // The gym's own files: try the network so online visits are always current, and fall back to the
  // saved copy when offline or when the network takes over 4 seconds. app.html?c=macro matches app.html.
  function saved() {
    return caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
    });
  }
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function finish(r) { if (!done && r) { done = true; resolve(r); } }
    var timer = setTimeout(function () { saved().then(finish); }, 4000);
    // no-cache: always ask the server whether a file changed (GitHub Pages lets browsers reuse files for 10 minutes otherwise).
    fetch(req, { cache: 'no-cache' }).then(function (r) {
      clearTimeout(timer);
      if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (cache) { cache.put(req, copy); }); }
      finish(r);
    }).catch(function () {
      clearTimeout(timer);
      saved().then(function (hit) { finish(hit || Response.error()); });
    });
  }));
});
