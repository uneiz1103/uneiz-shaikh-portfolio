// On Vercel, NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is the custom domain once
// one is attached, otherwise the project's *.vercel.app address.
const productionHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Uneiz Shaikh",
  role: "Software Engineer → AI Engineer",
  location: "Mumbai, India",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "https://uneizshaikh.dev"),
  description:
    "Portfolio of Uneiz Shaikh, a software engineer in Mumbai building database-backed applications, automation, and LLM systems.",
  email: "uneizshaikh1103@gmail.com" as string | null,
  github: "https://github.com/uneiz1103" as string | null,
  linkedin: "https://linkedin.com/in/uneiz-shaikh/" as string | null,
  availability: "Open to software engineering and AI engineering opportunities.",
  // Google Drive *file* share link (not a folder), shared as "Anyone with the link".
  resumeUrl: "https://drive.google.com/file/d/1qHym_-BoolTLa9G1neVE5LoPmw0M-Lts/view?usp=sharing" as
    | string
    | null,
} as const;

export function resumeDownloadUrl(url: string) {
  const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/);
  return match
    ? `https://drive.usercontent.google.com/download?id=${match[1]}&export=download`
    : url;
}

export const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/writing", label: "Engineering Notes" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
