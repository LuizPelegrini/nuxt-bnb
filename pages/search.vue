<template>
  <div>
    <h4>Results for {{ label }}</h4>
    <div ref="map" style="width: 800px; height: 800px; float: right"></div>
    <div v-if="homes.length > 0">
      <HomeRow v-for="home in homes" :key="home.objectID" :home="home" />
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

  mounted() {
    // show the map when the page is mounted
    this.updateMap();
  },

  methods: {
    updateMap() {
      this.$maps.showMap(this.$refs.map, this.lat, this.lng);
    },
  },
};
</script>
