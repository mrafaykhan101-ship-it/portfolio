import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Financial Technology undergraduate at Mohammad Ali Jinnah University, Karachi — machine learning, statistical analysis, Islamic finance structuring and database design.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
