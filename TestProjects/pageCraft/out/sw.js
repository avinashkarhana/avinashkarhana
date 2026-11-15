

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-43e44e5a'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "8c31b6eee18fd2e9f4c34bf60be7043d"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9fa07a3fa84fc657640eb534003fcd7b"
  }, {
    "url": "pwa-192x192.png",
    "revision": "c6e31e4ca035d380fc6f083b58570101"
  }, {
    "url": "manifest.webmanifest",
    "revision": "9d5ceb49de6d21bd946f47993e3fd88e"
  }, {
    "url": "index.html",
    "revision": "18d6c07cb627b614f19be46d0669b9a1"
  }, {
    "url": "icon.svg",
    "revision": "cebab1bf871aa974d5d715573b6c8e37"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "6d48188dcc387c52a24b9824cc13c241"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/pdf.worker.min-CIqJB0yW.mjs",
    "revision": null
  }, {
    "url": "assets/index-CgYLzcyZ.js",
    "revision": null
  }, {
    "url": "assets/index-Bj5k9kLC.css",
    "revision": null
  }, {
    "url": "assets/__vite-browser-external-BPxQIxCW.js",
    "revision": null
  }, {
    "url": "pwa-192x192.png",
    "revision": "c6e31e4ca035d380fc6f083b58570101"
  }, {
    "url": "pwa-512x512.png",
    "revision": "9fa07a3fa84fc657640eb534003fcd7b"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8c31b6eee18fd2e9f4c34bf60be7043d"
  }, {
    "url": "manifest.webmanifest",
    "revision": "9d5ceb49de6d21bd946f47993e3fd88e"
  }], {
    "ignoreURLParametersMatching": [/^utm_/, /^fbclid$/]
  });
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/__pwa_ping=/]
  }));
  workbox.registerRoute(({
    url
  }) => url.searchParams.has("__pwa_ping"), new workbox.NetworkOnly(), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
