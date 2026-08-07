import type { Metadata } from "next";
import { Education } from "@/components/sections/Education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "BS Financial Technology at Mohammad Ali Jinnah University (expected 2028), plus pre-engineering and science foundations.",
  alternates: { canonical: "/education" },
};

export default function EducationPage() {
  return <Education />;
}
