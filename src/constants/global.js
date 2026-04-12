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
  tagline:          "Backend-focused software engineer specializing in scalable systems and applied AI/ML solutions.",
  bio: `I am a Software Engineer with strong experience in backend development and AI/ML systems. I have worked on building scalable APIs, data pipelines, and intelligent systems using technologies like FastAPI, Django, and machine learning models. I have also contributed to production-grade systems involving async workflows, distributed architectures, and real-time data processing. Alongside development, I actively solve DSA problems and have strong problem-solving skills.`,
  email:            "madhur12a16072@gmail.com",
  phone:            "+91 7078564490",
  location:         "Gurgaon, Haryana, India",
  availableForWork: true,
  // Set this to your actual image path (e.g. "/assets/profile.jpg")
  profileImage:     "/profile.jpg",
  // Initials shown as fallback if no profileImage
  initials:         "MG",
};

export const SOCIAL = {
  github:      "https://github.com/MadhurGoel8864",
  linkedin:    "https://www.linkedin.com/in/madhur-goel-mg",
  portfolio:   "https://madhurportfolio-seven.vercel.app/",
  resumeLink:  "/resume.pdf",
};

// ── Stats (shown in hero / about) ────────────────────────────
export const STATS = [
  { value: "1+",    label: "Years experience" },
  { value: "915+",  label: "DSA problems solved"  },
  { value: "1880+", label: "LeetCode rating"       },
  { value: "1",     label: "AWS Certifications"  },
];

// ── Skills ───────────────────────────────────────────────────
export const SKILLS = [
  {
    category: "Programming Languages",
    color: COLORS.gold,
    items: [
      { name: "C++", level: 95 },
      { name: "C", level: 90 },
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    category: "Backend Development",
    color: COLORS.gold,
    items: [
      { name: "Django", level: 80 },
      { name: "FastAPI", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    category: "Frontend Development",
    color: COLORS.gold,
    items: [
      { name: "React", level: 85 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
    ],
  },
  {
    category: "Databases",
    color: COLORS.gold,
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 80 },
      { name: "SQL", level: 90 },
    ],
  },
  {
    category: "Cloud & DevOps",
    color: COLORS.gold,
    items: [
      { name: "AWS", level: 85 },
      { name: "Microsoft Azure", level: 80 },
      { name: "Docker", level: 85 },
      { name: "Jenkins", level: 85 },
      { name: "CI/CD", level: 88 },
      { name: "GitHub", level: 90 },
    ],
  },
  {
    category: "Data & Analytics",
    color: COLORS.gold,
    items: [
      { name: "Power BI", level: 85 },
      { name: "Data Analysis", level: 88 },
      { name: "Machine Learning", level: 80 },
    ],
  },
  {
    category: "Core Computer Science",
    color: COLORS.gold,
    items: [
      { name: "Data Structures & Algorithms", level: 95 },
      { name: "Operating Systems", level: 85 },
      { name: "OOP", level: 90 },
      { name: "Computer Networks", level: 80 },
      { name: "DBMS", level: 88 },
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────
export const PROJECTS = [
  {
    id:          1,
    title:       "PayNova — Django Payment Platform",
    description: "A scalable payment processing platform built with Django, handling transaction processing, settlement modules, and auditability with high throughput architecture.",
    techStack:   ["Django", "PostgreSQL", "Redis", "REST APIs", "Docker"],
    liveLink:    "https://paynova-demo.vercel.app",
    githubLink:  "https://github.com/MadhurGoel8864/paynova",
    image:       null,
    featured:    true,
    category:    "Backend / Full-Stack",
    accentColor: COLORS.gold,
    year:        "2024",
  },
  {
    id:          2,
    title:       "Career Vault — Job Portal",
    description: "A comprehensive job portal built with MERN stack, featuring job posting, filtering, application tracking, and user profiles with real-time notifications.",
    techStack:   ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    liveLink:    "https://career-vault-demo.vercel.app",
    githubLink:  "https://github.com/MadhurGoel8864/career-vault",
    image:       null,
    featured:    true,
    category:    "Full-Stack",
    accentColor: COLORS.gold,
    year:        "2024",
  },
  {
    id:          3,
    title:       "Brain Tumor Detection — ML Project",
    description: "Deep learning model for automated brain tumor detection from MRI scans with 98% accuracy, including image preprocessing and visualization pipeline.",
    techStack:   ["Python", "TensorFlow", "PyTorch", "OpenCV", "Jupyter"],
    liveLink:    "https://braintumor-detection-demo.vercel.app",
    githubLink:  "https://github.com/MadhurGoel8864/brain-tumor-detection",
    image:       null,
    featured:    false,
    category:    "AI / ML",
    accentColor: COLORS.gold,
    year:        "2023",
  },
  {
    id:          4,
    title:       "Settlement Module — FastAPI Microservice",
    description: "High-throughput settlement system designed for async workflows and batch processing with PostgreSQL and Redis, handling payment reconciliation and auditability.",
    techStack:   ["FastAPI", "PostgreSQL", "Redis", "MongoDB", "Docker", "Celery"],
    liveLink:    "",
    githubLink:  "https://github.com/MadhurGoel8864/settlement-module",
    image:       null,
    featured:    false,
    category:    "Backend",
    accentColor: COLORS.gold,
    year:        "2025",
  },
  {
    id:          5,
    title:       "Data Pipeline Optimization",
    description: "Optimized ETL data pipeline achieving 45% latency reduction with Power BI dashboard integration and MongoDB data processing.",
    techStack:   ["Python", "MongoDB", "Power BI", "Azure", "SQL"],
    liveLink:    "",
    githubLink:  "https://github.com/MadhurGoel8864/data-pipeline",
    image:       null,
    featured:    false,
    category:    "Data / Backend",
    accentColor: COLORS.gold,
    year:        "2024",
  },
  {
    id:          6,
    title:       "OCR Model Enhancement",
    description: "Improved Tesseract-based OCR model accuracy by 36% through image preprocessing and advanced techniques for document digitization.",
    techStack:   ["Python", "Tesseract", "OpenCV", "scikit-image"],
    liveLink:    "",
    githubLink:  "https://github.com/MadhurGoel8864/ocr-enhancement",
    image:       null,
    featured:    false,
    category:    "AI / ML",
    accentColor: COLORS.gold,
    year:        "2024",
  },
];

// ── Experience ────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id:   1,
    role: "Software Engineer / Software Engineer Intern",
    company:     "Unthinkable Solutions",
    companyUrl:  "https://unthinkable.ai",
    location:    "Gurgaon, Haryana",
    type:        "Full-time",
    duration:    "Jan 2025 – Present",
    current:     true,
    description: "Building scalable backend systems and AI solutions at an early-stage fintech startup.",
    responsibilities: [
      "Built scalable backend systems using FastAPI with modular service architecture",
      "Designed and implemented settlement module with high throughput and auditability",
      "Implemented async workflows, background tasks, and event-driven systems with Redis and Celery",
      "Architected microservices for payment processing and reconciliation pipelines",
    ],
    techStack: ["FastAPI", "Redis", "PostgreSQL", "MongoDB", "FCM", "Docker"],
    color: COLORS.gold,
  },
  {
    id:   2,
    role: "Data Analyst Intern",
    company:     "Binge & Bash",
    companyUrl:  "https://bingeandbash.com",
    location:    "Hyderabad, Telangana",
    type:        "Internship",
    duration:    "Jun 2024 – Jan 2025",
    current:     false,
    description: "Optimized data pipelines and built BI dashboards for marketing analytics.",
    responsibilities: [
      "Improved data pipeline latency by 45% through query optimization and indexing",
      "Built 10+ Power BI dashboards for campaign tracking and performance analysis",
      "Increased campaign effectiveness by 20% through data-driven insights",
      "Designed ETL processes connecting MongoDB to Azure analytics",
    ],
    techStack: ["Python", "Power BI", "Azure", "MongoDB", "SQL"],
    color: COLORS.gold,
  },
  {
    id:   3,
    role: "AI Intern",
    company:     "Dwayo Technologies",
    companyUrl:  "https://dwayo.io",
    location:    "Bhuj, Gujarat",
    type:        "Internship",
    duration:    "Mar 2024 – May 2024",
    current:     false,
    description: "Improved OCR model accuracy for document digitization using deep learning.",
    responsibilities: [
      "Improved Tesseract OCR model accuracy by 36% through advanced preprocessing techniques",
      "Implemented image enhancement pipeline using OpenCV and scikit-image",
      "Conducted model evaluation and optimization for production deployment",
    ],
    techStack: ["Python", "Tesseract", "OpenCV", "TensorFlow"],
    color: COLORS.gold,
  },
];

// ── Achievements ──────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    id:          1,
    title:       "LeetCode Knight",
    description: "1880+ rating with 915+ DSA problems solved. Maintained consistent solving streak.",
    emoji:       "⚔️",
    link:        "https://leetcode.com/MadhurGoel8864",
    year:        "2024",
    category:    "Competitive Programming",
    color: COLORS.gold,
  },
  {
    id:          2,
    title:       "AWS Certified AI Practitioner",
    description: "AWS Certified AI Practitioner certification demonstrating expertise in AWS ML services and AI applications.",
    emoji:       "☁️",
    link:        "",
    year:        "2024",
    category:    "Certification",
    color: COLORS.gold,
  },
  {
    id:          3,
    title:       "Brain Tumor Detection — 98% Accuracy",
    description: "Published research paper on deep learning-based brain tumor detection achieving 98% accuracy on medical imaging datasets.",
    emoji:       "🧠",
    link:        "https://github.com/MadhurGoel8864/brain-tumor-detection",
    year:        "2023",
    category:    "Research & AI",
    color: COLORS.gold,
  },
  {
    id:          4,
    title:       "Data Pipeline Optimization",
    description: "Reduced data pipeline latency by 45% through query optimization and ETL redesign at Binge & Bash.",
    emoji:       "⚡",
    link:        "",
    year:        "2024",
    category:    "Backend / Data",
    color: COLORS.gold,
  },
  {
    id:          5,
    title:       "OCR Model Improvement",
    description: "Improved Tesseract-based OCR model accuracy by 36% through image preprocessing and deep learning techniques.",
    emoji:       "📄",
    link:        "",
    year:        "2024",
    category:    "AI / ML",
    color: COLORS.gold,
  },
  {
    id:          6,
    title:       "Settlement Module Architecture",
    description: "Designed and implemented high-throughput settlement system handling async workflows and batch reconciliation at Unthinkable Solutions.",
    emoji:       "🏗️",
    link:        "",
    year:        "2025",
    category:    "Backend Architecture",
    color: COLORS.gold,
  },
];

// ── Education ─────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:     "B.Tech Computer Science (AI & ML)",
    school:     "Ajay Kumar Garg Engineering College",
    duration:   "Aug 2021 – May 2025",
    gpa:        "8.1 / 10",
    highlights: ["Specialization in AI & ML", "Strong focus on DSA and algorithms", "Published research on Brain Tumor Detection"],
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
