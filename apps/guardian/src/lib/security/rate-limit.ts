const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number }
>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export function rateLimitMiddleware(
  key: string,
  maxRequests = 60,
  windowMs = 60000,
): Response | null {
  if (!checkRateLimit(key, maxRequests, windowMs)) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(windowMs / 1000)) },
    });
  }
  return null;
}
