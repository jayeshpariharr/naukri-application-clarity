# Naukri Application Clarity V2.0 — Turning Applications into Attended Interviews

> **Disclaimer:** This is an **independent Product Management case study, capstone proposal, and unofficial prototype** created strictly for portfolio, educational, and evaluation purposes. It is not affiliated with, endorsed by, or connected to Info Edge (India) Ltd. or Naukri.com. All candidate, recruiter, company, and interview records inside the prototype are fictional simulation fixtures.

---

## 1. Executive Summary & V2.0 Mission

**Naukri Application Clarity V2.0** upgrades the post-application experience from **application tracking** to **actionable application understanding and verified interview attendance**.

- **Initiative North Star (CAIR):** Candidate Attended Interview Rate — targeting progression from **21% to 36% in six months** (modeled assignment target, not an achieved production outcome).
- **Core Problem:** Insufficient actionable visibility into relevant, genuine opportunities and confirmed post-application progress causes candidates to abandon active search or miss interview coordination cues.
- **Product Thesis:** Help job seekers identify suitable, credible opportunities, understand confirmed application milestones, and coordinate interviews without imposing a mandatory new recruiter tool.

---

## 2. Master PRD V2.0 Requirements Coverage (FR01–FR28)

| Phase | Requirement Area | Requirements Covered | Key User Outcome |
|---|---|---|---|
| **Phase A / B** | Core Application Clarity | **FR01–FR17** | Track CTA, timeline recency, 0/7/14/30d inactivity bands, contextual not shortlisted reasons, hiring availability, and scoped identity verification. |
| **Phase C** | Interview Coordination | **FR18–FR22** | Structured interview invitations, candidate accept/decline, versioned mutual rescheduling, contextual reminders, and calendar (.ics) export. |
| **Phase D** | Attendance & Dual Confirmation | **FR23–FR25** | Candidate independent confirmation, recruiter interviewed confirmation, dual-confirmed CAIR qualification, and dispute detection. |
| **Phase E** | Autonomy & Cohort Analytics | **FR26–FR28** | Explicit application withdrawal vs archive, reported no-show distinction, and 14-day cohort anchor instrumentation. |

---

## 3. Local Preview & Execution Instructions

The project runs with **zero build dependencies** and is fully compatible with GitHub Pages and local HTTP servers.

### Running Locally:
1. Clone or extract the repository:
   ```bash
   cd naukri-application-clarity
   ```
2. Start a lightweight local HTTP server (Python 3):
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000/
   ```

### Supported Direct URL Modes:
- **Portfolio Overview:** `http://localhost:8000/?mode=overview`
- **Case Study (PRD V2.0):** `http://localhost:8000/?mode=casestudy`
- **Interactive Mobile Prototype:** `http://localhost:8000/?mode=mobile&screen=home`
- **Interview Detail View:** `http://localhost:8000/?mode=mobile&screen=details&app=app-05`
- **Desktop Tracker Experience:** `http://localhost:8000/?mode=desktop&sub=tracker`
- **Recruiter Simulation Panel:** `http://localhost:8000/?mode=recruiter`
- **Before vs. After Comparison Gallery:** `http://localhost:8000/?mode=comparisons`
- **Engineering Documentation & QA:** `http://localhost:8000/?mode=documentation`
- **Usability Testing Lab:** `http://localhost:8000/?mode=testing`

---

## 4. 90-Second Walkthrough Demonstration Route

To demonstrate end-to-end interview progression in 90 seconds:

1. **Discover & Apply:**
   - Go to Mobile Mode (`?mode=mobile&screen=home`). Tap **Recommended Jobs**, select **ZenithPay India**, inspect the **Verified Employer** badge, and tap **Apply**.
   - On the **Applied Successfully** screen, click the primary **Track Application** CTA.
2. **Review Tracker & Recency:**
   - Observe the chronological timeline, last confirmed update timestamp, and neutral inactivity wording.
3. **Recruiter Invitation Simulation:**
   - Switch to **Recruiter Mode** (`?mode=recruiter`). Locate the candidate under **Manage Jobs & Responses**.
   - Click **+ Send Interview Invitation**.
4. **Candidate Response & Reschedule:**
   - Switch back to **Mobile Mode** (`?mode=mobile&screen=details&app=app-05`).
   - Observe the **Interview Coordination (V2.0)** card.
   - Tap **✓ Accept Invitation** (schedule state transitions to `Confirmed`).
   - Tap **🔄 Request Reschedule** and propose an alternative time (transitions to `Reschedule Pending`).
5. **Recruiter Confirmation:**
   - In Recruiter Mode, click **✓ Accept Proposed Slot** (increments schedule version to `v2`).
6. **Dual Attendance Confirmation:**
   - In Mobile Mode, tap **Confirm I Attended** (Candidate Confirmed: `Attended`, Recruiter Confirmed: `Pending`).
   - In Recruiter Mode, click **Mark Interviewed (Conducted)**.
   - Return to Mobile Mode to view the derived **🎯 Dual Confirmed** CAIR status.
7. **Legitimate Negative Outcome:**
   - Tap **Withdraw Application from Consideration** to demonstrate that candidate autonomy cancels active coordination while safely preserving historical audit logs.

---

## 5. Verification & Test Suite

The pure domain engine and prototype interactions have been verified through an automated 39-scenario test runner:

- **Total Test Scenarios:** 39 (QA01 through QA39)
- **Passed (Prototype Simulation):** 38
- **Requires Production Validation:** 1 (QA15 — Server-side authorization & multi-tenant security)
- **Failed:** 0

Run the test suite locally:
```bash
python3 run_python_tests.py
```
Detailed execution logs and known limitations are documented in:
- `FUNCTIONAL_TEST_RESULTS.md`
- `QA_TRACEABILITY_REPORT.md`
- `KNOWN_LIMITATIONS.md`
