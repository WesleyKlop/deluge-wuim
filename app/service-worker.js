// @flow
const CACHE_NAME = 'deluge-wuim-v1'
const BLACKLISTED_URL_PARTS = [
  'sockjs-node',
  'hot-update.js',
]

const {
  assets,
} = global.serviceWorkerOption

const assetsToCache = [...assets, './']
  .map(path => new URL(path, global.location).toString())
  .filter(path => !path.endsWith('.json') && !path.includes('hot-update'))

self.addEventListener('install', e => e.waitUntil(
  global.caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(assetsToCache))
    .then(() => self.skipWaiting()),
))

self.addEventListener('activate', e => e.waitUntil(
  global.caches
    .keys()
    .then(cacheNames => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null
        }
        return global.caches.delete(cacheName)
      }),
    ))
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
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.match(e.request)
        .then(response => response || fetch(e.request)
          .then((fetchResponse) => {
            cache.put(e.request, fetchResponse.clone())
            return fetchResponse
          }))),
  )
})
