import env from "./server/config/env.js";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/drizzle/migrations",
  schema: "./server/drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: env.db,
  },
});
