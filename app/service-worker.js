// @flow
const CACHE_NAME = 'deluge-wuim-v1'
const BLACKLISTED_URL_PARTS = [
  'sockjs-node',
  'hot-update.js',
  'sw.js',
]

const {
  assets,
} = global.serviceWorkerOption

const assetsToCache = [...assets, './']
  .map(path => new URL(path, global.location).toString())

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME)
    .then(cache => cache.addAll(assetsToCache))
    .then(() => self.skipWaiting()),
))

self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(cacheNames => cacheNames.filter(cacheName => (cacheName !== CACHE_NAME)))
    .then(cachesToDelete =>
      Promise.all(cachesToDelete.map(cacheName =>
        caches.delete(cacheName))))
    .then(() => self.clients.claim()),
))

self.addEventListener('fetch', (e) => {
  const { request } = e
  const requestUrl = new URL(request.url)

  if (request.method !== 'GET'
    || !requestUrl.protocol.startsWith('http')
    || BLACKLISTED_URL_PARTS.some(url => requestUrl.href.includes(url))) {
    return request
  }

  return e.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(e.request)
        .then(response => response || fetch(e.request)
          .then((fetchResponse) => {
            cache.put(e.request, fetchResponse.clone())
            return fetchResponse
          }))),
  )
})
