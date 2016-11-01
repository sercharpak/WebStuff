(function() {
  'use strict';
  
  
  /************ DATABASE ************************/
  
  const DB_NAME = 'indexeddb-flights';
  const DB_VERSION = 1; // Use a long long for this value (don't use a float)
  const DB_STORE_NAME = 'flights';
  
  var db;
  var current_view_pub_key;
  
  function openDB(){
	  if(!window.indexedDB){
	    window.alert("Your browser doesn't support a stable database.")
	  } else {
	    var request = window.indexedDB.open(DB_NAME, DB_VERSION);
	    request.onerror = function(event){
	      window.alert("Error connection to IndexedDB.")
	    };
	    request.onsuccess = function(event){      
	      db = this.result;
	      console.log("Welcome to IndexedDB.")
	    };
	    request.onupgradeneeded = function(event) {
	      console.log("[IDB-UPGRADE]");
	      var objectStore = event.currentTarget.result.createObjectStore(
	    		  DB_STORE_NAME,{keyPath: 'id', autoincrement: true});
	      
	      objectStore.createIndex('a','a',{unique: true});
	      objectStore.createIndex('b','b',{unique: false});
	      objectStore.createIndex('c','c',{unique: false});      
	    };
	  }
  }
  
  function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

  function clearObjectStore(store_name) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
      displayActionSuccess("Store cleared");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("clearObjectStore:", evt.target.errorCode);
      displayActionFailure(this.error);
    };
  }

  openDB();
  
  
  
  /************** APLICATION *********************/
  var app = {
    isLoading: true,
    visibleCards: {},
    selectedFlights: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
/*
  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.updateForecasts();
  });
*/

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateForecastCard = function(data) {
	  
	  
    var dataLastUpdated = new Date(data.created);
    var hour = new Date(data.hour);
    var state = data.state;
    var ae = data.ae;
    
    var card = app.visibleCards[data.key];
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.name').textContent = data.name;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    }

    // Verifies the data provide is newer than what's already visible
    // on the card, if it's not bail, if it is, continue and update the
    // time saved in the card
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = data.created;
    card.querySelector('.image .ae').classList.add(app.getAeClass(ae));
    card.querySelector('.date').textContent = hour;
    card.querySelector('.state .value').textContent = state;
    card.querySelector('.value').classList.add(app.getStateClass(state));
    
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

  app.getStateClass = function(state) {
	    switch (state) {	      
	      case "ON TIME":
	    	  return 'ontime';
	      case "DELAYED":
	    	  return 'delayed';
	      case "TO LAND":
	    	  return 'toland';
	      case "TO BOARD":
	    	  return 'toboard';
	      case "TO TAKE OFF":
	    	  return 'totakeoff';	     
	    }
	  };
  app.getAeClass = function(ae) {
	    switch (ae) {	      
	      case "AV":	    	  
	    	  return 'av';
	      case "DT":
	    	  return 'dt';
	      case "FC":
	    	  return 'fc';
	      case "LA":
	    	  return 'la';	     
	    }
	  };
  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  /*
   * Gets a forecast for a specific city and updates the card with the data.
   * getForecast() first checks if the weather data is in the cache. If so,
   * then it gets that data and populates the card with the cached data.
   * Then, getForecast() goes to the network for fresh data. If the network
   * request goes through, then the card gets updated a second time with the
   * freshest data.
   */
  app.getForecast = function(key) {
    var url = 'http://localhost:8080/flights/webapi/flights/' + key;
    console.log(url);
    // TODO add cache logic here
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
        var json = response.json();
        console.log("[DATA]"+json);
        json.then(function updateFromCache(json) {
        	  
            json.created = new Date();
            app.updateForecastCard(json);
          });
        }
      });
    }
    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          console.log(response);
          response.created = new Date();
          app.updateForecastCard(response);
        }
      } else {
        // Return the initial weather forecast since no data is available.
        app.updateForecastCard(initialFlightForecast);
      }
    };
    request.open('GET', url);
    request.send();
  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  // TODO add saveselectedFlights function here
  // Save list of cities to localStorage.
  app.saveselectedFlights = function() {
    var selectedFlights = JSON.stringify(app.selectedFlights);
    localStorage.selectedFlights = selectedFlights;
  };

  /*
   * Fake weather data that is presented when the user first uses the app,
   * or when the user has not saved any cities. See startup code for more
   * discussion.
   */
  var initialFlightForecast = {
    key: '0',
    ae: 'AV',
    name: '8892 : Bogotá to New York',
    created: '2016-10-20T23:32:46.997-05:00',
    hour: '2016-10-20T23:32:46.997-05:00',
    state: 'ON TIME',
  };
  // TODO uncomment line below to test app with fake data
  // app.updateForecastCard(initialWeatherForecast);

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  // TODO add startup code here
  app.selectedFlights = localStorage.selectedFlights;
  if (app.selectedFlights) {
    app.selectedFlights = JSON.parse(app.selectedFlights);
    app.selectedFlights.forEach(function(flight) {
      app.getForecast(flight.key);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
	var f;
	for(f = 1; f <=5 ; f++){
		if (!app.selectedFlights) {
		  app.selectedFlights = [];
		}
		app.getForecast(f);
		app.selectedFlights.push({key: f});
		app.saveselectedFlights();
  	}    
  }

  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();