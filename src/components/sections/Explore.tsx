import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  GraduationCap,
  Mail,
  Target,
  User,
  Wrench,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { accentStyles, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

const routes: {
  href: string;
  label: string;
  blurb: string;
  Icon: typeof User;
  accent: Accent;
}[] = [
  {
    href: "/projects",
    label: "Projects",
    blurb:
      "Five completed builds — a 2.03 Sharpe stock model, a PKR 1B financing structure, and more.",
    Icon: BrainCircuit,
    accent: "iris",
  },
  {
    href: "/about",
    label: "About",
    blurb: "Why finance and software, and what sits at the intersection of the two.",
    Icon: User,
    accent: "aqua",
  },
  {
    href: "/skills",
    label: "Skills",
    blurb: "Python, scikit-learn, SQL and SPSS — each tied to the work behind it.",
    Icon: Wrench,
    accent: "mint",
  },
  {
    href: "/experience",
    label: "Experience & Achievements",
    blurb: "Measured results and eight verified Google Data Analytics certifications.",
    Icon: BadgeCheck,
    accent: "aqua",
  },
  {
    href: "/education",
    label: "Education",
    blurb: "BS Financial Technology at Mohammad Ali Jinnah University, Karachi.",
    Icon: GraduationCap,
    accent: "iris",
  },
  {
    href: "/goals",
    label: "Future Goals",
    blurb: "The trajectory from here to graduating as a FinTech engineer in 2028.",
    Icon: Target,
    accent: "mint",
  },
  {
    href: "/contact",
    label: "Contact & Résumé",
    blurb: "Hiring for an internship? Here's the fastest way to reach me.",
    Icon: Mail,
    accent: "iris",
  },
];

/** Landing-page directory — the home page's route into everything else. */
export function Explore() {
  return (
    <Section id="explore">
      <SectionHeading
        eyebrow="Explore"
        title={
          <>
            Have a look <span className="text-gradient">around</span>
          </>
        }
        lede="Everything is one click away — the work, the credentials behind it, and how to get in touch."
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {routes.map(({ href, label, blurb, Icon, accent }) => {
          const a = accentStyles[accent];
          return (
            <StaggerItem key={href}>
              <Link href={href} className="block h-full">
                <GlassCard className="group/nav h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-xl ring-1",
                        a.softBg,
                        a.text,
                        a.border,
                      )}
                    >
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="size-4 text-mist-500 transition-all duration-300 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 group-hover/nav:text-mist-200"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-mist-50">{label}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-400">
                    {blurb}
                  </p>
                </GlassCard>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
