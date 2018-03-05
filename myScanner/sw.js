var CACHE_VERSION = '3';
let CURRENT_CACHES = {
    offline: 'offline-v' + CACHE_VERSION
};
var urlsToCache = [
  './',
  './assets/css/style.css',
  './assets/images/touch/android-chrome-192x192.png',
  './assets/images/touch/android-chrome-512x512.png',
  './assets/images/touch/apple-touch-icon.jpg',
  './assets/images/touch/favicon-16x16.png',
  './assets/images/touch/favicon-32x32.png',
  './assets/images/touch/favicon.ico',
  './assets/images/touch/mstile-150x150.png',
  './assets/js/main.js',
  './dist/qcode-decoder.min.js',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/*
self.addEventListener("fetch", function(event){
    event.respondWith(
        fetch(event.request).then(function(response) {
          let responseCopy = response.clone();
          addToCache(event.request, responseCopy);
          return response;
        })
        .catch(function() {
          return caches.match(event.request)
            .then(function(response) { return response || caches.match('/offline/')});
        })
    );
});
*/

self.addEventListener("fetch", function(event) {
    console.log('WORKER: fetch event in progress.');
  
    if (event.request.method !== 'GET') {
      console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
      return;
    }

    event.respondWith(
      caches
        .match(event.request)
        .then(function(cached) {
          
          var networked = fetch(event.request)
            .then(fetchedFromNetwork, unableToResolve)
            .catch(unableToResolve);

          console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
          return cached || networked;
  
          function fetchedFromNetwork(response) {

            var cacheCopy = response.clone();
  
            console.log('WORKER: fetch response from network.', event.request.url);
  
            caches
              .open(CURRENT_CACHES.offline)
              .then(function add(cache) {
                cache.put(event.request, cacheCopy);
              })
              .then(function() {
                console.log('WORKER: fetch response stored in cache.', event.request.url);
              });
            return response;
          }
  
          function unableToResolve () {
  
            console.log('WORKER: fetch request failed in both cache and network.');
  
            return new Response('<h1>Service Unavailable</h1>', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          }
        })
    );
});
  