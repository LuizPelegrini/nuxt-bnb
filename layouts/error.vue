<template>
  <div class="error-info">
    <h2>{{ error.statusCode }}</h2>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: 'Oops!',
    };
  },
};
</script>

<style scoped>
.error-info {
  text-align: center;
}
</style>
