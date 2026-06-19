import process from "node:process";

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    publicAppUrl: process.env.PUBLIC_APP_URL ?? "http://localhost:3000",
    database: process.env.DATABASE_URL
      ? { url: process.env.DATABASE_URL }
      : undefined,
  };
}
