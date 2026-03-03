import { userController } from './interfaces/http/controller/user.controller';
import { createServer } from "./interfaces/http/server";
import { env } from "./infrastructure/config/env";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { MongoUserRepository } from "./infrastructure/repositories/mongo-user.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user";

await connectMongo();

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

const app = createServer()
.use(userController(createUserUseCase));

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);