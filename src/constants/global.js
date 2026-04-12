// ============================================================
//  GLOBAL CONFIGURATION
//  Edit THIS file to customize every word and link on the site.
// ============================================================
import { COLORS } from './theme';

export const PERSONAL = {
  name:             "Madhur Goel",
  firstName:        "Madhur",
  lastName:         "Goel",
  title:            "Backend & AI Engineer",
  // Rotating roles shown in hero typewriter effect
  roles: [
    "Backend Engineer",
    "AI / ML Engineer",
  ],
  tagline:          "Crafting high-performance software at the intersection of elegant design and intelligent systems.",
  bio: `I'm a software engineer with 3+ years building production systems — from distributed
    APIs serving millions of users, to AI pipelines that turn raw data into real insight.
    I obsess over developer experience, clean architecture, and shipping things that matter.
    When I'm not coding, I'm competing on Codeforces or contributing to open source.`,
  email:            "madhurgoel1234@gmail.com",
  phone:            "+91 7078564490",
  location:         "Gurgaon, Haryana, India",
  availableForWork: true,
  // Set this to your actual image path (e.g. "/assets/profile.jpg")
  profileImage:     "/profile.jpg",
  // Initials shown as fallback if no profileImage
  initials:         "MG",
};

export const SOCIAL = {
  github:      "https://github.com/alexmorgan",
  linkedin:    "https://linkedin.com/in/alexmorgan",
  twitter:     "https://twitter.com/alexmorgan",
  portfolio:   "https://alexmorgan.dev",
  resumeLink:  "/resume.pdf",
};

// ── Stats (shown in hero / about) ────────────────────────────
export const STATS = [
  { value: "3+",   label: "Years experience" },
  { value: "20+",  label: "Projects shipped"  },
  { value: "500+", label: "GitHub stars"       },
  { value: "800+", label: "LeetCode problems"  },
];

// ── Skills ───────────────────────────────────────────────────
export const SKILLS = [
  {
    category: "Frontend",
    color: COLORS.gold,
    items: [
      { name: "React",          level: 95 },
      { name: "Next.js",        level: 90 },
      { name: "TypeScript",     level: 92 },
      { name: "Tailwind CSS",   level: 95 },
      { name: "Framer Motion",  level: 80 },
      { name: "Redux",          level: 85 },
    ],
  },
  {
    category: "Backend",
    color: COLORS.gold,
    items: [
      { name: "Node.js",    level: 90 },
      { name: "FastAPI",    level: 85 },
      { name: "Express",    level: 88 },
      { name: "GraphQL",    level: 80 },
      { name: "Django",     level: 75 },
      { name: "REST APIs",  level: 95 },
    ],
  },
  {
    category: "AI / ML",
    color: COLORS.gold,
    items: [
      { name: "Python",       level: 92 },
      { name: "PyTorch",      level: 82 },
      { name: "LangChain",    level: 78 },
      { name: "OpenAI API",   level: 88 },
      { name: "scikit-learn", level: 80 },
      { name: "HuggingFace",  level: 75 },
    ],
  },
  {
    category: "Database",
    color: COLORS.gold,
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB",    level: 85 },
      { name: "Redis",      level: 80 },
      { name: "Prisma",     level: 82 },
      { name: "Firebase",   level: 78 },
      { name: "Supabase",   level: 75 },
    ],
  },
  {
    category: "DevOps & Cloud",
    color: COLORS.gold,
    items: [
      { name: "Docker",          level: 85 },
      { name: "AWS",             level: 80 },
      { name: "GitHub Actions",  level: 88 },
      { name: "Kubernetes",      level: 70 },
      { name: "Vercel",          level: 90 },
      { name: "GCP",             level: 72 },
    ],
  },
  {
    category: "Tools",
    color: COLORS.gold,
    items: [
      { name: "Git",      level: 95 },
      { name: "Figma",    level: 78 },
      { name: "Postman",  level: 85 },
      { name: "Jest",     level: 82 },
      { name: "Cypress",  level: 80 },
      { name: "VS Code",  level: 95 },
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────
export const PROJECTS = [
  {
    id:          1,
    title:       "NeuralChat — AI Chatbot Platform",
    description: "Production-grade AI chatbot platform powered by GPT-4 with real-time streaming, multi-session history, RAG pipeline, and team workspaces.",
    techStack:   ["Next.js", "FastAPI", "PostgreSQL", "LangChain", "Pinecone", "Docker"],
    liveLink:    "https://neuralchat.demo",
    githubLink:  "https://github.com/alexmorgan/neuralchat",
    image:       null,
    featured:    true,
    category:    "AI / Full-Stack",
    accentColor: COLORS.gold,
    year:        "2024",
  },
  {
    id:          2,
    title:       "ShopSphere — E-Commerce Engine",
    description: "High-performance e-commerce platform with real-time inventory, Stripe payments, order tracking, and an analytics dashboard.",
    techStack:   ["React", "Node.js", "MongoDB", "Redis", "Stripe", "Tailwind"],
    liveLink:    "https://shopsphere.demo",
    githubLink:  "https://github.com/alexmorgan/shopsphere",
    image:       null,
    featured:    true,
    category:    "Full-Stack",
    accentColor: COLORS.gold,
    year:        "2024",
  },
  {
    id:          3,
    title:       "CodeSense — AI Code Reviewer",
    description: "VS Code extension + dashboard that uses LLMs to review PRs, detect anti-patterns, and suggest refactors automatically.",
    techStack:   ["TypeScript", "React", "OpenAI API", "GitHub API", "Express"],
    liveLink:    "https://codesense.demo",
    githubLink:  "https://github.com/alexmorgan/codesense",
    image:       null,
    featured:    false,
    category:    "Developer Tools",
    accentColor: COLORS.gold,
    year:        "2023",
  },
  {
    id:          4,
    title:       "HealthSync — AI Fitness Tracker",
    description: "Mobile-first fitness tracker with AI-generated workout plans, nutrition logging, and ML-powered progress visualization.",
    techStack:   ["React Native", "FastAPI", "PostgreSQL", "scikit-learn", "Expo"],
    liveLink:    "https://healthsync.demo",
    githubLink:  "https://github.com/alexmorgan/healthsync",
    image:       null,
    featured:    false,
    category:    "Mobile / AI",
    accentColor: COLORS.gold,
    year:        "2023",
  },
  {
    id:          5,
    title:       "DevFlow — Project Management",
    description: "Jira-inspired tool with Kanban boards, sprint planning, real-time collaboration via WebSockets, and Slack integration.",
    techStack:   ["Next.js", "Prisma", "PostgreSQL", "Socket.io", "Zustand"],
    liveLink:    "https://devflow.demo",
    githubLink:  "https://github.com/alexmorgan/devflow",
    image:       null,
    featured:    false,
    category:    "Full-Stack",
    accentColor: COLORS.gold,
    year:        "2023",
  },
  {
    id:          6,
    title:       "Sentimind — Sentiment Analytics",
    description: "Real-time sentiment analysis for social media streams using BERT, Kafka pipeline, and an interactive Recharts dashboard.",
    techStack:   ["Python", "BERT", "Kafka", "React", "FastAPI", "Recharts"],
    liveLink:    "https://sentimind.demo",
    githubLink:  "https://github.com/alexmorgan/sentimind",
    image:       null,
    featured:    false,
    category:    "AI / Data",
    accentColor: COLORS.gold,
    year:        "2022",
  },
];

// ── Experience ────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id:   1,
    role: "Software Engineer II",
    company:     "TechCorp Inc.",
    companyUrl:  "https://techcorp.example.com",
    location:    "San Francisco, CA (Remote)",
    type:        "Full-time",
    duration:    "Jan 2023 – Present",
    current:     true,
    description: "Lead engineer on the platform team. Own the core API and React frontend serving 500k+ daily active users.",
    responsibilities: [
      "Architected a real-time notification system handling 2M+ events/day with Kafka and WebSockets",
      "Reduced API latency by 40% through query optimization and Redis caching",
      "Led GraphQL migration, improving client performance by 30% across all dashboards",
      "Mentored 3 junior engineers through weekly code reviews and architecture sessions",
    ],
    techStack: ["React", "Node.js", "GraphQL", "PostgreSQL", "Redis", "AWS", "Kafka"],
    color: COLORS.gold,
  },
  {
    id:   2,
    role: "Full-Stack Engineer Intern",
    company:     "StartupXYZ",
    companyUrl:  "https://startupxyz.example.com",
    location:    "New York, NY",
    type:        "Internship",
    duration:    "Jun 2022 – Dec 2022",
    current:     false,
    description: "Built and shipped production features for a B2B SaaS platform used by 200+ enterprise clients.",
    responsibilities: [
      "Built a drag-and-drop report builder in React, adopted daily by 100+ enterprise users",
      "Integrated Stripe billing with subscription tiers and usage-based pricing models",
      "Wrote E2E tests with Cypress, boosting test coverage from 40% to 78%",
    ],
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe", "Cypress"],
    color: COLORS.gold,
  },
  {
    id:   3,
    role: "ML Research Intern",
    company:     "AI Research Lab, State University",
    companyUrl:  "",
    location:    "Remote",
    type:        "Research",
    duration:    "Jan 2022 – May 2022",
    current:     false,
    description: "NLP research on low-resource language models under Prof. Jane Smith.",
    responsibilities: [
      "Fine-tuned mBERT on a custom multilingual dataset; achieved SoTA on 3 benchmarks",
      "Co-authored a section of a paper accepted at ACL 2022 Workshop",
      "Built an automated dataset curation and evaluation pipeline in Python",
    ],
    techStack: ["Python", "PyTorch", "HuggingFace", "BERT", "pandas"],
    color: COLORS.gold,
  },
];

// ── Achievements ──────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    id:          1,
    title:       "LeetCode Knight",
    description: "Solved 800+ problems. Maintained a 200-day streak. Ranked top 3% globally.",
    emoji:       "⚔️",
    link:        "https://leetcode.com/alexmorgan",
    year:        "2024",
    category:    "Competitive Programming",
    color: COLORS.gold,
  },
  {
    id:          2,
    title:       "Codeforces Expert",
    description: "Peak rating of 1643. Expert rank achieved through 80+ contests.",
    emoji:       "🏆",
    link:        "https://codeforces.com/profile/alexmorgan",
    year:        "2024",
    category:    "Competitive Programming",
    color: COLORS.gold,
  },
  {
    id:          3,
    title:       "Google Kick Start — Top 500",
    description: "Ranked 487th globally in Google Kick Start Round D 2023.",
    emoji:       "🎯",
    link:        "",
    year:        "2023",
    category:    "Competition",
    color: COLORS.gold,
  },
  {
    id:          4,
    title:       "AWS Certified Solutions Architect",
    description: "Associate-level certification for designing scalable cloud architectures.",
    emoji:       "☁️",
    link:        "",
    year:        "2023",
    category:    "Certification",
    color: COLORS.gold,
  },
  {
    id:          5,
    title:       "500+ GitHub Stars",
    description: "Created and maintain 3 open-source libraries with 500+ combined GitHub stars.",
    emoji:       "⭐",
    link:        "https://github.com/alexmorgan",
    year:        "2023",
    category:    "Open Source",
    color: COLORS.gold,
  },
  {
    id:          6,
    title:       "1st Place @ HackMIT",
    description: "Won HackMIT building an AI-powered accessibility tool in 24 hours.",
    emoji:       "⚡",
    link:        "",
    year:        "2022",
    category:    "Hackathon",
    color: COLORS.gold,
  },
];

// ── Education ─────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:     "B.S. Computer Science",
    school:     "State University",
    duration:   "2019 – 2023",
    gpa:        "3.9 / 4.0",
    highlights: ["Dean's List all semesters", "ACM Club President", "Thesis: Low-Resource NLP"],
  },
];

// ── Navigation ────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",         href: "hero"         },
  { label: "About",        href: "about"        },
  { label: "Skills",       href: "skills"       },
  { label: "Projects",     href: "projects"     },
  { label: "Experience",   href: "experience"   },
  { label: "Achievements", href: "achievements" },
  { label: "Contact",      href: "contact"      },
];
