import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Python, scikit-learn, SQL, SPSS and Excel, alongside financial and cost accounting, Islamic finance structuring and statistical analysis.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return <Skills />;
}
