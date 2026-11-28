# Naukri Application Clarity V2.2 — Executable Functional Test Results (QA01–QA39 & BUG01–BUG12)

**Execution Date:** 28 November 2026 | **Runtime:** Node.js v20.18.0 (Real Executable Assertions)
**Summary:** 58 Passed, 1 Requires Production Validation, 0 Failed.
**Total Verified Assertions:** 150 strict equality and precondition checks.

## 1. QA01–QA39 Core & Progression Regression Suite

| ID | Scenario | Category | Coverage Classification | Execution Status | Supporting Evidence / Assertion Outcome |
|---|---|---|---|---|---|
| **QA01** | Submission Navigation | Submission | **Fixture validation** | ✅ **Passed (Executable Assertions)** | App app-01 verified with initial status 'Awaiting Action' |
| **QA02** | Submission Recovery & Closed Role Rejection | Recovery | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Closed job job-103 correctly rejects application submissions |
| **QA03** | Inactivity Does Not Imply Rejection | Inactivity | **Fixture validation** | ✅ **Passed (Executable Assertions)** | App-04 has 37 days elapsed; status is 'Awaiting Action' |
| **QA04** | Inactivity Threshold Bands | Inactivity | **Fixture validation** | ✅ **Passed (Executable Assertions)** | All 4 discrete inactivity bands map correctly at boundary values |
| **QA05** | Recency Update on Decision | Recency | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Candidate decision updates recency timestamp |
| **QA06** | Unrelated Recruiter Login Immunity | Recency | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Candidate clock preserved (37 days, date: 21 Oct 2026) |
| **QA07** | Notification Event Deduplication | Notification | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Deduplication verified across 7 notification records |
| **QA08** | Out-of-Order Event Protection | State Invariant | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Authoritative newer state Shortlisted protected from older Viewed event |
| **QA09** | Notification Preferences Respected | Preferences | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Notification preference state correctly suppresses disabled categories |
| **QA10** | Archive Invariance | Organization | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Archived application updated to Viewed without withdrawing |
| **QA11** | Contextual Not Shortlisted (Missing Reason) | Decision | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Not Shortlisted displayed; missing reason labeled unavailable, not inferred from match gaps |
| **QA12** | Role Closure Shortlist Preservation | Availability | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Independent axes verified: Candidate Shortlisted, Role Closed |
| **QA13** | Role State Transitions (Pause/Resume) | Availability | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Role transitions between Active and On Hold create auditable events |
| **QA14** | Resume Alert Disabling | Communication | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Disabling resume alert does not block subsequent hiring pause notifications |
| **QA15** | Production Backend Authorization Check | Platform Security | **Requires Production Validation** | ⚠️ **Requires Production Validation** | Static prototype cannot verify server-side JWT auth, distributed rate-limiting or multitenancy. |
| **QA16** | Reconsideration Reset | Decision | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Reconsideration clears rejection reason and resets status to Viewed |
| **QA17** | Cross-Platform State Parity | Cross-Platform | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Single central store drives both mobile and desktop viewports |
| **QA18** | Free Essential Access Parity | Monetization | **Fixture validation** | ✅ **Passed (Executable Assertions)** | All core tracking, interview coordination, and attendance actions remain 100% free |
| **QA19** | Homepage Summary Counts | Summary | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Homepage summary counts: Total=10, Awaiting=4 |
| **QA20** | Application Filters Combination | Navigation | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Filtered to 2 shortlisted applications; reset restores full list |
| **QA21** | Approved Reason Taxonomy Privacy | Privacy | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Taxonomy contains 5 approved recruiter reasons; unapproved free text suppressed |
| **QA22** | Recruiter Workflow Invariant | Integration | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Recruiter review action synchronizes candidate status without duplicate entry |
| **QA23** | Employer Identity Provenance | Trust | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Label verified: 'Verified Employer · Domain confirmed' displays provenance without guaranteeing job authenticity |
| **QA24** | Pre-Apply Availability Check | Availability | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Closed position job-103 safely halts submission before apply confirmation |
| **QA25** | Contextual Profile Fit Gaps | Relevance | **Fixture validation** | ✅ **Passed (Executable Assertions)** | Evaluates 5 specific JD criteria without inventing selection prediction |
| **QA26** | Structured Interview Invitation (FR18) | Interview | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Invitation int-i1rhz3c8h created; duplicate safely blocked: 'Active interview or invitation already exists for this round' |
| **QA27** | Candidate Accept & Decline (FR19) | Coordination | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Accept sets status Confirmed; Decline sets status Cancelled with reason |
| **QA28** | Versioned Interview Rescheduling (FR20) | Scheduling | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Reschedule confirmed: v2 slot 2026-12-08T05:30:00.000Z |
| **QA29** | Contextual Reminder Invalidation (FR21) | Communication | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Reminder status moved from active to 'invalidated' on cancellation |
| **QA30** | Calendar Assistance .ics Generation (FR22) | Coordination | **Domain unit test** | ✅ **Passed (Executable Assertions)** | RFC 5545 valid .ics generated for confirmed slot; rejected for cancelled slot |
| **QA31** | Candidate Attendance Confirmation (FR23) | Attendance | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Candidate confirmed attended; Recruiter remains pending; CAIR qualified: false |
| **QA32** | Recruiter Interviewed Confirmation (FR24) | Attendance | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Recruiter confirmed conducted; Candidate remains pending; CAIR qualified: false |
| **QA33** | Dual Confirmation Outcome Qualification (FR25) | Progression | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Positive + Positive yields Dual Confirmed and qualifies for CAIR |
| **QA34** | Conflicting Attendance Disputed State (FR25) | Progression | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Positive + Negative yields Disputed status; disqualified from CAIR |
| **QA35** | Application Withdrawal vs Archive (FR26) | Autonomy | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Withdrawal transitions application to Withdrawn and cancels active uncompleted interview |
| **QA36** | Reported No-Show vs Missing Confirmation (FR27) | Terminal State | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Missing confirmation = 'Pending' vs Dual negative = 'Not Attended' |
| **QA37** | Cohort Anchor at 3rd Application (FR28) | Analytics | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Cohort anchored at 3rd application within 7 days (anchor ID: a3) |
| **QA38** | Mature vs Immature Cohort 14-Day Boundary (FR28) | Analytics | **Domain unit test** | ✅ **Passed (Executable Assertions)** | Maturity strictly enforces 14-day threshold (Day 13 Immature vs Day 14 Mature) |
| **QA39** | Seeker Numerator Deduplication (FR28) | Analytics | **Domain unit test** | ✅ **Passed (Executable Assertions)** | 2 dual-confirmed interviews for seeker-A count exactly once in CAIR numerator (100.0%) |

## 2. Independent Audit Issue Matrix (BUG-01 through BUG-12)

| Bug ID | Audit Focus | Category | Execution Status | Actual Verified Behavior |
|---|---|---|---|---|---|
| **BUG-01** | Premature Attendance Rejection | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Premature confirmation correctly rejected: 'Cannot record attendance before interview occurrence (3 Dec 2026 at 14:00). Advance the simulated Demo Clock to record attendance.' |
| **BUG-02** | Exact 14-Day CAIR Window Boundary (±1 ms) | Analytics | **Domain unit test** | ✅ **Resolved & Verified** | Boundary precision verified: exactly at 14d qualifies (1); 1ms past 14d disqualified (0) |
| **BUG-03** | Missing Seeker ID Rejection | Data Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Records with missing seekerId rejected from cohort calculation |
| **BUG-04** | Multiple Interviews Per Application | Lifecycle | **Domain unit test** | ✅ **Resolved & Verified** | Multi-round coordination supported (Round 1 Case & Round 2 Leadership) |
| **BUG-05** | Withdrawal After Completed Interview | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Completed interview outcome and history preserved after subsequent withdrawal |
| **BUG-06** | Cancelled Before Occurrence CAIR Disqualification | Analytics | **Domain unit test** | ✅ **Resolved & Verified** | Cancelled interview correctly yields CAIR qualified = false |
| **BUG-07** | Negative + Unknown Attendance Outcome | Attendance | **Domain unit test** | ✅ **Resolved & Verified** | Candidate negative + recruiter unknown = 'Reported Non-Attendance, Awaiting Other Party' |
| **BUG-08** | Reminder Invalidation on Reschedule | Communication | **Domain unit test** | ✅ **Resolved & Verified** | Old reminder marked invalidated upon schedule change |
| **BUG-09** | Expired Invitation Acceptance Rejection | Lifecycle | **Domain unit test** | ✅ **Resolved & Verified** | Expired invite safely blocked: 'Invitation has expired and cannot be accepted without recruiter re-issuance' |
| **BUG-10** | Invalid Attendance Input Validation | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Invalid roles and results rejected with descriptive error messages |
| **BUG-11** | Attendance Confirmation Idempotency | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Repeated identical confirmation returns idempotent success without duplicate logging |
| **BUG-12** | Attendance Record Correction Audit | Audit | **Domain unit test** | ✅ **Resolved & Verified** | Correction logged in audit trail; previous positive record preserved |
| **BUG-13** | Identical Application Records Rejection (FR28) | Analytics | **Domain unit test** | ✅ **Resolved & Verified** | Three identical application records deduplicated by application ID; 0 eligible seekers qualified |
| **BUG-14** | Same Job Multiple Applications Rejection (FR28) | Analytics | **Domain unit test** | ✅ **Resolved & Verified** | Three distinct application IDs with identical job ID rejected; 3 distinct job IDs strictly required |
| **BUG-15** | Reschedule Rejection Post Attendance Recording | Lifecycle | **Domain unit test** | ✅ **Resolved & Verified** | Reschedule rejected after attendance recorded without authorized correction workflow |
| **BUG-16** | Recruiter Slot Substitution Protection | Lifecycle | **Domain unit test** | ✅ **Resolved & Verified** | Recruiter prevented from silently substituting an unrelated slot during reschedule confirmation |
| **BUG-17** | Completed Historical Outcome Cancellation Protection | Lifecycle | **Domain unit test** | ✅ **Resolved & Verified** | Completed historical interview outcomes strictly preserved from retroactive cancellation |
| **BUG-18** | Explicit Simulated Occurrence Requirement (FR23/FR24) | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Missing occurrence rejected without scheduled fallback; future occurrence timestamps rejected |
| **BUG-19** | CAIR Reporting Cutoff Confirmation Timestamp Enforcement (FR28) | Analytics | **Domain unit test** | ✅ **Resolved & Verified** | Confirmation recording timestamp strictly bounded by CAIR evaluation reference cutoff |
| **BUG-20** | Consistent Occurrence Timestamps Across Participants (FR25/FR28) | Integrity | **Domain unit test** | ✅ **Resolved & Verified** | Inconsistent occurrence timestamps rejected by recordAttendance and disqualified from CAIR |
