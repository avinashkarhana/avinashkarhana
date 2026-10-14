const CACHE_NAME = 'bingo-pwa-local-v9';
const APP_SHELL = [
  './index.html',
  './bingo-pwa-local.webmanifest',
  './images/bingo-pwa-local-icon.svg',
  './images/back-dark.svg',
  './images/back-light.svg',
  './images/play-dark.svg',
  './images/play-light.svg',
  './images/pause-dark.svg',
  './images/pause-light.svg',
  './images/next-dark.svg',
  './images/next-light.svg',
  './images/previous-dark.svg',
  './images/previous-light.svg',
  './images/clearAll-dark.svg',
  './images/clearAll-light.svg',
  './images/close-dark.svg',
  './images/close-light.svg',
  './images/home-dark.svg',
  './images/home-light.svg',
  './images/info-dark.svg',
  './images/log-dark.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
