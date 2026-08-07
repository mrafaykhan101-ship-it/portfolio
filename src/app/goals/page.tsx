import type { Metadata } from "next";
import { Goals } from "@/components/sections/Goals";

export const metadata: Metadata = {
  title: "Future Goals",
  description:
    "The trajectory from here to graduating in 2028 as a FinTech engineer — shipping public projects, landing an internship and going deep on applied AI in finance.",
  alternates: { canonical: "/goals" },
};

export default function GoalsPage() {
  return <Goals />;
}
