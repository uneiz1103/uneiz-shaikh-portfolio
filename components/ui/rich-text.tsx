import type { ReactNode } from "react";

const inlinePattern = /(`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(inlinePattern).filter(Boolean);
  return (
    <>
      {parts.map((part, index): ReactNode => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const external = link[2].startsWith("http");
          return (
            <a
              key={index}
              href={link[2]}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link[1]}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  const parts = text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
  return (
    <div className={`prose text-md leading-relaxed ${className}`}>
      {parts.map((part) => (
        <p key={part} className="text-pretty text-muted">
          <Inline text={part} />
        </p>
      ))}
    </div>
  );
}
