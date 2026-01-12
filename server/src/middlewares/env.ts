import z from "zod";

const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
    LOG_LEVEL: z.enum(["fatal","debug","info", "warn", "error", "trace"]).default("info"),
    BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters long"),
    BETTER_AUTH_URL: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

});
export type Env = z.infer<typeof  envSchema>;

let env: Env;

try{
    env = envSchema.parse(process.env);

} catch (e) {
const error = e as z.ZodError;
    console.error("❌ Invalid environment variables:");
    console.error(z.prettifyError(error));
    process.exit(1);
};

export default env;