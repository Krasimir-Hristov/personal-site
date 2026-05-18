const WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param ip  The client IP address used as the key.
 * @param max Max requests per hour (default: 3).
 */
export const checkRateLimit = (ip: string, max = 3): boolean => {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count++;
  return true;
};
