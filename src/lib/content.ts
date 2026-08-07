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
    "Muhammad Rafay Khan — Financial Technology student at Mohammad Ali Jinnah University, Karachi. Hands-on with machine learning, statistical analysis, Islamic finance structuring and database design. Open to internships in FinTech, insurtech, data and applied AI.",
  location: "Karachi, Pakistan",
  email: "mrafaykhan076@gmail.com",
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
  /**
   * Drop a square-ish photo in `/public` and set this to e.g. "/portrait.jpg".
   * While it's `null` the hero renders a designed monogram card instead.
   */
  portrait: null as string | null,
} as const;

export const heroLede =
  "I'm a Financial Technology undergraduate in Karachi who builds machine-learning models on market data, structures Islamic finance deals, and designs the databases underneath. Five semesters in, and looking for the internship where that mix gets put to work — in FinTech, insurtech, data or applied AI.";

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

/** Stable array reference for the active-section observer. */
export const navSectionIds: readonly string[] = navLinks.map((l) => l.id);

/* ------------------------------------------------------------------ hero */

/** Cycled by the hero's rotating headline. */
export const heroRoles = [
  "Financial Technology Student",
  "Python & ML Developer",
  "Data-Driven Finance",
  "Future FinTech Engineer",
] as const;

export const heroStats = [
  {
    value: "2028",
    label: "Graduating",
    detail: "BS FinTech · MAJU Karachi",
  },
  {
    value: "5",
    label: "Academic projects",
    detail: "ML · finance · data · databases",
  },
  {
    value: "2.03",
    label: "Backtested Sharpe",
    detail: "MCB stock prediction model",
  },
] as const;

/* ----------------------------------------------------------------- about */

export const about = {
  eyebrow: "About",
  heading: "Finance is becoming software. I'm learning to write it.",
  paragraphs: [
    "I'm Muhammad Rafay Khan, a Financial Technology undergraduate at Mohammad Ali Jinnah University in Karachi, five semesters into a degree that sits deliberately between two worlds — accounting, markets and Shariah-compliant finance on one side; Python, machine learning and databases on the other.",
    "That combination is the whole point. I've engineered 89 features to predict PSX stock returns, modelled a PKR 1 billion Diminishing Musharakah financing structure, run regression studies in SPSS, and designed a 22-table relational database from scratch. I can read a balance sheet and I can write the code that interrogates a thousand of them.",
    "I'm most drawn to the places those skills collide: insurtech and claims analytics, digital banking, and data-driven financial decision-making. Right now I'm looking for an internship or entry-level role where I can put that to work on real problems — and learn from people who have already shipped them.",
  ],
  highlights: [
    {
      title: "Machine learning on real data",
      body: "Random Forests, regression and KNN in Python — feature engineering, walk-forward validation and SHAP-based interpretation, not just fitting a model and hoping.",
    },
    {
      title: "Financial fluency",
      body: "Financial and cost accounting, market structure and Islamic finance structuring — the vocabulary to work alongside finance teams rather than translate for them.",
    },
    {
      title: "Statistical rigour",
      body: "Survey design, reliability testing and regression analysis in SPSS and Python — comfortable interrogating data until it answers the actual question.",
    },
    {
      title: "Systems thinking",
      body: "Relational database design in SQL Server and version control with Git — a habit of turning analysis into something reproducible and structured.",
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
    institution: "Mohammad Ali Jinnah University (MAJU), Karachi",
    period: "In progress · 6th Semester · Expected 2028",
    status: "current",
    summary:
      "A programme built around the modernisation of finance — combining core accounting and market theory with programming, machine learning, statistical analysis and financial infrastructure. Five semesters completed.",
    focus: [
      "Machine Learning",
      "Financial & Cost Accounting",
      "Python & Data Analysis",
      "Islamic Finance",
      "Database Systems",
    ],
  },
  {
    id: "hssc",
    qualification: "Higher Secondary School Certificate",
    institution: "Jinnah Government College · Pre-Engineering",
    period: "Completed 2022",
    status: "completed",
    summary:
      "Pre-Engineering track — the mathematics and physics grounding that makes quantitative and computational work feel natural rather than foreign.",
    focus: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    id: "ssc",
    qualification: "Secondary School Certificate",
    institution: "Little Folks Paradise School · Science",
    period: "Completed 2020",
    status: "completed",
    summary:
      "Science group foundation, where an early interest in how systems work turned into a decision to study technology seriously.",
    focus: ["Mathematics", "Computer Science", "Sciences"],
  },
];

/* ---------------------------------------------------------------- skills */

/**
 * Proficiency is expressed as an evidence-backed tier, not a percentage.
 * Invented precision ("82/100") is unverifiable and is the hallmark of
 * template portfolios; a tier plus the work that justifies it is honest and
 * survives being questioned in an interview.
 */
export type SkillTier = "Core" | "Strong" | "Working";

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  accent: "iris" | "aqua" | "mint";
  skills: { name: string; tier: SkillTier; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "engineering",
    label: "Engineering & Data",
    blurb: "The tools I build and analyse with.",
    accent: "iris",
    skills: [
      {
        name: "Python",
        tier: "Core",
        note: "pandas, NumPy — my primary language across every data project here.",
      },
      {
        name: "scikit-learn",
        tier: "Strong",
        note: "Random Forests, regression and KNN, with walk-forward validation and SHAP.",
      },
      {
        name: "SPSS",
        tier: "Strong",
        note: "Reliability, normality, correlation and regression testing for research.",
      },
      {
        name: "SQL (T-SQL)",
        tier: "Strong",
        note: "Designed and populated a 22-table relational schema in SQL Server.",
      },
      {
        name: "Git & GitHub",
        tier: "Working",
        note: "Branching, commits and collaborative version control.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance & Modelling",
    blurb: "The domain I build for.",
    accent: "mint",
    skills: [
      {
        name: "Financial & Cost Accounting",
        tier: "Core",
        note: "Statements, costing methods and financial reporting.",
      },
      {
        name: "Microsoft Excel",
        tier: "Core",
        note: "Financial modelling — including a 7-year PKR 1B financing schedule.",
      },
      {
        name: "Statistical & Regression Analysis",
        tier: "Strong",
        note: "Hypothesis testing, EDA and modelling relationships in data.",
      },
      {
        name: "Islamic Finance Structuring",
        tier: "Strong",
        note: "Diminishing Musharakah modelling with six-category risk assessment.",
      },
      {
        name: "Financial Technology",
        tier: "Working",
        note: "Payments, digital banking and the systems moving money.",
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
        tier: "Core",
        note: "Breaking messy problems into things that can be measured.",
      },
      {
        name: "Teamwork",
        tier: "Core",
        note: "Four of five projects here were delivered as a group.",
      },
      {
        name: "Research Design",
        tier: "Strong",
        note: "Designed and fielded a 15-item survey, then tested it honestly.",
      },
      {
        name: "Problem Solving",
        tier: "Strong",
        note: "Structured, patient and comfortable with the unfamiliar.",
      },
      {
        name: "Communication & Presentation",
        tier: "Strong",
        note: "Turning technical analysis into a case people can act on.",
      },
    ],
  },
];

/** Flattened list used by the scrolling skills marquee. */
export const skillMarquee = skillGroups.flatMap((g) =>
  g.skills.map((s) => s.name),
);

/* -------------------------------------------------------------- projects */

/**
 * `completed` — the work is done and the results are real; the code just
 * isn't published yet. `live` — a public repo or demo exists.
 */
export type ProjectStatus = "live" | "completed" | "building";

export type Project = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  description: string;
  tech: string[];
  /** Standout result, surfaced as a chip on the card. */
  metric?: { value: string; label: string };
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
  "Machine Learning",
  "FinTech",
  "Data Analysis",
  "Databases",
] as const;

/**
 * Real academic projects. To publish code or a demo, set `github` / `demo`
 * (and optionally `image`) and flip `status` to "live".
 */
export const projects: Project[] = [
  {
    slug: "mcb-stock-prediction",
    title: "MCB Bank Stock Prediction",
    category: "Machine Learning",
    blurb: "A Random Forest model forecasting next-day PSX stock returns.",
    description:
      "Built and iteratively refined a Random Forest predicting next-day MCB Bank returns, engineering 89 features across price momentum, technical indicators, macroeconomic variables and sector data. Validated with walk-forward testing and SHAP, permutation and MDI feature-importance methods.",
    tech: ["Python", "scikit-learn", "Time-series CV", "SHAP"],
    metric: { value: "2.03", label: "Backtested Sharpe · 56.6% accuracy" },
    github: null,
    demo: null,
    status: "completed",
    accent: "iris",
    featured: true,
  },
  {
    slug: "diminishing-musharakah",
    title: "Diminishing Musharakah Financing Model",
    category: "FinTech",
    blurb: "A PKR 1 billion Shariah-compliant property financing structure.",
    description:
      "Modelled a Shariah-compliant commercial property financing structure for a PSX-listed company — a full 7-year rental-sharing and equity buyback schedule — with a 6-category risk assessment and Shariah-compliant mitigations, benchmarked against conventional loan financing.",
    tech: ["Financial Modelling", "Excel", "Islamic Finance"],
    metric: { value: "PKR 1B", label: "Financing structure modelled" },
    github: null,
    demo: null,
    status: "completed",
    accent: "mint",
    featured: true,
  },
  {
    slug: "insurance-ml",
    title: "Predictive Modelling on Insurance Data",
    category: "Machine Learning",
    blurb: "Regression and KNN on policyholder and customer datasets.",
    description:
      "Built a linear regression model predicting insurance charges from policyholder data, supported by exploratory analysis of distribution, outliers and correlation. Applied K-Nearest Neighbors with feature scaling to a customer dataset for similarity and pattern analysis.",
    tech: ["Python", "pandas", "scikit-learn", "seaborn"],
    metric: { value: "EDA + KNN", label: "Insurtech-focused study" },
    github: null,
    demo: null,
    status: "completed",
    accent: "aqua",
    featured: true,
  },
  {
    slug: "financial-literacy-study",
    title: "Financial Literacy & Saving Behavior",
    category: "Data Analysis",
    blurb: "A statistical research study on university students' habits.",
    description:
      "Co-designed and fielded a 15-item survey (n = 86) measuring financial literacy and saving behavior. Ran reliability (Cronbach's α), normality, correlation and regression tests in SPSS — finding that financial literacy explains 46% of the variance in saving behavior.",
    tech: ["SPSS", "Survey Design", "Hypothesis Testing"],
    metric: { value: "R² = 0.462", label: "p < 0.001 · n = 86" },
    github: null,
    demo: null,
    status: "completed",
    accent: "aqua",
  },
  {
    slug: "school-db-design",
    title: "School Management System Database",
    category: "Databases",
    blurb: "A 22-table relational schema across six operational modules.",
    description:
      "Designed a 22-table relational database covering attendance, library, fee, examination, transportation and hostel-management modules. Implemented primary-key-based table structures and populated the schema with sample records for query testing.",
    tech: ["SQL", "T-SQL", "SQL Server", "Schema Design"],
    metric: { value: "22 tables", label: "6 operational modules" },
    github: null,
    demo: null,
    status: "completed",
    accent: "iris",
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
  body: "I'm actively looking for my first internship. Below is what I'm ready to contribute from day one, backed by real project work, and the kind of team I'd learn the most from.",
  offering: [
    {
      title: "Python, ML & data support",
      body: "Feature engineering, model building, data cleaning and analysis — I've shipped Random Forest, regression and KNN models on real datasets.",
    },
    {
      title: "Financial analysis assistance",
      body: "Statement analysis, cost calculations, Islamic finance structuring and Excel modelling with an eye for what the numbers imply.",
    },
    {
      title: "Research & documentation",
      body: "Survey design, statistical testing and clearly written analysis — the kind of research that can actually feed a decision.",
    },
    {
      title: "A fast learning curve",
      body: "I ask precise questions, take feedback literally, and I'd rather understand the system than patch around it.",
    },
  ],
  targets: [
    "FinTech & Payments",
    "Insurtech & Claims Analytics",
    "Digital Banking",
    "Data & Analytics",
    "Applied AI / ML",
    "Capital Markets",
  ],
} as const;

/* ---------------------------------------------------------- achievements */

export type Achievement = {
  metric: string;
  label: string;
  context: string;
  detail: string;
  accent: "iris" | "aqua" | "mint";
};

/** Real, quantified results drawn from academic project work. */
export const achievements: Achievement[] = [
  {
    metric: "2.03",
    label: "Backtested Sharpe ratio",
    context: "MCB Bank stock prediction model",
    detail:
      "56.6% walk-forward directional accuracy, beating baseline in 13 of 15 quarters — validated with SHAP, permutation and MDI importance.",
    accent: "iris",
  },
  {
    metric: "89",
    label: "Engineered features",
    context: "Price, technical, macro & sector data",
    detail:
      "Feature set spanning price momentum, technical indicators, macroeconomic variables and sector data for the stock-return model.",
    accent: "iris",
  },
  {
    metric: "PKR 1B",
    label: "Islamic finance structure",
    context: "Diminishing Musharakah model",
    detail:
      "A full 7-year Shariah-compliant rental-sharing and equity buyback schedule with a 6-category risk assessment.",
    accent: "mint",
  },
  {
    metric: "R² 0.462",
    label: "Explained variance",
    context: "Financial literacy research (n = 86)",
    detail:
      "Regression study in SPSS showing financial literacy explains 46% of variance in saving behavior (p < 0.001).",
    accent: "aqua",
  },
  {
    metric: "22",
    label: "Relational tables",
    context: "School management database",
    detail:
      "A normalised schema across attendance, library, fee, examination, transportation and hostel modules.",
    accent: "iris",
  },
  {
    metric: "5",
    label: "Academic projects shipped",
    context: "ML, finance, data & databases",
    detail:
      "A growing body of applied work bridging the financial and engineering halves of the degree.",
    accent: "mint",
  },
];

export const achievementsPipeline = [
  {
    title: "Publish project code on GitHub",
    detail: "Turn these academic projects into documented, public repositories.",
    stage: "In progress",
  },
  {
    title: "Python for Data Analysis certification",
    detail: "Formalising the pandas and scikit-learn work into a credential.",
    stage: "Next",
  },
  {
    title: "First open-source contribution",
    detail: "A FinTech or Python repository where a beginner-friendly issue is genuinely useful.",
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
      title: "Ship my projects publicly",
      body: "Move my academic work into documented GitHub repositories — the stock-prediction model, the insurance ML study and the database design — so the reasoning is visible, not just the result.",
      accent: "iris" as const,
    },
    {
      horizon: "2026",
      title: "Land a FinTech or insurtech internship",
      body: "Join an engineering, data or product team in payments, digital banking, insurtech or markets — and learn how production financial systems are really built and maintained.",
      accent: "aqua" as const,
    },
    {
      horizon: "2027",
      title: "Go deep on applied AI in finance",
      body: "Build genuine depth in machine learning for financial problems: risk scoring, claims analytics, fraud detection and forecasting, with the statistical honesty those domains demand.",
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

