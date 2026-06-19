import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getServerConfig } from "@/lib/config.server";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (authInstance) return authInstance;

  const config = getServerConfig();

  authInstance = betterAuth({
    database: drizzleAdapter(config.database!, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    trustedOrigins: [config.publicAppUrl ?? "http://localhost:3000"],
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    advanced: {
      generateId: true,
    },
  });

  return authInstance;
}
