var CACHE_NAME = 'london-underground';
// The files we want to cache
var urlsToCache = [
  '/',
  '/styles/base.css',
  '/scripts/map.js',
  '/scripts/disruptions.js'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
