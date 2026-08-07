import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed work across machine learning, Islamic finance, statistical research and database design — including a stock-prediction model with a 2.03 backtested Sharpe ratio.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
