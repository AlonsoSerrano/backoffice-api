import { RateLimiterService } from "../../infrastructure/security/rate-imiter.service";
import { env } from "../../infrastructure/config/env";
import { JwtService } from "../../infrastructure/auth/jwt.service";
import { MongoProjectRepository } from "../../infrastructure/repositories/mongo-project.repository";
import { CreateProjectUseCase } from '../../application/project-use-cases/create-project.usecase';
import { FindProjectByIdUseCase } from "../../application/project-use-cases/find-project-by-id.usecase";
import { FindAllProjectsUseCase } from "../../application/project-use-cases/find-all-projects.usecase";
import { UpdateProjectUseCase } from "../../application/project-use-cases/update-project.usecase";
import { DeleteProjectUseCase } from "../../application/project-use-cases/delete-project.usecase";
import { projectController } from "./project.controller";

export const ProjectModule = () => {
  const rateLimiter = new RateLimiterService(
    env.rateLimitTry,
    env.rateLimitTime,
  );
  const jwtService = new JwtService();


const projectRepository = new MongoProjectRepository();

const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
const findAllProjectsUseCase = new FindAllProjectsUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);

  return projectController(
      createProjectUseCase,
      findProjectByIdUseCase,
      findAllProjectsUseCase,
      updateProjectUseCase,
      deleteProjectUseCase,
      jwtService,
      rateLimiter,
  );
};
