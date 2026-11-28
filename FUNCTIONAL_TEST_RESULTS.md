# Naukri Application Clarity V2.1 — Executable Functional Test Results (QA01–QA39 & BUG01–BUG12)

**Execution Date:** 28 November 2026 | **Runtime:** Node.js v20.18.0 (Real Executable Assertions)
**Summary:** 50 Passed, 1 Requires Production Validation, 0 Failed.
**Total Verified Assertions:** 128 strict equality and precondition checks.

## 1. QA01–QA39 Core & Progression Regression Suite

| ID | Scenario | Category | Execution Status | Supporting Evidence / Assertion Outcome |
|---|---|---|---|---|
| **QA01** | Submission Navigation | Submission | ✅ **Passed (Executable Assertions)** | App app-01 verified with initial status 'Awaiting Action' |
| **QA02** | Submission Recovery & Closed Role Rejection | Recovery | ✅ **Passed (Executable Assertions)** | Closed job job-103 correctly rejects application submissions |
| **QA03** | Inactivity Does Not Imply Rejection | Inactivity | ✅ **Passed (Executable Assertions)** | App-04 has 37 days elapsed; status is 'Awaiting Action' |
| **QA04** | Inactivity Threshold Bands | Inactivity | ✅ **Passed (Executable Assertions)** | All 4 discrete inactivity bands map correctly at boundary values |
| **QA05** | Recency Update on Decision | Recency | ✅ **Passed (Executable Assertions)** | Candidate decision updates recency timestamp |
| **QA06** | Unrelated Recruiter Login Immunity | Recency | ✅ **Passed (Executable Assertions)** | Candidate clock preserved (37 days, date: 21 Oct 2026) |
| **QA07** | Notification Event Deduplication | Notification | ✅ **Passed (Executable Assertions)** | Deduplication verified across 7 notification records |
| **QA08** | Out-of-Order Event Protection | State Invariant | ✅ **Passed (Executable Assertions)** | Authoritative newer state Shortlisted protected from older Viewed event |
| **QA09** | Notification Preferences Respected | Preferences | ✅ **Passed (Executable Assertions)** | Notification preference state correctly suppresses disabled categories |
| **QA10** | Archive Invariance | Organization | ✅ **Passed (Executable Assertions)** | Archived application updated to Viewed without withdrawing |
| **QA11** | Contextual Not Shortlisted (Missing Reason) | Decision | ✅ **Passed (Executable Assertions)** | Not Shortlisted displayed; missing reason labeled unavailable, not inferred from match gaps |
| **QA12** | Role Closure Shortlist Preservation | Availability | ✅ **Passed (Executable Assertions)** | Independent axes verified: Candidate Shortlisted, Role Closed |
| **QA13** | Role State Transitions (Pause/Resume) | Availability | ✅ **Passed (Executable Assertions)** | Role transitions between Active and On Hold create auditable events |
| **QA14** | Resume Alert Disabling | Communication | ✅ **Passed (Executable Assertions)** | Disabling resume alert does not block subsequent hiring pause notifications |
| **QA15** | Production Backend Authorization Check | Platform Security | ⚠️ **Requires Production Validation** | Static prototype cannot verify server-side JWT auth, distributed rate-limiting or multitenancy. |
| **QA16** | Reconsideration Reset | Decision | ✅ **Passed (Executable Assertions)** | Reconsideration clears rejection reason and resets status to Viewed |
| **QA17** | Cross-Platform State Parity | Cross-Platform | ✅ **Passed (Executable Assertions)** | Single central store drives both mobile and desktop viewports |
| **QA18** | Free Essential Access Parity | Monetization | ✅ **Passed (Executable Assertions)** | All core tracking, interview coordination, and attendance actions remain 100% free |
| **QA19** | Homepage Summary Counts | Summary | ✅ **Passed (Executable Assertions)** | Homepage summary counts: Total=10, Awaiting=4 |
| **QA20** | Application Filters Combination | Navigation | ✅ **Passed (Executable Assertions)** | Filtered to 2 shortlisted applications; reset restores full list |
| **QA21** | Approved Reason Taxonomy Privacy | Privacy | ✅ **Passed (Executable Assertions)** | Taxonomy contains 5 approved recruiter reasons; unapproved free text suppressed |
| **QA22** | Recruiter Workflow Invariant | Integration | ✅ **Passed (Executable Assertions)** | Recruiter review action synchronizes candidate status without duplicate entry |
| **QA23** | Employer Identity Provenance | Trust | ✅ **Passed (Executable Assertions)** | Label verified: 'Verified Employer · Domain confirmed' displays provenance without guaranteeing job authenticity |
| **QA24** | Pre-Apply Availability Check | Availability | ✅ **Passed (Executable Assertions)** | Closed position job-103 safely halts submission before apply confirmation |
| **QA25** | Contextual Profile Fit Gaps | Relevance | ✅ **Passed (Executable Assertions)** | Evaluates 5 specific JD criteria without inventing selection prediction |
| **QA26** | Structured Interview Invitation (FR18) | Interview | ✅ **Passed (Executable Assertions)** | Invitation int-880mzx7h8 created; duplicate safely blocked: 'Active interview or invitation already exists for this round' |
| **QA27** | Candidate Accept & Decline (FR19) | Coordination | ✅ **Passed (Executable Assertions)** | Accept sets status Confirmed; Decline sets status Cancelled with reason |
| **QA28** | Versioned Interview Rescheduling (FR20) | Scheduling | ✅ **Passed (Executable Assertions)** | Reschedule confirmed: v2 slot 2026-12-08T05:30:00.000Z |
| **QA29** | Contextual Reminder Invalidation (FR21) | Communication | ✅ **Passed (Executable Assertions)** | Reminder status moved from active to 'invalidated' on cancellation |
| **QA30** | Calendar Assistance .ics Generation (FR22) | Coordination | ✅ **Passed (Executable Assertions)** | RFC 5545 valid .ics generated for confirmed slot; rejected for cancelled slot |
| **QA31** | Candidate Attendance Confirmation (FR23) | Attendance | ✅ **Passed (Executable Assertions)** | Candidate confirmed attended; Recruiter remains pending; CAIR qualified: false |
| **QA32** | Recruiter Interviewed Confirmation (FR24) | Attendance | ✅ **Passed (Executable Assertions)** | Recruiter confirmed conducted; Candidate remains pending; CAIR qualified: false |
| **QA33** | Dual Confirmation Outcome Qualification (FR25) | Progression | ✅ **Passed (Executable Assertions)** | Positive + Positive yields Dual Confirmed and qualifies for CAIR |
| **QA34** | Conflicting Attendance Disputed State (FR25) | Progression | ✅ **Passed (Executable Assertions)** | Positive + Negative yields Disputed status; disqualified from CAIR |
| **QA35** | Application Withdrawal vs Archive (FR26) | Autonomy | ✅ **Passed (Executable Assertions)** | Withdrawal transitions application to Withdrawn and cancels active uncompleted interview |
| **QA36** | Reported No-Show vs Missing Confirmation (FR27) | Terminal State | ✅ **Passed (Executable Assertions)** | Missing confirmation = 'Pending' vs Dual negative = 'Not Attended' |
| **QA37** | Cohort Anchor at 3rd Application (FR28) | Analytics | ✅ **Passed (Executable Assertions)** | Cohort anchored at 3rd application within 7 days (anchor ID: a3) |
| **QA38** | Mature vs Immature Cohort 14-Day Boundary (FR28) | Analytics | ✅ **Passed (Executable Assertions)** | Maturity strictly enforces 14-day threshold (Day 13 Immature vs Day 14 Mature) |
| **QA39** | Seeker Numerator Deduplication (FR28) | Analytics | ✅ **Passed (Executable Assertions)** | 2 dual-confirmed interviews for seeker-A count exactly once in CAIR numerator (100.0%) |

## 2. Independent Audit Issue Matrix (BUG-01 through BUG-12)

| Bug ID | Audit Focus | Category | Execution Status | Actual Verified Behavior |
|---|---|---|---|---|
| **BUG-01** | Premature Attendance Rejection | Integrity | ✅ **Resolved & Verified** | Premature confirmation correctly rejected: 'Cannot record attendance before interview occurrence (3 Dec 2026 at 14:00). Advance the simulated Demo Clock to record attendance.' |
| **BUG-02** | Exact 14-Day CAIR Window Boundary (±1 ms) | Analytics | ✅ **Resolved & Verified** | Boundary precision verified: exactly at 14d qualifies (1); 1ms past 14d disqualified (0) |
| **BUG-03** | Missing Seeker ID Rejection | Data Integrity | ✅ **Resolved & Verified** | Records with missing seekerId rejected from cohort calculation |
| **BUG-04** | Multiple Interviews Per Application | Lifecycle | ✅ **Resolved & Verified** | Multi-round coordination supported (Round 1 Case & Round 2 Leadership) |
| **BUG-05** | Withdrawal After Completed Interview | Integrity | ✅ **Resolved & Verified** | Completed interview outcome and history preserved after subsequent withdrawal |
| **BUG-06** | Cancelled Before Occurrence CAIR Disqualification | Analytics | ✅ **Resolved & Verified** | Cancelled interview correctly yields CAIR qualified = false |
| **BUG-07** | Negative + Unknown Attendance Outcome | Attendance | ✅ **Resolved & Verified** | Candidate negative + recruiter unknown = 'Reported Non-Attendance, Awaiting Other Party' |
| **BUG-08** | Reminder Invalidation on Reschedule | Communication | ✅ **Resolved & Verified** | Old reminder marked invalidated upon schedule change |
| **BUG-09** | Expired Invitation Acceptance Rejection | Lifecycle | ✅ **Resolved & Verified** | Expired invite safely blocked: 'Invitation has expired and cannot be accepted without recruiter re-issuance' |
| **BUG-10** | Invalid Attendance Input Validation | Integrity | ✅ **Resolved & Verified** | Invalid roles and results rejected with descriptive error messages |
| **BUG-11** | Attendance Confirmation Idempotency | Integrity | ✅ **Resolved & Verified** | Repeated identical confirmation returns idempotent success without duplicate logging |
| **BUG-12** | Attendance Record Correction Audit | Audit | ✅ **Resolved & Verified** | Correction logged in audit trail; previous positive record preserved |
