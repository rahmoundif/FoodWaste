import { Scalar } from '@scalar/hono-api-reference'
import { AppAPI } from "./types";
import packageJSON from "../../package.json";



export default function ConfigApi(app: AppAPI) {
  app.doc("/doc", {
    openapi: "1.0.0",
        info: {
            version: packageJSON.version,
            title: "FoodWaste API",
            description: "API for FoodWaste application",
        },
});

app.get('/reference', 
  
  Scalar(() => {
  return {
    layout: 'classic',
    theme: "kepler",
    url: '/doc',
    
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
  };
}));

  
}