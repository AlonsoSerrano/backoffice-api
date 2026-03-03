import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,

  rateLimitTry: Number(process.env.RATE_LIMIT_TRY),
  rateLimitTime: Number(process.env.RATE_LIMIT_TIME),
};
