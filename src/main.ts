import { createServer } from "./interfaces/http/server";
import { env } from "./infrastructure/config/env";

const app = createServer();

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);