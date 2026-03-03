import { userController } from "./interfaces/http/controller/user.controller";
import { createServer } from "./interfaces/http/server";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { MongoUserRepository } from "./infrastructure/repositories/mongo-user.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user";
import { JwtService } from "./infrastructure/auth/jwt.service";
import { LoginUseCase } from "./application/use-cases/login.usecase";
import { authController } from "./interfaces/http/controller/auth.controller";
import { GetUsersUseCase } from "./application/use-cases/get-users.usecase";
import { RateLimiterService } from "./infrastructure/security/rate-imiter.service";
import { env } from "./infrastructure/config/env";
import { UpdateUserUseCase } from "./application/use-cases/update-user";
import { DeleteUserUseCase } from "./application/use-cases/delete-user.usecase";
import { projectController } from "./interfaces/http/controller/project.controller";
import { CreateProjectUseCase } from "./application/project-use-cases/create-project.usecase";
import { MongoProjectRepository } from "./infrastructure/repositories/mongo-project.repository";
import { FindProjectByIdUseCase } from "./application/project-use-cases/find-project-by-id.usecase";
import { FindAllProjectsUseCase } from "./application/project-use-cases/find-all-projects.usecase";
import { UpdateProjectUseCase } from "./application/project-use-cases/update-project.usecase";
import { DeleteProjectUseCase } from "./application/project-use-cases/delete-project.usecase";

await connectMongo();

const rateLimiter = new RateLimiterService(env.rateLimitTry, env.rateLimitTime);

const userRepository = new MongoUserRepository();

const projectRepository = new MongoProjectRepository();

const jwtService = new JwtService();

const createUserUseCase = new CreateUserUseCase(userRepository, jwtService);
const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository, jwtService);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
const findAllProjectsUseCase = new FindAllProjectsUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

const loginUseCase = new LoginUseCase(userRepository, jwtService);

const app = createServer()
  .use(
    userController(
      createUserUseCase,
      getUsersUseCase,
      jwtService,
      rateLimiter,
      updateUserUseCase,
      deleteUserUseCase,
    ),
  )
  .use(authController(loginUseCase, rateLimiter))
  .use(
    projectController(
      createProjectUseCase,
      findProjectByIdUseCase,
      findAllProjectsUseCase,
      updateProjectUseCase,
      deleteProjectUseCase,
      jwtService,
      rateLimiter,
    ),
  );

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);
