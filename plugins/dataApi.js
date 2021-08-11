export default function (context, inject) {
  // fetches home by id
  async function getHome(homeId) {
    const response = await fetch(
      `https://${process.env.agoliaAppId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
      {
        headers: {
          'X-Algolia-API-Key': process.env.agoliaApiKey,
          'X-Algolia-Application-Id': process.env.agoliaAppId,
        },
      },
    );

    const home = await response.json();
    return home;
  }

  // inject dataApi into Nuxt context
  inject('dataApi', {
    getHome,
  });
}
