import { Elysia } from "elysia";
import { CreateUserUseCase } from "../../../application/use-cases/create-user";
import { authPlugin } from "../plugins/auth.plugin";
import { JwtService } from "../../../infrastructure/auth/jwt.service";
import { GetUsersUseCase } from '../../../application/use-cases/get-users.usecase';

export const userController = (
  createUserUseCase: CreateUserUseCase,
  getUsersUseCase: GetUsersUseCase,
  jwtService: JwtService
) =>
  new Elysia({ prefix: "/users" })
    .post("/", async ({ body }) => {
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

    .use(authPlugin(jwtService))
    .get("/getAll", async () => {
      const users = await getUsersUseCase.execute();

      return users.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role
      }));

    });