/**
 * Will add and load Maps 3rd-party scripts at start
 */
export default function (context, inject) {
  let pending = [];
  let isLoaded = false;

  function showMap(element, lat, lng) {
    // if map is no loaded, add call to function to the pending list
    if (!isLoaded) {
      // in case maps hasn't been loaded yet, so we cache the location data for later
      pending.push({
        fn: showMap,
        arguments: [element, lat, lng],
      });

      return;
    }

    // otherwise, create the map...
    const map = new window.google.maps.Map(element, {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    });

    // ...create a marker
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
    });

    // ...pin the marker on the map
    marker.setMap(map);
  }

  function createAutocomplete(input) {
    if (!isLoaded) {
      pending.push({ fn: createAutocomplete, arguments: [input] });
      return;
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)'], // as the user types, predictions will be based on city names
    });

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      input.dispatchEvent(
        new CustomEvent('changed', {
          detail: { place },
        }),
      );
    });
  }

  // google maps callback
  function initGoogleMaps() {
    isLoaded = true;
    pending.forEach(item => {
      if (typeof item.fn === 'function') {
        item.fn(...item.arguments);
      }
    });
    pending = [];
  }

  // entry
  function addScript() {
    const scriptEl = document.createElement('script');
    scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.mapsKey}&libraries=places&callback=initGoogleMaps`;
    scriptEl.async = true; // to avoid Nuxt scripts to wait for this to finish
    window.initGoogleMaps = initGoogleMaps; // google maps still needs a global function to call, so define a pointer in the global scope that points to our Nuxt plugin local function
    document.head.appendChild(scriptEl);
  }

  addScript();

  // this will allow anywhere in Vue, Vuex to access the maps by this.$maps
  inject('maps', {
    showMap,
    createAutocomplete,
  });
}
