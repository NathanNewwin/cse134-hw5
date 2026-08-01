import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    order: z.number(),
    id: z.string(),
    title: z.string(),
    image: z.string(),
    imageType: z.string(),
    imageAlt: z.string(),
    summary: z.string(),
    technologies: z.string(),
    status: z.string(),
    completion: z.number(),
    repository: z.string().url(),
    repositoryLabel: z.string(),
    featured: z.boolean().default(false),
    details: z.array(z.string()),
  }),
});

export const collections = { projects };
