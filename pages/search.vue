<template>
  <div>
    <div v-for="home in homes" :key="home.objectID">
      {{ home.title }}
    </div>
  </div>
</template>

<script>
export default {
  async beforeRouteUpdate(to, from, next) {
    const response = await this.dataApi.getHomesByLocation(
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
};
</script>
