# Functional Test Results

All checks below are verified via automated headless browser testing against the local server (`http://localhost:8765/`) and the live GitHub Pages deployment (`https://jayeshpariharr.github.io/naukri-application-clarity/`).

| Test Scenario | Expected Behavior | Status |
| --- | --- | --- |
| **Apply & Track Application Flow** | Open `ZenithPay India` → `Apply` → `Applied Successfully` → `Track Application` → Screen 05 (`Application Sent`, `Hiring Active`). Works on Mobile & Desktop. | **PASS** |
| **Application Filters & Archive/Restore** | Category underline tabs + lightweight status filter chips (`All Applications`, `Awaiting Action`, `Viewed`, `Shortlisted`, `Not Shortlisted`, `Closed`, `Archived`); `Closed` matches closed jobs without overwriting individual decisions; Archive & Restore update counts cleanly. | **PASS** |
| **Recruiter Shortlist & Rejection Sync** | Shortlist / Reject (with optional structured reason) syncs live to candidate Mobile & Desktop views without altering historical timeline events or emitting duplicates on repeated identical actions. | **PASS** |
| **Hiring Pause, Closure & Reopening** | Marking a job `On Hold`, `Closed`, or reopening to `Active` updates `hiringStatus` and `hiringStatusUpdated` independently — preserving existing `Shortlisted` or `Not Shortlisted` candidate decisions and avoiding resetting a rejected candidate to `Viewed`. | **PASS** |
| **Notification Preferences & Deduplication** | Toggling `applicationUpdates`, `hiringStatusChanges`, `recruiterActivity`, and `notifyOnResume` controls simulated notification delivery; repeated identical actions do not emit duplicate notifications; `Application Updates` and `Recruiter Activity` remain clearly separated. | **PASS** |
| **Before vs. After Visual Comparisons** | All 10 comparison sections render (including `05 · Prolonged Application Inactivity` paired with `before-timeline-mobile.jpg`); `"Original Naukri screenshot compared with the proposed prototype using illustrative application data."` caption displayed; Lightbox zoom, annotations toggle, and `View Interactive Screen →` work cleanly. | **PASS** |
| **Mobile (`390x844`) & Desktop (`1280x800`) Responsiveness** | Zero page-level horizontal overflow (`scrollWidth <= innerWidth`), zero failed requests, and zero console errors across Mobile, Desktop Web, Recruiter Panel, Before vs. After, and Design Rationale. | **PASS** |
