var dataCacheName = 'flightsData-v1';
var cacheName = 'flightsPWA-final-1';
var filesToCache = [
  '/flights',
  '/flights/index.html',
  '/flights/offline.html',
  '/flights/scripts/app.js',
  '/flights/styles/style.css',
  '/flights/images/av.png',
  '/flights/images/dt.png',
  '/flights/images/lan.png',
  '/flights/images/vc.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'http://localhost:8080/flights/webapi/flights';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
    	  if(response || fetch(e.request)){
    		  return response || fetch(e.request);
    	  }else{
    		  return caches.match('offline.html');
    	  }
        
      })
    );
  }
  
  if(e.request.url.endsWith('.png')){
	  e.respondWith(
	      caches.match(e.request).then(
	    	  function(response){
	    		  if(response == undefined){
	    			  console.log('Not in cache: '+e.request.url);
	    			  return fetch(e.request).then(
	    				function(response2){
	    					if(response2.status == 404){
	    						return caches.match('offline.html');
	    					}else{
	    						return response2;
	    					}
	    				}	  
	    			  );
	    		  }else{
	    			  console.log("From cache.. "+e.request.url);
	    			  return response;
	    			  
	    		  }
	    	  }	  
	      )			  
	  );
  }
  
});
