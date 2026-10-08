import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { IconMapPin } from "@/components/icons";
import { externalProps, socialLinks } from "@/components/layout/social-links";
import { DownloadResumeButton } from "@/components/resume/download-button";
import { education, experience, skillGroups } from "@/lib/profile";
import { contextLabel, getPublishedProjects } from "@/lib/content";
import { resumeDownloadUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Uneiz Shaikh, IT Engineer in Mumbai with 1.8+ years of experience, moving from software engineering into AI engineering.",
  alternates: { canonical: "/resume" },
};

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 print:grid-cols-[8rem_minmax(0,1fr)] print:gap-6 print:pt-5">
      <h2 className="font-mono text-meta tracking-[0.12em] text-accent uppercase md:pt-1">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const pdfPath = path.join(process.cwd(), "public", "uneiz-shaikh-resume.pdf");
  const pdfHref = existsSync(pdfPath)
    ? "/uneiz-shaikh-resume.pdf"
    : site.resumeUrl
      ? resumeDownloadUrl(site.resumeUrl)
      : "/resume/download";
  const projects = getPublishedProjects();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="hero-glow no-print pointer-events-none absolute inset-x-0 top-0 h-96"
      />
      <div className="container-page relative py-14 md:py-20 print:p-0">
        <article className="resume-print card mx-auto max-w-[880px] p-6 sm:p-10 md:p-14">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[2.75rem]">
                {site.name}
              </h1>
              <p className="mt-2 text-lead font-medium md:text-h3">
                {experience.role}
                <span className="text-subtle"> · </span>
                <span className="text-gradient">{site.role}</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <IconMapPin width={15} height={15} />
                  {site.location}
                </span>
                {socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                    {...externalProps(item.href)}
                  >
                    <item.icon width={15} height={15} />
                    {item.value}
                  </a>
                ))}
              </div>
            </div>
            <DownloadResumeButton
              pdfHref={pdfHref}
              fileName="Uneiz-Shaikh-Resume.pdf"
            />
          </header>

          <div className="mt-10 grid gap-10 print:mt-6 print:gap-5">
            <ResumeSection title="Experience">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lead font-semibold tracking-[-0.02em]">
                  {experience.role}
                </h3>
                <p className="shrink-0 font-mono text-meta text-subtle">
                  {experience.start} — {experience.end}
                </p>
              </div>
              <p className="text-muted">
                {experience.company} · {experience.location}
              </p>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-body leading-relaxed marker:text-accent">
                {experience.paragraphs.map((paragraph) => (
                  <li key={paragraph}>{paragraph}</li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ul className="grid gap-6">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-semibold tracking-[-0.01em] hover:text-accent"
                    >
                      {project.title}
                    </Link>
                    <span className="ml-2 font-mono text-xs text-subtle">
                      {contextLabel(project.context)}
                    </span>
                    <p className="mt-1 text-body leading-relaxed text-muted">{project.summary}</p>
                    <p className="mt-2 font-mono text-xs leading-[1.6] text-subtle">
                      {project.technologies.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Skills">
              <dl className="grid gap-3">
                {skillGroups.map((group) => (
                  <div key={group.title} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
                    <dt className="font-semibold">{group.title}</dt>
                    <dd className="text-body text-muted">{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </ResumeSection>

            <ResumeSection title="Education">
              <ul className="grid gap-4">
                {education.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-body text-muted">{item.place}</p>
                    </div>
                    <p className="shrink-0 font-mono text-meta text-subtle">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>
          </div>
        </article>
      </div>
    </div>
  );
}
