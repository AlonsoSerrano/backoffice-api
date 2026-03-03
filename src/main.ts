import { userController } from './interfaces/http/controller/user.controller';
import { createServer } from "./interfaces/http/server";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { MongoUserRepository } from "./infrastructure/repositories/mongo-user.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user";
import { JwtService } from './infrastructure/auth/jwt.service';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { authController } from './interfaces/http/controller/auth.controller';
import { GetUsersUseCase } from './application/use-cases/get-users.usecase';
import { RateLimiterService } from './infrastructure/security/rate-imiter.service';
import { env } from './infrastructure/config/env';
import { UpdateUserUseCase } from './application/use-cases/update-user';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
await connectMongo();

const rateLimiter = new RateLimiterService(env.rateLimitTry, env.rateLimitTime); 


const userRepository = new MongoUserRepository();
const jwtService = new JwtService();

const getUsersUseCase = new GetUsersUseCase(userRepository);

const updateUserUseCase = new  UpdateUserUseCase(userRepository,
    jwtService);

const deleteUserUseCase = new  DeleteUserUseCase(userRepository);

const createUserUseCase = new CreateUserUseCase(
    userRepository, jwtService);

const loginUseCase = new LoginUseCase(
  userRepository,
  jwtService
);

const app = createServer()
.use(userController(createUserUseCase, getUsersUseCase,jwtService,rateLimiter, updateUserUseCase, deleteUserUseCase))
.use(authController(loginUseCase, rateLimiter));

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);