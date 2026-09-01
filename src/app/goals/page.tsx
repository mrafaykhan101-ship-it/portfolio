import type { Metadata } from "next";
import { Goals } from "@/components/sections/Goals";

export const metadata: Metadata = {
  title: "Future Goals",
  description:
    "Where the work is heading — publishing project code, building against production constraints, and going deep on applied AI in finance.",
  alternates: { canonical: "/goals" },
};

export default function GoalsPage() {
  return <Goals />;
}
