import { getPublishedWriting } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const notes = getPublishedWriting();
  const lastBuild = notes[0]?.updatedAt ?? notes[0]?.publishedAt;

  const items = notes
    .map((note) => {
      const url = `${site.domain}/writing/${note.slug}`;
      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.description)}</description>
      <pubDate>${new Date(note.publishedAt).toUTCString()}</pubDate>
${note.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`Engineering Notes — ${site.name}`)}</title>
    <link>${site.domain}/writing</link>
    <atom:link href="${site.domain}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes on software, data systems, and AI engineering by ${escapeXml(site.name)}.</description>
    <language>en</language>
${lastBuild ? `    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
