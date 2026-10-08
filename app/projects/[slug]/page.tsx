import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/case-study";
import { JsonLdScript, breadcrumbList } from "@/components/seo/json-ld";
import { getProject, getPublishedProjects } from "@/lib/content";
import { site } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const url = `${site.domain}/projects/${project.slug}`;
  const sourceCode = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url,
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: site.name, url: site.domain },
    ...(project.github ? { codeRepository: project.github } : {}),
  };

  return (
    <>
      <JsonLdScript data={sourceCode} />
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <CaseStudy project={project} />
    </>
  );
}
