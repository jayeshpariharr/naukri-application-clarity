# Naukri Application Clarity — Interactive Product Management Prototype

> **Disclaimer:** This is an **independent Product Management case study and unofficial prototype** created strictly for portfolio and educational purposes. It is not affiliated with, endorsed by, or connected to Info Edge (India) Ltd. or Naukri.com. All candidate, recruiter, and company records inside the prototype are completely fictional.

---

## 1. Overview & Problem Statement

Although Naukri.com already provides application tracking, candidates frequently experience uncertainty regarding application progress, hiring availability, and final outcomes when applications remain at **“Application Sent”**, **“Application Viewed”**, or **“Awaiting Recruiter Action”** for extended periods.

**Core Design Philosophy:** *Improve the experience, not reinvent the interface.*

Rather than redesigning Naukri's visual identity, navigation, business model, or recruiter panel, this prototype demonstrates incremental, high-clarity improvements across candidate mobile (dark theme), candidate desktop web (light theme), and recruiter response workflows.

---

## 2. Research Methodology & Directional Insights

The design decisions are informed by a multi-source qualitative and product discovery sample:
- **10 job seeker survey responses** (including **6 recent Naukri applicants**)
- **7 hiring professional responses**
- **4 Google Play Store reviews**
- **Existing Naukri desktop and mobile product audits**
- **Hands-on recruiter dashboard training** and **recruiter panel training video analysis**

> *Note: Findings reflect directional insights from a small research sample, not statistically representative metrics for all Naukri users.*

Key directional signals:
- **3 of 6** eligible job seekers received no response within 14 days.
- **3 of 6** struggled to understand what was happening to their applications.
- **2 of 6** reported applications viewed without a recruiter reply.
- Average confidence in job and recruiter genuineness was **2.67 / 5**.
- **5 of 7** hiring professionals cited **profile mismatch** as a reason for not replying, while **5 of 7** reported replying to **>60%** of applicants.
- Observed application timelines remained unchanged for **11–12 weeks**, while notifications skewed toward job recommendations and promotional content rather than individual application outcomes.

---

## 3. Proposed Features & Interactive Screens

- **Mobile App Prototype (Dark Theme — Screens 01–10):**
  - **01 Homepage:** Compact *My Applications* summary (`Total`, `Recent updates`, `Awaiting action`, `Needs attention`) integrated into the existing homepage stack.
  - **02 Job Details:** Verified hiring status (`Active`, `On Hold`, `Closed`), posting & status-updated dates, employer verification badge only when confirmed, `"Hiring status not confirmed"` fallback, and disabled Apply on closed roles.
  - **03 Application Success:** Submission date, next-step clarity, `Track Application` and `Explore Similar Jobs` CTAs above contextual Naukri Pro promotions.
  - **04 My Applications:** Existing categories (`Applies on Naukri`, `Recruiter Actions`, `Applies via Neo`, `External Applications`) + lightweight status filters, hiring availability, last active info, archive/restore, and explicit external ATS limited-visibility notices.
  - **05–09 Enhanced Application Details & Edge States:** Preserved timeline with plain-language explanations, configurable `7 / 14 / 30`-day non-punitive inactivity callouts, separate `Hiring On Hold` (with resume alert opt-in) and `Role Closed` states, and clear separation between automated `Profile Match Insights` and `Recruiter Decision Notes`.
  - **10 Notifications:** Outcome-focused categories (`All`, `Application Updates`, `Job Recommendations`, `Recruiter Activity`) deep-linking to each application + Notification Preferences.
- **11 Recruiter Panel Supporting Workflow (Light Theme):** Preserves `Manage Jobs and Responses` and `Job Responses` (`Shortlist` / `Maybe` / `Reject`, `Select All`) while adding an `On Hold` availability toggle, optional structured rejection reasons, and a live candidate-facing update preview that syncs directly to the candidate views.
- **12 Desktop Web Application Tracker (Light Theme):** Adapts the improvements to Naukri's split-pane list + horizontal timeline layout.
- **Before vs. After Comparisons & Design Rationale:** Built-in portfolio tabs alongside [DESIGN_RATIONALE.md](./DESIGN_RATIONALE.md).

---

## 4. Technology Stack

- **Frontend:** Vanilla HTML5, CSS3 (custom properties for Naukri Dark Mobile, Light Desktop, and Recruiter themes), and modular JavaScript (`ES5/ES6` zero-build static architecture for maximum portability).
- **Data & State:** Local fictional dataset ([data.js](./data.js)) and central client-side state store ([app.js](./app.js)) enabling live recruiter-to-candidate synchronization without a backend.
- **Deployment:** Static GitHub Pages hosting via GitHub Actions ([.github/workflows/pages.yml](./.github/workflows/pages.yml)).

---

## 5. Project Structure

```text
naukri-application-clarity/
├── .github/workflows/pages.yml   # GitHub Pages deployment workflow
├── .gitignore                    # Ignores secrets, logs, OS/editor artifacts
├── DESIGN_RATIONALE.md           # Full PM case study & metrics framework
├── README.md                     # Project overview & setup documentation
├── index.html                    # Entry point
├── styles.css                    # Naukri Dark Mobile, Light Desktop & Recruiter styles
├── data.js                       # 10 fictional applications, jobs & recruiter queues
├── screens-mobile.js             # Mobile Screens 01–10
├── screens-desktop.js            # Desktop Web Tracker (Screen 12)
├── screens-recruiter.js          # Recruiter Supporting Workflow (Screen 11)
├── screens-portfolio.js          # Before vs. After & Design Rationale views
└── app.js                        # State store, routing & live recruiter sync
```

---

## 6. Local Preview

Open `index.html` directly in a browser or serve locally:

```bash
python3 -m http.server 8765
```

Then visit `http://localhost:8765/`.
