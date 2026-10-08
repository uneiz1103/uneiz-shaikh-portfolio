import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { site } from "@/lib/site";

export const socialLinks = [
  site.email ? { href: `mailto:${site.email}`, label: "Email", value: site.email, icon: IconMail } : null,
  site.github ? { href: site.github, label: "GitHub", value: "GitHub", icon: IconGitHub } : null,
  site.linkedin
    ? { href: site.linkedin, label: "LinkedIn", value: "LinkedIn", icon: IconLinkedIn }
    : null,
].filter((item) => item !== null);

export function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
