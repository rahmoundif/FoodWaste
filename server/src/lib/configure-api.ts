import { Scalar } from "@scalar/hono-api-reference";
import { AppAPI } from "./types";
import packageJSON from "../../package.json";
import { auth } from "./auth";

export default async function ConfigApi(app: AppAPI) {

  let betterAuthSchema = null;
  try {
    betterAuthSchema = await auth.api.generateOpenAPISchema();
    console.log(
      "Better Auth Schema generated successfully with",
    Object.keys(betterAuthSchema?.paths || {}).length,
      "paths"
    );
  } catch (error) {
    console.error("Error generating Better Auth schema:", error);
  }

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "FoodWaste API",
      description: "API for FoodWaste application",
    },
  });

  app.get("/merged-openapi.json", async (c) => {
    const ApiSpec = app.getOpenAPIDocument({
      openapi: "3.0.0",
      info: {
        version: packageJSON.version,
        title: "FoodWaste API",
        description: "API for FoodWaste application",
      },
    });

    if (!betterAuthSchema) {
      return c.json(ApiSpec);
    }

    const mergedSpec = {
      ...ApiSpec,
      paths: {
        ...ApiSpec.paths,
        ...betterAuthSchema.paths,
      },
      components: {
        schemas: {
          ...(ApiSpec.components?.schemas || {}),
          ...(betterAuthSchema.components?.schemas || {}),
        },
        securitySchemes: {
          ...(ApiSpec.components?.securitySchemes || {}),
          ...(betterAuthSchema.components?.securitySchemes || {}),
        },
      },
      tags: [
        ...(ApiSpec.tags || []),
        { name: "Authentication", description: "Better Auth endpoints" },
      ],
    };

    return c.json(mergedSpec);
  });

  app.get(
    "/reference",

    Scalar({
      url: "/merged-openapi.json",
      layout: "modern",
      theme: "bluePlanet",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    })
  );
}
