import { Elysia } from "elysia";
import { LoginUseCase } from "../../../application/use-cases/login.usecase";
import { RateLimiterService } from "../../../infrastructure/security/rate-imiter.service";
import { rateLimit } from "../middleware/rate-limiter.middleware";


export const authController = (
  loginUseCase: LoginUseCase,
  rateLimiter: RateLimiterService
) =>
  new Elysia({ prefix: "/auth" })

    .guard(
      rateLimit(rateLimiter),
    app =>
    app.post("/login", async ({ body }) => {
      const { email, password } = body as any;

      return await loginUseCase.execute(email, password);
    })
  );