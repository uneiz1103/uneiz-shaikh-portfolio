import Link from "next/link";
import { IconArrowRight, IconFileText, IconMapPin } from "@/components/icons";
import { experience, hero, skillGroups, stats } from "@/lib/profile";
import { site } from "@/lib/site";

function CodeCard() {
  const stack = skillGroups.flatMap((group) => group.items.slice(0, 2));

  return (
    <div className="card overflow-hidden font-mono text-caption leading-[1.75]">
      <div className="flex items-center gap-2 border-b border-line bg-sunken px-4 py-3">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 text-xs text-subtle">uneiz.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 text-muted">
        <code>
          <span className="text-accent">const</span> <span className="text-ink">engineer</span> = {"{"}
          {"\n"}
          {"  "}name: <span className="text-accent-2">&quot;{site.name}&quot;</span>,{"\n"}
          {"  "}role: <span className="text-accent-2">&quot;{experience.role}&quot;</span>,
          {"\n"}
          {"  "}company: <span className="text-accent-2">&quot;{experience.company}&quot;</span>,{"\n"}
          {"  "}location: <span className="text-accent-2">&quot;{site.location}&quot;</span>,{"\n"}
          {"  "}stack: [{"\n"}
          {stack.map((item, index) => (
            <span key={item}>
              {"    "}
              <span className="text-accent-2">&quot;{item}&quot;</span>
              {index < stack.length - 1 ? "," : ""}
              {"\n"}
            </span>
          ))}
          {"  "}],{"\n"}
          {"  "}direction: <span className="text-accent-2">&quot;{site.role}&quot;</span>,{"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="container-page relative pt-10 pb-16 sm:pt-16 md:pt-24 md:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <p className="animate-in inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-meta tracking-[0.1em] text-muted uppercase shadow-sm backdrop-blur">
              <span className="text-ink">
                {experience.role} @ {experience.company.replace(/ Ltd\.?$/, "")}
              </span>
              <span aria-hidden="true" className="hidden text-subtle min-[420px]:inline">
                ·
              </span>
              <span className="hidden items-center gap-1.5 min-[420px]:inline-flex">
                <IconMapPin width={13} height={13} className="text-subtle" />
                {site.location.split(",")[0]}
              </span>
            </p>

            <h1 className="animate-in delay-1 mt-6 text-display font-semibold tracking-[-0.045em] text-balance sm:mt-7">
              Hi, I&apos;m {site.name.split(" ")[0]}.
              <br />
              <span className="text-gradient">I build software and AI systems.</span>
            </h1>

            <p className="animate-in delay-2 mt-5 max-w-[38rem] text-md text-pretty text-muted sm:mt-6 md:text-lg">
              {hero.lede}
            </p>

            <div className="animate-in delay-3 mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
              <Link href="/projects" className="btn btn-accent group">
                View my work
                <IconArrowRight
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link href="/resume" className="btn btn-ghost">
                <IconFileText width={16} height={16} />
                Resume
              </Link>
            </div>

            <ul className="animate-in delay-4 mt-7 flex flex-wrap gap-2" aria-label="Focus areas">
              {hero.focus.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>

            <p className="animate-in delay-4 mt-6 text-sm text-subtle">{site.availability}</p>
          </div>

          <div className="animate-in delay-3 relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20 blur-2xl"
            />
            <div className="relative">
              <CodeCard />
            </div>
          </div>
        </div>

        <dl className="animate-in delay-5 mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 md:mt-20 [&>div]:bg-surface/90">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5 p-5 md:p-6">
              <dt className="text-caption leading-snug text-muted">{stat.label}</dt>
              <dd className="text-title-lg font-semibold tracking-[-0.03em] md:text-[2rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
