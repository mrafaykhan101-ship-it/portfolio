import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
    </>
  );
}
