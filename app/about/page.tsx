import type { Metadata } from "next";
import Link from "next/link";
import { AboutFacts, Journey } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { Now } from "@/components/home/now";
import { Skills } from "@/components/home/skills";
import { IconArrowRight, IconFileText } from "@/components/icons";
import { JsonLdScript, breadcrumbList } from "@/components/seo/json-ld";
import { PageHeader, Section } from "@/components/ui/section";
import { about, education, experience } from "@/lib/profile";
import { site } from "@/lib/site";

const description = `About ${site.name}: ${experience.role} in ${site.location}, building database-backed applications, automation, and LLM systems on the path from software engineering to AI engineering.`;

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About — ${site.name}`, description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="About"
        title="Software engineer, moving towards AI engineering"
        description={site.availability}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <div className="grid max-w-[65ch] content-start gap-5 text-md text-pretty md:text-lg">
            {about.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "text-ink" : "text-muted"}>
                {paragraph}
              </p>
            ))}
            <div className="mt-4">
              <p className="label mb-3">The path I&apos;m following</p>
              <Journey />
            </div>
          </div>
          <AboutFacts />
        </div>
      </section>

      <Section
        id="now"
        eyebrow="Now"
        title="What I'm working on"
        className="border-t border-line bg-sunken/40"
      >
        <Now />
      </Section>

      <Approach />
      <Skills />

      <Section id="education" eyebrow="Education" title="Education & certification" className="border-t border-line">
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <li key={item.title} className="card p-6">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.place}</p>
              <p className="mt-2 font-mono text-xs text-subtle">{item.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 min-[480px]:flex-row">
          <Link href="/resume" className="btn btn-accent">
            <IconFileText width={16} height={16} />
            View resume
          </Link>
          <Link href="/contact" className="btn btn-ghost group">
            Get in touch
            <IconArrowRight
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
