<template>
  <div>
    <header>
      <NuxtLink to="/">Home</NuxtLink>
      <input ref="inputRef" type="text" @changed="go" />
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$maps.createAutocomplete(this.$refs.inputRef);
  },
  methods: {
    go(event) {
      const { place } = event.detail;
      // in case the user types enter without selecting any suggested option in the dropdown
      if (!place.geometry) return;

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.inputRef.value,
        },
      });
    },
  },
};
</script>
