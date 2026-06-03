/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url, options = {}) {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;
  return fetch(`https://8f7h4w-8081.csb.app${url}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }
    return data;
  });
}

export default fetchModel;
