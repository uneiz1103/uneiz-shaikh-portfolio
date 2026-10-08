import { Section } from "@/components/ui/section";
import { approach } from "@/lib/profile";

export function Approach() {
  return (
    <Section
      id="approach"
      eyebrow="How I work"
      title="Practical systems, built around the data"
      className="border-t border-line"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {approach.map((item) => (
          <article key={item.title} className="reveal card p-6 md:p-8">
            <p className="font-mono text-meta tracking-[0.12em] text-accent uppercase">
              {item.eyebrow}
            </p>
            <h3 className="mt-3 text-title font-semibold tracking-[-0.025em] md:text-title-lg">
              {item.title}
            </h3>
            <p className="mt-3 text-md leading-relaxed text-pretty text-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
