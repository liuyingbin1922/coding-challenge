import { useState } from "react";

export function useRequestWithCache (api, cacheTime) {
  const [cache, setCache] = useState(new Map());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const now = Date.now();
  return async () => {
    if (cache.has(api)) {
      const { data, time } = cache.get(api);
      if (now - time < cacheTime) {
        return data;
      }
    }
    try {
      setLoading(true);
      const res = await fetch(api);
      const data = await res.json();
      cache.set(api, { data, time: now });
      return data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }

    return {
      data,
      loading,
      error,
      refresh: () => {
        setCache(new Map());
      }
    }
  }
}