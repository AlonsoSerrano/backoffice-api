import { Elysia } from "elysia";
import { JwtService } from "../../../infrastructure/auth/jwt.service";

export const authPlugin = (jwtService: JwtService) =>
  new Elysia()
    .derive(({ headers, set }) => {

      const authHeader = headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        set.status= 401;
        throw new Error("Unauthorized");
      }

      const token = authHeader.split(" ")[1];

      try{
              const payload = jwtService.verifyToken(token) as any;
      return {
        userId: payload.sub,
        role: payload.role
      };

      }catch{
          set.status = 401;
        throw new Error("Invalid token");
      }


    });