import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "../db";
import { privateEnv } from "~/config/privateEnv";
import { publicEnv } from "~/config/publicEnv";

export const auth = betterAuth({
  baseURL: publicEnv.BETTER_AUTH_URL || "http://localhost:3000",
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: privateEnv.GOOGLE_CLIENT_ID,
      clientSecret: privateEnv.GOOGLE_CLIENT_SECRET,
    },
  },
});
