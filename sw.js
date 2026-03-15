const CACHE_NAME = 'dico-v3';
const ASSETS = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.dictionaryapi.dev') || e.request.url.includes('mymemory')) {
    return; // Ne pas mettre en cache les résultats d'API dynamiques pour éviter les bugs
  }
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
