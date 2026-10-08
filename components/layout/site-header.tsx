import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";
import { SiteNav } from "@/components/layout/site-nav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/70 bg-bg/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex min-h-11 items-center gap-3 text-ink">
          <Monogram className="transition-transform duration-200 group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="text-body font-semibold tracking-[-0.01em]">{site.name}</span>
            <span className="mt-1 hidden font-mono text-2xs text-subtle sm:block">
              {site.role}
            </span>
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
