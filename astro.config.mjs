import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? process.env.CF_PAGES_URL,
  trailingSlash: "always",
});
