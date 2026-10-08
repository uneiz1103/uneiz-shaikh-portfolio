import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight, IconPen } from "@/components/icons";
import { PageHeader } from "@/components/ui/section";
import { formatNoteDate, getPublishedWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Engineering notes by Uneiz Shaikh on graph data, retrieval, and automation, written from work that has actually been built.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const notes = getPublishedWriting();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Engineering Notes"
        description="Short write-ups on retrieval, graph data, and automation, published from work that has actually been built."
      />
      <div className="container-page py-16 md:py-20">
        {notes.length === 0 ? (
          <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
            <span className="icon-tile size-12">
              <IconPen width={22} height={22} />
            </span>
            <h2 className="mt-5 text-h3 font-semibold tracking-[-0.02em]">
              First notes are on the way
            </h2>
            <p className="mt-2 max-w-md text-body leading-relaxed text-muted">
              Notes will be published here as they are written. In the meantime, the project case
              studies cover the architecture and decisions behind each build.
            </p>
            <Link href="/projects" className="btn btn-ghost group mt-7">
              Read the case studies
              <IconArrowRight
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : (
          <ul className="mx-auto grid max-w-3xl gap-4">
            {notes.map((note) => (
              <li key={note.slug} className="reveal">
                <Link
                  href={`/writing/${note.slug}`}
                  className="card card-hover group block p-6 md:p-7"
                >
                  <p className="font-mono text-meta text-subtle">
                    {formatNoteDate(note.publishedAt)} · {note.readingTime} min read
                    {note.category ? ` · ${note.category}` : ""}
                  </p>
                  <h2 className="mt-2 flex items-start justify-between gap-4 text-title leading-snug font-semibold tracking-[-0.025em] group-hover:text-accent">
                    {note.title}
                    <IconArrowUpRight width={18} height={18} className="mt-1.5 shrink-0" />
                  </h2>
                  <p className="mt-2 text-muted">{note.description}</p>
                  {note.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {notes.length > 0 ? (
          <p className="mx-auto mt-10 max-w-3xl font-mono text-caption text-subtle">
            <a
              href="/feed.xml"
              className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-accent"
            >
              Subscribe via RSS
              <IconArrowUpRight width={14} height={14} />
            </a>
          </p>
        ) : null}
      </div>
    </>
  );
}
