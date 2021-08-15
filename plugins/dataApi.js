export default function (context, inject) {
  const headers = {
    'X-Algolia-API-Key': process.env.agoliaApiKey,
    'X-Algolia-Application-Id': process.env.agoliaAppId,
  };

  async function unwrap(response) {
    const data = await response.json();

    const { ok, status, statusText } = response;
    return {
      data,
      ok,
      status,
      statusText,
    };
  }

  async function getErrorResponse(error) {
    return {
      data: undefined,
      ok: false,
      status: 500,
      statusText: error.message,
    };
  }

  // fetches home by id
  async function getHome(homeId) {
    try {
      const response = await fetch(
        `https://${process.env.agoliaAppId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
        { headers },
      );

      return unwrap(response);
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  // Fetch all homes
  async function getHomes() {
    try {
      const response = await fetch(
        `https://${process.env.agoliaAppId}-dsn.algolia.net/1/indexes/homes`,
        { headers },
      );

      return unwrap(response);
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  // inject dataApi into Nuxt context
  inject('dataApi', {
    getHome,
    getHomes,
  });
}
