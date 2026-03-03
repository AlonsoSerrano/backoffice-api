import { Elysia } from "elysia";
import { JwtService } from "../../infrastructure/auth/jwt.service";
import { RateLimiterService } from "../../infrastructure/security/rate-imiter.service";
import { rateLimit } from "../../interfaces/http/middleware/rate-limiter.middleware";
import { requireAuth } from "../../interfaces/http/middleware/auth.middleware";

import { CreateProjectUseCase } from "../../application/project-use-cases/create-project.usecase";
import { CreateProjectDTO } from "../../application/dto/create-project.dto";
import { FindProjectByIdUseCase } from "../../application/project-use-cases/find-project-by-id.usecase";
import { FindAllProjectsUseCase } from "../../application/project-use-cases/find-all-projects.usecase";
import { UpdateProjectDTO } from "../../application/dto/update-project.dto";
import { UpdateProjectUseCase } from '../../application/project-use-cases/update-project.usecase';
import { DeleteProjectUseCase } from '../../application/project-use-cases/delete-project.usecase';

export const projectController = (
  createProjectUseCase: CreateProjectUseCase,
  findProjectByIdUseCase: FindProjectByIdUseCase,
  findAllProjectsUseCase: FindAllProjectsUseCase,
  updateProjectUseCase: UpdateProjectUseCase,
  deleteProjectUseCase: DeleteProjectUseCase,
  jwtService: JwtService,
  ratelimiter: RateLimiterService,
) =>
  new Elysia({ prefix: "/project" }).guard(
    {
      ...requireAuth(jwtService),
      ...rateLimit(ratelimiter),
    },

    (app) =>
      app
        .post("/", async ({ body }) => {
          const dto = body as CreateProjectDTO;

          const project = await createProjectUseCase.execute(dto);

          return {
            name: project.name,
            description: project.description,
            ownerId: project.ownerId,
            progress: project.progress,
          };
        })
        .get("/:id", async ({ params }) => {
          const project = await findProjectByIdUseCase.execute(params.id);

          return {
            id: project.id,
            name: project.name,
            description: project.description,
            ownerId: project.ownerId,
            progress: project.progress,
          };
        })

        .get("/findAll", async () => {
          const projects = await findAllProjectsUseCase.execute();

          return projects.map((project) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            ownerId: project.ownerId,
            progress: project.progress,
          }));
        })

        .put("/:id", async ({ params, body }) => {
          const { id } = params;
          const dto: UpdateProjectDTO = {
            id,
            ...(body as Omit<UpdateProjectDTO, "id">),
          };

          return await updateProjectUseCase.execute(dto);
        })

         .delete("/:id", async ({ params }) => {
            const { id } = params;
            return await deleteProjectUseCase.execute(id);
          })
  );
