export default {
  components: true, // autoimport of components
  env: {
    mapsKey: process.env.MAPS_API_KEY,
  },
  head: {
    // every page head config
    titleTemplate: 'Mastering Nuxt: %s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
    ],
    bodyAttrs: {
      class: ['my-style'],
    },
  },
  router: {
    prefetchLinks: false, // disable prefetching globally using NuxtLink
  },
};