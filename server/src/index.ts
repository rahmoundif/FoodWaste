import app from "./app";
import env from "./middlewares/env";

const port = env.PORT;
console.log(`Server is running on http://localhost:${port}`);

Bun.serve({
  fetch: app.fetch,
  port
});