<template>
  <div>
    <h4>Results for {{ label }}</h4>
    <div ref="map" style="width: 800px; height: 800px; float: right"></div>
    <div v-if="homes.length > 0">
      <NuxtLink
        v-for="home in homes"
        :key="home.objectID"
        :to="`home/${home.objectID}`"
      >
        <HomeRow
          :home="home"
          @mouseenter.native="highlightMarker(home.objectID, true)"
          @mouseleave.native="highlightMarker(home.objectID, false)"
        />
      </NuxtLink>
    </div>
    <div v-else>No Results Found</div>
  </div>
</template>

<script>
export default {
  // runs whenever route changes (query params changes)
  async beforeRouteUpdate(to, from, next) {
    const response = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng,
    );

    this.homes = response.data.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;

    // update map whenever query params changes
    this.updateMap();

    next();
  },

  async asyncData({ query, $dataApi }) {
    const response = await $dataApi.getHomesByLocation(query.lat, query.lng);

    return {
      homes: response.data.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },

  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },

  computed: {
    // returns only the lat,lng info for the homes
    homesPositions() {
      return this.homes.map(home => ({
        // eslint-disable-next-line no-underscore-dangle
        ...home._geoloc,
        pricePerNight: home.pricePerNight, // for displaying the price on the marker
        homeId: home.objectID, // for adding a css class homes-`homeID` on the marker (useful for selecting later when hovering)
      }));
    },
  },

  mounted() {
    // show the map when the page is mounted
    this.updateMap();
  },

  methods: {
    updateMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.homesPositions,
      );
    },

    // adds/removes the highlighter class
    highlightMarker(id, isHighlighted) {
      document
        .getElementsByClassName(`homes-${id}`)[0]
        ?.classList?.toggle('marker-highlight', isHighlighted);
    },
  },
};
</script>

<style>
.marker {
  background-color: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}

.marker-highlight {
  background-color: black;
  color: white !important;
  border: 1px solid black;
}
</style>
