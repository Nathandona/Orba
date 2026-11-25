import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer loads env files itself. Next.js reads .env.local first,
// so mirror that order for the CLI.
config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Only migrate/push/studio need a URL. Leaving it optional keeps
  // `prisma generate` (postinstall) working without DATABASE_URL.
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
