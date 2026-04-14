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
  linkedin: "https://www.linkedin.com/in/madhur-goel-mg",
  leetcode: "https://leetcode.com/madhurgoel88/",
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
    detail: "Validated state transitions (DRAFT → REGISTRATION_OPEN → ACTIVE → ENDED). Invariants enforced at the service layer, not the DB. Leaderboard ties broken by remaining purse credits.",
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
    { label: "Real-time", value: "Native WebSockets", icon: "zap" },
    { label: "Execution", value: "Self-hosted Judge0", icon: "code" },
    { label: "Infra", value: "GCP VM", icon: "server" },
    { label: "Performance", value: "< 50ms p99 auction latency", icon: "activity" },
    { label: "Dev time", value: "3-4 months", icon: "clock" },
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
      "Supports Python, JavaScript, TypeScript, C++, C, Java, Go, Rust via Judge0 language IDs",
      "Background task polls every 1s until verdict is final",
      "Verdict + stdout/stderr stored in DB per submission",
      "Score = problem points on ACCEPTED verdict; 0 otherwise (no partial credit)",
    ],
  },
];

// ── Engineering Subsystems (A-E) ─────────────────────────────
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
    decision: "Redis blacklist over DB-based token store — revocation checks happen on every request. DB lookup at that frequency adds 5-10ms per request at scale.",
  },
  {
    id: "auction",
    label: "B",
    name: "Real-Time Auction Engine",
    what: "Live bidding where teams compete for problems using credits. Auctions flow through PENDING → ACTIVE → FINISHED states; bids broadcast in real-time to all connected clients via WebSocket. Credits deduct only from the winning team, and only when the auction closes.",
    challenges: [
      "Simultaneous bids from different teams near auction close — only one can legitimately hold 'current highest' at timer expiry",
      "Bids must be validated against the team's purse at submit time, but deduction must wait until the team actually wins",
      "Reconnecting clients must receive current state — not re-enter mid-stream and miss events",
      "Auction completion must be atomic: winner locked, credits deducted, problem assigned (status ASSIGNED), next auction queued",
    ],
    implementation: [
      "Bid handler: validate bid ≥ current_highest + 10 AND bid ≤ team_purse → SELECT FOR UPDATE on the auction state row → record bid → commit → broadcast",
      "Current state (current_highest_bid, leading_team_id, problem_id, time_remaining) stored in Redis Hash for fast WS reads",
      "On reconnect: server sends Redis snapshot of current state before adding client to live stream",
      "Auction close: lock auction row, debit winning team's purse by winning bid, set ProblemAssignment status=ASSIGNED, LPOP next problem from Redis queue",
    ],
    decision: "Row-level lock on the auction row (not the team credit row) — the actual contention point is 'who is currently highest', not the purse. Deferring deduction until close matches the product rule (no refunds, but also no deduction on losing bids) and avoids needless lock contention on the purse during a live auction.",
  },
  {
    id: "execution",
    label: "C",
    name: "Code Execution Pipeline",
    what: "Submission from Coder → sandboxed Judge0 execution → verdict polling → scoring update. Problem assignments flow ASSIGNED → SOLVED (on first ACCEPTED verdict) or ASSIGNED → FAILED (contest ends without one, credits already spent).",
    challenges: [
      "Judge0 execution is async — submission returns a token, not an immediate verdict",
      "Multiple submissions per problem are allowed until ACCEPTED or contest ends; only ACCEPTED awards points",
      "Self-hosted Judge0 on a shared GCP VM introduces latency variability",
    ],
    implementation: [
      "Submission stored in DB with PENDING status on receipt",
      "Background task polls Judge0 every 1s until status exits 'In Queue' or 'Processing'",
      "Verdict + stdout/stderr stored per submission in DB",
      "Scoring is binary: ACCEPTED flips the assignment to SOLVED and awards the problem's full point value; any other verdict awards 0",
      "Leaderboard recalculated on each finalized submission; ranked by points, ties broken by remaining purse credits",
    ],
    decision: "Polling over Judge0 webhooks — self-hosted infra has no stable public callback URL. Acceptable at current scale. Webhook + queue would replace this at higher traffic.",
  },
  {
    id: "teams",
    label: "D",
    name: "Team & Role Management",
    what: "2-person teams with strict role constraints — exactly one BIDDING and one CODING per team. Roles are team-scoped, not global: a user can hold BIDDING in one team and CODING in another. Team creator is auto-assigned BIDDING (captain). Roles can be swapped before a contest starts but lock once it goes ACTIVE.",
    challenges: [
      "Same user may hold different roles across different teams — roles live on TeamMember, not on User",
      "Team composition must lock after contest start — no mid-contest role changes",
      "Invite system must expire without a background cleanup job",
    ],
    implementation: [
      "TeamMember(team_id, user_id, role) with UNIQUE constraint on (team_id, user_id); max 2 rows per team",
      "Invite codes stored in Redis with 24-hr TTL; accepted invite creates TeamMember row",
      "Contest ACTIVE transition validates every registered team has both BIDDING and CODING roles filled",
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
      "State transitions must be validated — DRAFT cannot jump to ENDED",
      "Leaderboard must remain consistent under concurrent submissions and match the tiebreaker rule",
      "Organizers of one contest can participate as users in another — permissions are resource-scoped",
    ],
    implementation: [
      "Status enum: DRAFT → REGISTRATION_OPEN → ACTIVE → ENDED",
      "Each transition validated in service layer — invalid transitions return 400",
      "On ACTIVE: every registered team seeded with a 1000-credit purse",
      "Problems linked via ContestProblem join table with per-contest overrides for points, base price, and display order",
      "Leaderboard: sum points from ACCEPTED submissions per team, ordered by points desc, ties broken by remaining purse credits",
      "On ENDED: any assignment still ASSIGNED flips to FAILED — credits already spent, no points awarded",
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
      structure: "Hash — key: auction:{id}:state, fields: problem_id, current_highest_bid, leading_team_id, time_remaining",
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
    title: "Consistent 'current highest bid' under concurrent bidders",
    problem:
      "Near auction close, Bidders from different teams submit bids within milliseconds. Each reads the current highest bid, validates their bid beats it by 10, and writes. Without serialization, two bids could both be accepted as 'highest' — the timer then sees an inconsistent winner, and the broadcast order contradicts the DB truth.",
    solution:
      "SELECT FOR UPDATE on the auction state row inside the bid transaction. Holds a row-level lock until commit, so each bid re-reads the current highest under the lock, validates the +10 increment, and commits before the next bid can enter. Credit deduction is deferred to auction close — the lock protects ordering, not purse balance.",
    tradeoff:
      "Lock contention adds latency when bids cluster in the final seconds of an auction. Acceptable at current scale — one auction at a time, bounded by the number of registered teams (single-digit Bidders per auction in practice).",
    improvement:
      "Optimistic locking with a bid_sequence version column + retry on conflict. Shortens lock duration and lets the server reject stale bids with a clear client-side error. Worth implementing if concurrent-bidder count grows.",
  },
  {
    id: "db-schema",
    title: "DB schema for per-team role constraints",
    problem:
      "A user can hold BIDDING in one team and CODING in another. Roles are team-scoped, not global. Schema must support this without duplication and without letting a team end up with two BIDDINGs or two CODINGs.",
    solution:
      "TeamMember(team_id, user_id, role) with UNIQUE(team_id, user_id). Roles live on the membership row, not the User. Role lookup: user → TeamMember(team_id) → role. Each team is expected to have exactly one BIDDING and one CODING row.",
    tradeoff:
      "Every role check requires a membership lookup. More queries, but correctly normalized. Denormalizing role onto the User model would break multi-team semantics entirely.",
    improvement:
      "DB-level enforcement via partial unique indexes — UNIQUE on (team_id, role) WHERE role='BIDDING' and a matching one for 'CODING' — to enforce one of each per team at the schema level, not just service code.",
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
    duration: "2021 - 2025",
    gpa: "8.4 CGPA",
    location: "Ghaziabad, Uttar Pradesh",
    highlights: ["AI & ML Specialization", "Backend Development", "Competitive Programming"],
  },
  {
    school: "Delhi Public School",
    affiliation: "C.B.S.E",
    degree: "Senior Secondary (Class XII)",
    duration: "2019 - 2021",
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
    duration: "Jan 2025 - Present",
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
    duration: "Jun 2024 - Aug 2024",
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
    duration: "Jan 2024 - Mar 2024",
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
    link: "https://leetcode.com/madhurgoel88/",
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
    description: "Designed and built a full-stack competitive platform solo from scratch — backend, real-time infra, and self-hosted execution on GCP in 3-4 months.",
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
