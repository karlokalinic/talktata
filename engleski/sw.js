'use strict';

const CACHE_NAME = 'talktata-cache-v2';
const OFFLINE_URL = './offline.html';
const APP_SHELL = [
  './',
  './bootstrap.html',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './js/runtime-compat.js',
  './manifest.json',
  './offline.html',
  './icons/logo.svg'
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
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      const cached = await caches.match(request);
      if (cached) return cached;

      if (request.mode === 'navigate') {
        return (await caches.match('./bootstrap.html'))
          || (await caches.match('./index.html'))
          || (await caches.match(OFFLINE_URL));
      }

      return caches.match(OFFLINE_URL);
    }
  })());
});
