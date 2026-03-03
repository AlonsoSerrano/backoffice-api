import { userController } from './interfaces/http/controller/user.controller';
import { createServer } from "./interfaces/http/server";
import { env } from "./infrastructure/config/env";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { MongoUserRepository } from "./infrastructure/repositories/mongo-user.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user";
import { JwtService } from './infrastructure/auth/jwt.service';
await connectMongo();

const userRepository = new MongoUserRepository();
const jwtService = new JwtService();

const createUserUseCase = new CreateUserUseCase(userRepository, jwtService);

const app = createServer()
.use(userController(createUserUseCase));

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);