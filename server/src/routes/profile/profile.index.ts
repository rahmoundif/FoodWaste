import { createRouter } from "@/lib/create-app";
import * as handlers from "./profile.handler";
import * as routes from "./profile.routes";


const router = createRouter()
.openapi(routes.profile, handlers.listProfile)
// .openapi(routes.createProfile, handlers.createProfile);

export default router;