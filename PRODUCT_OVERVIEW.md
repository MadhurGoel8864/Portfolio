# DevDuel — Product Overview

**A non-technical guide to understanding DevDuel**

---

## What is DevDuel?

DevDuel is a competitive coding platform where **strategy meets skill**. Unlike traditional coding contests where everyone solves the same problems, DevDuel adds a twist: teams must **bid** to win the right to solve problems in a live auction. It’s part auction, part coding marathon—and every decision matters.

Think of it like a mix of a quiz show and a coding competition. Teams compete for coding problems, spend virtual currency to buy them, and earn points only when their coder successfully solves what they bought. The team with the most points wins.

---

## Core Idea: Why DevDuel?

- **Strategic gameplay**: Bidding choices directly affect what problems you can solve.
- **Teamwork**: Two roles—Bidder and Coder—must work together.
- **Fair constraint**: Limited currency means teams can’t buy everything; they must prioritize.
- **High stakes**: Currency spent is gone; points come only from solved problems.

---

## Team Structure

Each team has **2 members**:

| Role | What they do |
|------|--------------|
| **Team Leader (Bidder)** | Runs the bidding during the auction, decides which problems to buy and at what price. The team creator is always the Bidder by default. But we can easily change it. |
| **Coder** | Receives problems bought by the Bidder and solves them during the contest. |



---

## Contest Mechanics

### The Purse (Currency)

- Every team starts the contest with a **fixed amount of virtual currency** (e.g., 1000 units).
- This currency is used only to **bid on problems** during the auction.
- **Unused currency at the end has no value**—it does not add to the final score.

### Problems (Questions)

- Each problem has:
  - **Base price**: Minimum bid to enter the auction for that problem.
  - **Winning score**: Points awarded to the team **only if** their Coder solves it.
- If the Coder fails to solve a problem, the team gets **0 points** for it—but the currency spent is still gone.

### The Auction

1. The **Contest Creator/Organizer** runs the auction.
2. Problems are auctioned **one by one**.
3. All Bidders from all teams are in the **same room**.
4. For each problem, Bidders place bids until time ends for that problem.
5. The winning team **pays** the bid amount from their purse, and the problem is **assigned to their Coder**.

### Winning

- The team with the **highest total score** at the end wins.
- Score comes only from problems the Coder **actually solved**.
- Currency left over does not count.

---

## User Journeys

### 1. Contest Creator (Contest Organizer)

**Who they are:** The person or organization running the contest. They define the problems, rules, and schedule.

**Their journey:**

1. **Create the contest**  
   Set the contest name, description, start time, and end time.

2. **Add problems**  
   For each problem, define the test cases, base price (minimum bid) and the winning score (points for solving it).

3. **Invite or open registration**  
   Let teams register for the contest. Each team gets the same fixed purse when they join.

4. **Start the contest**  
   Start contest through a button(no automatic timer).

5. **Run the auction**  
   For each problem, they open bidding(closeing of a poblem bidding is done automatically by system).

6. **Monitor progress**  
   Track which teams bought which problems and how many they solved.

7. **End the contest**  
   Declare the winner based on total score.

---

### 2. Team Leader (Bidder)

**Who they are:** The person who creates the team and represents it in the auction. They decide what to buy and at what price.

**Their journey:**

1. **Create or join a team**  
   Create a new team (becoming the Bidder by default) or join an existing one as a member.

2. **Invite a Coder**  
   Add the second team member as the Coder.

3. **Register for a contest**  
   Sign up the team for a contest. The team receives the fixed purse for that contest.

4. **Enter the auction room**  
   When the contest starts, join the live auction room with other Bidders.

5. **Bid on problems**  
   - See each problem’s base price and winning score.  
   - Decide which problems fit your strategy and budget.  
   - Place bids within your remaining currency.  
   - Win problems by having the highest bid when bidding closes.

6. **Track spending**  
   Keep an eye on how much currency is left.  
   Remaining currency is worthless after the contest, so use it wisely.

---

### 3. Coder

**Who they are:** The person who receives problems won by the Bidder and solves them during the contest.

**Their journey:**

1. **Join a team**  
   Get invited by a Team Leader to join as the Coder.

2. **Prepare for the contest**  
   Understand the contest format and what kinds of problems might appear.

3. **Wait for problems**  
   When the auction starts, problems are assigned as the Bidder wins them.

4. **Receive assigned problems**  
   Each problem bought by the Bidder is sent to the Coder.

5. **Solve problems**  
   Work on each problem within the contest time.  
   - **Solved** → team earns the problem’s winning score.  
   - **Unsolved** → team earns 0 points; currency spent is still lost.

6. **Prioritize**  
   Decide which problems to tackle first based on difficulty, points, and time.

7. **Submit solutions**  
   Submit before the contest ends. Only accepted solutions add points.

---

## Key Takeaways

| Concept | Summary |
|--------|---------|
| **Team size** | 2 members |
| **Roles** | Bidder (Team Leader) + Coder; one person can not do both |
| **Currency** | Fixed per team; used only for bidding; unused = wasted |
| **Problems** | Base price + winning score; points only if solved |
| **Auction** | Live, one problem at a time, all Bidders in one room |
| **Winning** | Highest total score from solved problems; leftover currency ignored |

---

## Strategy Hints (for teams)

- **Spend your currency** — Leftover currency counts for nothing.
- **Balance risk and reward** — High-score problems may cost more; low-cost problems may be easier but yield fewer points.
- **Coordinate** — Bidders and Coders should have on a plan before bidding. Bidder should know which kind of problems can coder solve.
- **Prioritize** — Focus on problems your Coder can realistically solve in time.

---
