
import { RateLimiterService } from "../../../infrastructure/security/rate-imiter.service";

export const rateLimit = (rateLimiter: RateLimiterService) => ({
  beforeHandle({ request, set }: any) {

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    const allowed = rateLimiter.isAllowed(ip);

    if (!allowed) {
      set.status = 429;
      return {
        error: "Superaste el numero de solicitudes. Inténtalo de nuevo más tarde."
      };
    }
  }
});