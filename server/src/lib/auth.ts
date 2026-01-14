import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import env from "../middlewares/env.js";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	// Allow requests from the frontend development server
	trustedOrigins: [`http://localhost:${env.PORT}`],
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		},
	},
	user: {
		additionalFields: {
			role: {
				type: ["user", "admin", "moderator"],
				required: false,
				defaultValue: "user",
				input: false, // Prevent users from setting their own role
			},
		},
	},
	plugins: [openAPI()],
});
