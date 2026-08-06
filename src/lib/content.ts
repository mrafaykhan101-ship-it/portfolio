/**
 * Single source of truth for every piece of copy on the site.
 *
 * Nothing in `src/components` hard-codes content — add a project, a skill or
 * a timeline entry here and the UI picks it up automatically.
 */

/* ------------------------------------------------------------------ site */

export const site = {
  name: "Muhammad Rafay Khan",
  shortName: "Rafay Khan",
  initials: "MRK",
  role: "Financial Technology Student",
  tagline: "Building at the intersection of finance, code and intelligence.",
  description:
    "Muhammad Rafay Khan — Financial Technology student at Mohammad Ali Jinnah University, Karachi. Python developer focused on FinTech, data analysis and applied AI. Open to internships and entry-level roles.",
  location: "Karachi, Pakistan",
  email: "mrafaykhan101@gmail.com",
  phone: "+92 334 3416430",
  /** Digits only — used for `tel:` and WhatsApp links. */
  phoneHref: "+923343416430",
  /** Update after deploying; drives canonical URLs, OG tags and the sitemap. */
  url: "https://rafaykhan.vercel.app",
  /** Placeholder — swap for your real profile URL. */
  github: "https://github.com/",
  /** Placeholder — swap for your real profile URL. */
  linkedin: "https://www.linkedin.com/",
  resumePath: "/Muhammad-Rafay-Khan-Resume.pdf",
  availability: "Open to Summer 2026 internships",
} as const;

/* ------------------------------------------------------------------- nav */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ hero */

/** Cycled by the hero's rotating headline. */
export const heroRoles = [
  "Financial Technology Student",
  "Python Developer",
  "Future FinTech Engineer",
  "Data & AI Enthusiast",
] as const;

export const heroStats = [
  { value: "5th", label: "Semester", detail: "BS Financial Technology" },
  { value: "2028", label: "Graduating", detail: "Mohammad Ali Jinnah University" },
  { value: "11+", label: "Core skills", detail: "Technical and professional" },
] as const;

/* ----------------------------------------------------------------- about */

export const about = {
  eyebrow: "About",
  heading: "Finance is becoming software. I'm learning to write it.",
  paragraphs: [
    "I'm Muhammad Rafay Khan, a Financial Technology undergraduate at Mohammad Ali Jinnah University in Karachi, currently in my 5th semester. My degree sits deliberately between two worlds — accounting, markets and financial systems on one side; Python, data and automation on the other.",
    "That combination is the whole point. I can read a balance sheet and I can write the script that parses a thousand of them. I'm most interested in the places where those two skills collide: payments, digital banking, algorithmic analysis of markets, and the AI systems increasingly making the decisions in between.",
    "Right now I'm looking for an internship or entry-level role where I can put that to work on real problems — and learn from people who have already shipped them.",
  ],
  highlights: [
    {
      title: "Financial fluency",
      body: "Financial and cost accounting, market structure, and the vocabulary to work alongside finance teams rather than translate for them.",
    },
    {
      title: "Engineering mindset",
      body: "Python, version control with Git and GitHub, and a habit of turning repetitive analysis into something reproducible.",
    },
    {
      title: "Analytical rigour",
      body: "Comfortable in Excel and in code — modelling, cleaning and interrogating data until it answers the actual question.",
    },
    {
      title: "Built to collaborate",
      body: "Communication, teamwork and presentation skills sharpened through coursework where the explanation matters as much as the answer.",
    },
  ],
} as const;

/* ------------------------------------------------------------- education */

export type EducationEntry = {
  id: string;
  qualification: string;
  institution: string;
  period: string;
  status: "current" | "completed";
  summary: string;
  focus: string[];
};

export const education: EducationEntry[] = [
  {
    id: "bs-fintech",
    qualification: "BS in Financial Technology",
    institution: "Mohammad Ali Jinnah University",
    period: "In progress · 5th Semester · Expected 2028",
    status: "current",
    summary:
      "A programme built around the modernisation of finance — combining core accounting and market theory with programming, data analysis and emerging financial infrastructure.",
    focus: [
      "Financial & Cost Accounting",
      "Programming with Python",
      "Financial Markets",
      "Data Analysis",
      "Digital Banking Systems",
    ],
  },
  {
    id: "hssc",
    qualification: "Higher Secondary School Certificate",
    institution: "Pre-Engineering",
    period: "Completed 2022",
    status: "completed",
    summary:
      "Pre-Engineering track — the mathematics and physics grounding that makes quantitative and computational work feel natural rather than foreign.",
    focus: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    id: "ssc",
    qualification: "Secondary School Certificate",
    institution: "Science Group",
    period: "Completed 2020",
    status: "completed",
    summary:
      "Science group foundation, where an early interest in how systems work turned into a decision to study technology seriously.",
    focus: ["Mathematics", "Computer Science", "Sciences"],
  },
];

/* ---------------------------------------------------------------- skills */

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  accent: "iris" | "aqua" | "mint";
  skills: { name: string; level: number; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "engineering",
    label: "Engineering",
    blurb: "The tools I build with.",
    accent: "iris",
    skills: [
      {
        name: "Python",
        level: 78,
        note: "Scripting, automation and data work — my primary language.",
      },
      {
        name: "Git & GitHub",
        level: 72,
        note: "Branching, commits and collaborative version control.",
      },
      {
        name: "Continuous Learning",
        level: 92,
        note: "Actively expanding into ML, APIs and backend fundamentals.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance & Data",
    blurb: "The domain I build for.",
    accent: "mint",
    skills: [
      {
        name: "Financial Technology",
        level: 80,
        note: "Payments, digital banking and the systems moving money.",
      },
      {
        name: "Financial & Cost Accounting",
        level: 82,
        note: "Statements, costing methods and financial reporting.",
      },
      {
        name: "Microsoft Excel",
        level: 85,
        note: "Modelling, lookups, pivots and analysis at speed.",
      },
    ],
  },
  {
    id: "thinking",
    label: "Thinking & People",
    blurb: "How I work with problems and with teams.",
    accent: "aqua",
    skills: [
      {
        name: "Analytical Thinking",
        level: 88,
        note: "Breaking messy problems into things that can be measured.",
      },
      {
        name: "Problem Solving",
        level: 86,
        note: "Structured, patient and comfortable with the unfamiliar.",
      },
      {
        name: "Communication",
        level: 84,
        note: "Explaining technical work to non-technical audiences.",
      },
      {
        name: "Teamwork",
        level: 87,
        note: "Group projects, shared repositories and honest feedback.",
      },
      {
        name: "Presentation Skills",
        level: 83,
        note: "Turning analysis into a case people can act on.",
      },
    ],
  },
];

/** Flattened list used by the scrolling skills marquee. */
export const skillMarquee = skillGroups.flatMap((g) =>
  g.skills.map((s) => s.name),
);

/* -------------------------------------------------------------- projects */

export type ProjectStatus = "live" | "building" | "planned";

export type Project = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  description: string;
  tech: string[];
  /** `null` renders the button in a disabled "coming soon" state. */
  github: string | null;
  demo: string | null;
  status: ProjectStatus;
  accent: "iris" | "aqua" | "mint";
  /** Optional screenshot in `/public`. Falls back to a generated motif. */
  image?: string;
  featured?: boolean;
};

export const projectCategories = [
  "All",
  "Python",
  "Machine Learning",
  "FinTech",
  "Data Analysis",
  "University",
] as const;

/**
 * Placeholders for now. To publish a real project, replace the copy, set
 * `status: "live"`, and fill in `github` / `demo` / `image`.
 */
export const projects: Project[] = [
  {
    slug: "python-toolkit",
    title: "Python Automation Toolkit",
    category: "Python",
    blurb: "Scripts that remove the repetitive parts of financial coursework.",
    description:
      "A growing collection of Python utilities for cleaning spreadsheets, batch-processing statements and automating the calculations that would otherwise be done by hand.",
    tech: ["Python", "pandas", "openpyxl", "CLI"],
    github: null,
    demo: null,
    status: "building",
    accent: "iris",
    featured: true,
  },
  {
    slug: "ml-market-signals",
    title: "Market Signal Explorer",
    category: "Machine Learning",
    blurb: "Applying supervised learning to historical market data.",
    description:
      "A study project using scikit-learn to test whether classic technical indicators carry any predictive signal — with honest backtesting and an emphasis on not fooling yourself.",
    tech: ["Python", "scikit-learn", "NumPy", "Matplotlib"],
    github: null,
    demo: null,
    status: "planned",
    accent: "aqua",
    featured: true,
  },
  {
    slug: "fintech-payments",
    title: "Digital Payments Prototype",
    category: "FinTech",
    blurb: "A simulated wallet-to-wallet transfer and ledger service.",
    description:
      "Modelling the primitives behind a digital wallet — double-entry ledgers, transaction states and reconciliation — to understand what actually happens between 'send' and 'received'.",
    tech: ["Python", "FastAPI", "SQLite", "REST"],
    github: null,
    demo: null,
    status: "planned",
    accent: "mint",
    featured: true,
  },
  {
    slug: "data-analysis-dashboard",
    title: "Financial Data Dashboard",
    category: "Data Analysis",
    blurb: "Turning raw statements into a picture you can read in seconds.",
    description:
      "An exploratory analysis and visualisation project: ingest financial data, compute the ratios that matter, and surface trends through clear, well-labelled charts.",
    tech: ["Python", "pandas", "Plotly", "Excel"],
    github: null,
    demo: null,
    status: "planned",
    accent: "aqua",
  },
  {
    slug: "university-coursework",
    title: "University Project Archive",
    category: "University",
    blurb: "Selected coursework from the BS Financial Technology programme.",
    description:
      "Semester projects spanning accounting analysis, programming assignments and financial case studies — documented so the reasoning is visible, not just the result.",
    tech: ["Python", "Excel", "Documentation", "Git"],
    github: null,
    demo: null,
    status: "planned",
    accent: "iris",
  },
  {
    slug: "risk-scoring",
    title: "Credit Risk Scoring Study",
    category: "Machine Learning",
    blurb: "Classification models for lending decisions, done carefully.",
    description:
      "Exploring how logistic regression and tree-based models score credit risk — and where the fairness, explainability and data-quality problems show up.",
    tech: ["Python", "pandas", "scikit-learn", "Jupyter"],
    github: null,
    demo: null,
    status: "planned",
    accent: "mint",
  },
];

/* ------------------------------------------------------------ experience */

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
};

/** Empty until the first role lands — the section renders an intentional
 *  "what I'm looking for" state instead of a blank block. */
export const experience: ExperienceEntry[] = [];

export const experienceSeeking = {
  heading: "No professional experience yet — and I'd like that to change.",
  body: "I'm actively looking for my first internship. Below is what I'm ready to contribute from day one, and the kind of team I'd learn the most from.",
  offering: [
    {
      title: "Python & automation support",
      body: "Scripting repetitive data tasks, cleaning datasets and building small internal tools.",
    },
    {
      title: "Financial analysis assistance",
      body: "Statement analysis, cost calculations and Excel modelling with an eye for what the numbers imply.",
    },
    {
      title: "Research & documentation",
      body: "Market and product research written up clearly enough to be used in a decision.",
    },
    {
      title: "A fast learning curve",
      body: "I ask precise questions, take feedback literally, and I'd rather understand the system than patch around it.",
    },
  ],
  targets: [
    "FinTech & Payments",
    "Digital Banking",
    "Software Development",
    "Data & Analytics",
    "Applied AI",
    "Capital Markets",
  ],
} as const;

/* ---------------------------------------------------------- achievements */

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  detail: string;
};

/** Empty for now — the section renders a roadmap of what's in progress. */
export const achievements: Achievement[] = [];

export const achievementsPipeline = [
  {
    title: "Python for Data Analysis certification",
    detail: "Formalising the pandas and NumPy work I already do into a credential.",
    stage: "In progress",
  },
  {
    title: "First open-source contribution",
    detail: "Finding a FinTech or Python repository where a beginner-friendly issue is genuinely useful.",
    stage: "Next",
  },
  {
    title: "University FinTech case competition",
    detail: "Putting the finance and engineering halves of the degree to work under a deadline.",
    stage: "Planned",
  },
  {
    title: "Financial Markets certification",
    detail: "Deepening the market-structure knowledge behind the technology.",
    stage: "Planned",
  },
] as const;

/* ----------------------------------------------------------------- goals */

export const goals = {
  eyebrow: "Future Goals",
  heading: "Where this is going",
  intro:
    "A degree is a starting point, not a plan. Here's the trajectory I'm working toward — near-term, concrete, and revised as I learn more.",
  milestones: [
    {
      horizon: "Now — 2026",
      title: "Ship real, public projects",
      body: "Move the placeholders on this page into finished repositories: a working payments prototype, a documented data analysis, and Python tooling other students can actually use.",
      accent: "iris" as const,
    },
    {
      horizon: "2026",
      title: "Land a FinTech internship",
      body: "Join an engineering, data or product team in payments, digital banking or markets — and learn how production financial systems are really built and maintained.",
      accent: "aqua" as const,
    },
    {
      horizon: "2027",
      title: "Go deep on applied AI in finance",
      body: "Build genuine depth in machine learning for financial problems: risk scoring, fraud detection and forecasting, with the statistical honesty those domains demand.",
      accent: "mint" as const,
    },
    {
      horizon: "2028 and beyond",
      title: "Graduate as a FinTech engineer",
      body: "Finish the BS with a portfolio that proves the combination — someone who can design the financial logic and write the software that runs it.",
      accent: "iris" as const,
    },
  ],
} as const;

/* --------------------------------------------------------------- contact */

export const contactChannels = [
  {
    id: "email",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Best for internships and opportunities",
  },
  {
    id: "phone",
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    hint: "Available Mon–Sat, 10am–8pm PKT",
  },
  {
    id: "location",
    label: "Location",
    value: site.location,
    href: null,
    hint: "Open to remote and hybrid",
  },
] as const;
