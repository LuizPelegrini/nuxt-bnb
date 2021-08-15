<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: left; margin: 10px"
    >
      <NuxtLink :to="`/home/${home.objectID}`" prefetch>
        <home-card :home="home" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $dataApi, error }) {
    const response = await $dataApi.getHomes();
    if (!response.ok) {
      return error({
        statusCode: response.status,
        message: response.statusText,
      });
    }

    return {
      homes: response.data.hits,
    };
  },
  head() {
    // adding head tags
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is the homepage description',
          hid: 'description',
        },
      ],
    };
  },
};
</script>
