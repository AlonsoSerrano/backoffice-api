import { swagger } from '@elysiajs/swagger';
import { createServer } from "./interfaces/http/server";
import { connectMongo } from "./infrastructure/database/mongo.connection";
import { env } from "./infrastructure/config/env";
import { UserModule } from "./modules/user/user.module";
import { ProjectModule } from "./modules/project/project.module";
import { AuthModule } from "./modules/auth/auth.module";
import openapi from "../openapi.json"

await connectMongo();

const app = createServer()
  .use(UserModule())
  .use(AuthModule())
  .use(ProjectModule())
  .use(swagger())
  .use(
    swagger({
      documentation: openapi as any,
       path: "/openapi"
    })
  )

  ;

app.listen(env.port);

console.log(`Servidor corriendo en puerto: ${env.port}`);
