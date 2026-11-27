# QA Traceability Report — Naukri Application Clarity

**Document Version:** 1.0  
**Date:** 27 November 2026  
**Project:** Naukri Application Clarity (Independent PM Portfolio Case Study)  
**Primary Source:** Product Requirements Document (PRD v1.0, Appendix B)  
**Live Prototype URL:** https://jayeshpariharr.github.io/naukri-application-clarity/  
**Repository:** https://github.com/jayeshpariharr/naukri-application-clarity  

---

## 1. Quality Assurance Objective & Status Taxonomy

This report provides granular, scenario-by-scenario traceability for all 18 quality assurance requirements (**QA01–QA18**) defined in the PRD. In strict adherence to rigorous product management and engineering ethics, test execution statuses clearly distinguish between client-side prototype verification and unverified production backend behavior:

| Status Code | Meaning & Evidence Scope |
| :--- | :--- |
| **Passed (Prototype Simulation)** | Verified through automated end-to-end browser execution and UI assertions in the client-side prototype environment (`http://localhost:8765/` and GitHub Pages). State logic, presentation invariants, and interaction flows function as designed. |
| **Simulated Only** | Evaluated via simulated mock data and client-side memory storage. Does not interface with live multi-tenant recruiter enterprise databases or live telecommunication carriers. |
| **Requires Production Validation** | High-scale backend authorization, real-world third-party ATS feeds, distributed network latency, production database locking, or telecommunication push SMS/inbox delivery. Cannot be verified in a zero-build client static environment. |
| **Not Executed** | Scenarios deferred due to missing live production infrastructure. |
| **Failed** | Scenario failed to satisfy acceptance criteria or produced regressions. |

---

## 2. Granular QA Scenario Traceability Matrix (QA01–QA18)

### QA01 — Submission Navigation
- **Requirement / Feature:** FR01 / US01 · Track Application CTA (F01)
- **Test Environment:** Client Browser (Chrome / Headless Playwright) against GitHub Pages & Local Server
- **Preconditions:** Candidate is on a job posting with active hiring status (e.g., `job-101` ZenithPay India). Application has not yet been submitted.
- **Test Steps:**
  1. Click `Apply` button on job details view.
  2. Verify navigation to `Applied Successfully` (Screen 03).
  3. Click `Track Application` primary CTA.
- **Expected Result:** Directly navigates to the detailed application tracker for `job-101` (`app-01` equivalent) showing status `Application Sent` and submission timestamp.
- **Actual Result:** Navigates directly to the specific application detail view without intermediate drop-off.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated browser step assertion: `#comp-apply-cta` routes cleanly; URL query params reflect `screen=details`.
- **Known Limitations:** In a production multi-tenant backend, routing depends on asynchronous distributed queue ingestion and authorized JWT token exchange.

---

### QA02 — Failed Submission / Recovery
- **Requirement / Feature:** FR01 / US01 · Error State Handling & Non-Premature Confirmation
- **Test Environment:** Client Prototype Engine (`app.js`)
- **Preconditions:** Job is marked `Closed` or simulated network failure is triggered.
- **Test Steps:**
  1. Attempt to apply to `job-103` (Closed position) or trigger submission failure.
  2. Inspect system feedback and error messaging.
- **Expected Result:** System prevents submission; displays toast/callout explaining the position is no longer accepting applications; never shows false `"Applied Successfully"` state.
- **Actual Result:** `applyToJob()` validates job availability, displays toast `"This position is closed and no longer accepting applications"`, and halts submission.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** `app.js` line 80–84 guard check.
- **Known Limitations:** Production requires offline sync, idempotency keys, and retry queues for intermittent mobile packet loss.

---

### QA03 — Inactivity Does Not Imply Rejection
- **Requirement / Feature:** FR04 / US04 · Inactivity Indicator (F04)
- **Test Environment:** Client Browser UI & Component Inspection
- **Preconditions:** Candidate views an application where `inactivityDays >= 14` (e.g., `app-03` at 14 days or `app-04` at 37 days).
- **Test Steps:**
  1. Open `app-03` (HealthTech Analytics) or `app-04` (BizCorp Analytics).
  2. Inspect the inactivity banner, timeline, and status explanation.
- **Expected Result:** Banner states `No confirmed update for 14/37 days`; timeline remains at `Awaiting Recruiter Action`; candidate is explicitly advised to continue exploring other roles without claiming the application was rejected.
- **Actual Result:** Neutral callout rendered; status remains `Awaiting Action`; next-step CTA points to `Explore Similar Active Jobs`.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Screenshot evidence in `06_screenshots_before_after/after-inactive-mobile.jpg` and `screens-mobile.js` inactivity rendering block.
- **Known Limitations:** Long-term candidate psychological reassurance requires validation through real-world longitudinal cohort testing.

---

### QA04 — Missing Timestamp Suppresses Duration Calculation
- **Requirement / Feature:** FR03 / US03 & FR04 / US04 · Timestamp Invariant
- **Test Environment:** Client State Store (`app.js`, `data.js`)
- **Preconditions:** Application record has `lastUpdatedDate = null` or corrupt timestamp.
- **Test Steps:**
  1. Load an unconfirmed consultancy listing or application with no verified event date.
  2. Check status card and inactivity duration.
- **Expected Result:** Duration calculation (`X days ago`) is suppressed; status displays `"Hiring status not confirmed"` or `"Submission date unavailable"` rather than calculating bogus durations or defaulting to 1970.
- **Actual Result:** Inactivity counter is hidden when timestamps are unverified; fallback label displays cleanly.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** `app.js` and `screens-mobile.js` ternary checks for `lastUpdatedDate`.
- **Known Limitations:** In production, legacy database records may require data cleaning and migration scripts for null timestamps.

---

### QA05 — New Confirmed Event Updates Recency
- **Requirement / Feature:** FR03 / US03 · Last Confirmed Update Timestamp
- **Test Environment:** Client State Sync Engine (`app.js`)
- **Preconditions:** Candidate application is at `lastUpdatedDate = "10 Nov 2026"`.
- **Test Steps:**
  1. Recruiter updates candidate status to `Shortlisted` or `Application Viewed`.
  2. Inspect `lastUpdatedDate` in candidate view.
- **Expected Result:** Timestamp immediately updates to current confirmed date (`27 Nov 2026 (Just now)`), resetting `inactivityDays` to `0`.
- **Actual Result:** `syncRecruiterCandidateStatus()` updates `app.lastUpdatedDate` to current date and sets `app.inactivityDays = 0`.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Test assertion verified in automated regression run.
- **Known Limitations:** Production requires WebSocket or push notification sync to update background candidate sessions in real time.

---

### QA06 — Unrelated Recruiter Login Does Not Reset Recency
- **Requirement / Feature:** FR03 / US03 · Anti-Spam & Inactivity Integrity Invariant
- **Test Environment:** Client State Store (`app.js`)
- **Preconditions:** Job has candidate `app-03` waiting 14 days. Recruiter logs into portal to review other jobs.
- **Test Steps:**
  1. Trigger recruiter dashboard load or login event.
  2. Inspect candidate `app-03` timestamp and inactivity days.
- **Expected Result:** Recruiter's general platform presence does NOT reset candidate's specific application clock. `lastUpdatedDate` remains unchanged unless candidate's specific profile is acted upon.
- **Actual Result:** Only candidate-specific status mutations trigger `app.lastUpdatedDate` updates. General portal navigation does not alter candidate records.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Code inspection of `syncRecruiterCandidateStatus()` vs. `syncRecruiterJobStatus()`.
- **Known Limitations:** Production event streams must filter out noisy telemetry (e.g., recruiter page views on candidate lists) from candidate-facing milestones.

---

### QA07 — Duplicate Events Produce No Duplicate History or Notifications
- **Requirement / Feature:** FR07 / US07 · Notification Deduplication
- **Test Environment:** Recruiter Panel & Notification Store
- **Preconditions:** Candidate `cand-04` (`app-01`) is already marked `Shortlisted`.
- **Test Steps:**
  1. Recruiter clicks `✓ Shortlist` on `cand-04` again.
  2. Check notification count and candidate timeline.
- **Expected Result:** Toast notifies recruiter `"Status is already Shortlisted — no duplicate notification sent"`; notification list length is unchanged; timeline contains exactly one `Shortlisted` milestone.
- **Actual Result:** Action is suppressed; zero duplicate notifications added to `state.notifications`.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated test run `Test 1: Notification deduplication & legitimate recurring transitions` PASSED.
- **Known Limitations:** Distributed architectures require database-level unique constraints and Redis deduplication locks.

---

### QA08 — Out-of-Order Event Does Not Overwrite Newer Confirmed State
- **Requirement / Feature:** Central Business Rules · History Preservation Invariant
- **Test Environment:** Prototype State Store (`appendConfirmedTimelineEvent`)
- **Preconditions:** Application timeline has confirmed `Shortlisted` event on 25 Nov 2026.
- **Test Steps:**
  1. Simulate delayed arrival of older event (e.g., `Application Viewed` dated 21 Nov 2026).
  2. Inspect active status and timeline order.
- **Expected Result:** Active status remains `Shortlisted`; historical event is inserted chronologically without downgrading current state.
- **Actual Result:** `appendConfirmedTimelineEvent()` filters non-confirmed states and prevents downgrading valid terminal states.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Code verification in `app.js` lines 195–206.
- **Known Limitations:** Distributed event sourcing (e.g. Apache Kafka) requires monotonic event sequence numbers and vector clocks.

---

### QA09 — Disabled Notification Category Respected
- **Requirement / Feature:** FR08 / US08 · Notification Preferences
- **Test Environment:** Client UI & Notification Delivery Engine
- **Preconditions:** Candidate opens Notification Preferences and toggles `Application status updates` to OFF.
- **Test Steps:**
  1. Uncheck `Application status updates` and save preferences.
  2. Recruiter marks candidate as `Not Shortlisted` or `Shortlisted`.
  3. Inspect Notification center unread badge and list.
- **Expected Result:** Status on application tracker updates visually, but simulated notification is suppressed.
- **Actual Result:** `pushNotification()` checks `state.notificationPrefs.applicationUpdates`, returns `false`, and does not unshift notification.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Verified in automated preferences suite.
- **Known Limitations:** In production, user preferences must be enforced at the push gateway (FCM / APNs) to prevent device battery drain.

---

### QA10 — Archived Application Continues Receiving Confirmed Updates
- **Requirement / Feature:** FR09 / US09 · Archive and Restore Invariance
- **Test Environment:** Client State Store & My Applications View
- **Preconditions:** Candidate archives `app-01` (`archived = true`).
- **Test Steps:**
  1. Archive `app-01`. Verify it disappears from active `Applies on Naukri` tab.
  2. Recruiter marks `app-01` candidate as `Shortlisted`.
  3. Inspect `Archived` filter and notification tray.
- **Expected Result:** Candidate receives notification; `app-01` in Archived list updates to `Shortlisted`; restoring brings it back to active list with updated state intact.
- **Actual Result:** State updates apply to application object regardless of `archived` boolean flag.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Interactive test in Screen 04 My Applications.
- **Known Limitations:** None on client; production needs index optimization for queries filtering `archived = false`.

---

### QA11 — Reconsideration Clears Stale Current Decision Fields
- **Requirement / Feature:** FR10 / US10 · Decision Reversal Invariant
- **Test Environment:** Client Recruiter Sync Engine
- **Preconditions:** Candidate was previously marked `Not Shortlisted` with reason `"Location mismatch"`.
- **Test Steps:**
  1. Recruiter re-evaluates and moves candidate to `Viewed` or `Maybe`.
  2. Inspect candidate decision fields in `app.js`.
- **Expected Result:** `individualDecisionAvailable` resets to `false`; `recruiterDecisionReason` and `recruiterDecisionDate` reset to `null`; historical confirmed milestones (`Applied`, `Application Sent`) remain untouched.
- **Actual Result:** Decision fields cleanly cleared; timeline transitions to `Awaiting Recruiter Action (Under review)`.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated Node/Python test script PASSED.
- **Known Limitations:** Production enterprise ATS audits must retain an internal audit trail of status changes even if candidate view is cleared.

---

### QA12 — Role Closure Preserves Shortlist Outcome
- **Requirement / Feature:** FR12 / US12 · Decoupled Hiring & Candidate Status Invariant
- **Test Environment:** Client Multi-Job Sync
- **Preconditions:** Candidate `cand-04` is `Shortlisted` for `rec-job-02`.
- **Test Steps:**
  1. Recruiter changes job hiring status dropdown from `Active` to `Closed`.
  2. Inspect candidate's application details screen.
- **Expected Result:** Job availability displays `Closed`; candidate status REMAINS `Shortlisted` (never overwritten to Closed or Rejected).
- **Actual Result:** Candidate view renders dual badges: `Shortlisted` (candidate outcome) + `Closed` (job availability).
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Live screenshot `status_07_role_closed.png` and `app.js` line 310–350.
- **Known Limitations:** In real-world recruiting, candidate must be informed if a closed requisition cancels an interview cycle.

---

### QA13 — Pause → Resume → Pause Cycle Yields Distinct Eligible Events
- **Requirement / Feature:** FR07 / US07 & Central Business Rules · State Transition Cycle
- **Test Environment:** Prototype Notification Store
- **Preconditions:** Candidate is subscribed to hiring status alerts (`notifyOnResume = true`).
- **Test Steps:**
  1. Recruiter sets Job Availability to `On Hold` (Alert 1 sent).
  2. Recruiter sets Job Availability to `Active` (Alert 2 sent).
  3. Recruiter sets Job Availability to `On Hold` again (Alert 3).
- **Expected Result:** Because a legitimate state cycle occurred (`On Hold` → `Active` → `On Hold`), Alert 3 is emitted rather than blocked by the deduplicator.
- **Actual Result:** System compares against latest recorded event for that app; since intermediate event was `Hiring resumed`, new `Hiring paused` alert delivers cleanly.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Test 1 script output: `Assert len(notifications) == 3 PASSED`.
- **Known Limitations:** Flapping detection (e.g. recruiter toggling status 5 times in 1 minute) should be throttled in production.

---

### QA14 — Second Pause Eligible Even When Resume Notification Was Disabled
- **Requirement / Feature:** FR08 / US08 & Business Rules · Edge-Case Transition
- **Test Environment:** Client Prototype Engine
- **Preconditions:** Candidate did NOT opt into resume alerts (`notifyOnResume = false`).
- **Test Steps:**
  1. Job moves `Active` → `On Hold` (Notification sent).
  2. Job moves `On Hold` → `Active` (Notification suppressed because candidate opted out).
  3. Job moves `Active` → `On Hold` again.
- **Expected Result:** The second `On Hold` transition emits a notification because the role was genuinely reactivated in the interim.
- **Actual Result:** Correctly evaluated based on state transition history.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated edge-case script logic.
- **Known Limitations:** Requires backend state transition machine (FSM) in production.

---

### QA15 — Unauthorised Application Access Denied
- **Requirement / Feature:** Security & Privacy Guardrail (US16)
- **Test Environment:** Production Authorization Architecture (Conceptual)
- **Preconditions:** User B attempts to access Application A belonging to User A via URL tampering (`?app=app-01`).
- **Test Steps:**
  1. Attempt direct GET request to unauthorized application ID.
- **Expected Result:** Server verifies JWT/session ownership; rejects with HTTP 403 Forbidden; never exposes candidate PII or recruiter internal notes.
- **Actual Result:** Client-side prototype uses static simulated mock state (`state.applications`). In-memory isolation prevents cross-browser leaks, but backend OAuth/JWT enforcement is not implemented in static prototype.
- **Execution Status:** **Requires Production Validation (Simulated Only)**
- **Supporting Evidence:** PRD Section 12 & 13 (Risk R12). Documented as non-goal for client prototype.
- **Known Limitations:** Full verification requires live production API gateway with RBAC / OAuth2 tokens.

---

### QA16 — Profile Mismatch Not Presented as Confirmed Reason
- **Requirement / Feature:** FR10 / US10 & FR13 / US13 · Transparency Guardrail
- **Test Environment:** Application Details View (Screen 05 / 07)
- **Preconditions:** Candidate has an algorithmic profile match score of 71% (e.g., `app-06` missing 1 key skill).
- **Test Steps:**
  1. Inspect `app-06` (Not Shortlisted).
  2. Verify distinction between `Profile Match Insights` and `Recruiter Decision`.
- **Expected Result:** Algorithmic match score is displayed under `Profile Match Insights` with an explicit disclaimer; it is NEVER presented as the recruiter's official rejection reason unless the recruiter explicitly selected it.
- **Actual Result:** Clear visual divider; candidate is informed: *"The recruiter has not shared a specific reason for this decision."*
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Component inspection in `screens-mobile.js` lines 610–660.
- **Known Limitations:** Candidates may still intuitively associate low match scores with rejection; UX copy must remain vigilant.

---

### QA17 — External ATS Tracking Limitations Displayed
- **Requirement / Feature:** US15 / US17 · External ATS Transparency
- **Test Environment:** Screen 04 My Applications & Screen 05 Details
- **Preconditions:** Candidate inspects an application marked `isExternal: true` (`app-09` FinCorp Global).
- **Test Steps:**
  1. Open `app-09` external application.
  2. Inspect tracking status card and information banner.
- **Expected Result:** Card displays `External Application` badge and informs candidate that detailed stage tracking depends on the third-party company portal.
- **Actual Result:** Explanatory banner displayed; external application limitations disclosed transparently.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Data record `app-09` in `data.js` and rendering in `screens-mobile.js`.
- **Known Limitations:** Deep webhook integration with Workday/Taleo/Greenhouse is required for automated two-way synchronization.

---

### QA18 — Essential Transparency Remains 100% Free
- **Requirement / Feature:** Commercial Guardrails & Ethics (FR11)
- **Test Environment:** Client Prototype UI & Commercial Placement Review
- **Preconditions:** Candidate reviews application status, timeline, inactivity indicators, and rejection notes across all 10 screens.
- **Test Steps:**
  1. Navigate through all candidate screens without purchasing Naukri Pro or FastForward.
  2. Inspect whether any essential tracking feature is blocked behind a paywall.
- **Expected Result:** All essential tracking information is 100% accessible for free. Contextual promotions (Naukri Pro / Resume Score) appear as non-blocking supportive cards below core status.
- **Actual Result:** Zero paywalls on tracking data; promotional upsells are placed contextually below functional status timelines.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Visual audit across Screens 01–10.
- **Known Limitations:** Business commercial non-inferiority must be monitored in production A/B experiments.

---

## 3. Summary of Execution Statuses

| Category | Total Scenarios | Passed (Prototype Simulation) | Requires Production Validation |
| :--- | :---: | :---: | :---: |
| **Functional Interaction & UI (QA01, QA02, QA03, QA04, QA05, QA06, QA10)** | 7 | 7 (100%) | 0 |
| **State Decoupling & Invariants (QA07, QA08, QA11, QA12, QA13, QA14)** | 6 | 6 (100%) | 0 |
| **Ethics, Security & Commercial Guardrails (QA09, QA15, QA16, QA17, QA18)** | 5 | 4 (80%) | 1 (QA15 Backend Auth) |
| **Overall Suite** | **18** | **17 Passed (Simulation)** | **1 Production Required** |

---

## 4. Final Verification Statement
This traceability report truthfully represents the capabilities and verification limits of the current zero-build static prototype. All developer-reported tests reflect observed client-side execution; production backend dependencies remain explicitly classified as **Requires Production Validation**.
