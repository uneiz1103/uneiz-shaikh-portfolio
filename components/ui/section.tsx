import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  className = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className="container-page">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-4 text-heading leading-[1.15] font-semibold tracking-[-0.03em] text-balance md:text-[2.5rem]">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-md leading-relaxed text-pretty text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

type PageHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-page relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="animate-in eyebrow">{eyebrow}</div>
        <h1 className="animate-in delay-1 mt-5 max-w-3xl text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance md:text-[3.25rem]">
          {title}
        </h1>
        {description ? (
          <p className="animate-in delay-2 mt-5 max-w-2xl text-md leading-relaxed text-pretty text-muted md:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="animate-in delay-3 mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
