import { site } from "../data/site.js";
import { getCollection } from "astro:content";
import { projectFromEntry, sortProjects } from "../data/project-entry.js";

export async function GET({ site: astroSite }) {
  const origin = astroSite?.origin ?? "https://localhost";
  const projectEntries = await getCollection("projects");
  const projects = sortProjects(projectEntries.map(projectFromEntry));
  const urls = [
    ...site.nav.map((item) => item.href),
    ...projects.map((project) => `/projects/${project.slug}/`),
    "/404/",
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${origin}${url}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
