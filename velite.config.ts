import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

const slug = s.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const diagram = s.object({
  title: s.string(),
  kind: s.enum(["pipeline", "graph"]),
  nodes: s.array(
    s.object({
      id: s.string(),
      label: s.string(),
      detail: s.string().optional(),
    }),
  ),
  edges: s
    .array(
      s.object({
        from: s.string(),
        to: s.string(),
        label: s.string().optional(),
      }),
    )
    .default([]),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    title: s.string().max(120),
    slug,
    summary: s.string().max(400),
    category: s.enum(["software", "ai", "automation"]),
    context: s.enum(["personal", "professional"]),
    format: s.string().max(80),
    placement: s.enum(["featured", "supporting"]),
    order: s.number(),
    technologies: s.array(s.string().min(1)).min(1),
    draft: s.boolean().default(false),
    overview: s.string().optional(),
    problem: s.string().optional(),
    solution: s.string().optional(),
    architecture: s.string().optional(),
    dataModel: s.string().optional(),
    technologyChoices: s.string().optional(),
    decisions: s.string().optional(),
    implementation: s.string().optional(),
    challenges: s.string().optional(),
    solutions: s.string().optional(),
    results: s.string().optional(),
    lessons: s.string().optional(),
    tradeoffs: s.string().optional(),
    future: s.string().optional(),
    highlights: s.array(s.string()).default([]),
    github: s.string().url().optional(),
    demo: s.string().url().optional(),
    screenshots: s
      .array(
        s.object({
          src: s.string().min(1),
          alt: s.string().min(1),
          caption: s.string().optional(),
          redacted: s.boolean().default(false),
        }),
      )
      .default([]),
    video: s
      .object({
        src: s.string().min(1),
        poster: s.string().optional(),
        caption: s.string().optional(),
      })
      .optional(),
    diagrams: s.array(diagram).default([]),
  }),
});

const writing = defineCollection({
  name: "Writing",
  pattern: "writing/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(140),
      slug,
      description: s.string().max(300),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      subtitle: s.string().optional(),
      category: s.string().optional(),
      related: s.array(slug).default([]),
      draft: s.boolean().default(false),
      metadata: s.metadata(),
      toc: s.toc({ maxDepth: 2 }),
      raw: s.raw(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      readingTime: data.metadata.readingTime,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { projects, writing },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light-default", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});
