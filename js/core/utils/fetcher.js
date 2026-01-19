const dataCached = new Map();

/**
 * @param {string} path
 * @param {number} ttl
 */
export function getData(path, ttl = 0) {
  const cached = dataCached.get(path);

  if (cached) {
    if (!ttl || Date.now() - cached.time < ttl) {
      return cached.promise;
    }
    dataCached.delete(path);
  }

  const fetchPromise = fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      dataCached.delete(path);
      console.error(`Failed to fetch ${path}:`, error);
      throw error;
    });

  dataCached.set(path, {
    promise: fetchPromise,
    time: Date.now(),
  });

  return fetchPromise;
}

/**
 * @param {string} path
 */
export function clearDataCache(path) {
  if (path) dataCached.delete(path);
  else dataCached.clear();
}
