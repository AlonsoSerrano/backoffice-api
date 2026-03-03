import { RateLimiterService } from "../../infrastructure/security/rate-imiter.service";
import { env } from "../../infrastructure/config/env";
import { JwtService } from "../../infrastructure/auth/jwt.service";
import { LoginUseCase } from "../../application/use-cases/login.usecase";
import { MongoUserRepository } from "../../infrastructure/repositories/mongo-user.repository";
import { authController } from "./auth.controller";

export const AuthModule = () => {
  const rateLimiter = new RateLimiterService(
    env.rateLimitTry,
    env.rateLimitTime,
  );
  const jwtService = new JwtService();

  const userRepository = new MongoUserRepository();
  const loginUseCase = new LoginUseCase(userRepository, jwtService);

  return authController(loginUseCase, rateLimiter);
};
