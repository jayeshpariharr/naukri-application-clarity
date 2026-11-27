# Known Limitations & Prototype Scope

1. **In-Memory Client State Only:** Application submissions, archived items, notification preference toggles, and simulated recruiter actions live in browser memory (`app.js`) and reset on page refresh or via `Reset Demo`.
2. **Conceptual Recruiter Workflow:** Screen 11 (`Recruiter Panel`) is a conceptual supporting workflow, subject to feasibility validation against Naukri's recruiter ATS and backend event pipelines.
3. **Assumed Relative Effort Estimates:** The P0 / P1 / P2 roadmap effort estimates in `DESIGN_RATIONALE.md` and `Design Rationale` are initial PM assumptions pending engineering validation.
4. **Simulated Edge States & External Visibility:** External ATS visibility limits (`app-09`) and `Loading` / `Unavailable Data` toggles simulate expected fallback UX without live backend polling.
5. **Secondary Portal Chrome Stubs:** Preserved Naukri navigation links (`Resdex`, `Reports`, `Blogs`, `MINIs`, `FAQs`, `Naukri Pro` payment checkout) surface non-intrusive demo toasts or placeholder states rather than full backend workflows.
6. **Directional Small-Sample Research Caveat:** Discovery insights (10 job seekers incl. 6 recent Naukri applicants, 7 hiring professionals, 4 Play Store reviews, desktop/mobile audits, and recruiter training analysis) are directional only and not representative statistics for all Naukri users. No baseline metrics or measured post-launch business improvements are claimed.
