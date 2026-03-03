import { Elysia } from "elysia";

export const createServer = () => {
  return new Elysia().get("/hello", () => ({
    status: "Ok",
  }));
};
