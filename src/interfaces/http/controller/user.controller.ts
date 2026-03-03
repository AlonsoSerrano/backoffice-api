import { Elysia } from "elysia";
import { CreateUserUseCase } from "../../../application/use-cases/create-user";

export const userController = (createUserUseCase: CreateUserUseCase) =>
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
    });