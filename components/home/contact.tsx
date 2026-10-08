import Link from "next/link";
import { IconArrowRight, IconFileText } from "@/components/icons";
import { externalProps, socialLinks } from "@/components/layout/social-links";
import { site } from "@/lib/site";

export function Contact() {
  const [primary, ...rest] = socialLinks;

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="container-page">
        <div className="reveal gradient-border relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-[var(--shadow-lg)] md:px-12 md:py-20">
          <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow justify-center">Contact</p>
            <h2 className="mt-5 text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-balance md:text-[3rem]">
              Let&apos;s build something <span className="text-gradient">useful</span> together.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-md text-pretty text-muted">
              {site.availability} I&apos;m also happy to talk about graph data, retrieval, and
              automation. Based in {site.location}.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 min-[480px]:flex-row">
              {primary ? (
                <a
                  href={primary.href}
                  className="btn btn-accent group"
                  {...externalProps(primary.href)}
                >
                  <primary.icon width={16} height={16} />
                  {primary.label === "Email" ? "Send an email" : primary.label}
                </a>
              ) : (
                <Link href="/resume" className="btn btn-accent group">
                  <IconFileText width={16} height={16} />
                  View resume
                </Link>
              )}
              {rest.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="btn btn-ghost"
                  {...externalProps(item.href)}
                >
                  <item.icon width={16} height={16} />
                  {item.label}
                </a>
              ))}
            </div>

            {primary?.label === "Email" ? (
              <p className="mt-6 font-mono text-caption break-all text-subtle">{primary.value}</p>
            ) : null}
            <Link
              href="/contact"
              className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              All contact options
              <IconArrowRight
                width={14}
                height={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
