import { Hono } from "hono";
import { auth } from "@/lib/auth";
import type { AuthType } from "@/lib/types";
import { db } from "@/db";
import { profile } from "@/db/schema";

const router = new Hono<{ Bindings: AuthType }>({
  strict: false,
});

// Intercept sign-up to create profile
router.post("/auth/sign-up/email", async (c) => {
  const response = await auth.handler(c.req.raw);


  if (response.status === 200) {

    const data = await response.clone().json() as AuthType["Variables"];

    if (data.user) {
      await db
        .insert(profile)
        .values({
          userId: data.user.id,
          admin: false,
        })
        .catch(() => {});
    }
  }

  return response;
});

router.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default router;
