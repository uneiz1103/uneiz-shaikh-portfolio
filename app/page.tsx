import type { Metadata } from "next";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { NotesPreview } from "@/components/home/notes-preview";
import { SelectedWork } from "@/components/home/selected-work";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <SelectedWork />
      <Experience />
      <About />
      <NotesPreview />
      <Contact />
    </>
  );
}
