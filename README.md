# Naukri Application Clarity V2.2 — Product Management Portfolio & Prototype

> **Independent Capstone Project — Master PRD V2.0 Implementation (Final Frozen Patch)**  
> **Development Branch:** `capstone-v2` | **Audit Version:** 2.2 Patch (Frozen Audit Corrections)  
> *Note: This is an independent, unofficial product management case study and prototype. The live GitHub Pages deployment reflects the stable V1.0 release on `main`; this V2.2 development branch contains the complete audited interview progression journey, deterministic Demo Clock, and strict CAIR analytics engine.*

---

## 🚀 90-Second Demonstration Route for Evaluators

Follow this exact continuous route on application `app-10` to experience the end-to-end V2.0 interview progression journey and V2.2 audit improvements:

1. **Launch the Prototype:**
   - Open `index.html` in any modern web browser or start a local server (`python3 -m http.server 8080`).
   - Click on the **Interactive Prototype** tab in the top navigation bar.

2. **Inspect an Active Interview Invitation (FR18 & FR19):**
   - Click on **My Applications** -> Select the **CX Product Lead (Applied via Neo)** application at **BrightLeaf EdTech** (`app-10`, interview `int-02`).
   - Notice the prominent **Interview Coordination (V2.0)** card displaying the scheduled date, round name (*Hiring Manager Discussion*), and meeting format.
   - Click **✓ Accept Invitation**. The badge immediately updates to **Confirmed** and appends a verified confirmation event to the timeline.

3. **Export Calendar (.ics) & Propose Reschedule (FR20 & FR22):**
   - Click **📅 Export to Calendar (.ics)**. A valid RFC 5545 `.ics` file is instantly generated with UID, DTSTART, DTEND, and SEQUENCE versioning.
   - Click **🔄 Request Reschedule**. Enter an alternative proposed time slot (e.g., `2026-12-05T14:30:00+05:30`). The status transitions to **Reschedule Requested / Reschedule Pending** with `schedule_version` preserved.

4. **Recruiter Confirmation of Proposed Slot (V2.2 Fix):**
   - In the top bar mode switcher, click **Recruiter**.
   - In the Recruiter Console, open `Manage Jobs and Responses` -> **CX Product Lead (Applied via Neo)** at BrightLeaf EdTech and locate candidate **Aarav Mehta**.
   - Click **✓ Accept Proposed Slot (5 Dec 2026 at 14:30)**. The schedule version increments to `v2`, the new slot is officially confirmed, and the obsolete reminder is invalidated.

5. **Advance the Simulated Demo Clock (FR23 & BUG-01 Fix):**
   - In the top header bar, locate the **⏱ Demo Clock** controls.
   - Click **+7d** and **+1d** to advance the simulated time past the confirmed interview occurrence (past 5 Dec 2026).

6. **Execute Dual Attendance Confirmation & CAIR Qualification (FR23, FR24, FR25):**
   - In Candidate view, click **Confirm I Attended** (*Candidate Confirmed: ✓ Attended*).
   - In Recruiter view, click **Mark Interviewed (Conducted)** (*Recruiter Confirmed: ✓ Conducted*).
   - Return to **Mobile** or **Desktop** tracker: the attendance status updates to **🎯 Dual Confirmed**, qualifying this application for the **CAIR (Candidate Application-to-Interview Rate)** metric!

---

## 🧪 Genuine Executable Test Runner

V2.2 features an authentic executable Node.js test harness that executes real assertions against domain functions and boundaries:

```bash
# Run the complete audited regression suite (59 scenarios, 150 strict assertions)
node test_runner_real.js
```

### Accurate Test Coverage & Simulation vs Production Classification
- **Domain unit tests (24 scenarios):** Business logic, time-travel evaluation, attendance derivation, and CAIR analytics.
- **Fixture validations (17 scenarios):** Seed data consistency, schema integrity, and initial states.
- **Production Validation (1 scenario — QA15):** Explicitly marks server-side JWT authentication, rate limiting, and multitenant infrastructure as requiring production backends rather than claiming client-side verification.
- **Audit Specific Regressions (20 scenarios — BUG-01 through BUG-20):** Edge cases, deduplication boundaries, occurrence timestamp requirements, and reporting cutoffs.

### Coverage Classification:
Every scenario is strictly classified in accordance with audit guidelines:
- **Browser Functional Tests:** QA01, QA02, QA17, QA18, QA20, QA26, QA27, QA28, QA31, QA32, QA35
- **Fixture Validations:** QA03, QA04, QA06, QA09, QA10, QA11, QA12, QA14, QA19, QA21, QA23, QA25
- **Domain Unit Tests:** QA05, QA07, QA08, QA13, QA16, QA22, QA24, QA29, QA30, QA33, QA34, QA36, QA37, QA38, QA39, and BUG-01 through BUG-17
- **Requires Production Validation:** QA15 (Platform security, JWT verification, distributed multitenancy)

---

## 📂 Key Project Files

- `interview-domain.js` — Core interview lifecycle engine, deterministic Demo Clock, RFC 5545 ICS generator, and CAIR calculation engine.
- `app.js` — Central state management, UI event routing, and Demo Clock controls.
- `screens-mobile.js` & `screens-desktop.js` — Responsive seeker views featuring the Interview Coordination Card.
- `screens-recruiter.js` — Recruiter Console for scheduling, status synchronization, and attendance verification.
- `test_runner_real.js` — Executable Node.js test harness with real assertions.
- `FUNCTIONAL_TEST_RESULTS.md` — Test execution output with coverage classification and assertion logs.
- `QA_TRACEABILITY_REPORT.md` — Requirement-to-test traceability matrix (FR01 through FR28).
- `BUG_RESOLUTION_MATRIX.md` — Root cause and resolution audit for defects BUG-01 through BUG-17.
- `KNOWN_LIMITATIONS.md` — Explicit prototype boundary declarations.

---

## 💻 Local Preview Instructions

```bash
# Clone or navigate to the repository
cd /path/to/naukri-application-clarity

# Check out the development branch
git checkout capstone-v2

# Start a local static file server
python3 -m http.server 8080

# Open in browser
http://localhost:8080
```
