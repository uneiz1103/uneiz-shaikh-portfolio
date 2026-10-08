type MonogramProps = {
  className?: string;
};

export function Monogram({ className = "" }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] font-mono text-xs font-bold leading-none tracking-[-0.04em] text-white shadow-[0_6px_16px_-6px_var(--accent)] ${className}`}
    >
      US
    </span>
  );
}
