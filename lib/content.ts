import { projects, writing } from "@/.velite";

export type Project = (typeof projects)[number];
export type Writing = (typeof writing)[number];

export function getPublishedProjects() {
  return projects
    .filter((project) => !project.draft)
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects() {
  return getPublishedProjects().filter((project) => project.placement === "featured");
}

export function getSupportingProjects() {
  return getPublishedProjects().filter((project) => project.placement === "supporting");
}

export function getProject(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getPublishedWriting() {
  return writing
    .filter((note) => !note.draft)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNote(slug: string) {
  return getPublishedWriting().find((note) => note.slug === slug);
}

export function formatNoteDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const caseStudySections = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["architecture", "Architecture"],
  ["dataModel", "Data model"],
  ["technologyChoices", "Technology choices"],
  ["decisions", "Key technical decisions"],
  ["implementation", "Implementation"],
  ["challenges", "Challenges"],
  ["solutions", "Solutions"],
  ["results", "Results"],
  ["lessons", "Lessons learned"],
  ["tradeoffs", "Trade-offs"],
  ["future", "Limitations and next steps"],
] as const;

export type CaseStudySectionKey = (typeof caseStudySections)[number][0];

export function contextLabel(context: Project["context"]) {
  return context === "professional" ? "Professional work" : "Personal project";
}

export function categoryLabel(category: Project["category"]) {
  switch (category) {
    case "software":
      return "Software";
    case "ai":
      return "AI engineering";
    case "automation":
      return "Automation";
  }
}
