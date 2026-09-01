import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";

export const metadata: Metadata = {
  title: "Approach & Results",
  description:
    "How the work gets done — method, measured project results, and eight publicly verifiable Google Data Analytics certifications.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <Experience />
      <Achievements divider />
    </>
  );
}
