import { education, experience, skillGroups } from "@/lib/profile";
import { site } from "@/lib/site";

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.domain).toString(),
    })),
  };
}

export function JsonLd() {
  const sameAs = [site.github, site.linkedin].filter((value): value is string => Boolean(value));
  const college = education.find((item) => item.title.startsWith("Bachelor"));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.domain}/#person`,
        name: site.name,
        url: site.domain,
        jobTitle: experience.role,
        ...(site.email ? { email: `mailto:${site.email}` } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.split(",")[0],
          addressCountry: "IN",
        },
        worksFor: {
          "@type": "Organization",
          name: experience.company,
        },
        ...(college
          ? { alumniOf: { "@type": "CollegeOrUniversity", name: college.place } }
          : {}),
        knowsAbout: skillGroups.flatMap((group) => group.items).slice(0, 20),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.domain}/#website`,
        name: site.name,
        url: site.domain,
        description: site.description,
        publisher: { "@id": `${site.domain}/#person` },
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}
