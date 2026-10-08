import { IconBriefcase, IconCode, IconSparkles } from "@/components/icons";
import { formatNoteDate } from "@/lib/content";
import { now } from "@/lib/profile";

export function Now() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="reveal card p-6 md:p-7">
        <p className="label flex items-center gap-2.5">
          <IconBriefcase width={14} height={14} className="text-accent" />
          Now
        </p>
        <h3 className="mt-4 text-h3 font-semibold tracking-[-0.02em]">{now.title}</h3>
        <p className="mt-2 text-body leading-relaxed text-muted">{now.summary}</p>
        <p className="mt-4 font-mono text-xs text-subtle">
          Updated <time dateTime={now.updatedAt}>{formatNoteDate(now.updatedAt)}</time>
        </p>
      </div>

      <div className="reveal card p-6 md:p-7">
        <p className="label flex items-center gap-2.5">
          <IconSparkles width={14} height={14} className="text-accent" />
          Focus areas
        </p>
        <ul className="mt-4 grid gap-2.5 text-body leading-snug">
          {now.focus.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal card p-6 md:p-7">
        <p className="label flex items-center gap-2.5">
          <IconCode width={14} height={14} className="text-accent" />
          Outside work
        </p>
        <p className="mt-4 text-body leading-relaxed text-muted">{now.outside}</p>
      </div>
    </div>
  );
}
