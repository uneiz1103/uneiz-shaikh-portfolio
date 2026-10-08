import Link from "next/link";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCode,
  IconSparkles,
  IconWorkflow,
} from "@/components/icons";
import { categoryLabel, contextLabel, type Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  index: number;
  wide?: boolean;
};

const categoryStyle = {
  software: { icon: IconCode, tint: "from-indigo-500/25 via-violet-500/10 to-transparent" },
  ai: { icon: IconSparkles, tint: "from-cyan-500/25 via-sky-500/10 to-transparent" },
  automation: { icon: IconWorkflow, tint: "from-emerald-500/25 via-teal-500/10 to-transparent" },
} as const;

function Visual({ project, index, wide }: ProjectCardProps) {
  const { icon: Icon, tint } = categoryStyle[project.category];
  const number = String(index + 1).padStart(2, "0");
  const flow = project.diagrams.find((item) => item.kind === "pipeline");

  return (
    <div
      className={`relative overflow-hidden border-line bg-sunken ${
        wide ? "min-h-48 border-b md:min-h-full md:border-r md:border-b-0" : "h-40 border-b"
      }`}
    >
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${tint}`} />
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:none] opacity-70" />
      <span
        aria-hidden="true"
        className="absolute -right-2 -bottom-6 font-mono text-[7rem] leading-none font-semibold tracking-[-0.06em] text-ink/[0.06]"
      >
        {number}
      </span>
      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <span className="icon-tile size-11 bg-surface/80 backdrop-blur">
          <Icon width={22} height={22} />
        </span>
        {wide && flow ? (
          <div className="mt-8 hidden md:block">
            <p className="font-mono text-2xs tracking-[0.12em] text-subtle uppercase">
              {flow.title}
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-1.5">
              {flow.nodes.slice(0, 6).map((node, nodeIndex) => (
                <li key={node.id} className="flex items-center gap-1.5">
                  {nodeIndex > 0 ? (
                    <IconArrowRight width={12} height={12} className="text-subtle" />
                  ) : null}
                  <span className="chip bg-surface/80 text-ink backdrop-blur">{node.label}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, wide = false }: ProjectCardProps) {
  const visible = project.technologies.slice(0, wide ? 7 : 4);
  const hidden = project.technologies.length - visible.length;

  return (
    <article className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className={`card card-hover group grid h-full overflow-hidden ${
          wide ? "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : "grid-rows-[auto_1fr]"
        }`}
      >
        <Visual project={project} index={index} wide={wide} />
        <div className={`flex flex-col p-5 md:p-7 ${wide ? "md:py-9" : ""}`}>
          <p className="font-mono text-xs tracking-[0.1em] uppercase">
            <span className="text-accent">{categoryLabel(project.category)}</span>
            <span aria-hidden="true" className="mx-1.5 text-subtle">
              ·
            </span>
            <span className="text-subtle">{contextLabel(project.context)}</span>
          </p>
          <h3
            className={`mt-2.5 font-semibold tracking-[-0.025em] text-ink ${
              wide ? "text-heading-sm md:text-heading" : "text-h3 md:text-title"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-3 text-body leading-relaxed text-pretty text-muted">
            {project.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {visible.map((technology) => (
              <li key={technology} className="chip">
                {technology}
              </li>
            ))}
            {hidden > 0 ? <li className="chip">+{hidden}</li> : null}
          </ul>
          <span className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-7">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Read case study
              <IconArrowUpRight
                width={16}
                height={16}
                className="text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span className="font-mono text-xs text-subtle">{project.format}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
