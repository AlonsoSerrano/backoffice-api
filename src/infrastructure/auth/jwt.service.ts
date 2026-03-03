import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthService } from "../../application/services/auth.service";
import { env } from "../config/env";

export class JwtService implements AuthService {

  generateToken(userId: string, role: string) {
    return jwt.sign(
      { sub: userId, role },
      env.jwtSecret,
      { expiresIn: "24h" }
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, env.jwtSecret);
  }

  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}