export default {
  components: true, // autoimport of components
  env: {
    mapsKey: process.env.MAPS_API_KEY,
    agoliaAppId: process.env.AGOLIA_APP_ID,
    agoliaApiKey: process.env.AGOLIA_API_KEY,
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
  plugins: ['~/plugins/maps.client', '~/plugins/dataApi'],
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/sass/app.scss'],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },
};
