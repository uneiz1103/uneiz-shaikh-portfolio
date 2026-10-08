import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { JsonLdScript, breadcrumbList } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/section";
import { getFeaturedProjects, getSupportingProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software, AI, and automation projects by Uneiz Shaikh.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const supporting = getSupportingProjects();

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects & case studies"
        description="Graph software, retrieval systems, an MCP server, and a command-line automation from professional work. Each project has a write-up covering the problem, architecture, and decisions, with a link to the source code."
      />
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {featured.map((project, index) => (
            <div key={project.slug} className={`reveal ${index === 0 ? "md:col-span-2" : ""}`}>
              <ProjectCard project={project} index={index} wide={index === 0} />
            </div>
          ))}
        </div>
        {supporting.length > 0 ? (
          <div className="mt-20">
            <p className="eyebrow">More</p>
            <h2 className="mt-3 text-heading-sm font-semibold tracking-[-0.025em] md:text-heading">
              Smaller projects and experiments
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-6">
              {supporting.map((project, index) => (
                <div key={project.slug} className="reveal">
                  <ProjectCard project={project} index={featured.length + index} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
