import { createServer } from "./interfaces/http/server";
import { env } from "./infrastructure/config/env";
import { connectMongo } from "./infrastructure/database/mongo.connection";

await connectMongo();
const app = createServer();

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);