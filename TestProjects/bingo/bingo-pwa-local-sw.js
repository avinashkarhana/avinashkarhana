const CACHE_NAME = 'bingo-pwa-local-v27';
const APP_SHELL = [
  './',
  './index.html',
  './bingo-pwa-local.webmanifest',
  './images/bingo-pwa-local-icon.svg',
  './images/back-dark.svg',
  './images/play-dark.svg',
  './images/play-light.svg',
  './images/pause-dark.svg',
  './images/pause-light.svg',
  './images/next-dark.svg',
  './images/next-light.svg',
  './images/previous-dark.svg',
  './images/previous-light.svg',
  './images/clearAll-dark.svg',
  './images/close-dark.svg',
  './images/home-dark.svg',
  './images/info-dark.svg',
  './images/log-dark.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await Promise.allSettled(
          APP_SHELL.map(url =>
            fetch(url, { cache: 'reload' }).then(res => {
              if (res && res.ok) return cache.put(url, res);
            })
          )
        );
      })
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

  const url = new URL(event.request.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (response && response.ok) {
              const copy = response.clone();
              event.waitUntil(
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
              );
            }
            return response;
          })
          .catch(() => cached || new Response('', { status: 504, statusText: 'Offline Font Fallback' }));
      })
    );
    return;
  }

  // Bypass cross-origin requests and API endpoints (TURN credentials, future signaling).
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copyIndex = response.clone();
            const copyRoot = response.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(cache =>
                Promise.all([
                  cache.put('./index.html', copyIndex),
                  cache.put('./', copyRoot)
                ])
              )
            );
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
            );
          }
          return response;
        });
      })
  );
});
