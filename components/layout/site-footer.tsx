import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";
import { externalProps, socialLinks } from "@/components/layout/social-links";
import { tagline } from "@/lib/profile";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print mt-auto border-t border-line bg-sunken/50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="-m-1.5 inline-flex min-h-11 items-center gap-3 rounded-lg p-1.5">
            <Monogram />
            <span className="text-body font-semibold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-body leading-relaxed text-muted">{tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-subtle">{site.availability}</p>
        </div>
        <nav aria-label="Footer">
          <p className="label">Pages</p>
          <ul className="mt-3 grid">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-body text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label">Connect</p>
          <ul className="mt-3 grid">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center gap-2 text-body text-muted transition-colors hover:text-ink"
                    {...externalProps(item.href)}
                  >
                    <Icon width={16} height={16} />
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="inline-flex min-h-11 items-center text-body text-muted">
              {site.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
