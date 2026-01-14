import { createRouter } from "@/lib/create-app";
import * as handlers from "./category.handler";
import * as routes from "./category.routes";

const router = createRouter();
router.openapi(routes.category, handlers.listCategory);

export default router;
