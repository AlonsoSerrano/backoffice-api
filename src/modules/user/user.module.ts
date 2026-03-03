import { RateLimiterService } from "../../infrastructure/security/rate-imiter.service";
import { JwtService } from "../../infrastructure/auth/jwt.service";
import { MongoUserRepository } from "../../infrastructure/repositories/mongo-user.repository";
import { env } from "../../infrastructure/config/env";
import { CreateUserUseCase } from "../../application/use-cases/create-user";
import { GetUsersUseCase } from "../../application/use-cases/get-users.usecase";
import { UpdateUserUseCase } from "../../application/use-cases/update-user";
import { DeleteUserUseCase } from "../../application/use-cases/delete-user.usecase";
import { userController } from "./user.controller";

export const UserModule = () => {
  const rateLimiter = new RateLimiterService(
    env.rateLimitTry,
    env.rateLimitTime,
  );
  const jwtService = new JwtService();

  const userRepository = new MongoUserRepository();

  const createUserUseCase = new CreateUserUseCase(userRepository, jwtService);
  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository, jwtService);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  return userController(
    createUserUseCase,
    getUsersUseCase,
    jwtService,
    rateLimiter,
    updateUserUseCase,
    deleteUserUseCase,
  );
};
