// On Vercel, NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is the custom domain once
// one is attached, otherwise the project's *.vercel.app address.
const productionHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Uneiz Shaikh",
  role: "Software Engineer → AI Engineer",
  location: "Mumbai, India",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "https://uneiz-shaikh.vercel.app"),
  description:
    "Portfolio of Uneiz Shaikh, a software engineer in Mumbai building Python automation, Neo4j graph applications, and RAG and LangGraph systems.",
  email: "uneizshaikh1103@gmail.com" as string | null,
  github: "https://github.com/uneiz1103" as string | null,
  linkedin: "https://linkedin.com/in/uneiz-shaikh/" as string | null,
  availability: "Open to software engineering and AI engineering opportunities.",
} as const;

export const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/writing", label: "Engineering Notes" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
