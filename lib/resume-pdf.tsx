import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { getPublishedProjects } from "@/lib/content";
import { education, experience, skillGroups } from "@/lib/profile";
import { site } from "@/lib/site";

const accent = "#3730a3";
const ink = "#111111";
const muted = "#52525b";
const line = "#d4d4d8";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: ink,
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 24, lineHeight: 1.2, letterSpacing: -0.5 },
  role: { marginTop: 4, fontSize: 12, lineHeight: 1.3, color: accent },
  contact: { marginTop: 8, flexDirection: "row", flexWrap: "wrap", color: muted },
  contactItem: { marginRight: 14 },
  link: { color: muted, textDecoration: "none" },
  section: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 0.75,
    borderTopColor: line,
    flexDirection: "row",
  },
  sectionTitle: {
    width: 88,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: accent,
    textTransform: "uppercase",
    paddingTop: 1.5,
  },
  sectionBody: { flex: 1 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontFamily: "Helvetica-Bold" },
  subtle: { color: muted },
  small: { fontSize: 8.5, color: muted },
  bullet: { flexDirection: "row", marginTop: 3 },
  bulletDot: { width: 10, color: accent },
  bulletText: { flex: 1 },
  item: { marginBottom: 7 },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillTitle: { width: 110, fontFamily: "Helvetica-Bold" },
});

// The built-in PDF fonts only cover WinAnsi characters.
function pdfText(value: string) {
  return value.replace(/\s*→\s*/g, " / ").replace(/≈|~/g, "about ");
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function ResumeDocument() {
  const projects = getPublishedProjects();
  const contacts = [
    site.email ? { label: site.email, href: `mailto:${site.email}` } : null,
    site.linkedin ? { label: "LinkedIn", href: site.linkedin } : null,
    site.github ? { label: "GitHub", href: site.github } : null,
    { label: site.domain.replace(/^https?:\/\//, ""), href: site.domain },
  ].filter((item) => item !== null);

  return (
    <Document title={`${site.name} - Resume`} author={site.name} subject="Resume">
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{site.name}</Text>
        <Text style={styles.role}>{pdfText(site.role)}</Text>
        <View style={styles.contact}>
          <Text style={styles.contactItem}>{site.location}</Text>
          {contacts.map((item) => (
            <Link key={item.href} src={item.href} style={[styles.contactItem, styles.link]}>
              {item.label}
            </Link>
          ))}
        </View>

        <Section title="Experience">
          <View style={styles.rowBetween}>
            <Text style={styles.bold}>{pdfText(experience.role)}</Text>
            <Text style={styles.small}>
              {experience.start} - {experience.end}
            </Text>
          </View>
          <Text style={styles.subtle}>
            {experience.company} · {experience.location}
          </Text>
          {experience.paragraphs.map((paragraph) => (
            <View key={paragraph} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{pdfText(paragraph)}</Text>
            </View>
          ))}
        </Section>

        <Section title="Projects">
          {projects.map((project) => (
            <View key={project.slug} style={styles.item}>
              <Link src={`${site.domain}/projects/${project.slug}`} style={[styles.bold, { color: ink, textDecoration: "none" }]}>
                {project.title}
              </Link>
              <Text style={styles.subtle}>{pdfText(project.summary)}</Text>
              <Text style={styles.small}>{project.technologies.join(" · ")}</Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {skillGroups.map((group) => (
            <View key={group.title} style={styles.skillRow}>
              <Text style={styles.skillTitle}>{group.title}</Text>
              <Text style={[styles.subtle, { flex: 1 }]}>{group.items.join(", ")}</Text>
            </View>
          ))}
        </Section>

        <Section title="Education">
          {education.map((item) => (
            <View key={item.title} style={[styles.rowBetween, styles.item]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bold}>{item.title}</Text>
                <Text style={styles.subtle}>{item.place}</Text>
              </View>
              <Text style={styles.small}>{item.detail}</Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}

export function renderResumePdf() {
  return renderToBuffer(<ResumeDocument />);
}
