// ============================================================
//  GLOBAL CONFIGURATION — DevDual Backend Portfolio
//  Edit THIS file to customize every word on the site.
// ============================================================
import { COLORS } from './theme';

export const PERSONAL = {
  name: "Madhur Goel",
  firstName: "Madhur",
  lastName: "Goel",
  title: "Backend Engineer",
  roles: [
    "Backend Engineer",
    "System Architect",
  ],
  tagline: "I design the infrastructure that makes products work — auth systems, real-time sync, and execution pipelines.",
  bio: `Backend engineer focused on real-time system design, API architecture, and distributed state management. I care about how systems behave under concurrency, how components fail, and what breaks first. I design for resilience, observability, and predictable performance at scale.`,
  email: "madhur12a16072@gmail.com",
  phone: "+91 7078564490",
  location: "Gurgaon, Haryana, India",
  availableForWork: true,
  profileImage: "/profile.jpg",
  initials: "MG",
};

export const SOCIAL = {
  github: "https://github.com/MadhurGoel8864",
  linkedin: "https://leetcode.com/u/madhurgoel88/",
  liveProject: "https://devduel.site",
  apiDocs: "https://devduel.site/api/docs",
  resumeLink: "/resume.pdf",
};

// ── Hero Stats ───────────────────────────────────────────────
export const STATS = [
  { value: "1+", label: "Years Engineering Experience" },
  { value: "915+", label: "DSA Problems Solved" },
  { value: "1880+", label: "LeetCode Rating" },
  { value: "1", label: "AWS Certifications" },
];
// ── Capabilities (replaces Skills) ──────────────────────────
export const CAPABILITIES = [
  {
    title: "Real-time event synchronization",
    detail: "WebSocket-based systems for concurrent state — bid events, connection lifecycle, room management — without a message broker.",
    tags: ["WebSockets", "FastAPI", "State Sync"],
  },
  {
    title: "API architecture with separation of concerns",
    detail: "Modular service + DAO/repository pattern. Business logic in services, DB interaction in DAOs. Routes stay thin.",
    tags: ["FastAPI", "DAO Pattern", "SQLAlchemy"],
  },
  {
    title: "Purpose-driven caching strategies",
    detail: "Redis used deliberately — OTP TTL storage, token blacklisting, OAuth state, invite codes, auction state coordination. Not just speed, but correctness.",
    tags: ["Redis", "TTL", "State Management"],
  },
  {
    title: "Authentication & authorization systems",
    detail: "JWT with refresh rotation, OTP verification (Redis-backed TTL), OAuth state management, and role-based route middleware.",
    tags: ["JWT", "OAuth", "RBAC", "OTP"],
  },
  {
    title: "DB schema design under role constraints",
    detail: "Normalized schemas where the same user holds different roles across different teams and contests. Enforced at the service layer.",
    tags: ["PostgreSQL", "SQLAlchemy", "Schema Design"],
  },
  {
    title: "Code execution pipelines",
    detail: "Submission → self-hosted Judge0 on GCP → verdict polling → DB update. Language-agnostic, sandboxed, with partial scoring.",
    tags: ["Judge0", "GCP", "Async Polling"],
  },
  {
    title: "Concurrency and race condition handling",
    detail: "Serializing concurrent credit deductions using SELECT FOR UPDATE. Preventing double-bids in a fixed economy under real-time load.",
    tags: ["Concurrency", "Row Locking", "Transactions"],
  },
  {
    title: "Contest lifecycle state machines",
    detail: "Validated state transitions (DRAFT → PUBLISHED → ONGOING → COMPLETED). Invariants enforced at the service layer, not the DB.",
    tags: ["State Machines", "Lifecycle", "Validation"],
  },
];

// ── DevDual System Overview ──────────────────────────────────
export const DEVDUAL = {
  name: "DevDual",
  tagline: "A competitive programming platform with real-time auctions, team roles, and sandboxed code execution.",
  url: "https://devduel.site",
  apiDocs: "https://devduel.site/api/docs",
  github: "https://github.com/MadhurGoel8864",
  duration: "3-4 months (part-time)",
  status: "Live on GCP",

  problemStatement: [
    "Traditional contests test pure algorithms in isolation, lacking strategic depth.",
    "DevDual introduces <strong>resource constraints</strong> bringing an economic twist.",
    "Transforms coding into a high-stakes game where <strong>risk vs reward</strong> matters."
  ],

  coreMechanic: [
    "<strong>2-person teams</strong> split into a <strong>Bidder vs Coder</strong>.",
    "Bidder competes in a <strong>real-time auction</strong> with a fixed virtual purse.",
    "Wins deplete currency instantly; points rely solely on Coder's success."
  ],

  theStrategy: [
    "Unused currency holds no value—teams must spend strategically.",
    "Coordination between the Bidder's budget and Coder's skill is the key to winning."
  ],

  nonTrivialAspects: [
    "Coordinating real-time bidding state across concurrent clients with no message broker",
    "Enforcing role constraints where the same user holds different roles across multiple teams",
    "Running untrusted code submissions safely via a self-hosted sandbox on GCP",
    "Managing a fixed credit economy with concurrent writes — preventing double-spends under load",
    "Token invalidation without abandoning stateless JWT — solved via Redis blacklist",
  ],

  techStack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "WebSockets", "Judge0", "GCP"],

  stats: [
    { label: "Backend", value: "FastAPI + PostgreSQL", icon: "database" },
    { label: "Real-time", value: "Native WebSockets", highlight: true, icon: "zap" },
    { label: "Execution", value: "Self-hosted Judge0", highlight: true, icon: "code" },
    { label: "Infra", value: "GCP VM", icon: "server" },
    { label: "Performance", value: "< 50ms p99 auction latency", icon: "activity" },
    { label: "Dev time", value: "3–4 months", icon: "clock" },
  ],
};

// ── Architecture Layers ──────────────────────────────────────
export const ARCHITECTURE = [
  {
    name: "API Layer",
    tech: "FastAPI",
    description: "Request routing, input validation via Pydantic, and dependency injection for auth. Rate limiting on auth-sensitive endpoints.",
    points: [
      "Route handlers stay thin — zero business logic",
      "Pydantic schemas enforce request/response contracts",
      "JWT auth via FastAPI Depends() — one decorator per protected route",
      "Per-IP rate limiting on /auth endpoints",
    ],
  },
  {
    name: "WebSocket Layer",
    tech: "Native FastAPI WS",
    description: "Auction rooms managed as in-memory connection pools. Each connected client receives bid events in real-time via broadcast.",
    points: [
      "ConnectionManager: auction_id → list[WebSocket]",
      "Bid events broadcast to all clients in room",
      "JWT authenticated via query param on connect",
      "Reconnect receives state snapshot from Redis before live stream",
    ],
  },
  {
    name: "Service Layer",
    tech: "Python classes",
    description: "All business logic lives here. Services coordinate between DAOs, enforce role constraints, validate state transitions, and interact with Redis.",
    points: [
      "Stateless service classes — injected via dependency",
      "Role and state validation before every mutation",
      "Atomic operations using SQLAlchemy transactions",
      "Redis interactions encapsulated within service methods",
    ],
  },
  {
    name: "DB Layer",
    tech: "PostgreSQL + SQLAlchemy",
    description: "Normalized relational schema. DAO classes abstract all DB interactions — services never write raw SQL or ORM queries directly.",
    points: [
      "DAO pattern: one DAO class per model",
      "SELECT FOR UPDATE in auction credit deductions",
      "Alembic migrations for schema versioning",
      "Indexes on contest_id, team_id, user_id FK columns",
    ],
  },
  {
    name: "Cache Layer",
    tech: "Redis",
    description: "Ephemeral, time-sensitive data that does not belong in the DB. Six distinct use cases — each solving a correctness or operational problem.",
    points: [
      "OTP storage (String, 5-min TTL)",
      "JWT blacklist (Set, TTL = access token expiry)",
      "OAuth state (String, 10-min TTL)",
      "Team invite codes (String, 24-hr TTL)",
      "Auction current state (Hash — bid, bidder_id)",
      "Auction problem queue (List, LPOP for next problem)",
    ],
  },
  {
    name: "Execution Layer",
    tech: "Judge0 on GCP VM",
    description: "Self-hosted Judge0 handles sandboxed code execution. Submissions sent via HTTP, verdicts polled asynchronously in a background task.",
    points: [
      "Multi-language support via Judge0 language IDs",
      "Background task polls every 1s until verdict is final",
      "Verdict + stdout/stderr stored in DB per submission",
      "Score = (passed_tests / total_tests) × problem_max_score",
    ],
  },
];

// ── Engineering Subsystems (A–E) ─────────────────────────────
export const ENGINEERING_SYSTEMS = [
  {
    id: "auth",
    label: "A",
    name: "Authentication System",
    what: "JWT-based auth with refresh token rotation, OTP verification, OAuth (Google), and Redis-backed token blacklisting.",
    challenges: [
      "Stateless JWTs cannot be invalidated on logout — required a Redis blacklist",
      "OTPs must expire without a cleanup job — TTL-based Redis storage eliminates the need for cron",
      "OAuth state parameter must be temporary and tamper-resistant",
    ],
    implementation: [
      "Access token (15-min) + Refresh token (7-day) issued on login/register",
      "Logout adds the access token hash to a Redis Set with TTL matching expiry",
      "Every authenticated request checks the blacklist before proceeding",
      "OTP stored as key=user:otp:{email}, value=hashed_otp, TTL=5 minutes",
      "OAuth state stored in Redis for 10 minutes; validated on callback to prevent CSRF",
    ],
    decision: "Redis blacklist over DB-based token store — revocation checks happen on every request. DB lookup at that frequency adds 5–10ms per request at scale.",
  },
  {
    id: "auction",
    label: "B",
    name: "Real-Time Auction Engine",
    what: "Live bidding where teams compete for problems using credits. Bids broadcast in real-time to all connected clients via WebSocket.",
    challenges: [
      "Two clients bidding simultaneously read the same credit balance before either write commits — both succeed, balance goes negative",
      "Reconnecting clients must receive current state — not re-enter mid-stream and miss events",
      "Auction completion must be atomic: problem assigned, credits deducted, next problem queued in one transaction",
    ],
    implementation: [
      "Bid handler: validate amount → SELECT FOR UPDATE on team credit row → deduct → commit → broadcast",
      "Current state (winning_bid, winner_id, problem_id) stored in Redis Hash for fast reads",
      "On reconnect: server sends Redis snapshot of current state before adding client to live stream",
      "Auction end: mark problem won, deduct credits in DB, LPOP next problem from Redis queue",
    ],
    decision: "PostgreSQL row-level locking over application-level mutex — DB is the source of truth for credits. Optimistic locking + retry was considered but adds complexity to the client.",
  },
  {
    id: "execution",
    label: "C",
    name: "Code Execution Pipeline",
    what: "Submission from Coder → sandboxed Judge0 execution → verdict polling → scoring update.",
    challenges: [
      "Judge0 execution is async — submission returns a token, not an immediate verdict",
      "Partial scoring requires tracking per-test-case results, not just pass/fail",
      "Self-hosted Judge0 on a shared GCP VM introduces latency variability",
    ],
    implementation: [
      "Submission stored in DB with PENDING status on receipt",
      "Background task polls Judge0 every 1s until status exits 'In Queue' or 'Processing'",
      "Verdict + stdout/stderr stored per submission in DB",
      "Score = (passed_test_cases / total_test_cases) × problem_max_score",
      "Leaderboard recalculated on each finalized submission",
    ],
    decision: "Polling over Judge0 webhooks — self-hosted infra has no stable public callback URL. Acceptable at current scale. Webhook + queue would replace this at higher traffic.",
  },
  {
    id: "teams",
    label: "D",
    name: "Team & Role Management",
    what: "Team formation with role-based constraints. One Bidder, one Coder per team. Roles are contest-scoped, not global.",
    challenges: [
      "Same user can be Bidder in Team A and Coder in Team B — roles are per-team, not global properties of the user",
      "Team composition must lock after contest start — no mid-contest role changes",
      "Invite system must expire without a background cleanup job",
    ],
    implementation: [
      "TeamMember(team_id, user_id, role) with UNIQUE constraint on (team_id, user_id)",
      "Invite codes stored in Redis with 24-hr TTL; accepted invite creates TeamMember row",
      "Contest ONGOING transition validates team has both roles filled",
      "Role checked per-action in service layer — not globally in middleware",
    ],
    decision: "Role enforcement in the service layer because roles are resource-scoped. Global middleware cannot resolve context-specific role without additional DB lookups per request.",
  },
  {
    id: "contest",
    label: "E",
    name: "Contest Lifecycle System",
    what: "End-to-end contest management — creation, problem linking, team registration, state transitions, leaderboard computation.",
    challenges: [
      "State transitions must be validated — DRAFT cannot jump to COMPLETED",
      "Leaderboard must remain consistent under concurrent submissions",
      "Organizers of one contest can participate as users in another — permissions are resource-scoped",
    ],
    implementation: [
      "Status enum: DRAFT → PUBLISHED → ONGOING → COMPLETED",
      "Each transition validated in service layer — invalid transitions return 400",
      "Problems linked via ContestProblem join table with explicit ordering",
      "Leaderboard: query submissions grouped by team, summed by score, ordered descending",
      "Organizer permissions scoped to contest ownership FK — checked per-resource",
    ],
    decision: "State machine in the service layer rather than DB triggers — transitions are auditable, testable, and don't create invisible DB-level side effects.",
  },
];

// ── Real-Time Design ─────────────────────────────────────────
export const REALTIME_DESIGN = {
  overview:
    "Native FastAPI WebSockets. No Redis pub/sub, no external broker — direct in-memory connection management. This works for single-instance deployment; horizontal scaling requires shared state.",
  components: [
    {
      name: "ConnectionManager",
      description: "In-memory dict: auction_id → list[WebSocket]. On connect: add to room. On disconnect: remove from room. Bid broadcasts iterate the list.",
    },
    {
      name: "Bid Event Flow",
      description: "Client sends bid via HTTP POST — not WebSocket. Validated + locked in DB → result broadcast to all WS connections in that room.",
    },
    {
      name: "State on Reconnect",
      description: "On WS connect, server sends current auction snapshot from Redis (problem_id, current_bid, winner, time_remaining) before entering live stream.",
    },
    {
      name: "Authentication",
      description: "JWT passed as query param on WS connect. Validated before connection accepted. Invalid token → connection rejected immediately.",
    },
  ],
  concurrency:
    "Bids submitted via HTTP POST. Bid handler acquires a row-level lock on the team's credit balance before deducting. Serializes concurrent bids from the same team without an application-level mutex.",
  limitations: [
    "Single-server — ConnectionManager is in-memory, not distributed across instances",
    "No WebSocket heartbeat — stale connections not proactively cleaned up",
    "Bid submission is HTTP, not WebSocket — one extra round-trip per bid",
  ],
};

// ── Caching Strategy ─────────────────────────────────────────
export const CACHING = {
  overview:
    "Redis is used for six distinct purposes — none of them are 'just caching for speed'. Each use case solves a correctness or operational problem that a relational DB is wrong for.",
  useCases: [
    {
      key: "OTP Storage",
      structure: "String — key: user:otp:{email}",
      ttl: "5 minutes",
      why: "OTPs are ephemeral. DB storage requires a cleanup cron. Redis TTL handles expiry natively with zero operational overhead.",
    },
    {
      key: "JWT Blacklist",
      structure: "Set — value: token hash",
      ttl: "Matches access token expiry (15 min)",
      why: "Stateless JWT cannot be invalidated on logout. Redis provides a revocation store checked on every authenticated request.",
    },
    {
      key: "OAuth State",
      structure: "String — key: oauth:state:{id}",
      ttl: "10 minutes",
      why: "OAuth state prevents CSRF. Must be temporary and not persist to DB. TTL expiry handles cleanup automatically.",
    },
    {
      key: "Team Invite Codes",
      structure: "String — key: invite:{code}",
      ttl: "24 hours",
      why: "Invites should expire without a cleanup job. Redis TTL eliminates the need for a cron or lazy expiry check on every invite lookup.",
    },
    {
      key: "Auction Current State",
      structure: "Hash — key: auction:{id}:state",
      ttl: "Auction duration",
      why: "Fast reads for WebSocket broadcast and reconnect sync. DB query per broadcast would spike under active auction load.",
    },
    {
      key: "Auction Problem Queue",
      structure: "List — key: auction:{id}:problems",
      ttl: "Auction duration",
      why: "Ordered problem queue for sequential auction. LPOP atomically dequeues the next problem without a DB read + delete.",
    },
  ],
};

// ── Challenges & Tradeoffs ───────────────────────────────────
export const CHALLENGES = [
  {
    id: "ws-sync",
    title: "WebSocket state sync under concurrent bids",
    problem:
      "Two clients submit bids within milliseconds. Both read the same credit balance before either write commits. Both pass the credit check. Both succeed — team ends with a negative balance.",
    solution:
      "SELECT FOR UPDATE on the team credit row inside the bid transaction. Holds a row-level lock until commit, serializing concurrent writes to the same team's balance.",
    tradeoff:
      "Lock contention adds latency if many bids arrive simultaneously for the same team. Acceptable under current design — Bidder role is singular per team, so maximum one concurrent bidder per credit row.",
    improvement:
      "Optimistic locking with a version column + retry on conflict. Reduces lock duration. Worth implementing if bid throughput increases.",
  },
  {
    id: "db-schema",
    title: "DB schema for cross-contest role constraints",
    problem:
      "A user can be Bidder in one team and Coder in another. Roles are not global. Schema must support this without duplication or ambiguity.",
    solution:
      "TeamMember(team_id, user_id, role) with UNIQUE(team_id, user_id). Roles are contest-scoped via team's contest FK. Role lookup: user → TeamMember → Team → Contest.",
    tradeoff:
      "Every role check requires a join chain. More queries, but correctly normalized. Denormalizing role onto the User model would break multi-contest semantics entirely.",
    improvement:
      "DB-level enforcement via partial indexes — e.g. UNIQUE on (team_id, role) WHERE role='BIDDER' — to enforce one Bidder per team at the schema level, not just service code.",
  },
  {
    id: "rbac",
    title: "RBAC with overlapping organizational identities",
    problem:
      "An Organizer in Contest A is also a participant in Contest B. The same user holds different permissions depending on the resource being accessed. Global middleware cannot resolve this.",
    solution:
      "No global role middleware. All checks are resource-scoped in the service layer. Before any mutation: does this user own or belong to this specific resource?",
    tradeoff:
      "More code. Every service method that mutates must include its own permission check — no single enforcement point. Harder to audit comprehensively.",
    improvement:
      "Structured permission objects per resource type with a unified check_permission(user, resource, action) interface. Centralizes logic without reverting to context-blind global middleware.",
  },
];

// ── API Design ───────────────────────────────────────────────
export const API_DESIGN = {
  docsUrl: "https://devduel.site/api/docs",
  overview: "RESTful API built with FastAPI. OpenAPI docs auto-generated and hosted. JWT Bearer token required on all protected routes.",
  modules: [
    { path: "/api/auth", description: "Register, login, logout, OTP verify, OAuth (Google), token refresh" },
    { path: "/api/users", description: "Profile management, user search" },
    { path: "/api/teams", description: "Create team, send invite, accept invite, list members" },
    { path: "/api/contests", description: "Create, publish, start, complete; team registration; problem linking" },
    { path: "/api/problems", description: "Create problems, manage test cases, link to contests" },
    { path: "/api/auctions", description: "Start auction, submit bid, advance problem, WebSocket endpoint" },
    { path: "/api/submissions", description: "Submit code, poll verdict, view per-contest leaderboard" },
  ],
  decisions: [
    "Per-IP rate limiting on /auth — prevents OTP enumeration and brute-force login",
    "WebSocket auth via JWT query param — browser WS API has no custom header support",
    "Consistent error schema: {error_code, message, details} — no raw exception propagation to clients",
    "Pagination on all list endpoints — no unbounded queries to the DB",
    "Bids submitted via HTTP POST, not WebSocket — simpler server-side validation and rate limiting",
  ],
};

// ── What I Would Do Next ─────────────────────────────────────
export const WHAT_NEXT = [
  {
    priority: "High",
    item: "CI/CD pipeline",
    detail: "GitHub Actions → Docker build → push to GCR → deploy to GCP VM. Currently manual SSH deploy. Any regression requires manual rollback.",
  },
  {
    priority: "High",
    item: "Observability stack",
    detail: "Prometheus + Grafana for WebSocket connection count, bid latency, Judge0 queue depth, DB query p99. Currently no metrics.",
  },
  {
    priority: "Medium",
    item: "Redis pub/sub for WebSocket scaling",
    detail: "Replace in-memory ConnectionManager with Redis pub/sub. Enables horizontal scaling — multiple app instances share WebSocket event state.",
  },
  {
    priority: "Medium",
    item: "Move bid submission to WebSocket message",
    detail: "Currently bids go HTTP POST → DB → WS broadcast. Eliminating the HTTP round-trip simplifies client logic and reduces latency.",
  },
  {
    priority: "Medium",
    item: "Integration test suite",
    detail: "Pytest tests covering full auction flow, concurrent bid scenario, submission pipeline, and auth token lifecycle. Currently no integration coverage.",
  },
  {
    priority: "Low",
    item: "Judge0 webhook on verdict",
    detail: "Replace polling loop with a callback webhook. Requires a stable public URL — the current GCP VM setup makes this unreliable for now.",
  },
];

// ── Education ────────────────────────────────────────────────
export const EDUCATION = [
  {
    school: "Ajay Kumar Garg Engineering College (AKGEC)",
    affiliation: "Dr. A.P.J. Abdul Kalam Technical University",
    degree: "B.Tech — Computer Science Engineering (AI & ML)",
    duration: "2021 – 2025",
    gpa: "8.4 CGPA",
    location: "Ghaziabad, Uttar Pradesh",
    highlights: ["AI & ML Specialization", "Backend Development", "Competitive Programming"],
  },
  {
    school: "Delhi Public School",
    affiliation: "C.B.S.E",
    degree: "Senior Secondary (Class XII)",
    duration: "2019 – 2021",
    gpa: "93%",
    location: "Uttar Pradesh",
    highlights: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
];

// ── Professional Experience ──────────────────────────────────
export const EXPERIENCE = [
  {
    id: "unthinkable",
    role: "Software Engineer",
    company: "Unthinkable Solutions",
    companyUrl: "https://www.unthinkablesolutions.com",
    type: "Full-time",
    duration: "Jan 2025 – Present",
    location: "Gurgaon (Remote)",
    current: true,
    description: "Building backend APIs and internal tools for fintech clients using FastAPI. Working across authentication, reporting, and data pipeline layers.",
    responsibilities: [
      "Designed and shipped REST APIs with FastAPI for fintech client applications",
      "Integrated OTP authentication and token management into existing auth flows",
      "Optimized slow DB queries and reduced p99 response times on reporting endpoints",
      "Collaborated on API contract definitions and internal documentation standards",
    ],
    techStack: ["FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "Python"],
  },
  {
    id: "dwayo",
    role: "AI Research Intern",
    company: "Dwayo",
    type: "Internship",
    duration: "Jun 2024 – Aug 2024",
    location: "Remote",
    current: false,
    description: "Worked on improving OCR accuracy for document processing pipelines. Applied ML post-processing techniques to reduce extraction errors.",
    responsibilities: [
      "Improved OCR accuracy by ~36% using ensemble error-correction on model outputs",
      "Built preprocessing pipeline for scanned document normalization",
      "Benchmarked multiple OCR engines and evaluated tradeoffs across document types",
    ],
    techStack: ["Python", "OpenCV", "Tesseract", "scikit-learn"],
  },
  {
    id: "binge",
    role: "Data Analyst Intern",
    company: "Binge & Bash",
    type: "Internship",
    duration: "Jan 2024 – Mar 2024",
    location: "Remote",
    current: false,
    description: "Worked on data pipeline optimization and reporting automation for a food-tech startup.",
    responsibilities: [
      "Reduced data pipeline processing time by ~45% through query restructuring and batching",
      "Automated weekly business reports using Python, replacing manual Excel workflows",
      "Built dashboards for order and revenue tracking",
    ],
    techStack: ["Python", "Pandas", "SQL", "Tableau"],
  },
];

// ── Achievements ─────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    id: "leetcode",
    emoji: "⚔️",
    category: "Competitive Programming",
    title: "LeetCode Knight",
    description: "Reached Knight badge with a contest rating of 1880+. Solved 915+ problems across data structures, algorithms, and system design categories.",
    year: "2024",
    link: "https://leetcode.com/MadhurGoel_",
    color: "#F0A30A",
  },
  {
    id: "bidbuzz-winner",
    emoji: "🏆",
    category: "Contest Winner",
    title: "Winner of BidBuzz",
    description: "My team won the BidBuzz contest hosted in our college. I really liked the idea, which became the inspiration for creating DevDual.",
    year: "2024",
    link: null,
    color: "#1DA1F2",
  },
  {
    id: "brain-tumor",
    emoji: "🧠",
    category: "Research Publication",
    title: "Brain Tumor Detection — 98% Accuracy",
    description: "Co-authored a published research paper on automated brain tumor classification using CNNs. Achieved 98.2% accuracy on the BraTS dataset.",
    year: "2023",
    link: null,
    color: "#E74C3C",
  },
  {
    id: "aws",
    emoji: "☁️",
    category: "Certification",
    title: "AWS Cloud Practitioner",
    description: "Certified in AWS Cloud fundamentals — compute, storage, networking, IAM, and core service architecture.",
    year: "2023",
    link: null,
    color: "#818cf8",
  },
  {
    id: "devdual-launch",
    emoji: "🚀",
    category: "Project Milestone",
    title: "Shipped DevDual — Live on GCP",
    description: "Designed and built a full-stack competitive platform solo from scratch — backend, real-time infra, and self-hosted execution on GCP in 3–4 months.",
    year: "2024",
    link: "https://devduel.site",
    color: "#C8A951",
  },
  {
    id: "dsa-mentor",
    emoji: "👨‍💻",
    category: "Community",
    title: "DSA Mentor — 100+ Students",
    description: "Mentored college peers and juniors in data structures and algorithms. Conducted weekly problem sessions and mock interviews.",
    year: "2023",
    color: "#27AE60",
    link: null,
  },
];

// ── Navigation ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "DevDual", href: "system-overview" },
  { label: "Capabilities", href: "what-i-build" },
  { label: "Architecture", href: "architecture" },
  { label: "Engineering", href: "engineering-systems" },
  { label: "Achievements", href: "achievements" },
];
