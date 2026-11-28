# Naukri Application Clarity V2.0 — Functional Test Results & Traceability Matrix (QA01–QA39)

**Execution Date:** 28 November 2026 | **Environment:** Pure Domain Engine & Browser Prototype Runtime  
**Summary:** 38 Passed (Prototype Simulation), 1 Requires Production Validation, 0 Failed.  
**Coverage:** 100% of Master PRD V2.0 requirements (FR01 through FR28) traced to regression & progression scenarios.

| ID | Scenario Name | Status | Supporting Evidence & Notes |
|---|---|---|---|
| **QA01** | Submit active fixture and track | ✅ **Passed (Prototype Simulation)** | Target application routes directly to tracking view with submission state and stable application ID. |
| **QA02** | Retry same submission / fail submission | ✅ **Passed (Prototype Simulation)** | Duplicate submission with existing ID is prevented; closed position rejects new submission without duplicate records. |
| **QA03** | Insert historical event; inspect inactivity | ✅ **Passed (Prototype Simulation)** | Inactivity days elapsed calculated accurately; status remains 'Awaiting Action' or 'Viewed' without inferred rejection. |
| **QA04** | Advance to 7/14/30 day boundaries | ✅ **Passed (Prototype Simulation)** | Configurable inactivity thresholds render exact discrete bands: 0–6d, 7–13d, 14–29d, 30+d. |
| **QA05** | Recruiter login or role pause recency unchanged | ✅ **Passed (Prototype Simulation)** | Unrelated recruiter login or role state changes do not reset candidate recency clock. |
| **QA06** | Missing timestamp / new decision | ✅ **Passed (Prototype Simulation)** | Null/missing timestamps suppress calculated duration and display 'Date unavailable' safely. |
| **QA07** | Deliver event twice deduplication | ✅ **Passed (Prototype Simulation)** | Event-level deduplication key ensures single notification delivery per recipient and channel. |
| **QA08** | Inject private note / unknown event exclusion | ✅ **Passed (Prototype Simulation)** | Internal recruiter notes and unmapped internal states are excluded from candidate-visible timeline. |
| **QA09** | Disable preference then dispatch | ✅ **Passed (Prototype Simulation)** | Disabled notification category suppresses simulated dispatch while preserving delivery history. |
| **QA10** | Archive, update, restore preserves history without withdrawal | ✅ **Passed (Prototype Simulation)** | Archived applications continue receiving background decision events; restoring displays full history. |
| **QA11** | Confirm not shortlisted without reason | ✅ **Passed (Prototype Simulation)** | Explicit Not Shortlisted status displayed; missing reason labeled unavailable, not inferred from match gaps. |
| **QA12** | Close role with shortlisted candidate | ✅ **Passed (Prototype Simulation)** | Role closure is independent; individual candidate status remains 'Shortlisted'. |
| **QA13** | Reopen then pause role states | ✅ **Passed (Prototype Simulation)** | Transitions between Active and On Hold create distinct audit events without corrupting history. |
| **QA14** | Disable resume alerts then pause again | ✅ **Passed (Prototype Simulation)** | Suppressed intermediate resume notifications do not block future eligible pause notifications. |
| **QA15** | Production backend authorization check | ⚠️ **Requires Production Validation** | Static frontend simulation cannot verify server-side JWT authentication, rate limiting, and database multitenancy. *(Requires production microservices.)* |
| **QA16** | Reconsider rejected candidate | ✅ **Passed (Prototype Simulation)** | Reconsideration cleanly resets current decision fields while preserving historical timeline. |
| **QA17** | Mobile/desktop/recruiter state parity | ✅ **Passed (Prototype Simulation)** | Central store ensures single source of truth across mobile, desktop, and recruiter views. |
| **QA18** | Free user completes journey without mandatory paywall | ✅ **Passed (Prototype Simulation)** | All tracking, interview scheduling, and attendance confirmations are 100% accessible on free accounts. |
| **QA19** | Homepage count and destination agreement | ✅ **Passed (Prototype Simulation)** | Summary tiles match filtered lists exactly; loading states avoid fabricated zero counts. |
| **QA20** | Combine filters and reset | ✅ **Passed (Prototype Simulation)** | Filter combination returns matching records; archive excluded by default; reset restores full default list. |
| **QA21** | Approved reason vs private reason privacy check | ✅ **Passed (Prototype Simulation)** | Only recruiter-approved reason taxonomy is exposed; private internal notes excluded. |
| **QA22** | Simulated existing recruiter event integration | ✅ **Passed (Prototype Simulation)** | Recruiter dashboard status change syncs to candidate application tracker without duplicate entries. |
| **QA23** | Scoped identity check and verification provenance | ✅ **Passed (Prototype Simulation)** | Employer identity displays scope and verification provenance without guaranteeing job authenticity. |
| **QA24** | Closed job prevents new submission | ✅ **Passed (Prototype Simulation)** | Job closed state verified; submission is prevented with clear user feedback. |
| **QA25** | Contextual known and missing fit criteria | ✅ **Passed (Prototype Simulation)** | Displays specific JD criteria without inventing subjective scores or predicting selection. |
| **QA26** | Structured interview invitation (FR18) | ✅ **Passed (Prototype Simulation)** | Invitation created with verified format, meeting link, and timestamps; duplicate invite safely blocked. |
| **QA27** | Candidate invitation accept & decline (FR19) | ✅ **Passed (Prototype Simulation)** | Candidate accept confirms schedule; decline records timestamp and legitimate non-selection reason. |
| **QA28** | Versioned interview rescheduling (FR20) | ✅ **Passed (Prototype Simulation)** | Proposed slot stored as Reschedule Pending; recruiter confirmation increments version to v2 and updates slot. |
| **QA29** | Contextual reminder invalidation on reschedule/cancellation (FR21) | ✅ **Passed (Prototype Simulation)** | Reschedule or cancellation invalidates obsolete attendance reminders. |
| **QA30** | Calendar assistance .ics generation (FR22) | ✅ **Passed (Prototype Simulation)** | Generated RFC 5545 compliant .ics file with explicit timezone, format, and disclaimer. |
| **QA31** | Candidate independent attendance confirmation (FR23) | ✅ **Passed (Prototype Simulation)** | Candidate confirms attendance independently; recruiter record remains null (Pending). |
| **QA32** | Recruiter independent interviewed confirmation (FR24) | ✅ **Passed (Prototype Simulation)** | Recruiter confirms interview conducted; candidate attendance remains uncoupled. |
| **QA33** | Dual confirmation outcome qualification (FR25) | ✅ **Passed (Prototype Simulation)** | Both candidate and recruiter positive attendance records qualify interview as Dual Confirmed. |
| **QA34** | Conflicting attendance reports enter Disputed state (FR25) | ✅ **Passed (Prototype Simulation)** | Candidate positive vs Recruiter no-show yields Disputed status; excluded from CAIR until reconciled. |
| **QA35** | Explicit withdrawal distinct from archive (FR26) | ✅ **Passed (Prototype Simulation)** | Application status is Withdrawn; active interview schedule cancelled; audit history intact. |
| **QA36** | Reported no-show distinguished from missing confirmation (FR27) | ✅ **Passed (Prototype Simulation)** | Distinguishes unrecorded confirmation (Pending) from reported dual no-show (Not Attended). |
| **QA37** | Cohort anchor at third application within 7 days (FR28) | ✅ **Passed (Prototype Simulation)** | Three distinct qualifying applications within 7 days establish cohort anchor at 3rd application. |
| **QA38** | Mature vs immature 14-day observation window (FR28) | ✅ **Passed (Prototype Simulation)** | Cohort correctly matures at 14 days past anchor; immature cohorts excluded from CAIR denominator. |
| **QA39** | Unique seeker numerator deduplication (FR28) | ✅ **Passed (Prototype Simulation)** | Multiple dual-confirmed interviews for the same seeker count exactly once in CAIR numerator. |
