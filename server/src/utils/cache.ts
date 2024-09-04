import NodeCache from "node-cache";

// Create a new cache instance
const cache = new NodeCache({ stdTTL: 600 }); // Set default TTL (Time To Live) to 600 seconds

// Utility function to get a cached value by key
export const getCache = (key: string) => {
  return cache.get(key);
};

// Utility function to set a cache value by key
export const setCache = (key: string, value: any, ttl?: number) => {
  if (ttl !== undefined) {
    return cache.set(key, value, ttl);
  } else {
    return cache.set(key, value);
  }
};

// Utility function to delete a cache entry by key
export const delCache = (key: string) => {
  return cache.del(key);
};

// Utility function to clear the entire cache
export const clearCache = () => {
  return cache.flushAll();
};

export default cache;
