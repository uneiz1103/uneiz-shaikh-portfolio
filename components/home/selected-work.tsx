import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { getFeaturedProjects } from "@/lib/content";

export function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems, retrieval, and automation"
      description="A graph application on Neo4j, a retrieval-augmented generation pipeline, and automation used at work. Each one has a full case study and, where it's public, the source code."
      className="border-t border-line"
      action={
        <Link href="/projects" className="btn btn-ghost group">
          All projects
          <IconArrowRight
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {projects.map((project, index) => (
          <div key={project.slug} className={`reveal ${index === 0 ? "md:col-span-2" : ""}`}>
            <ProjectCard project={project} index={index} wide={index === 0} />
          </div>
        ))}
      </div>
    </Section>
  );
}
