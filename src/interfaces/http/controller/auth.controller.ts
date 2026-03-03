import { Elysia } from "elysia";
import { LoginUseCase } from "../../../application/use-cases/login.usecase";

export const authController = (
  loginUseCase: LoginUseCase
) =>
  new Elysia({ prefix: "/auth" })
    .post("/login", async ({ body }) => {
      const { email, password } = body as any;

      return await loginUseCase.execute(email, password);
    });