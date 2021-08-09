<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
        alt="home images"
      />
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} / night<br />
    <img src="/images/marker.svg" alt="marker icon" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }}<br />
    <img src="/images/star.svg" alt="star icon" width="20" height="20" />
    {{ home.reviewValue }}<br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath<br />
    {{ home.description }}
    <div ref="map" style="width: 800px; height: 800px"></div>
  </div>
</template>

<script>
import homes from '~/data/homes';

export default {
  data() {
    return {
      home: {},
    };
  },
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.mapsKey}&libraries=places`,
          hid: 'map',
          async: true,
          skip: process.client && window.mapsLoaded, // window is only available on client-side, thats why we need to check with process.client
          callback: () => {
            window.mapsLoaded = true;
          },
        },
      ],
    };
  },
  // created runs on server-side only
  created() {
    // when the page loads for the first time, created() run on the server and on client
    // further accesses to this page, created() will only run on the client
    this.home = homes.find(home => this.$route.params.id === home.objectID);
  },
  mounted() {
    // checks every 200ms whether maps API has been loaded...
    const timer = setInterval(() => {
      if (window.mapsLoaded) {
        this.showMap();
        clearInterval(timer);
      }
    }, 200);
  },
  methods: {
    showMap() {
      const map = new window.google.maps.Map(this.$refs.map, {
        zoom: 18,
        center: new window.google.maps.LatLng(
          // eslint-disable-next-line no-underscore-dangle
          this.home._geoloc.lat,
          // eslint-disable-next-line no-underscore-dangle
          this.home._geoloc.lng,
        ),
        disableDefaultUI: true,
        zoomControl: true,
      });

      // create a marker
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          // eslint-disable-next-line no-underscore-dangle
          this.home._geoloc.lat,
          // eslint-disable-next-line no-underscore-dangle
          this.home._geoloc.lng,
        ),
      });

      // pin the marker on the map
      marker.setMap(map);
    },
  },
};
</script>
