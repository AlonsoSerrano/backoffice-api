import { Elysia } from "elysia";
import { CreateUserUseCase } from "../../../application/use-cases/create-user";
import { authPlugin } from "../plugins/auth.plugin";
import { JwtService } from "../../../infrastructure/auth/jwt.service";
import { GetUsersUseCase } from '../../../application/use-cases/get-users.usecase';
import { RateLimiterService } from "../../../infrastructure/security/rate-imiter.service";
import { rateLimit } from "../../middleware/rate-limiter.middleware";
import { requireAuth } from "../../middleware/auth.middleware";
export const userController = (
  createUserUseCase: CreateUserUseCase,
  getUsersUseCase: GetUsersUseCase,
  jwtService: JwtService,
  ratelimiter: RateLimiterService
) =>
  new Elysia({ prefix: "/users" })

    .guard(
      rateLimit(ratelimiter),
      app=>
    app.post("/", async ({ body }) => {
      const { email, password } = body as any;

      const user = await createUserUseCase.execute(
        email,
        password
      );

      return {
        id: user.id,
        email: user.email,
        role: user.role
      };
    })
  )

    .guard(
      {
        ...requireAuth(jwtService),
        ...rateLimit(ratelimiter)
      },

    app=>
    
    app.get("/getAll", async () => {
      const users = await getUsersUseCase.execute();

      return users.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role
      }));

    })
  );