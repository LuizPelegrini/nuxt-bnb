/**
 * Will add and load Maps 3rd-party scripts at start
 */
export default function (context, inject) {
  let pending = [];
  let isLoaded = false;

  function showMap(element, lat, lng, homesLocations) {
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
      styles: [
        {
          featureType: 'poi.business', // select all businesses
          elementType: 'labels.icon', // select the icon of those businesses
          stylers: [{ visibility: 'off' }], // and turn them off to avoid visual cluttering
        },
      ],
    });

    if (!homesLocations || homesLocations.length === 0) {
      // ...create a marker
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(lat, lng),
      });

      // ...pin the marker on the map
      marker.setMap(map);
      return;
    }

    // creating markers nearby location
    // Bounds is the maps viewport
    const bounds = new window.google.maps.LatLngBounds();
    homesLocations.forEach(location => {
      const position = new window.google.maps.LatLng(
        location.lat,
        location.lng,
      );

      const marker = new window.google.maps.Marker({
        position,
        label: {
          text: `$${location.pricePerNight}`,
          className: `marker homes-${location.homeId}`, // homes-id will be used to select the marker when hovering over the HomeRow with the same id
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png', // to get rid of the default image
      });
      marker.setMap(map);

      // for each marker added, extend the bounds
      bounds.extend(position);
    });

    // set the maps viewport
    map.fitBounds(bounds);
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
