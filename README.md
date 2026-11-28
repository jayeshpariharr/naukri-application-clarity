# Naukri Application Clarity V2.1 — Product Management Portfolio & Prototype

> **Independent Capstone Project — Master PRD V2.0 Implementation**  
> **Development Branch:** `capstone-v2` | **Audit Version:** 2.1 (Executable Test Suite)  
> *Note: This is an independent, unofficial product management case study and prototype. The live GitHub Pages deployment reflects the stable V1.0 release on `main`; this V2.1 development branch contains the audited interview progression journey.*

---

## 🚀 90-Second Demo Route for Evaluators

Follow this exact 90-second route to experience the end-to-end V2.0 interview progression journey and V2.1 audit improvements:

1. **Launch the Prototype:**
   - Open `index.html` in any modern web browser or start a local server (`python3 -m http.server 8080`).
   - Click on the **Interactive Prototype** tab in the top navigation bar.

2. **Inspect an Active Interview Invitation (FR18 & FR19):**
   - Click on **My Applications** -> Select the **Lead Product Analyst** application at **Swiggy**.
   - Notice the prominent **Interview Coordination (V2.0)** card displaying the scheduled date, round name (*Technical Product Case*), and meeting format.
   - Click **✓ Accept Invitation**. The badge immediately updates to **Confirmed** and appends a verified confirmation event to the timeline.

3. **Export Calendar (.ics) & Test Rescheduling (FR20 & FR22):**
   - Click **📅 Export to Calendar (.ics)**. A valid RFC 5545 `.ics` file is instantly generated with UID, DTSTART, DTEND, and SEQUENCE versioning.
   - Click **🔄 Request Reschedule**. Enter an alternative proposed time slot. The status transitions to **Reschedule Pending** with `schedule_version` preserved.

4. **Advance the Simulated Demo Clock (FR23 & BUG-01 Fix):**
   - Try clicking **Confirm Attendance** immediately. Notice the system strictly enforces integrity: *Attendance cannot be confirmed before the interview occurrence.*
   - In the top header bar, locate the **⏱ Demo Clock** controls.
   - Click **+7d** to advance the simulated time past the interview start time.

5. **Execute Dual Attendance Confirmation (FR23, FR24, FR25):**
   - Now click **Confirm Attendance** as the candidate. The card updates to show *Candidate Confirmed: ✓ Attended* while *Recruiter Confirmed* remains *Pending*.
   - In the top bar mode switcher, click **Recruiter**.
   - In the Recruiter Console, open the Swiggy role responses and click **Confirm Conducted**.
   - Switch back to **Mobile** or **Desktop** tracker: the attendance status has advanced to **🎯 Dual Confirmed**, qualifying this application for the **CAIR (Candidate Application-to-Interview Rate)** metric!

---

## 🧪 Genuine Executable Test Runner

Unlike previous releases that used static outputs, V2.1 features a genuine executable Node.js test harness that runs real assertions against domain functions and boundaries:

```bash
# Run the complete audited regression suite (51 scenarios, 128 strict assertions)
node test_runner_real.js
```

### Test Scope:
- **QA01–QA39:** Full functional and progression regression matrix.
- **BUG-01–BUG-12:** Independent audit defect verification.
- **Boundary Precision:** Verifies exact 14.0-day CAIR window (±1 millisecond) and 7-day 3rd-application cohort anchoring.

---

## 📂 Key Project Files

- `interview-domain.js` — Core interview lifecycle engine, deterministic Demo Clock, RFC 5545 ICS generator, and CAIR calculation engine.
- `app.js` — Central state management and UI event routing.
- `screens-mobile.js` & `screens-desktop.js` — Responsive seeker views featuring the Interview Coordination Card.
- `screens-recruiter.js` — Recruiter Console for scheduling, status synchronization, and attendance verification.
- `test_runner_real.js` — Executable Node.js test harness with real assertions.
- `FUNCTIONAL_TEST_RESULTS.md` — Test execution output with real stdout logs and assertion counts.
- `QA_TRACEABILITY_REPORT.md` — Requirement-to-test traceability matrix (FR01 through FR28).
- `BUG_RESOLUTION_MATRIX.md` — Root cause and resolution audit for defects BUG-01 through BUG-12.
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
