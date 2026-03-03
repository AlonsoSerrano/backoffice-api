import { JwtService } from "../../infrastructure/auth/jwt.service";

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
          role: payload.role
        }
      };
    } catch {
      set.status = 401;
      return { error: "Invalid token" };
    }
  }
});
/*
export const requireRole = (role: string) => ({
  beforeHandle({ user, set }: any) {
    if (!user) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    if (user.role !== role) {
      set.status = 403;
      return { error: "Forbidden" };
    }
  }
});*/