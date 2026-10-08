import Link from "next/link";
import type { ReactNode } from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconGitHub,
} from "@/components/icons";
import { Diagram } from "@/components/projects/diagram";
import { Inline, Paragraphs } from "@/components/ui/rich-text";
import {
  caseStudySections,
  categoryLabel,
  contextLabel,
  getPublishedProjects,
  type CaseStudySectionKey,
  type Project,
} from "@/lib/content";

function fieldText(project: Project, key: CaseStudySectionKey) {
  const value = project[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function SectionHeading({ number, children }: { number: number; children: ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 text-title leading-snug font-semibold tracking-[-0.025em] md:text-title-lg">
      <span className="font-mono text-sm font-medium text-accent">
        {String(number).padStart(2, "0")}
      </span>
      {children}
    </h2>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1 text-body font-medium">{children}</dd>
    </div>
  );
}

function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function CaseStudy({ project }: { project: Project }) {
  const screenshots = project.screenshots.filter((shot) => publicFileExists(shot.src));
  const video = project.video && publicFileExists(project.video.src) ? project.video : null;
  const poster = video?.poster && publicFileExists(video.poster) ? video.poster : undefined;

  const pipelines = project.diagrams.filter((item) => item.kind === "pipeline");
  const graphs = project.diagrams.filter((item) => item.kind === "graph");
  const hasArchitecture = Boolean(fieldText(project, "architecture"));
  const hasDataModel = Boolean(fieldText(project, "dataModel"));

  const sections = caseStudySections.flatMap(([key, label]) => {
    const text = fieldText(project, key);
    return text ? [{ key, label, text }] : [];
  });

  const extraSections = [
    ...(!hasArchitecture && pipelines.length > 0 ? [{ key: "flow", label: "Flow" }] : []),
    ...(screenshots.length > 0 ? [{ key: "screenshots", label: "Screenshots" }] : []),
  ];
  const toc = [
    ...(video ? [{ key: "demo", label: "Demo" }] : []),
    ...sections.map(({ key, label }) => ({ key, label })),
    ...extraSections,
  ];

  const all = getPublishedProjects();
  const position = all.findIndex((item) => item.slug === project.slug);
  const next = all[(position + 1) % all.length];
  const previous = all[(position - 1 + all.length) % all.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div className="container-page relative pt-10 pb-14 md:pt-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="animate-in font-mono text-caption text-subtle">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link
                  href="/projects"
                  className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 transition-colors hover:text-accent"
                >
                  <IconArrowLeft width={14} height={14} />
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="mx-1">
                /
              </li>
              <li aria-current="page" className="truncate text-muted">
                {project.title}
              </li>
            </ol>
          </nav>
          <p className="animate-in delay-1 eyebrow mt-6">
            {categoryLabel(project.category)} · {contextLabel(project.context)}
          </p>
          <h1 className="animate-in delay-1 mt-4 max-w-3xl text-h1 font-semibold tracking-[-0.04em] text-balance">
            {project.title}
          </h1>
          <p className="animate-in delay-2 mt-5 max-w-2xl text-md text-pretty text-muted md:text-lg">
            {project.summary}
          </p>
          <div className="animate-in delay-3 mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center">
            {project.demo ? (
              <a
                href={project.demo}
                className="btn btn-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
                <IconArrowUpRight width={16} height={16} />
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                className={project.demo ? "btn btn-ghost" : "btn btn-primary"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGitHub width={16} height={16} />
                View source on GitHub
              </a>
            ) : null}
            {!project.demo ? (
              <p className="font-mono text-caption text-subtle min-[480px]:ml-2">
                Not currently deployed
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        <div className="grid min-w-0 content-start gap-14">
          {project.highlights.length > 0 ? (
            <section aria-label="Highlights" className="card p-5 md:p-6">
              <p className="label">Highlights</p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 text-body leading-snug">
                    <IconCheck width={18} height={18} className="mt-px shrink-0 text-accent" />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {video ? (
            <section id="demo" aria-label="Demo" className="scroll-mt-24">
              <figure>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={poster}
                  className="aspect-video w-full rounded-xl border border-line bg-sunken shadow-[var(--shadow)]"
                >
                  <source src={video.src} />
                </video>
                {video.caption ? (
                  <figcaption className="mt-3 text-sm text-muted">{video.caption}</figcaption>
                ) : null}
              </figure>
            </section>
          ) : null}

          {sections.map(({ key, label, text }, index) => (
            <section key={key} id={key} className="reveal scroll-mt-24">
              <SectionHeading number={index + 1}>{label}</SectionHeading>
              <div className="mt-4">
                <Paragraphs text={text} />
              </div>
              {key === "architecture"
                ? pipelines.map((diagram) => <Diagram key={diagram.title} diagram={diagram} />)
                : null}
              {key === "dataModel"
                ? graphs.map((diagram) => <Diagram key={diagram.title} diagram={diagram} />)
                : null}
            </section>
          ))}

          {!hasArchitecture && pipelines.length > 0 ? (
            <section id="flow" className="reveal scroll-mt-24">
              <SectionHeading number={sections.length + 1}>Flow</SectionHeading>
              {pipelines.map((diagram) => (
                <Diagram key={diagram.title} diagram={diagram} />
              ))}
              {!hasDataModel
                ? graphs.map((diagram) => <Diagram key={diagram.title} diagram={diagram} />)
                : null}
            </section>
          ) : null}

          {screenshots.length > 0 ? (
            <section id="screenshots" className="reveal scroll-mt-24">
              <SectionHeading number={sections.length + extraSections.length}>
                Screenshots
              </SectionHeading>
              <div className="mt-6 grid gap-8">
                {screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 1024px) 768px, 100vw"
                      className="h-auto w-full rounded-xl border border-line shadow-[var(--shadow)]"
                    />
                    {shot.caption || shot.redacted ? (
                      <figcaption className="mt-3 text-sm text-muted">
                        {shot.caption}
                        {shot.redacted ? " Sensitive details have been redacted." : null}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="order-first lg:order-none">
          <div className="grid gap-5 lg:sticky lg:top-24">
            <div className="card p-5">
              <dl className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <Fact label="Context">{contextLabel(project.context)}</Fact>
                <Fact label="Type">{project.format}</Fact>
                <Fact label="Status">{project.demo ? "Deployed" : "Not currently deployed"}</Fact>
                <Fact label="Source">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      GitHub
                      <IconArrowUpRight width={14} height={14} />
                    </a>
                  ) : (
                    "Private"
                  )}
                </Fact>
              </dl>
              <p className="label mt-5">Tech stack</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {project.technologies.map((technology) => (
                  <li key={technology} className="chip">
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
            {toc.length > 2 ? (
              <nav aria-label="On this page" className="card hidden p-5 lg:block">
                <p className="label">On this page</p>
                <ul className="mt-3 grid gap-0.5">
                  {toc.map(({ key, label }) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        className="flex min-h-10 items-center rounded-md px-2 text-sm text-muted transition-colors hover:bg-sunken hover:text-ink"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </aside>
      </div>

      {all.length > 1 ? (
        <nav aria-label="More projects" className="border-t border-line bg-sunken/40">
          <div className="container-page grid gap-4 py-12 sm:grid-cols-2">
            <Link href={`/projects/${previous.slug}`} className="card card-hover group p-5">
              <p className="label">Previous project</p>
              <p className="mt-2 inline-flex items-center gap-2 font-semibold tracking-[-0.02em] group-hover:text-accent">
                <IconArrowLeft width={16} height={16} />
                {previous.title}
              </p>
            </Link>
            <Link href={`/projects/${next.slug}`} className="card card-hover group p-5 sm:text-right">
              <p className="label">Next project</p>
              <p className="mt-2 inline-flex items-center gap-2 font-semibold tracking-[-0.02em] group-hover:text-accent">
                {next.title}
                <IconArrowRight width={16} height={16} />
              </p>
            </Link>
          </div>
        </nav>
      ) : null}
    </article>
  );
}
