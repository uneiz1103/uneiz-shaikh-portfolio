import { IconAward, IconBriefcase, IconCheck, IconGraduation } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { education, experience } from "@/lib/profile";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been building"
      description="Python automation, ETL, SQL, and reporting for sales, finance, and operations teams."
      className="border-t border-line bg-sunken/40"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <article className="reveal card p-6 md:p-8">
          <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="icon-tile size-12">
                <IconBriefcase width={22} height={22} />
              </span>
              <div>
                <h3 className="text-h3 leading-snug font-semibold tracking-[-0.02em]">
                  {experience.role}
                </h3>
                <p className="mt-1 text-muted">
                  {experience.company} · {experience.location}
                </p>
              </div>
            </div>
            <p className="shrink-0 font-mono text-xs text-subtle">
              {experience.start} — {experience.end}
            </p>
          </div>
          <ul className="mt-6 grid gap-4">
            {experience.paragraphs.map((paragraph) => (
              <li key={paragraph} className="flex gap-3">
                <span className="mt-1 inline-grid size-5 shrink-0 place-items-center rounded-full bg-accent/12 text-accent">
                  <IconCheck width={13} height={13} strokeWidth={2.2} />
                </span>
                <p className="text-body leading-relaxed text-pretty">{paragraph}</p>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid content-start gap-4">
          <p className="label lg:mt-1">Education & certification</p>
          {education.map((item, index) => {
            const Icon = index === 0 ? IconGraduation : IconAward;
            return (
              <div key={item.title} className="reveal card card-hover flex gap-4 p-5">
                <span className="icon-tile">
                  <Icon width={20} height={20} />
                </span>
                <div>
                  <p className="leading-snug font-semibold">{item.title}</p>
                  <p className="mt-1 text-small text-muted">{item.place}</p>
                  <p className="mt-2 font-mono text-meta text-subtle">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
