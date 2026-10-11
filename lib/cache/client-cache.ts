/**
 * Client-side in-memory API response cache with TTL and in-flight request deduplication.
 * Prevents duplicate network requests across HomePage, BookingModal, and ServicesPage.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const inflightRequests = new Map<string, Promise<any>>();

export async function fetchWithCache<T = any>(
  url: string,
  ttlMs: number = 60_000
): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(url);

  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }

  // Deduplicate simultaneous in-flight requests to the same URL
  const existingRequest = inflightRequests.get(url);
  if (existingRequest) {
    return existingRequest as Promise<T>;
  }

  const requestPromise = fetch(url)
    .then(async (res) => {
      const json = await res.json();
      if (res.ok && json.success !== false) {
        memoryCache.set(url, {
          data: json,
          expiresAt: Date.now() + ttlMs,
        });
      }
      return json as T;
    })
    .finally(() => {
      inflightRequests.delete(url);
    });

  inflightRequests.set(url, requestPromise);
  return requestPromise;
}

export function invalidateClientCache(prefix?: string) {
  if (!prefix) {
    memoryCache.clear();
    return;
  }
  Array.from(memoryCache.keys()).forEach((key) => {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  });
}

