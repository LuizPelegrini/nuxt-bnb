<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg" />
      </div>
      <div class="app-search">
        <input
          ref="inputRef"
          type="text"
          placeholder="Enter your address"
          @changed="go"
        />
        <input type="text" class="datepicker" placeholder="Check in" />
        <input type="text" class="datepicker" placeholder="Check out" />
        <button>
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <img src="/images/icons/house.svg" />
        <div class="name">Host</div>
        <img src="/images/user.jpg" class="avatar" />
      </div>
    </header>
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
