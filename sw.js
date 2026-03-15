const CACHE_NAME = 'dico-pwa-v4';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  // On ne cache pas les appels API pour toujours avoir les définitions à jour
  if (e.request.url.includes('api.dictionaryapi.dev') || e.request.url.includes('mymemory')) return;
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
