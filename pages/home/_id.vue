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
export default {
  async asyncData({ params, $dataApi }) {
    const home = await $dataApi.getHome(params.id);
    return {
      home,
    };
  },
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      // eslint-disable-next-line no-underscore-dangle
      this.home._geoloc.lat,
      // eslint-disable-next-line no-underscore-dangle
      this.home._geoloc.lng,
    );
  },
};
</script>
