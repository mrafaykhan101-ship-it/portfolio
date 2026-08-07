import type { Metadata } from "next";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact & Résumé",
  description:
    "Get in touch about internships and entry-level roles in FinTech, insurtech, data and applied AI — or download the résumé.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Resume />
      <Contact />
    </>
  );
}
