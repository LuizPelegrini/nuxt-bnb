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
    };
  },
  created() {
    // when the page loads for the first time, created() run on the server and on client
    // further accesses to this page, created() will only run on the client
    this.home = homes.find(home => this.$route.params.id === home.objectID);
  },
};
</script>
