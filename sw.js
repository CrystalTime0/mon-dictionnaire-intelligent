const CACHE_NAME = 'dico-google-v1';

self.addEventListener('fetch', event => {
  // On laisse passer les requêtes API sans les mettre en cache de force 
  // pour toujours avoir les définitions les plus riches
  if (event.request.url.includes('dictionaryapi') || event.request.url.includes('mymemory')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
