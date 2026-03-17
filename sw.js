const CACHE = 'mon-dico-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Cache-first for assets, network-first for API calls
self.addEventListener('fetch', e => {
  // Let API calls pass through
  if (e.request.url.includes('googleapis') ||
      e.request.url.includes('dictionaryapi') ||
      e.request.url.includes('translate')) {
    return;
  }
  e.respondWith(
      caches.match(e.request).then(cached => {
        return cached || fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        });
      }).catch(() => caches.match('./index.html'))
  );
});