import { JwtService } from "../../../infrastructure/auth/jwt.service";

export const requireAuth = (jwtService: JwtService) => ({
  beforeHandle({ headers, set }: any) {
    const authHeader = headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwtService.verifyToken(token) as any;

      return {
        user: {
          id: payload.sub,
          role: payload.role,
        },
      };
    } catch {
      set.status = 401;
      return { error: "Invalid token" };
    }
  },
});
