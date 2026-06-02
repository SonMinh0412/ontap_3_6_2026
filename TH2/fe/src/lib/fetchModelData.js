/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  return fetch(`https://rnwtly-8081.csb.app${url}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }
    return res.json();
  });
}

export default fetchModel;
