type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

export class RateLimiterService {
  private store = new Map<string, RateLimitEntry>();

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number
  ) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      this.store.set(key, {
        count: 1,
        expiresAt: now + this.windowMs
      });
      return true;
    }

    if (now > entry.expiresAt) {
      this.store.set(key, {
        count: 1,
        expiresAt: now + this.windowMs
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count++;
    return true;
  }
}