# DevDual — Project Requirements Document

**Version:** 1.1  
**Date:** April 6, 2026  
**Product:** DevDual — Competitive Programming Platform

---

## 1. Product Overview

DevDual is a competitive programming platform where **two-person teams** compete in live contests. Each contest features a unique **auction-based problem assignment** system: one team member (the **Bidder**) participates in real-time auctions to acquire problems using a fixed currency purse of **1000 credits**, while the other team member (the **Coder**) solves the acquired problems. Only successfully solved problems earn points — currency spent on unsolved problems is permanently lost.

This forced specialization (one bids, one codes) creates a strategic layer on top of traditional competitive programming. Teams must decide which problems are worth bidding on given their budget constraints — the tension between "spend currency on valuable problems" vs "save currency for later" is the core design pillar.

---

## 2. User Roles

### 2.1 Regular User (Participant)
- Can create and manage teams
- Can register teams for contests
- Participates as either a **Bidder** or **Coder** within a team
- Can view leaderboards and contest results

### 2.2 Organizer
- Has all Regular User capabilities
- Can create and configure contests
- Can manage the problem library (create problems, upload test cases)
- Can control contest lifecycle (open registration, start contest, end contest)
- Can run and manage live auctions during contests
- Has access to an Organizer Dashboard

### 2.3 Admin (Future)
- Full system-wide access
- Can manage organizer permissions

---

## 3. User Registration & Authentication

### 3.1 Email Registration
- User provides: Full Name, Email Address, Password
- **Password Requirements:**
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 digit
  - At least 1 special character
- Real-time password strength feedback is shown during registration
- After registration, user is redirected to email verification

### 3.2 Email Verification (OTP)
- A 6-digit OTP code is sent to the registered email
- User enters the OTP to verify their account
- "Resend Code" option is available
- Users cannot log in until email is verified

### 3.3 Login
- User logs in with Email and Password
- Password field has a show/hide toggle
- If the account is not verified, user is redirected to OTP verification
- On successful login, user is taken to the Dashboard

### 3.4 Google OAuth
- Users can register or log in using their Google account
- "Continue with Google" button is available on the login page
- Google authentication handles account creation automatically

### 3.5 Password Recovery
- **Forgot Password:** User enters their email to receive a password reset link
- **Reset Password:** User clicks the email link and sets a new password (same strength requirements as registration)

### 3.6 Session Management
- Users remain logged in across browser sessions
- Sessions are automatically refreshed when they expire
- Users can manually log out from the Profile page or sidebar

---

## 4. Dashboard

### 4.1 Home Screen
After logging in, users see a personalized dashboard with:

- **Greeting:** Time-based greeting (Good morning/afternoon/evening) with the user's name
- **User Info:** Avatar, email, role badge (User/Organizer)
- **Quick Action Cards:**
  - **Contest Arena** — Navigate to browse and join contests
  - **My Teams** — Navigate to view and manage teams
  - **Create Team** — Navigate to create a new team
  - **Manage Contests** — Navigate to organizer panel *(only visible to Organizers)*

---

## 5. Team Management

### 5.1 Create a Team
- User provides a **Team Name** (max 100 characters)
- Character count is displayed in real-time
- After creation, user is redirected to the Team Details page
- The creator is **automatically added as the BIDDING role member** (captain)

### 5.2 My Teams List
- Displays all teams the user belongs to in a table format
- **Columns:** Team Name, Members Count, Created Date
- Pagination (10 teams per page)
- Clicking a team navigates to its detail page
- "Create Team" button for quick access
- Empty state shown when user has no teams

### 5.3 Team Details & Management
- **Team Info:**
  - Team name and creation date
  - Founder information
  - **Readiness Status:**
    - "Contest Ready" (green) — Team has 2 members with both required roles assigned
    - "Not Ready" (red) — Team is missing members or role assignments, with specific missing roles listed

- **Squad Roster:**
  - Displays all members with their avatar, name, email, and assigned role (CODING or BIDDING)
  - Current user is labeled "You"
  - Team creator is labeled "Captain"
  - Clicking a member opens a profile modal with their details
  - Members can be removed by the **team captain (creator)**

- **Invite Members** *(if fewer than 2 members):*
  - Enter an email address
  - Select the role to assign: **CODING** or **BIDDING**
  - Send invite — recipient receives an email invitation
  - Once 2 members are present, the invite section is replaced with "Squad Full" message

### 5.4 Role Swapping
- Team members can **swap their roles** (BIDDING ↔ CODING) before a contest starts
- Role swaps are only permitted when the team is **not currently in an active contest**
- Both members must be present for the swap to occur
- After a swap, the readiness status updates automatically

### 5.5 Team Invitations
- Invitations are sent via email with a unique invite link
- Recipients can accept invitations even without an existing account (they register first, then the invite is applied)
- Invite link format: `/teams/invite?token=xyz`

### 5.6 Team Constraints
- Maximum team size: **2 members**
- Each team must have exactly one **BIDDING** role and one **CODING** role to be "Contest Ready"
- A team must be Contest Ready to register for contests

---

## 6. Contests

### 6.1 Contest Browsing
Users can browse contests through three filter tabs:

- **Registered** — Contests the user's team has registered for
- **Active** — Currently running contests
- **All** — All contests in the system

Each contest entry shows:
- Contest name and description
- Status badge (Registration Open / Active / Ended)
- Number of registered teams
- Start and end times
- Pagination (10 per page)

### 6.2 Contest Detail Page
Displays full contest information:

- **Contest Name and Description** (supports rich text/markdown, expandable if long)
- **Schedule:** Start time and end time
- **Status:** Current contest state
- **DevDuel Mechanics Explanation:**
  1. The Auction Room — Bidder uses a fixed 1000-credit purse to bid on problems
  2. The Coding Phase — Coder solves won problems; only accepted solutions earn points
  3. No Refunds — Credits spent on problems the Coder cannot solve are permanently lost
- **Registered Squads:** Expandable list of all registered team names with count

### 6.3 Contest Registration
- Available when contest status is **Registration Open**
- User clicks "Enter Now" → selects one of their Contest Ready teams from a modal → confirms registration
- Once registered, the button shows "Already Registered" (disabled)
- Only Contest Ready teams can register

### 6.4 Contest Lifecycle (States)

| State | Description |
|-------|-------------|
| **DRAFT** | Contest created but not visible to participants |
| **REGISTRATION_OPEN** | Teams can register; contest details are public |
| **ACTIVE** | Contest is live; auctions and coding are in progress |
| **ENDED** | Contest is finished; final leaderboard is displayed |

### 6.5 Contest Participation (Active State)
When a contest is active, participants see role-specific actions:

- **Bidder:** "Enter Auction Room" button → navigates to live auction arena
- **Coder:** "Go to Workbench" button → navigates to problem-solving workspace
- **All:** "Watch Auction" button (secondary) and "View Leaderboard" button

### 6.6 Contest Leaderboard
- Real-time scoring display accessible during and after contests
- **Columns:** Rank, Squad Name, Points, Remaining Currency
- Teams with the same points are ranked by **remaining currency** (higher is better)
- Top 3 teams are visually highlighted (gold, silver, bronze styling)
- Auto-refreshes every 30 seconds
- "Live Updates" indicator with pulsing dot
- Empty state: "No scores recorded yet"

---

## 7. Auction System (Real-Time Bidding)

### 7.1 Overview
The auction is the core competitive mechanic of DevDuel. During an active contest, problems are auctioned one at a time to registered teams. The Bidder from each team competes in real-time to win problems for their Coder to solve.

### 7.2 Auction States

| State | Description |
|-------|-------------|
| **PENDING** | Problem is queued for auction but the auction has not started yet |
| **ACTIVE** | Auction is currently live; bids are being accepted |
| **FINISHED** | Auction has ended; winner has been determined |

### 7.3 Auction Arena (Bidder View)
When an auction is active, the Bidder sees:

- **Problem Display:**
  - Countdown timer (turns red when < 10 seconds remain)
  - Problem title, difficulty badge, and points value
  - Time and memory limits
  - Full problem description (scrollable)
  - Base price and current highest bid

- **Bidding Controls:**
  - Bid amount input field
  - Quick increment buttons: +10, +50, +100
  - Minimum bid requirement displayed (current bid + 10)
  - Current purse balance shown
  - "PLACE BID" button
  - Bid is disabled if the team has insufficient credits

- **Team Purse Widget:**
  - Displays remaining credits (out of 1000 starting credits) prominently
  - Updates in real-time as bids are placed by anyone
  - Strategic reminder: "Use your credits strategically"

- **Recent Activity:**
  - Shows the current highest bidder and their bid amount
  - Highlights if your team is the current leader

### 7.4 Auction Arena (Coder View / Spectator Mode)
Coders see the same problem display and live bid updates but **cannot place bids**. A "Spectator Mode" label is shown with the message: "Wait for Bidder to win problem!"

### 7.5 Bidding Rules
- Each bid must be at least **10 credits higher** than the current highest bid
- The first bid on a problem must meet or exceed the **base price**
- Bids cannot exceed the team's remaining purse
- Once placed, bids cannot be retracted
- Currency is deducted from the **winning team's purse** only when the auction is won (not on each bid)
- The team with the highest bid when the timer expires wins the problem
- If two bids are submitted simultaneously, only one is accepted (race conditions are handled server-side)

### 7.6 Auction Result
When an auction ends:
- A result overlay is displayed showing:
  - Winning team name
  - Winning bid amount
  - Special notification if your team won
- A "Continue" button dismisses the result
- The won problem is automatically added to the winning Coder's workbench

### 7.7 No Active Auction State
Between auctions, all participants see:
- "No Active Auction" message
- "Waiting for organizer to start next auction..."

### 7.8 Real-Time Updates
- All auction events (new bids, auction start/end, purse updates) are delivered instantly via WebSocket
- No page refresh required
- Connection is maintained for the duration of the contest

---

## 8. Coding & Problem Solving

### 8.1 Coder's Workbench
After the Bidder wins problems, they appear in the Coder's Workbench:

- **Problem Queue:** List of all problems won by the team
  - Each entry shows: Problem title, difficulty, description preview, points value, and bid amount paid for it
  - Clicking a problem opens the code editor
- **Real-Time Updates:** New problems appear automatically as the Bidder wins them during the auction
- **Empty State:** "No Problems Assigned Yet — Your Bidder is currently in the Auction Room..."

### 8.2 Code Editor (Problem Solver)
A full-featured coding environment for solving problems:

- **Supported Languages:** Python, JavaScript, TypeScript, C++, C, Java, Go, Rust
- **Editor Features:**
  - Syntax highlighting
  - Language selector dropdown
  - Starter code template per language
  - Auto-save drafts to browser storage
  - Language switching preserves custom code

- **Problem Description Panel:**
  - Problem title, difficulty badge, and points value
  - Full problem description (markdown support, scrollable)
  - Time limit and memory limit displayed
  - Collapsible to maximize editor space

- **Submission:**
  - "Submit Solution" button
  - Loading indicator during evaluation
  - Automatic result polling until verdict is final

- **Results Panel (Tabs):**
  - **Result Tab:** Shows the latest submission verdict with details
  - **History Tab:** Shows all previous submissions with timestamp, verdict, and resource usage

### 8.3 Submission Verdicts

| Verdict | Meaning |
|---------|---------|
| **ACCEPTED** | Solution is correct — points are awarded |
| **WRONG_ANSWER** | Output doesn't match expected output |
| **TIME_LIMIT_EXCEEDED** | Solution ran too slowly |
| **RUNTIME_ERROR** | Solution crashed during execution |
| **COMPILATION_ERROR** | Code failed to compile |
| **MEMORY_LIMIT_EXCEEDED** | Solution used too much memory |
| **QUEUED / PENDING** | Submission is being evaluated |
| **INTERNAL_ERROR** | System error during evaluation |

### 8.4 Problem Assignment Statuses

After a team wins a problem at auction, that problem goes through the following lifecycle:

| Status | Meaning |
|--------|---------|
| **ASSIGNED** | Problem won at auction; Coder has not yet submitted an accepted solution |
| **SOLVED** | Coder submitted an accepted solution; points have been awarded |
| **FAILED** | Contest ended without the Coder submitting an accepted solution; currency spent is lost |

### 8.5 Scoring
- Points are only awarded for **ACCEPTED** submissions (problem status → SOLVED)
- Each problem has a fixed point value set by the organizer
- Teams earn points equal to the problem's point value upon acceptance
- Multiple submissions are allowed per problem until accepted or the contest ends
- Problems that remain ASSIGNED at contest end transition to FAILED — no points, currency already spent

---

## 9. Organizer Features

### 9.1 Organizer Dashboard
A dedicated admin panel for organizers with two main sections:

- **Manage Contests:** List of all contests created by the organizer, with options to edit, delete, and manage problems
- **Problem Library:** Browse, create, and manage the pool of available problems

**Sidebar Stats:**
- Total contests managed
- Total problems in the library

### 9.2 Create a Contest
Organizers fill out:
- **Contest Name** (required)
- **Description** (supports markdown)
- **Start Date & Time** (calendar + time picker)
- **End Date & Time** (must be after start time)

### 9.3 Contest Lifecycle Management
From the Contest Detail page, organizers have a control panel with status-dependent actions:

| Current Status | Available Actions |
|----------------|-------------------|
| **DRAFT** | "Open Registration" — makes the contest visible and registerable |
| **REGISTRATION_OPEN** | "Start Contest" — activates the contest and enables auctions |
| **ACTIVE** | "Manage Problems", "Auction Control Room", "Quick Start Auction", "End Contest" |
| **ENDED** | View final results only; no further actions available |

### 9.4 Problem Library
DevDuel maintains two sources of problems:

- **Built-in Problems:** Platform-curated problems that organizers can import directly into their contests
- **Custom Problems:** Problems created from scratch by the organizer for exclusive use in their contests

Organizers can:
- Browse the built-in problem library and add problems to a contest
- Create new custom problems with title, description, difficulty, points value, base price, time limit, and memory limit
- Upload test cases for custom problems
- Set problem display order within a contest
- Override difficulty, points value, and base price per contest (without changing the original problem)
- Remove problems from a contest (before it goes ACTIVE)

### 9.5 Auction Control Room
A dedicated management interface for running auctions during an active contest:

- View list of contest problems and their auction status (PENDING / ACTIVE / FINISHED)
- Select a PENDING problem to start an auction
- Set auction duration before starting
- Monitor the live auction in real-time (current bids, highest bidder, time remaining)
- Manually end an active auction before the timer expires
- View auction history with winner and winning bid for all FINISHED auctions
- See which team each problem was assigned to

---

## 10. User Profile

### 10.1 Profile View
Users can view their profile with:
- Avatar (auto-generated from initials)
- Full name, username, and email
- Account metadata (member since date, email verification status, auth provider)
- Logout button

### 10.2 Profile Editing
Users can edit:
- **Full Name:** 2–60 characters, letters/spaces/hyphens/apostrophes only
- **Username:** 3–20 characters, lowercase letters/numbers/underscores, no leading/trailing/consecutive underscores

Real-time validation feedback is provided for both fields. Duplicate username detection is handled on save.

### 10.3 Profile Tabs
- **Profile** — Personal details and edit option
- **Teams** — List of teams the user belongs to, with quick navigation to team details
- **Contests** — List of contests the user has participated in, with scores achieved

---

## 11. Landing Page (Public)

The public-facing marketing page for unauthenticated visitors includes:

1. **Navigation Bar:** Logo, Login link, "Get Started" button
2. **Hero Section:** Tagline "Where Strategy Meets Code" with explanation of the bid+solve mechanic
3. **How It Works:** 3-step visual explanation (Contest Setup → Live Auction → Solve & Score)
4. **Team Roles Section:** Detailed breakdown of the Strategist (Bidder) and Executor (Coder) roles
5. **Features Grid:** Highlights — Real-Time Auction Engine, Fixed Currency Constraint, Score Only What You Solve, Forced Specialization, Live Leaderboard, Organizer Controls
6. **Stats Bar:** Key numbers (2 players/team, 1000 starting credits, 0 points for unsolved)
7. **Strategy Tips:** Guidance for new players
8. **Call to Action:** "Ready to Duel?" with registration and login buttons
9. **Footer:** Copyright and links

---

## 12. Navigation & Layout

### 12.1 Dashboard Layout (Authenticated)
- Persistent sidebar navigation with links to: Dashboard, Teams, Contests, Profile
- Sidebar can be collapsed/expanded
- User avatar and logout option in sidebar footer
- Main content area with outlet for page content

### 12.2 Immersive Layout (Full-Screen)
Used for high-focus experiences with no sidebar distractions:
- Auction Arena (Bidder and Coder/Spectator views)
- Coder Workbench & Problem Solver
- Auction Control Room (Organizer)

### 12.3 Auth Layout
Clean, minimal layout for authentication pages (login, register, OTP verification, password reset)

---

## 13. Notifications & Feedback

### 13.1 Toast Notifications
- **Success:** Green toasts for successful actions (registration, login, team creation, invite sent, bid placed, submission accepted, etc.)
- **Error:** Red toasts for failures (invalid credentials, network errors, validation failures, insufficient credits, bid too low)
- Auto-dismiss after a few seconds

### 13.2 Inline Validation
- Form fields show real-time validation errors below the input
- Errors appear on blur and during typing
- Forms cannot be submitted with active validation errors

### 13.3 Loading States
- Skeleton loaders for tables and lists
- Spinner indicators for buttons during API calls
- "Authenticating..." screen during Google OAuth redirect

### 13.4 Empty States
- Contextual empty state messages with icons for: No Teams, No Contests, No Problems Assigned, No Submissions, No Leaderboard Entries, No Auction Active

---

## 14. Access Control Summary

| Feature | Regular User | Organizer |
|---------|-------------|-----------|
| Create/manage teams | Yes | Yes |
| Browse/register for contests | Yes | Yes |
| Participate in auctions | Yes (as Bidder) | Yes |
| Solve problems | Yes (as Coder) | Yes |
| View leaderboards | Yes | Yes |
| Edit profile | Yes | Yes |
| Create contests | No | Yes |
| Manage contest lifecycle | No | Yes |
| Run auctions | No | Yes |
| Manage problem library | No | Yes |
| Access Organizer Dashboard | No | Yes |

---

## 15. Key Business Rules

1. **Team Size:** Exactly 2 members per team
2. **Role Assignment:** Each team member must have a distinct role — one BIDDING, one CODING
3. **Team Creator Role:** The creator automatically gets the BIDDING role upon team creation
4. **Role Swap:** Team members can swap roles (BIDDING ↔ CODING), but only when not in an active contest
5. **Contest Readiness:** A team must have both roles filled to register for a contest
6. **Fixed Purse:** Each team starts with exactly **1000 currency credits** at the beginning of a contest
7. **Base Price:** Every problem has a minimum starting price; the first bid must meet or exceed it
8. **Minimum Bid Increment:** Each new bid must be at least **10 credits higher** than the current highest bid
9. **No Bid Retraction:** Bids cannot be taken back once placed
10. **Deduction on Win Only:** Currency is deducted from the winning team's purse only when they win the auction, not when they place individual bids
11. **Points on Acceptance Only:** Points are awarded only when a submission receives an ACCEPTED verdict
12. **Multiple Submissions:** Teams can submit multiple solutions per problem
13. **No Refunds:** Currency spent on problems that are not solved is permanently lost
14. **Role Lock During Contest:** Bidders bid, Coders code — roles cannot be swapped during an active contest
15. **Single Auction at a Time:** Only one problem is auctioned at a time per contest
16. **Organizer-Controlled Auctions:** The organizer decides when to start each auction and which problem to auction next
17. **Leftover Currency Has No Value:** Remaining credits at contest end do not convert to points (used only as a tiebreaker)

---

## 16. Contest Flow (End-to-End)

```
1. Organizer creates a contest (DRAFT)
         ↓
2. Organizer adds problems from built-in library or creates custom problems
   └── Configures points, base price, and display order per problem
         ↓
3. Organizer opens registration (REGISTRATION_OPEN)
         ↓
4. Contest Ready teams register for the contest
         ↓
5. Organizer starts the contest (ACTIVE)
   └── Each registered team receives 1000 starting credits
         ↓
6. Organizer selects a PENDING problem and starts a timed auction
   └── All auction participants connect via real-time WebSocket
         ↓
7. Bidders compete in real-time; each bid must beat current highest by 10+ credits
         ↓
8. Auction ends (timer expires or organizer ends it manually)
   └── Winning team's purse is debited the winning bid amount
   └── Problem is assigned to winning team's Coder (status: ASSIGNED)
         ↓
9. Coder opens the problem in the code editor and submits solutions
   └── ACCEPTED → status: SOLVED, points awarded to team
   └── Other verdict → team can resubmit until contest ends
         ↓
10. Steps 6–9 repeat for each problem the organizer wishes to auction
         ↓
11. Organizer ends the contest (ENDED)
    └── Any ASSIGNED problems with no accepted solution → status: FAILED
    └── Final leaderboard locked; ranked by points, then remaining currency
```

---

## 17. Glossary

| Term | Definition |
|------|-----------|
| **Bidder** | The team member responsible for participating in auctions and managing the team's currency |
| **Coder** | The team member responsible for writing and submitting code solutions |
| **Purse** | The fixed 1000-credit currency allocated to each team at contest start |
| **Auction** | A timed, real-time bidding event for a single problem |
| **Base Price** | The minimum starting bid required for a problem |
| **Contest Ready** | A team with exactly 2 members and both BIDDING and CODING roles assigned |
| **Verdict** | The result of evaluating a code submission (e.g., ACCEPTED, WRONG_ANSWER) |
| **Workbench** | The Coder's interface showing all problems won by their team |
| **Organizer Panel** | The admin dashboard for contest creators |
| **Squad** | Another term for a team |
| **Built-in Problem** | A platform-curated problem available for organizers to import into any contest |
| **Custom Problem** | A problem created by an organizer for their own contests |
| **Assignment** | The record of a problem being won and assigned to a team's Coder |

---

*This document describes the functional requirements of DevDuel as implemented. It covers all user-facing features, workflows, and business rules.*
