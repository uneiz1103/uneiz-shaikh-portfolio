import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { formatNoteDate, getPublishedWriting } from "@/lib/content";

export function NotesPreview() {
  const notes = getPublishedWriting();
  if (notes.length === 0) return null;

  return (
    <Section
      id="notes"
      eyebrow="Engineering Notes"
      title="Written from work that has actually been built"
      className="border-t border-line"
      action={
        <Link href="/writing" className="btn btn-ghost group">
          All notes
          <IconArrowRight
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      }
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {notes.slice(0, 3).map((note) => (
          <li key={note.slug} className="reveal">
            <Link
              href={`/writing/${note.slug}`}
              className="card card-hover group flex h-full flex-col p-6"
            >
              <p className="font-mono text-meta text-subtle">
                {formatNoteDate(note.publishedAt)} · {note.readingTime} min read
              </p>
              <h3 className="mt-3 text-lead leading-snug font-semibold tracking-[-0.02em] group-hover:text-accent">
                {note.title}
              </h3>
              <p className="mt-2 text-body leading-relaxed text-muted">{note.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-medium">
                Read note
                <IconArrowUpRight width={16} height={16} className="text-accent" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
