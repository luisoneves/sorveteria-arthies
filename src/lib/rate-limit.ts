// src/lib/rate-limit.ts

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();

  constructor(
    private windowMs: number = 15 * 60 * 1000,
    private maxRequests: number = 5
  ) {}

  private getKey(ip: string): string {
    return ip;
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetAt <= now) {
        this.store.delete(key);
      }
    }
  }

  check(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
    this.cleanExpired();

    const key = this.getKey(ip);
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || entry.resetAt <= now) {
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1, resetAt: now + this.windowMs };
    }

    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0, resetAt: entry.resetAt };
    }

    entry.count++;
    return { allowed: true, remaining: this.maxRequests - entry.count, resetAt: entry.resetAt };
  }

  reset(ip: string): void {
    this.store.delete(this.getKey(ip));
  }
}

export const authRateLimiter = new RateLimiter(15 * 60 * 1000, 5);

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export function setRateLimitHeaders(
  response: Response,
  remaining: number,
  resetAt: number
): Response {
  const resetInSeconds = Math.ceil((resetAt - Date.now()) / 1000);
  
  response.headers.set('RateLimit-Limit', String(5));
  response.headers.set('RateLimit-Remaining', String(Math.max(0, remaining)));
  response.headers.set('RateLimit-Reset', String(resetInSeconds));
  response.headers.set('Retry-After', String(resetInSeconds));

  return response;
}
