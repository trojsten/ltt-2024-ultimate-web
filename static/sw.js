var cacheName = 'ltt'
var filesToCache = [
  '/static/adSync.js',
  '/static/bridges.html',
  '/static/bridges/js/puzzle.js',
  '/static/capybara.html',
  '/static/cookie-clicker.html',
  '/static/cookie-clicker/game.js',
  '/static/cross-road.html',
  '/static/drift-boss.html',
  '/static/drift-boss/game.js',
  '/static/fakeStorage.js',
  '/static/galaxie/js/puzzle.js',
  '/static/galaxies.html',
  '/static/loopy.html',
  '/static/loopy/js/puzzle.js',
  '/static/navbar.js',
  '/static/spect.html',
  '/static/spect/game.js',
  '/static/spect/gameapi.js',
  '/static/terms-and-conditions.pdf',
  '/static/pou.png',
  '/static/app.css',
  '/static/gameData.js',
  '/static/manifest.json',
  '/static/icon512_maskable.png',
  '/static/icon512_rounded.png',
  '/static/ltt.svg',
  '/static/sw.js',
  '/static/favicon.ico',
  '/static/icons.woff2'
]

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      await caches.delete(cacheName)
      caches.open(cacheName).then((cache) => {
        return cache.addAll(filesToCache)
      })
    })()
  )
})

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request)
    })
  )
})
