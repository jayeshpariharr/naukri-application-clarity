# Known Limitations & Boundary Constraints — Naukri Application Clarity V2.2

**Release Version:** 2.2 (Focused Final Audit Release)  
**Target Environment:** Client-Side Single Page Prototype & Evaluator Demonstration Rig  
**Development Branch:** `capstone-v2` (Live production deployment remains isolated on `main`)

---

### 1. Prototype Simulation vs. Production Backend Infrastructure
- **Scenario QA15 Status:** Explicitly labelled **Requires Production Validation**.
- **Explanation:** This project demonstrates product management clarity, user experience flows, state machines, and mathematical KPI formulations. A client-side static prototype runs inside browser JavaScript and cannot cryptographically verify server-side JSON Web Token (JWT) signature handshakes, distributed Redis rate-limiting, OAuth2 token refresh workflows, or relational database multitenancy.
- **Production Requirement:** In production deployment across Info Edge (India) Ltd. infrastructure, this logic must reside behind authenticated REST/GraphQL API gateways backed by relational microservices (PostgreSQL/Aurora) and an event bus (Kafka/RabbitMQ).

### 2. Client-Side Clock & Time Boundaries
- **Simulated Demo Clock:** Because all data executes locally, real wall-clock time does not advance automatically during an evaluator review. To allow realistic evaluation of post-interview attendance recording without fabricating timestamps, the prototype includes an explicit deterministic **Demo Clock Simulator** (`NaukriInterviewDomain.DemoClock`) located in the top navigation bar.
- **Occurrence Boundary:** Evaluators cannot confirm attendance for an interview scheduled in the future until they click `+2h`, `+1d`, or `+7d` on the Demo Clock to simulate passing the interview occurrence.
- **Persistence Boundary:** The Demo Clock state resides in session memory and resets to the live system clock upon clicking `Reset Demo` or refreshing the browser.

### 3. CAIR (Candidate Application-to-Interview Rate) Cohort Boundaries
- **Strict Deduplication & Distinct Jobs:** In compliance with V2.2 audit corrections, CAIR strictly enforces deduplication by stable application ID and requires 3 distinct job applications (`jobId`) within 7 days. Identical application submissions or multiple applications to the exact same job ID are rejected from establishing a cohort.
- **Exact Maturity Window:** CAIR strictly requires a mature 14-day observation window from the cohort anchor (the 3rd distinct job application submitted within 7 days).
- **Simulated Cohort Size:** The interactive prototype sandbox preloads sample applications across distinct companies to demonstrate the calculation engine. Full population statistical significance (e.g. tracking 500,000 monthly active job seekers) requires production data warehousing (BigQuery/Snowflake) and ETL pipelines.

### 4. Third-Party Integrations
- **Calendar Synchronization:** Candidate calendar assistance generates RFC 5545 compliant `.ics` calendar files downloadable directly to the operating system or calendar client. Direct two-way OAuth synchronization (automatically creating Google Meet or Microsoft Outlook calendar invites without manual import) is intentionally mocked, as third-party OAuth app verification requires dedicated production domain hosting.
- **Video Conferencing Infrastructure:** Google Meet and Zoom URLs in the prototype simulate standard recruiter invite links; live video feeds and screen-sharing sessions are outside the scope of application clarity tracking.

### 5. Multi-Device State Synchronization
- **Local Storage Isolation:** Changes executed in one browser tab update the central JavaScript memory store. Cross-browser or cross-device real-time parity relies on local storage; true multi-device synchronization in production requires WebSocket push notifications and server-side state hydration.
