import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight, IconFileText, IconMapPin } from "@/components/icons";
import { externalProps, socialLinks } from "@/components/layout/social-links";
import { JsonLdScript, breadcrumbList } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/section";
import { site } from "@/lib/site";

const description = `Contact ${site.name} by email or LinkedIn. ${site.availability}`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact — ${site.name}`, description, url: "/contact" },
};

const hints: Record<string, string> = {
  Email: "The most direct way to reach me.",
  LinkedIn: "Work history, and messages if you prefer LinkedIn.",
  GitHub: "Source code for the projects on this site.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description={`${site.availability} I'm also happy to talk about graph data, retrieval, and automation.`}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="card card-hover group flex h-full flex-col p-6"
                  {...externalProps(item.href)}
                >
                  <span className="icon-tile">
                    <item.icon width={20} height={20} />
                  </span>
                  <span className="mt-5 flex items-center gap-1.5 text-h3 font-semibold tracking-[-0.02em] group-hover:text-accent">
                    {item.label}
                    <IconArrowUpRight width={16} height={16} className="text-accent" />
                  </span>
                  <span className="mt-1 font-mono text-caption break-all text-muted">
                    {item.label === "Email" ? item.value : item.href.replace(/^https?:\/\//, "")}
                  </span>
                  <span className="mt-4 text-sm leading-relaxed text-muted">{hints[item.label]}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2 text-muted">
              <IconMapPin width={18} height={18} className="text-accent" />
              Based in {site.location} (IST, UTC+5:30)
            </p>
            <Link href="/resume" className="btn btn-ghost">
              <IconFileText width={16} height={16} />
              View resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
