import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";

export const metadata: Metadata = {
  title: "Experience & Achievements",
  description:
    "Seeking a first internship in FinTech, insurtech, data or applied AI — with measured project results and eight verified Google Data Analytics certifications.",
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
