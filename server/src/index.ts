import app from "./app";

app.get("/", (c) => {
  return c.text("Check");
});

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});