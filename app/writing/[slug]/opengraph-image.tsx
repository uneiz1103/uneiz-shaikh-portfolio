import { getNote, getPublishedWriting } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Engineering note";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedWriting().map((note) => ({ slug: note.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  return renderOgImage({
    eyebrow: "Engineering note",
    title: note?.title ?? "Engineering note",
  });
}
