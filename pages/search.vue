<template>
  <div v-if="homes.length > 0">
    <HomeRow v-for="home in homes" :key="home.objectID" :home="home" />
  </div>
  <div v-else>No Results Found</div>
</template>

<script>
export default {
  async beforeRouteUpdate(to, from, next) {
    const response = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng,
    );

    this.homes = response.data.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;

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
};
</script>
