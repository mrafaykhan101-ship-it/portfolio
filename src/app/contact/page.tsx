import type { Metadata } from "next";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact & Résumé",
  description:
    "Contact details and résumé for Muhammad Rafay Khan — questions about any project's methodology or code are welcome.",
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
