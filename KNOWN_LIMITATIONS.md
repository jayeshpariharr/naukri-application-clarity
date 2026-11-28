# Known Limitations & Prototype Boundary Register (V2.0)

**Project:** Naukri Application Clarity V2.0 — Turning Applications into Attended Interviews  
**Status:** Independent Product Management Capstone Proposal & Prototype  
**Date:** 28 November 2026

---

### 1. Architectural & Client State Invariants
- **In-Memory & Local Prototype State:** Application submissions, interview coordination actions, attendance confirmations, and simulated recruiter events live in browser client state (`app.js` and `interview-domain.js`). A full hard browser reload resets state to default fixtures unless persisted via local demo storage.
- **Client-Side Simulation vs. Production Backend:** Mutation endpoints, status syncs, and event logs run purely inside the client runtime. In a production enterprise system, state mutations require distributed queues (Kafka/RabbitMQ), PostgreSQL/DynamoDB persistence, and authoritative server timestamps.

### 2. Recruiter Integration & Feasibility Boundaries
- **Conditional Recruiter Participation (FR14, FR24):** The simulated recruiter actions (`Confirm Interviewed`, `Mark No-Show`, `Propose Alternative`) are implemented as frictionless in-context triggers. Production rollout strictly requires API/webhook discovery against Naukri's existing eHire/Resume Manager recruiter platforms so that no mandatory new manual tool is imposed on recruiters.
- **Independent Dual Confirmation (FR25):** The prototype demonstrates that candidate attendance confirmation and recruiter interviewed confirmation are independent records. A missing confirmation is treated as pending reconciliation rather than an automatic no-show.

### 3. Identity Verification & Trust Provenance (FR15)
- **Scoped Verification Labels:** Employer identity badges (e.g. `Verified Employer · Domain confirmed`) show verified provenance only. This does not represent an endorsement, background check, or guarantee of job authenticity or interview conduct.
- **No Direct ATS Scraping:** External job listings and third-party ATS tracking links are simulated with clear disclaimers that external application progression cannot be authoritatively verified by Naukri without enterprise integration contracts.

### 4. Cohort Analytics & CAIR Measurement (FR28)
- **Simulated CAIR Metric:** The Candidate Attended Interview Rate (CAIR target: 21% to 36% in six months) is an assignment baseline and design hypothesis, not an achieved production business metric.
- **Maturity Window:** Cohorts mature strictly at 14 days following the third qualifying application anchor. In the interactive prototype, demo scenarios can advance simulated time to demonstrate cohort maturation and deduplication.

### 5. Research Evidence Boundaries
- **Candidate Survey Extent:** Findings represent 7 total respondents (6 eligible recent applicants, 1 ineligible). 3/6 self-reported no response within 14 days, 3/6 reported progress visibility barriers, and mean genuineness confidence was 2.67 / 5.0. These provide directional insights but do not constitute statistically representative platform analytics.
- **Recruiter Aggregates:** Recruiter survey figures (5/7 citing mismatch, 3/7 citing role on hold) reflect previously reported aggregate survey data; raw recruiter response logs remain unverified pending original source retrieval.
