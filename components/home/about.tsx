import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBriefcase,
  IconGraduation,
  IconMapPin,
  IconSparkles,
} from "@/components/icons";
import { Section } from "@/components/ui/section";
import { experience, getAboutSummary, journey } from "@/lib/profile";
import { site } from "@/lib/site";

export function AboutFacts() {
  const hasPortrait = process.env.NEXT_PUBLIC_HAS_PORTRAIT === "1";

  const facts = [
    { icon: IconMapPin, label: "Based in", value: site.location },
    { icon: IconBriefcase, label: "Currently", value: `${experience.role}, ${experience.company}` },
    { icon: IconSparkles, label: "Direction", value: site.role },
    { icon: IconGraduation, label: "Education", value: "B.E. Information Technology" },
  ];

  return (
    <aside className="reveal card overflow-hidden">
      {hasPortrait ? (
        <Image
          src="/portrait.jpg"
          alt={`Portrait of ${site.name}`}
          width={704}
          height={560}
          className="aspect-[5/4] w-full border-b border-line object-cover"
        />
      ) : (
        <div className="relative flex h-24 items-end overflow-hidden border-b border-line bg-sunken p-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20"
          />
          <p className="relative text-h3 font-semibold tracking-[-0.02em]">At a glance</p>
        </div>
      )}
      <dl className="divide-y divide-line">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="relative min-w-0 py-4 pr-5 pl-[3.25rem]">
              <dt className="label">
                <Icon
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="absolute top-1/2 left-5 -translate-y-1/2 text-accent"
                />
                {fact.label}
              </dt>
              <dd className="text-body font-medium">{fact.value}</dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

export function Journey() {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="Learning path">
      {journey.map((step, index) => (
        <li key={step} className="flex items-center gap-1.5">
          {index > 0 ? (
            <IconArrowRight aria-hidden="true" width={12} height={12} className="text-subtle" />
          ) : null}
          <span
            className={`chip ${index === journey.length - 1 ? "border-accent/40 text-accent" : ""}`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="From software and data to AI engineering"
      className="border-t border-line"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <div className="reveal grid max-w-[65ch] content-start gap-7">
          <p className="text-md text-pretty md:text-lg">{getAboutSummary()}</p>
          <Journey />
          <div>
            <Link href="/about" className="btn btn-ghost group">
              More about me
              <IconArrowRight
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
        <AboutFacts />
      </div>
    </Section>
  );
}
