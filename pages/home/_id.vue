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
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" alt="reviewer image" /><br />
      {{ review.reviewer.name }}<br />
      <ShortText :text="review.comment" :target="150" /><br />
      {{ formatDate(review.date) }}<br />
    </div>
    <img :src="user.image" alt="host image" /><br />
    {{ user.name }}<br />
    {{ formatDate(user.joined) }}<br />
    {{ user.description }}<br />
    {{ user.reviewCount }}<br />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $dataApi, error }) {
    // start fetching all the same time and resume when all is done
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUsersByHomeId(params.id),
    ]);

    const badResponse = responses.find(response => !response.ok);
    if (badResponse) {
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });
    }

    return {
      home: responses[0].data,
      reviews: responses[1].data.hits,
      user: responses[2].data.hits[0], // guaranteed to be only one user
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

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString(undefined, {
        month: 'long',
        year: 'numeric',
      });
    },
  },
};
</script>
