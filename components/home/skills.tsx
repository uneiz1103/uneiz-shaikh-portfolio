import { IconCode, IconDatabase, IconSparkles, IconWorkflow } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/lib/profile";

const icons = [IconCode, IconDatabase, IconSparkles, IconWorkflow];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools grouped by the work they do"
      description="The languages, databases, and frameworks I reach for, organised by the kind of problem they solve."
      className="border-t border-line bg-sunken/40"
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length];
          return (
            <li key={group.title} className="reveal card card-hover p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="icon-tile size-11">
                  <Icon width={21} height={21} />
                </span>
                <div>
                  <h3 className="text-lead font-semibold tracking-[-0.02em]">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-small leading-relaxed text-muted">{group.note}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-bg px-3 py-1.5 text-caption font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
