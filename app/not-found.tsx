import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-page relative flex flex-col items-center py-28 text-center md:py-36">
        <p className="text-gradient font-mono text-[5rem] leading-none font-semibold tracking-[-0.06em] md:text-[7rem]">
          404
        </p>
        <h1 className="mt-6 text-heading font-semibold tracking-[-0.03em] md:text-[2.25rem]">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-muted">That address is not part of this site.</p>
        <div className="mt-9 flex flex-col gap-3 min-[480px]:flex-row">
          <Link href="/" className="btn btn-accent">
            Back home
          </Link>
          <Link href="/projects" className="btn btn-ghost group">
            View projects
            <IconArrowRight
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
