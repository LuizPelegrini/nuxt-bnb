/**
 * Will add and load Maps 3rd-party scripts at start
 */
export default function (context, inject) {
  let mapsPending = null;
  let mapsLoaded = false;

  function renderMap({ element, lat, lng }) {
    const map = new window.google.maps.Map(element, {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    });

    // create a marker
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(lat, lng),
    });

    // pin the marker on the map
    marker.setMap(map);
  }

  function showMap(element, lat, lng) {
    if (mapsLoaded) {
      renderMap({ element, lat, lng });
    } else {
      // in case maps hasn't been loaded yet, so we cache the location data for later
      mapsPending = { element, lat, lng };
    }
  }

  // google maps callback
  function initMap() {
    mapsLoaded = true;
    if (mapsPending) {
      renderMap(mapsPending);
      mapsPending = null;
    }
  }

  // entry
  function addScript() {
    const scriptEl = document.createElement('script');
    scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.mapsKey}&libraries=places&callback=initMap`;
    scriptEl.async = true;
    window.initMap = initMap; // google maps still needs a global function to call, so define a pointer in the global scope that points to our Nuxt plugin local function
    document.head.appendChild(scriptEl);
  }

  addScript();

  // this will allow anywhere in Vue, Vuex to access the maps by this.$maps
  inject('maps', { showMap });
}
