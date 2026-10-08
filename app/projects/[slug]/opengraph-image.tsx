import { categoryLabel, getProject, getPublishedProjects } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${categoryLabel(project.category)}` : "Case study",
    title: project?.title ?? "Project",
  });
}
