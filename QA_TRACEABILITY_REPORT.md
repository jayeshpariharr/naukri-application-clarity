# Naukri Application Clarity V2.0 — Requirement-Level QA Traceability Report (QA01–QA39)

**Document Version:** 2.0 (28 November 2026)  
**Standard Authority:** Naukri Master PRD V2.0 & Airtribe Capstone Evaluation Rubric  
**Execution Environment:** Node.js Pure Domain Engine & Browser Prototype Runtime  
**Summary:** 38 Passed (Prototype Simulation), 1 Requires Production Validation, 0 Failed.  
**Coverage:** 100% of Master PRD V2.0 requirements (FR01 through FR28) traced to regression & progression scenarios.

---

### Matrix Summary

| QA Scenario ID | Requirement / User Story | Category | Execution Status | Supporting Evidence | Known Limitations |
|---|---|---|---|---|---|
| **QA01** | FR01 / US01 · Track Application CTA | Submission | ✅ **Passed (Prototype Simulation)** | `#comp-apply-cta` routes cleanly; URL query params reflect `screen=details`. | Production depends on asynchronous queue ingestion. |
| **QA02** | FR01 / US01 · Failed Submission Recovery | Recovery | ✅ **Passed (Prototype Simulation)** | `applyToJob()` validates job availability, displays toast on closed position, halts submission. | Production requires offline sync and retry queues. |
| **QA03** | FR04 / US04 · Inactivity Explanation | Inactivity | ✅ **Passed (Prototype Simulation)** | Neutral callout rendered; status remains `Awaiting Action`; next-step CTA points to `Explore Similar Active Jobs`. | Real-world candidate reassurance requires longitudinal testing. |
| **QA04** | FR03 & FR04 · Inactivity Duration Bands | Timestamp | ✅ **Passed (Prototype Simulation)** | Discrete bands (0–6d, 7–13d, 14–29d, 30+d) render configurable wording. | Null timestamps must be handled in legacy migrations. |
| **QA05** | FR03 / US03 · Last Confirmed Update | Recency | ✅ **Passed (Prototype Simulation)** | Confirmed candidate events update recency timestamp; unrelated recruiter login or views do not reset clock. | WebSocket/push sync required for live multi-tab sessions. |
| **QA06** | FR03 / US03 · Null Timestamp Handling | Timestamp | ✅ **Passed (Prototype Simulation)** | Duration calculation is suppressed when timestamps are unverified; fallback label displays cleanly. | Database migration required for null timestamps in legacy data. |
| **QA07** | FR07 / US07 · Notification Deduplication | Notification | ✅ **Passed (Prototype Simulation)** | Deduplication key suppresses duplicate notifications per recipient/channel. | Distributed pub/sub requires idempotency keys. |
| **QA08** | FR02 / US02 · Timeline Exclusion of Private Notes | Timeline | ✅ **Passed (Prototype Simulation)** | Internal recruiter notes and unmapped internal states are excluded from candidate-visible timeline. | Authorization filters required on API response layer. |
| **QA09** | FR08 / US08 · Notification Preferences | Communication | ✅ **Passed (Prototype Simulation)** | Disabled category suppresses simulated dispatch; delivery history preserved. | Cross-device preference sync requires shared database store. |
| **QA10** | FR09 / US09 · Archive & Restore Invariance | Organization | ✅ **Passed (Prototype Simulation)** | Full timeline and background decision updates continue on archived applications without withdrawal. | Requires indexing on active vs archived queries. |
| **QA11** | FR10 / US10 · Contextual Not Shortlisted | Decision | ✅ **Passed (Prototype Simulation)** | Explicit Not Shortlisted status displayed; missing reason labeled unavailable, not inferred from match gaps. | Recruiter optional reason input requires adoption incentive. |
| **QA12** | FR12 / US12 · Role Closure Shortlist Preservation | Availability | ✅ **Passed (Prototype Simulation)** | Role closed independently; individual candidate status remains `Shortlisted`. | Independent role state and application state tables required. |
| **QA13** | FR12 / US12 · State Transitions (Pause/Resume) | Availability | ✅ **Passed (Prototype Simulation)** | State transitions between Active and On Hold create distinct audit events without corrupting history. | Freshness policy required for stale postings. |
| **QA14** | FR08 & FR12 · Notification Category Disabling | Communication | ✅ **Passed (Prototype Simulation)** | Suppressed intermediate resume notifications do not block future eligible pause notifications. | Requires state machine for notification category dependencies. |
| **QA15** | Security & Backend Authorization | Platform | ⚠️ **Requires Production Validation** | Static frontend simulation cannot verify server-side JWT authentication, rate limiting, and database multitenancy. | Strictly requires production microservices and auth infrastructure. |
| **QA16** | FR10 & FR13 · Reconsideration Reset | Decision | ✅ **Passed (Prototype Simulation)** | Reconsideration cleanly resets current decision fields while preserving historical timeline. | Audit logging required for re-evaluation compliance. |
| **QA17** | Mobile/Desktop State Parity | Cross-Platform | ✅ **Passed (Prototype Simulation)** | Central store ensures single source of truth across mobile, desktop, and recruiter views. | Responsive layout requires CSS breakpoint testing across devices. |
| **QA18** | FR11 / US11 · Free Essential Access | Monetization | ✅ **Passed (Prototype Simulation)** | All tracking, interview scheduling, and attendance confirmations are 100% accessible on free accounts. | Commercial services placed outside core essential flow. |
| **QA19** | FR05 / US05 · Homepage Summary Counts | Summary | ✅ **Passed (Prototype Simulation)** | Summary tiles match filtered lists exactly; loading states avoid fabricated zero counts. | Cache invalidation required on new event ingestion. |
| **QA20** | FR06 / US06 · Application Filter Combinations | Navigation | ✅ **Passed (Prototype Simulation)** | Filter combination returns matching records; archive excluded by default; reset restores full default list. | Query performance optimization for high-volume accounts. |
| **QA21** | FR13 / US13 · Approved Reason Privacy | Privacy | ✅ **Passed (Prototype Simulation)** | Only recruiter-approved reason taxonomy is exposed; private internal notes excluded. | Strict taxonomy enforcement on API mutation endpoints. |
| **QA22** | FR14 / US14 · Recruiter Workflow Sync | Integration | ✅ **Passed (Prototype Simulation)** | Recruiter dashboard status change syncs to candidate application tracker without duplicate entries. | Requires event contracts with existing ATS/recruiter tools. |
| **QA23** | FR15 / US15 · Employer Identity Provenance | Trust | ✅ **Passed (Prototype Simulation)** | Employer identity displays scope and verification provenance without guaranteeing job authenticity. | Trust & Safety verification pipeline required in production. |
| **QA24** | FR16 / US16 · Pre-Apply Availability | Availability | ✅ **Passed (Prototype Simulation)** | Confirmed closed position prevents submission with clear user feedback. | Race condition handling for concurrent closures during apply. |
| **QA25** | FR17 / US17 · Contextual Profile Fit | Relevance | ✅ **Passed (Prototype Simulation)** | Displays specific JD criteria without inventing subjective scores or predicting selection. | Parsing accuracy depends on structured JD inputs. |
| **QA26** | FR18 / US18 · Structured Interview Invitation | Invitation | ✅ **Passed (Prototype Simulation)** | Invitation created with verified format, meeting link, and timestamps; duplicate invite safely blocked. | External calendar integration requires OAuth permissions. |
| **QA27** | FR19 / US19 · Candidate Accept & Decline | Coordination | ✅ **Passed (Prototype Simulation)** | Candidate accept confirms schedule; decline records timestamp and legitimate non-selection reason. | Decline feedback should be shared constructively. |
| **QA28** | FR20 / US20 · Versioned Rescheduling | Scheduling | ✅ **Passed (Prototype Simulation)** | Proposed slot stored as Reschedule Pending; recruiter confirmation increments version to v2 and updates slot. | Calendar conflict detection requires calendar API read access. |
| **QA29** | FR21 / US21 · Reminder Invalidation | Communication | ✅ **Passed (Prototype Simulation)** | Reschedule or cancellation invalidates obsolete attendance reminders. | Push notification scheduler requires job queue cancellation. |
| **QA30** | FR22 / US22 · Calendar Assistance (.ics) | Coordination | ✅ **Passed (Prototype Simulation)** | Generated RFC 5545 compliant .ics file with explicit timezone, format, and disclaimer. | Local calendar updates do not sync back to platform. |
| **QA31** | FR23 / US23 · Candidate Independent Attendance | Attendance | ✅ **Passed (Prototype Simulation)** | Candidate confirms attendance independently; recruiter record remains null (Pending). | Disputed attendances require neutral mediation mechanism. |
| **QA32** | FR24 / US24 · Recruiter Interviewed Confirmation | Attendance | ✅ **Passed (Prototype Simulation)** | Recruiter confirms interview conducted; candidate attendance remains uncoupled. | Recruiter participation requires minimal friction UI. |
| **QA33** | FR25 / US25 · Dual Confirmation Outcome | Progression | ✅ **Passed (Prototype Simulation)** | Both candidate and recruiter positive attendance records qualify interview as Dual Confirmed. | Both sides must confirm within reconciliation window. |
| **QA34** | FR25 / US25 · Dispute Resolution | Progression | ✅ **Passed (Prototype Simulation)** | Candidate positive vs Recruiter no-show yields Disputed status; excluded from CAIR until reconciled. | Requires human/automated audit for conflicting reports. |
| **QA35** | FR26 / US26 · Application Withdrawal vs Archive | Autonomy | ✅ **Passed (Prototype Simulation)** | Application status is Withdrawn; active interview schedule cancelled; audit history intact. | Cannot withdraw external applications directly. |
| **QA36** | FR27 / US27 · No-Show vs Missing Confirmation | Terminal State | ✅ **Passed (Prototype Simulation)** | Distinguishes unrecorded confirmation (Pending) from reported dual no-show (Not Attended). | Unilateral no-show claims must not penalize candidate. |
| **QA37** | FR28 / US28 · Cohort Anchor at 3rd Application | Analytics | ✅ **Passed (Prototype Simulation)** | Three distinct qualifying applications within 7 days establish cohort anchor at 3rd application. | Multi-account identity resolution required in production. |
| **QA38** | FR28 / US28 · 14-Day Maturity Window | Analytics | ✅ **Passed (Prototype Simulation)** | Cohort correctly matures at 14 days past anchor; immature cohorts excluded from CAIR denominator. | Real-time dashboards must filter out immature cohorts. |
| **QA39** | FR28 / US28 · Seeker Numerator Deduplication | Analytics | ✅ **Passed (Prototype Simulation)** | Multiple dual-confirmed interviews for the same seeker count exactly once in CAIR numerator. | Requires seeker-level aggregation rather than application-level. |

---

### Detailed Scenario Traceability (QA19–QA39 Highlights)

#### QA26 — Structured Interview Invitation (FR18)
- **Requirement / Feature:** FR18 / US18 · Structured Invitation (F18)
- **Test Environment:** Pure Domain Engine & Browser View
- **Preconditions:** Candidate is shortlisted for a position (e.g. `app-05` CloudPulse SaaS).
- **Test Steps:**
  1. Trigger `createInvitation()` with application ID, round name, format, and slot.
  2. Inspect generated interview entity and candidate application card.
  3. Attempt duplicate invitation dispatch.
- **Expected Result:** Invitation entity created with unique ID; application status moves to Shortlisted; duplicate invitation is safely rejected.
- **Actual Result:** `createInvitation()` returns success with `int-01`; duplicate attempt returns `{ success: false, error: 'Active interview or invitation already exists' }`.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated test assertion in `run_python_tests.py` line 92.
- **Known Limitations:** Production requires OAuth integrations with Google Meet and Zoom APIs.

#### QA28 — Versioned Rescheduling (FR20)
- **Requirement / Feature:** FR20 / US20 · Rescheduling (F20)
- **Test Environment:** Pure Domain Engine & Browser View
- **Preconditions:** Interview is confirmed at slot T1 (`schedule_version: 1`).
- **Test Steps:**
  1. Candidate calls `proposeReschedule()` with alternative slot T2.
  2. Inspect interview state (`Reschedule Pending`) and proposed slot.
  3. Recruiter calls `confirmReschedule()`.
- **Expected Result:** Proposed slot remains pending without overwriting current slot until recruiter confirmation; confirmation increments schedule version to `2`.
- **Actual Result:** Interview transitions from `Reschedule Pending` to `Confirmed` with `schedule_version: 2` and updated start time.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated test assertion in `run_python_tests.py` line 108.
- **Known Limitations:** Automated slot collision detection with candidate personal calendar requires calendar read permissions.

#### QA33 — Dual Confirmation Outcome Qualification (FR25)
- **Requirement / Feature:** FR25 / US25 · Dual Confirmation (F25)
- **Test Environment:** Pure Domain Engine
- **Preconditions:** Interview schedule is confirmed.
- **Test Steps:**
  1. Candidate records positive attendance (`recordAttendance(..., actor_role: 'candidate', result: 'positive')`).
  2. Recruiter records positive attendance (`recordAttendance(..., actor_role: 'recruiter', result: 'positive')`).
  3. Call `deriveOutcome()`.
- **Expected Result:** Outcome derives as `Confirmed` (CAIR qualified: true); timeline appends dual confirmation event.
- **Actual Result:** Outcome returns `{ status: 'Confirmed', qualified: true }`; dual confirmation logged.
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated test assertion in `run_python_tests.py` line 144.
- **Known Limitations:** Production reconciliation requires asynchronous event matching between mobile push and ATS webhooks.

#### QA37–QA39 — Cohort Instrumentation & CAIR Measurement (FR28)
- **Requirement / Feature:** FR28 / US28 · Cohort Instrumentation & CAIR Engine
- **Test Environment:** Analytics Engine
- **Preconditions:** Seeker submits 3 distinct applications within 7 days.
- **Test Steps:**
  1. Verify cohort anchor at 3rd application timestamp.
  2. Test maturity boundary at 14 days (immature vs mature cohorts).
  3. Test multiple dual-confirmed interviews for the same seeker.
- **Expected Result:** Immature cohorts excluded from denominator; mature cohorts evaluate dual-confirmed interviews within 14-day window; multiple interviews qualify seeker exactly once.
- **Actual Result:** `calculateCAIR()` enforces 7-day anchor window, 14-day maturity exclusion, and deduplicates seeker numerator (1 seeker = 1 count).
- **Execution Status:** **Passed (Prototype Simulation)**
- **Supporting Evidence:** Automated test assertions in `run_python_tests.py` lines 170–210.
- **Known Limitations:** Cross-device multi-account tracking requires verified mobile phone number identity resolution.
