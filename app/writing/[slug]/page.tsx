import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@/components/icons";
import { ProjectCard } from "@/components/projects/project-card";
import { JsonLdScript, breadcrumbList } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/ui/section";
import { MdxContent } from "@/components/writing/mdx-content";
import { formatNoteDate, getNote, getPublishedProjects, getPublishedWriting } from "@/lib/content";
import { site } from "@/lib/site";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedWriting().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.description,
    keywords: note.tags,
    authors: [{ name: site.name, url: site.domain }],
    alternates: { canonical: `/writing/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      url: `/writing/${note.slug}`,
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt ?? note.publishedAt,
      authors: [site.name],
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.description,
    },
  };
}

type TocEntry = { title: string; url: string; items: TocEntry[] };

function TocList({ entries }: { entries: TocEntry[] }) {
  return (
    <ul className="grid gap-0.5">
      {entries.map((entry) => (
        <li key={entry.url}>
          <a
            href={entry.url}
            className="flex min-h-10 items-center rounded-md px-2 py-1 text-sm leading-snug text-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            {entry.title}
          </a>
          {entry.items.length > 0 ? (
            <div className="ml-3 border-l border-line pl-1">
              <TocList entries={entry.items} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const notes = getPublishedWriting();
  const position = notes.findIndex((item) => item.slug === note.slug);
  const newer = position > 0 ? notes[position - 1] : undefined;
  const older = position >= 0 && position < notes.length - 1 ? notes[position + 1] : undefined;

  const projects = getPublishedProjects();
  const related = note.related.flatMap((projectSlug) => {
    const index = projects.findIndex((project) => project.slug === projectSlug);
    return index >= 0 ? [{ project: projects[index], index }] : [];
  });

  const toc = note.toc as TocEntry[];
  const url = `${site.domain}/writing/${note.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    url,
    image: `${url}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: note.publishedAt,
    dateModified: note.updatedAt ?? note.publishedAt,
    keywords: note.tags.join(", "),
    ...(note.category ? { articleSection: note.category } : {}),
    author: { "@type": "Person", name: site.name, url: site.domain },
    publisher: { "@type": "Person", name: site.name, url: site.domain },
  };

  return (
    <article>
      <JsonLdScript data={article} />
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Engineering Notes", path: "/writing" },
          { name: note.title, path: `/writing/${note.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={
          <Link href="/writing" className="hover:underline">
            Engineering Notes{note.category ? ` · ${note.category}` : ""}
          </Link>
        }
        title={note.title}
        description={note.subtitle ?? note.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-caption text-subtle">
            <time dateTime={note.publishedAt}>{formatNoteDate(note.publishedAt)}</time>
            {note.updatedAt ? ` · Updated ${formatNoteDate(note.updatedAt)}` : ""} · {note.readingTime}{" "}
            min read
          </p>
          {note.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {note.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </PageHeader>

      <div className="container-page py-12 md:py-20">
        <div className="grid grid-cols-[minmax(0,68ch)] justify-center gap-10 xl:grid-cols-[minmax(0,68ch)_15rem] xl:gap-16">
          {toc.length > 2 ? (
            <details className="card group p-4 xl:hidden">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between font-medium">
                On this page
                <span aria-hidden="true" className="text-subtle transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <nav aria-label="On this page" className="mt-2">
                <TocList entries={toc} />
              </nav>
            </details>
          ) : null}
          <div className="min-w-0 text-md leading-[1.8]">
            <MdxContent code={note.body} />
          </div>
          {toc.length > 2 ? (
            <aside className="hidden xl:block">
              <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto">
                <p className="label mb-3 px-2">On this page</p>
                <TocList entries={toc} />
              </nav>
            </aside>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-projects" className="border-t border-line bg-sunken/50">
          <div className="container-page py-14 md:py-20">
            <p className="eyebrow">Related work</p>
            <h2
              id="related-projects"
              className="mt-2 text-heading-sm font-semibold tracking-[-0.025em] md:text-heading"
            >
              Projects behind this note
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map(({ project, index }) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <nav aria-label="Note navigation" className="border-t border-line">
        <div className="container-page grid gap-4 py-10 md:grid-cols-3 md:items-center">
          <Link
            href="/writing"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-ink"
          >
            <IconArrowLeft width={16} height={16} />
            All engineering notes
          </Link>
          {older ? (
            <Link href={`/writing/${older.slug}`} className="card card-hover p-4 md:text-center">
              <span className="label block">Previous note</span>
              <span className="mt-1 block text-body font-medium">{older.title}</span>
            </Link>
          ) : (
            <span className="hidden md:block" />
          )}
          {newer ? (
            <Link href={`/writing/${newer.slug}`} className="card card-hover p-4 md:text-right">
              <span className="label block">Next note</span>
              <span className="mt-1 block text-body font-medium">{newer.title}</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
