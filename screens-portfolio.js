/* Deliverables #6 & #7:
   - Visual Before vs. After Comparisons using actual Naukri reference screenshots (Before)
     and actual captured prototype screenshots (After), with numbered annotations,
     click-to-enlarge lightbox, PM rationale, and View Interactive Screen navigation.
   - Design Rationale, MVP Prioritisation (P0/P1/P2), Hiring-Manager Journey & 2-Min Demo Guide
*/

window.NaukriPortfolio = (function () {
  function esc(str) { return window.NaukriMobile.esc(str); }

  const comparisonSections = [
    {
      id: "comp-homepage",
      title: "01 · Homepage Application Summary",
      category: "Discovery & Home",
      isDesktop: true,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-homepage-desktop.jpg",
      beforeAlt: "Original Naukri desktop My Home screenshot showing profile performance and job recommendations without an application status summary (personal details redacted)",
      beforeCaption: "Original Naukri Desktop My Home (PII redacted)",
      afterImg: "./assets/comparisons/after-homepage-desktop.jpg",
      afterAlt: "Proposed Naukri desktop My Home screenshot with compact My Applications summary card, sidebar counter, and hiring availability badges",
      afterCaption: "Prototype Desktop My Home (Screen 01 / 12)",
      annotations: [
        { n: 1, x: "50%", y: "39%", text: "Compact 'My Applications' summary card (Total, Recent updates, Awaiting action, Need attention) inserted without displacing existing widgets." },
        { n: 2, x: "14%", y: "68%", text: "Direct 'My Applications' link with active count in the left sidebar navigation." },
        { n: 3, x: "45%", y: "81%", text: "Confirmed hiring status pills (Hiring Active, Hiring On Hold, Closed) on recommended jobs." }
      ],
      pm: {
        problem: "In the audited homepage screens, no compact application status summary was observed; candidates navigated into separate menus to inspect updates.",
        evidence: "Directional small-sample finding: 3 of 6 recent Naukri applicants struggled to understand what was happening to their applications.",
        whatChanged: "Added a compact 4-metric My Applications summary card and sidebar entry inside the existing homepage layout.",
        whyChanged: "Surfaces application progress and items needing attention where candidates already start their session without building a separate dashboard.",
        userValue: "Faster status awareness and fewer missed updates from a single glance.",
        bizValue: "Hypothesis: Higher Application Tracker adoption and stronger repeat engagement.",
        metric: "Application Tracker click-through rate from Homepage; candidate-reported application clarity.",
        deps: "Lightweight summary aggregation endpoint over existing 90-day application records."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="desktop" data-sub="home"`
    },
    {
      id: "comp-apply-success",
      title: "02 · Application Success & Track Application CTA",
      category: "Post-Apply",
      isDesktop: false,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-apply-success-mobile.jpg",
      beforeAlt: "Original Naukri mobile Applied Successfully screenshot dominated by Power up your applies with Pro upsell",
      beforeCaption: "Original Naukri Mobile Applied Successfully",
      afterImg: "./assets/comparisons/after-apply-success-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Applied Successfully screenshot showing submission date, what happens next, Track Application CTA, Explore Similar Jobs CTA, and Naukri Pro placed below",
      afterCaption: "Prototype Screen 03: Applied Successfully",
      annotations: [
        { n: 1, x: "50%", y: "34%", text: "Submission date and plain-language explanation of what happens next." },
        { n: 2, x: "50%", y: "48%", text: "Primary 'Track Application' CTA + Secondary 'Explore Similar Jobs' CTA." },
        { n: 3, x: "50%", y: "74%", text: "Naukri Pro retained below essential confirmation and tracking actions (free tracking stated clearly)." }
      ],
      pm: {
        problem: "The audited post-apply screen foregrounded a paid Naukri Pro upsell immediately after applying, leaving candidates unsure how to track their application.",
        evidence: "Product audit + 4 Play Store reviews highlighting frustration with paid upsells overshadowing basic post-apply clarity.",
        whatChanged: "Added submission timestamp, next-step copy, Track Application & Explore Similar Jobs CTAs above Naukri Pro.",
        whyChanged: "Sets clear expectations at peak candidate intent while keeping monetization intact contextually.",
        userValue: "Immediate confidence that the application was sent and one-tap access to free tracking.",
        bizValue: "Hypothesis: Higher tracker adoption and higher-trust contextual Pro discovery.",
        metric: "Post-apply Track Application tap rate; Pro conversion & abandonment guardrails.",
        deps: "Pass newly created applicationId from apply submission response to confirmation view."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="success"`
    },
    {
      id: "comp-my-apps",
      title: "03 · My Applications Dashboard",
      category: "Application List",
      isDesktop: false,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-my-applications-mobile.jpg",
      beforeAlt: "Original Naukri mobile Applies in last 90 days screen showing status pills, Neo banner inside list, and Naukri Pro comparison card",
      beforeCaption: "Original Naukri Mobile My Applications",
      afterImg: "./assets/comparisons/after-my-applications-mobile.jpg",
      afterAlt: "Proposed Naukri mobile My Applications screen with underline category tabs, lightweight status filter chips, hiring status, inactivity tags, and archive controls",
      afterCaption: "Prototype Screen 04: My Applications",
      annotations: [
        { n: 1, x: "50%", y: "19%", text: "Preserves existing categories (Applies on Naukri, Recruiter Actions, Applies via Neo, External) + adds lightweight status filter chips." },
        { n: 2, x: "55%", y: "37%", text: "Displays confirmed hiring availability (Active / On Hold / Closed) and recruiter last active metadata." },
        { n: 3, x: "50%", y: "74%", text: "Adds Archive / Restore actions and keeps Interview Prep / Pro non-intrusive below the status list." }
      ],
      pm: {
        problem: "In the audited mobile My Applications list, status tracking sat alongside promotional banners, and lightweight status filters or archive controls were not observed in the audited screens.",
        evidence: "Audit of mobile My Applications + 11–12 week unchanged timelines observed during product audit.",
        whatChanged: "Added lightweight status filters, confirmed hiring availability, inactivity indicators, archive/restore, and external-apply visibility notices.",
        whyChanged: "Lets candidates triage active vs. stalled applications quickly without removing existing categories or Interview Prep.",
        userValue: "Cleaner scanning, fewer dead-end follow-ups, and clear visibility limits on external redirects.",
        bizValue: "Hypothesis: More relevant repeat applications and better user retention.",
        metric: "Filter usage, archive rate on stale roles, and repeat application relevance.",
        deps: "Status filter query parameters, archive flag, and external ATS indicator."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="applies"`
    },
    {
      id: "comp-timeline",
      title: "04 · Application Status Timeline",
      category: "Application Details",
      isDesktop: false,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-timeline-mobile.jpg",
      beforeAlt: "Original Naukri mobile Application Status timeline showing Let Neo auto-apply card embedded inside the timeline and Pro upsell below (candidate name redacted)",
      beforeCaption: "Original Naukri Mobile Status Timeline (PII redacted)",
      afterImg: "./assets/comparisons/after-timeline-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Application Status screen showing clean timeline, plain-language explanation below current stage, and activity disclaimer",
      afterCaption: "Prototype Screen 05: Application Status",
      annotations: [
        { n: 1, x: "45%", y: "44%", text: "Preserves Naukri's timeline structure while removing the mid-timeline Neo promo card." },
        { n: 2, x: "50%", y: "59%", text: "Adds concise plain-language explanation directly below the latest confirmed status." },
        { n: 3, x: "50%", y: "78%", text: "Retains Job Activity stats and clarifies that profile views or CV downloads do not confirm shortlisting." }
      ],
      pm: {
        problem: "Timelines stayed frozen between 'Application Sent' and 'Awaiting recruiter action' with promotional cards embedded inside the progress rail.",
        evidence: "Directional sample: 3 of 6 job seekers struggled to understand progress; 2 of 6 had applications viewed without reply; audit showed promo cards inside timeline.",
        whatChanged: "Removed promotional card from inside the timeline rail and added plain-language status explanations and activity disclaimers.",
        whyChanged: "Candidates need factual clarity on what the current stage actually means before seeing upsells.",
        userValue: "Eliminates guesswork about whether 'viewed' or 'awaiting action' means shortlisted.",
        bizValue: "Hypothesis: Improved candidate trust and reduced unnecessary recruiter follow-ups.",
        metric: "Candidate-reported clarity score and time from recruiter action to candidate update.",
        deps: "Status-to-copy mapping tied to confirmed backend event timestamps."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="details" data-app="app-01"`
    },
    {
      id: "comp-inactivity",
      title: "05 · Prolonged Application Inactivity",
      category: "Inactivity Clarity",
      isDesktop: false,
      isNewState: false,
      inactivityBridgeNote: "The inactivity indicator is a proposed new feature, while the underlying prolonged inactive application experience (timelines remaining unchanged at Application Sent / Viewed) is an observed existing problem.",
      beforeImg: "./assets/comparisons/before-timeline-mobile.jpg",
      beforeAlt: "Original Naukri mobile Application Status timeline showing an application stalled at Application Sent with a Neo auto-apply banner inside the timeline and no inactivity context (candidate name redacted)",
      beforeCaption: "Original Naukri Mobile Timeline (Observed Stalled State · PII redacted)",
      afterImg: "./assets/comparisons/after-inactive-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Inactive Application state displaying No new application update for 14 days reassurance and Explore Similar Jobs CTA",
      afterCaption: "Prototype Screen 06: 14-Day Inactivity Clarity",
      annotations: [
        { n: 1, x: "50%", y: "34%", text: "States exact inactivity duration ('No new application update for 14 days') and actual last recorded update date." },
        { n: 2, x: "50%", y: "40%", text: "Explicitly reassures: 'This does not mean your application has been rejected.' Never auto-rejects." },
        { n: 3, x: "50%", y: "48%", text: "Actionable pivots: Explore Similar Jobs, Archive, or Job Details (configurable 7 / 14 / 30d threshold)." }
      ],
      pm: {
        problem: "Applications with zero recruiter updates for weeks looked identical to active evaluations, causing prolonged uncertainty.",
        evidence: "Directional sample: 3 of 6 eligible applicants received no response within 14 days; observed timelines remained unchanged for 11–12 weeks.",
        whatChanged: "Introduced a configurable (7 / 14 / 30-day) non-punitive inactivity callout with pivot actions on top of the existing timeline.",
        whyChanged: "Replaces silent waiting with factual state visibility while ensuring Naukri never auto-rejects candidates without recruiter action.",
        userValue: "Clear signal to focus energy on active roles without false rejection anxiety.",
        bizValue: "Hypothesis: Higher relevant repeat applications to active jobs.",
        metric: "Similar-job click-through and archive rate after 14d+ inactivity; zero false rejections.",
        deps: "Last-event timestamp comparison + user-configurable threshold preference."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="details" data-app="app-03"`
    },
    {
      id: "comp-not-shortlisted",
      title: "06 · Not Shortlisted Experience",
      category: "Outcome Clarity",
      isDesktop: false,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-not-shortlisted-mobile.jpg",
      beforeAlt: "Original Naukri mobile Not Shortlisted screen showing timeline and Insights on this application (personal photo redacted)",
      beforeCaption: "Original Naukri Mobile Not Shortlisted (PII redacted)",
      afterImg: "./assets/comparisons/after-not-shortlisted-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Not Shortlisted screen showing decision date, dedicated Recruiter reason block, and separated Profile match insights",
      afterCaption: "Prototype Screen 07: Not Shortlisted Clarity",
      annotations: [
        { n: 1, x: "50%", y: "34%", text: "Clear outcome header with confirmed Decision date." },
        { n: 2, x: "50%", y: "40%", text: "Dedicated 'Recruiter reason' box (displays confirmed reason if shared, or honest fallback — never AI-invented)." },
        { n: 3, x: "50%", y: "47%", text: "Next actions (Explore Similar Jobs, Improve Profile, Archive) + JD Match Insights clearly labeled as separate." }
      ],
      pm: {
        problem: "Candidates saw 'Not Shortlisted' next to algorithmic JD match scores ('4 out of 6') and risked mistaking automated match criteria for confirmed recruiter rejection reasons.",
        evidence: "5 of 7 hiring professionals cited profile mismatch as a reason for not replying; audited UI placed match insights without a distinct recruiter-reason block.",
        whatChanged: "Separated the confirmed Recruiter Decision Note (with honest fallback when unshared) from automated Profile Match Insights.",
        whyChanged: "Prevents false attribution while allowing recruiters to optionally share structured reasons.",
        userValue: "Actionable next steps (Improve Profile / Explore Similar Jobs) without misleading or fabricated explanations.",
        bizValue: "Hypothesis: Higher profile-improvement engagement and candidate trust.",
        metric: "Share of Not Shortlisted events with structured reasons; Improve Profile & Similar Jobs CTR.",
        deps: "Optional structured rejection reason field from Recruiter Panel (subject to feasibility validation)."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="details" data-app="app-06"`
    },
    {
      id: "comp-hold-closed",
      title: "07 · Hiring On Hold & Role Closed States",
      category: "Proposed New State",
      isDesktop: false,
      isNewState: true,
      newStateNote: "Candidate-side 'Hiring On Hold' and neutral 'Role Closed' outcome separation were not observed in the audited candidate screens. Below are the two proposed new states side by side.",
      afterImg: "./assets/comparisons/after-on-hold-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Hiring On Hold state with Notify me if hiring resumes option",
      afterCaption: "Prototype Screen 08: Hiring On Hold",
      secondaryAfterImg: "./assets/comparisons/after-role-closed-mobile.jpg",
      secondaryAfterAlt: "Proposed Naukri mobile Role Closed state stating individual application outcome has not been shared",
      secondaryAfterCaption: "Prototype Screen 09: Role Closed",
      annotations: [
        { n: 1, x: "50%", y: "34%", text: "Hiring On Hold clarifies employer paused hiring without confirming individual rejection, plus 'Notify me if hiring resumes' opt-in." },
        { n: 2, x: "50%", y: "44%", text: "Role Closed separates requisition closure from individual candidate decision (never auto-labels applicants as rejected)." }
      ],
      pm: {
        problem: "When companies paused hiring or closed a requisition without screening all applicants, candidates could remain indefinitely in limbo or assume rejection.",
        evidence: "Recruiter panel audit showed 'Close' job actions exist; candidate-side 'On Hold' or neutral 'Role Closed' states were not observed in the audited screens.",
        whatChanged: "Added distinct Hiring On Hold (with resume alert opt-in) and Role Closed states decoupled from individual rejection.",
        whyChanged: "Reflects real hiring lifecycle events honestly without requiring recruiters to manually reject every unscreened applicant.",
        userValue: "Immediate closure when a role stops hiring, and easy re-engagement if a paused role reopens.",
        bizValue: "Hypothesis: Improved marketplace credibility and candidate re-engagement on resumed roles.",
        metric: "Resume-alert opt-ins and candidate satisfaction on closed/paused requisitions.",
        deps: "Requisition status events (On Hold / Closed / Resumed) propagated to linked candidate applications."
      },
      navLabel: "View Hiring On Hold",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="details" data-app="app-07"`,
      secondaryNavLabel: "View Role Closed",
      secondaryNavAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="details" data-app="app-08"`
    },
    {
      id: "comp-notifications",
      title: "08 · Application-Specific Notifications",
      category: "Notifications",
      isDesktop: false,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-notifications-mobile.jpg",
      beforeAlt: "Original Naukri mobile Stay up to date notifications feed filled with job recommendations, Naukri Minis, and generic profile interest",
      beforeCaption: "Original Naukri Mobile Notifications",
      afterImg: "./assets/comparisons/after-notifications-mobile.jpg",
      afterAlt: "Proposed Naukri mobile Notifications screen with All, Application Updates, Job Recommendations, Recruiter Activity filters and direct application links",
      afterCaption: "Prototype Screen 10: Categorized Notifications",
      annotations: [
        { n: 1, x: "50%", y: "21%", text: "Category filter chips: All, Application Updates, Job Recommendations, Recruiter Activity." },
        { n: 2, x: "50%", y: "42%", text: "Confirmed outcome alerts (Interview scheduled, Shortlisted, Role closed, Hiring paused) deep-linking to the exact application." },
        { n: 3, x: "86%", y: "14%", text: "Granular Notification Preferences to pause promo noise and prevent repetitive inactivity spam." }
      ],
      pm: {
        problem: "Captured notifications were dominated by generic job recommendations, Naukri Minis, and vague profile interest rather than individual application status updates.",
        evidence: "Captured notifications audit + Play Store reviews complaining of irrelevant notifications instead of recruiter updates.",
        whatChanged: "Added Application Updates / Recruiter Activity categories, deep-links to Application Details, and preference controls.",
        whyChanged: "Makes high-signal application outcome alerts effortless to find without breaking recommendation discovery.",
        userValue: "Zero missed interview or shortlist updates and full control over notification types.",
        bizValue: "Hypothesis: Higher notification engagement and lower notification opt-out rate.",
        metric: "Notification open-to-tracker CTR and notification opt-out rate guardrail.",
        deps: "Event-driven notification categorization + preference flags."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="mobile" data-screen="notifications"`
    },
    {
      id: "comp-desktop-tracker",
      title: "09 · Desktop Application Tracking",
      category: "Cross-Platform",
      isDesktop: true,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-desktop-tracker.jpg",
      beforeAlt: "Original Naukri desktop Job application status page showing 11 weeks ago stalled statuses and What may work for you checklist (avatar redacted)",
      beforeCaption: "Original Naukri Desktop Tracker (PII redacted)",
      afterImg: "./assets/comparisons/after-desktop-tracker.jpg",
      afterAlt: "Proposed Naukri desktop Job Application Status split-pane tracker with status filter chips, hiring availability, inactivity callout, and separated match insights",
      afterCaption: "Prototype Screen 12: Desktop Tracker",
      annotations: [
        { n: 1, x: "30%", y: "23%", text: "Lightweight status filter chips + configurable 7d / 14d / 30d inactivity reminder." },
        { n: 2, x: "58%", y: "37%", text: "Confirmed Hiring Active & Verified Employer badges alongside existing horizontal timeline." },
        { n: 3, x: "64%", y: "64%", text: "Plain-language explanation, non-punitive inactivity notice, and separated Profile Match Insights." }
      ],
      pm: {
        problem: "Desktop application history showed applications stuck '11 weeks ago'; status filters, hiring availability, and status explanations were not observed in the audited screen.",
        evidence: "Desktop product audit (`myapply/historypage`) showing 11-week stalled cards without separation of job availability vs. candidate outcome.",
        whatChanged: "Applied all mobile clarity improvements inside Naukri's existing split-pane list + horizontal timeline desktop layout.",
        whyChanged: "Ensures consistent mental models and transparency across desktop web and mobile app.",
        userValue: "Consistent, scannable clarity when managing applications on desktop.",
        bizValue: "Hypothesis: Higher desktop tracker engagement and improved marketplace trust.",
        metric: "Desktop tracker session engagement and cross-platform status parity.",
        deps: "Shared application status & hiring availability API across mobile and web."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="desktop" data-sub="tracker"`
    },
    {
      id: "comp-recruiter",
      title: "10 · Conceptual Recruiter Supporting Workflow",
      category: "Recruiter Sync",
      isDesktop: true,
      isNewState: false,
      beforeImg: "./assets/comparisons/before-recruiter-panel.jpg",
      beforeAlt: "Original Naukri Recruiter Job Responses dashboard showing Shortlist, Maybe, Reject buttons and candidate cards (candidate PII redacted)",
      beforeCaption: "Original Naukri Recruiter Panel (PII redacted)",
      afterImg: "./assets/comparisons/after-recruiter-panel.jpg",
      afterAlt: "Proposed conceptual Naukri Recruiter Panel reusing Shortlist, Maybe, Reject and adding Job Availability selector, bulk updates, and candidate notification preview",
      afterCaption: "Prototype Screen 11: Recruiter Supporting Workflow",
      annotations: [
        { n: 1, x: "14%", y: "35%", text: "Job Availability selector (Active / On Hold / Closed) notifies applicants automatically without manual messages." },
        { n: 2, x: "40%", y: "21%", text: "Reuses existing Select All + Shortlist / Reject controls with optional 1-click structured rejection reasons." },
        { n: 3, x: "70%", y: "52%", text: "Preserves existing Shortlist / Maybe / Reject candidate card workflow while syncing live to candidate views." }
      ],
      pm: {
        problem: "Recruiters already triage candidates using Shortlist/Maybe/Reject, while low-effort 'On Hold' availability updates or optional structured rejection reasons were not observed in the audited screens.",
        evidence: "Recruiter panel training analysis + 5 of 7 hiring pros already replying to >60% of applicants; solution must avoid adding manual writing workload.",
        whatChanged: "Conceptual recruiter workflow (subject to feasibility validation): reuses existing recruiter actions and adds Job Availability toggle, optional skippable rejection reasons, and candidate preview.",
        whyChanged: "Candidate transparency scales only with a hypothesised reduction in recruiter effort per decision compared to manual messaging.",
        userValue: "Faster, clearer candidate updates triggered directly by normal recruiter triage.",
        bizValue: "Hypothesis: Higher candidate update coverage with minimal added recruiter workload.",
        metric: "Recruiter time per response triage (guardrail) and % eligible applications updated.",
        deps: "Conceptual recruiter workflow, subject to feasibility validation against Naukri recruiter ATS/backend capabilities."
      },
    {
      id: "11",
      title: "11 · Proposed New State · Structured Interview Invitation & Coordination",
      category: "Proposed New State",
      beforeLabel: "Audited Naukri Baseline: Uncoordinated / External Communication",
      beforeImage: "./assets/comparisons/after-notifications-mobile.jpg",
      beforeDesc: "Interviews typically coordinated via unlinked third-party emails or unverified phone calls, with no platform record or mutual attendance verification.",
      afterLabel: "Proposed V2 State: In-Platform Interview Coordination (FR18–FR22)",
      afterImage: "./assets/comparisons/after-notifications-mobile.jpg",
      afterDesc: "Structured invitation card with verified format, meeting link, candidate accept/decline, calendar .ics export, and versioned mutual rescheduling.",
      keyWins: [
        "Eliminates confusion over interview logistics and meeting links",
        "Clear accept/decline actions with auditable timestamp records",
        "Versioned rescheduling prevents conflicting or unilateral changes",
        "Calendar export (.ics) ensures candidates do not miss scheduled rounds"
      ]
    },
    {
      id: "12",
      title: "12 · Proposed New State · Dual Attendance Confirmation & CAIR (FR23–FR28)",
      category: "Proposed New State",
      beforeLabel: "Audited Naukri Baseline: Single-Sided / Unverified No-Show Assumptions",
      beforeImage: "./assets/comparisons/after-not-shortlisted-mobile.jpg",
      beforeDesc: "No independent attendance confirmation; candidate attendance assumed from scheduled invites or disputed via unrecorded recruiter notes.",
      afterLabel: "Proposed V2 State: Independent Dual Confirmation & CAIR Instrumentation",
      afterImage: "./assets/comparisons/after-desktop-tracker.jpg",
      afterDesc: "Candidate and recruiter independently confirm attendance; dual-confirmed outcome qualifies CAIR; conflicts enter an auditable dispute state.",
      keyWins: [
        "Candidate confirmation cannot fabricate recruiter verification",
        "Distinguishes reported no-show from pending confirmations",
        "Eliminates duplicate interview weighting in seeker-level metrics",
        "Instrumented CAIR cohort anchor tracks genuine attended interviews"
      ]
    },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="recruiter"`
    }
  ];

  function renderComparisons(state) {
    const showPins = state && state.showComparisonPins !== false;
    const catFilter = (state && state.compCategoryFilter) || "All";
    const cats = ["All", "Discovery & Home", "Post-Apply", "Application List", "Application Details", "Inactivity Clarity", "Outcome Clarity", "Proposed New State", "Notifications", "Cross-Platform", "Recruiter Sync"];
    const visible = catFilter === "All" ? comparisonSections : comparisonSections.filter(s => s.category === catFilter);

    return `
      <div class="light-surface">
        <div class="desk-container">
          <!-- Portfolio Header -->
          <div class="desk-card" style="margin-bottom:18px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;">
              <div>
                <span class="desk-pill dpill-blue" style="margin-bottom:8px;">Portfolio Case Study · Visual Before vs. After</span>
                <h1 style="margin:0;font-size:23px;color:#121224;">Existing Naukri vs. Proposed Application Clarity</h1>
                <p style="margin:6px 0 0;font-size:13.5px;color:#474d6a;max-width:820px;line-height:1.5;">
                  Every <strong>Before</strong> image is an actual Naukri screenshot from the product audit (with personal info redacted). Every <strong>After</strong> image is captured directly from the interactive prototype. Click any screenshot to enlarge.
                </p>
              </div>
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <button class="desk-btn-outline" data-action="toggle-comp-pins">
                  ${showPins ? "Hide Annotations" : "Show Annotations"}
                </button>
                <button class="mob-btn-primary" style="width:auto;padding:7px 14px;font-size:12px;" data-action="switch-mode" data-mode="rationale">
                  Full Case Study &amp; Roadmap →
                </button>
              </div>
            </div>

            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid #eef0f6;">
              ${cats.map(c => `
                <button class="ctrl-pill ${catFilter === c ? 'active' : ''}" style="border-radius:999px;padding:4px 10px;" data-action="set-comp-cat" data-cat="${esc(c)}">
                  ${esc(c)}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Comparison Sections -->
          ${visible.map(sec => `
            <article class="comp-section-card" id="${esc(sec.id)}">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px;">
                <div>
                  <span class="desk-pill ${sec.isNewState ? 'dpill-blue' : 'dpill-slate'}" style="margin-bottom:4px;">${esc(sec.category)}</span>
                  <h2 style="margin:0;font-size:18px;color:#121224;">${esc(sec.title)}</h2>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button class="mob-btn-primary" style="width:auto;padding:7px 14px;font-size:12px;" ${sec.navAttrs}>
                    ${esc(sec.navLabel)} →
                  </button>
                  ${sec.secondaryNavLabel ? `
                    <button class="desk-btn-outline" ${sec.secondaryNavAttrs}>
                      ${esc(sec.secondaryNavLabel)} →
                    </button>
                  ` : ""}
                </div>
              </div>

              ${sec.inactivityBridgeNote ? `
                <div style="margin-bottom:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:9px 12px;font-size:12.5px;color:#78350f;">
                  ${esc(sec.inactivityBridgeNote)}
                </div>
              ` : ""}

              <div class="comp-visual-grid">
                <!-- BEFORE PANEL -->
                <div class="comp-frame-box">
                  <div class="comp-frame-head">
                    <span class="${sec.isNewState ? 'comp-tag-new' : 'comp-tag-before'}">
                      ${sec.isNewState ? "PROPOSED NEW STATE" : "BEFORE · EXISTING NAUKRI"}
                    </span>
                    <span style="font-size:11.5px;color:#64748b;">
                      ${sec.isNewState ? "Not observed in audited screens" : esc(sec.beforeCaption)}
                    </span>
                  </div>

                  ${sec.isNewState ? `
                    <div class="comp-new-state-box">
                      <div style="font-size:14px;font-weight:700;color:#1e3a8a;">Proposed New State</div>
                      <div style="font-size:13px;color:#475569;line-height:1.55;max-width:420px;margin:0 auto;">
                        ${esc(sec.newStateNote)}
                      </div>
                    </div>
                  ` : `
                    <div class="comp-img-stage ${sec.isDesktop ? 'light-stage' : ''}"
                      data-action="open-lightbox"
                      data-src="${esc(sec.beforeImg)}"
                      data-alt="${esc(sec.beforeAlt)}"
                      data-caption="${esc(sec.beforeCaption)}"
                      data-tag="BEFORE · EXISTING NAUKRI">
                      <img src="${esc(sec.beforeImg)}" alt="${esc(sec.beforeAlt)}" />
                      <span class="comp-zoom-hint">Click to enlarge</span>
                    </div>
                  `}
                </div>

                <!-- AFTER PANEL -->
                <div class="comp-frame-box">
                  <div class="comp-frame-head">
                    <span class="comp-tag-after">AFTER · PROPOSED PROTOTYPE</span>
                    <span style="font-size:11.5px;color:#64748b;">${esc(sec.afterCaption)}</span>
                  </div>

                  ${sec.secondaryAfterImg ? `
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                      <div class="comp-img-stage" style="min-height:320px;"
                        data-action="open-lightbox"
                        data-src="${esc(sec.afterImg)}"
                        data-alt="${esc(sec.afterAlt)}"
                        data-caption="${esc(sec.afterCaption)}"
                        data-tag="AFTER · PROPOSED PROTOTYPE">
                        <img src="${esc(sec.afterImg)}" alt="${esc(sec.afterAlt)}" />
                        ${showPins && sec.annotations[0] ? `<span class="comp-pin" style="left:${sec.annotations[0].x};top:${sec.annotations[0].y};">1</span>` : ""}
                        <span class="comp-zoom-hint">Enlarge</span>
                      </div>
                      <div class="comp-img-stage" style="min-height:320px;"
                        data-action="open-lightbox"
                        data-src="${esc(sec.secondaryAfterImg)}"
                        data-alt="${esc(sec.secondaryAfterAlt)}"
                        data-caption="${esc(sec.secondaryAfterCaption)}"
                        data-tag="AFTER · PROPOSED PROTOTYPE">
                        <img src="${esc(sec.secondaryAfterImg)}" alt="${esc(sec.secondaryAfterAlt)}" />
                        ${showPins && sec.annotations[1] ? `<span class="comp-pin" style="left:${sec.annotations[1].x};top:${sec.annotations[1].y};">2</span>` : ""}
                        <span class="comp-zoom-hint">Enlarge</span>
                      </div>
                    </div>
                  ` : `
                    <div class="comp-img-stage ${sec.isDesktop ? 'light-stage' : ''}"
                      data-action="open-lightbox"
                      data-src="${esc(sec.afterImg)}"
                      data-alt="${esc(sec.afterAlt)}"
                      data-caption="${esc(sec.afterCaption)}"
                      data-tag="AFTER · PROPOSED PROTOTYPE">
                      <img src="${esc(sec.afterImg)}" alt="${esc(sec.afterAlt)}" />
                      ${showPins ? sec.annotations.map(a => `
                        <span class="comp-pin" style="left:${a.x};top:${a.y};" title="${esc(a.text)}">${a.n}</span>
                      `).join("") : ""}
                      <span class="comp-zoom-hint">Click to enlarge</span>
                    </div>
                  `}

                  <ul class="comp-annotations-list">
                    ${sec.annotations.map(a => `
                      <li>
                        <span class="comp-anno-num">${a.n}</span>
                        <span>${esc(a.text)}</span>
                      </li>
                    `).join("")}
                  </ul>
                </div>
              </div>

              ${!sec.isNewState ? `
                <div style="margin-top:10px;font-size:11.5px;color:#64748b;font-style:italic;">
                  Original Naukri screenshot compared with the proposed prototype using illustrative application data.
                </div>
              ` : ""}

              <!-- Structured PM Rationale Below Each Comparison -->
              <div class="pm-rationale-grid">
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Existing Problem</div>
                  <div class="pm-rat-text">${esc(sec.pm.problem)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Research Evidence</div>
                  <div class="pm-rat-text">${esc(sec.pm.evidence)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">What Changed</div>
                  <div class="pm-rat-text">${esc(sec.pm.whatChanged)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Why It Changed</div>
                  <div class="pm-rat-text">${esc(sec.pm.whyChanged)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">User Value</div>
                  <div class="pm-rat-text">${esc(sec.pm.userValue)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Potential Business Value</div>
                  <div class="pm-rat-text">${esc(sec.pm.bizValue)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Success Metric</div>
                  <div class="pm-rat-text">${esc(sec.pm.metric)}</div>
                </div>
                <div class="pm-rat-cell">
                  <div class="pm-rat-label">Dependencies</div>
                  <div class="pm-rat-text">${esc(sec.pm.deps)}</div>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderRationale() {
    const roadmap = [
      {
        tier: "P0 — Core MVP",
        badgeClass: "dpill-green",
        items: [
          {
            feature: "Track Application CTA (Post-Apply)",
            userImpact: "Gives immediate clarity right after applying without searching menus.",
            bizImpact: "Hypothesis: Higher tracker adoption & lower immediate drop-off.",
            effort: "Low (Assumption — pending engineering validation)",
            deps: "Pass created applicationId to confirmation screen."
          },
          {
            feature: "Enhanced Application Timeline & Plain-Language Explanation",
            userImpact: "Eliminates guesswork at 'Application Sent' / 'Viewed' and clarifies views ≠ shortlisting.",
            bizImpact: "Hypothesis: Higher candidate trust & fewer unnecessary follow-ups.",
            effort: "Low (Assumption — pending engineering validation)",
            deps: "Copy mapping over existing application status events."
          },
          {
            feature: "Last Confirmed Update Date",
            userImpact: "Separates actual application updates from general job-level timestamps.",
            bizImpact: "Hypothesis: Clearer expectations & reduced perceived staleness.",
            effort: "Low (Assumption — pending engineering validation)",
            deps: "Expose last confirmed candidate-level event timestamp."
          },
          {
            feature: "Inactivity Indicator (7/14/30d) & Next Actions",
            userImpact: "Reassures candidates inactivity ≠ rejection and offers Explore Similar Jobs / Archive pivots.",
            bizImpact: "Hypothesis: Higher relevant repeat applications to active openings.",
            effort: "Medium (Assumption — pending engineering validation)",
            deps: "Threshold calculation from last recorded update + user threshold preference."
          }
        ]
      },
      {
        tier: "P1 — Application Management",
        badgeClass: "dpill-blue",
        items: [
          {
            feature: "Lightweight Status Filters (Awaiting Action, Viewed, Shortlisted, etc.)",
            userImpact: "Fast triage across large application histories.",
            bizImpact: "Hypothesis: Higher tracker repeat utility & retention.",
            effort: "Low–Medium (Assumption — pending engineering validation)",
            deps: "Query/filter parameters on My Applications endpoint."
          },
          {
            feature: "Application-Specific Notifications & Preferences",
            userImpact: "Separates confirmed outcomes from generic job recommendations & promo alerts.",
            bizImpact: "Hypothesis: Improved notification engagement & lower opt-outs.",
            effort: "Medium (Assumption — pending engineering validation)",
            deps: "Notification categorization + preference flags + deep links."
          },
          {
            feature: "Homepage Application Summary Card",
            userImpact: "Surfaces total, recent updates, and awaiting items directly on home.",
            bizImpact: "Hypothesis: Higher tracker discovery without displacing existing widgets.",
            effort: "Low (Assumption — pending engineering validation)",
            deps: "Summary aggregation query over 90-day application history."
          },
          {
            feature: "Archive & Restore Applications",
            userImpact: "Lets users declutter stale or closed items without losing records.",
            bizImpact: "Hypothesis: Cleaner active list driving focused repeat applies.",
            effort: "Low (Assumption — pending engineering validation)",
            deps: "Boolean archive flag on candidate application record."
          }
        ]
      },
      {
        tier: "P2 — Recruiter & Marketplace Enhancements",
        badgeClass: "dpill-amber",
        items: [
          {
            feature: "Confirmed Hiring Availability (Active / On Hold / Closed) & Employer Verification",
            userImpact: "Prevents wasted applies on paused/closed jobs; avoids implying verification without evidence.",
            bizImpact: "Hypothesis: Higher application relevance & improved marketplace credibility.",
            effort: "Medium–High (Assumption — pending engineering validation)",
            deps: "Employer KYC/domain verification + requisition availability events."
          },
          {
            feature: "Optional Structured Rejection Reasons",
            userImpact: "Allows recruiters to share lightweight reason codes without inventing AI reasons.",
            bizImpact: "Hypothesis: Better candidate feedback loop & profile improvement engagement.",
            effort: "Medium (Assumption — pending engineering validation)",
            deps: "Conceptual recruiter workflow, subject to feasibility validation."
          },
          {
            feature: "Recruiter-Side Status Automation & Bulk Updates",
            userImpact: "Propagates On Hold / Closed / Shortlist updates with a hypothesised reduction in recruiter effort.",
            bizImpact: "Hypothesis: Higher % of eligible applications receiving timely updates.",
            effort: "High (Assumption — pending engineering validation)",
            deps: "Conceptual recruiter workflow, subject to feasibility validation across ATS integrations."
          }
        ]
      }
    ];

    const rows = [
      {
        screen: "01 Homepage Summary",
        change: "Compact 'My Applications' KPI card inside existing homepage feed",
        evidence: "3/6 recent applicants struggled to understand what was happening to their applications",
        userValue: "Immediate visibility of recent updates, awaiting roles, and items needing attention without searching menus",
        bizValue: "Hypothesis: Higher application tracker adoption and repeat meaningful engagement",
        deps: "Aggregate count endpoint over existing 90-day application log"
      },
      {
        screen: "02 Job Details Availability",
        change: "Verified Hiring Status (Active / On Hold / Closed), last updated date, and verified employer badge only when confirmed",
        evidence: "Avg confidence in job/recruiter genuineness was 2.67/5; Play Store reviews cited unverified/unresponsive postings",
        userValue: "Prevents wasted effort on closed/paused postings and avoids false trust signals on unverified listings",
        bizValue: "Hypothesis: More relevant applications per requisition & improved marketplace credibility",
        deps: "Employer KYC/GST verification flag + requisition status event timestamps"
      },
      {
        screen: "03 Apply Success Flow",
        change: "Submission timestamp, next-step copy, Track & Similar Jobs CTAs above Naukri Pro",
        evidence: "Audited screens placed immediate paid upsells above tracking clarity (Play Store reviews)",
        userValue: "Clear confirmation that basic tracking is free and immediately accessible",
        bizValue: "Hypothesis: Contextual Naukri Pro discovery without eroding candidate trust",
        deps: "Deep-link route from post-apply state to Application Details ID"
      },
      {
        screen: "04–06 Tracker & Inactivity Clarity",
        change: "Status filters, plain-language explanations, configurable 7/14/30d inactivity callout (never auto-rejects), external visibility notice",
        evidence: "3/6 eligible seekers received no response in 14d; 2/6 viewed without reply; timelines stuck 11–12 weeks",
        userValue: "Eliminates ambiguity between 'stalled' vs 'rejected' and helps candidates pivot to active roles",
        bizValue: "Hypothesis: Better user retention, relevant repeat applications, fewer unnecessary candidate follow-ups",
        deps: "Last-recorded recruiter event timestamp + user preference storage for threshold"
      },
      {
        screen: "07–09 Outcome Separation",
        change: "Distinct 'Not Shortlisted' (with separate Match Insights vs Recruiter Reason), 'Hiring On Hold', and 'Role Closed' states",
        evidence: "5/7 hiring pros cited profile mismatch; separate On Hold/Role Closed states were not observed in audited candidate screens",
        userValue: "Actionable clarity without AI-hallucinated rejection reasons or unfair auto-reject labels",
        bizValue: "Hypothesis: Higher candidate satisfaction and re-engagement when paused roles resume",
        deps: "Requisition pause/close webhook decoupled from candidate-level decision state"
      },
      {
        screen: "10–11 Notifications & Recruiter Sync",
        change: "Categorized application alerts + conceptual recruiter bulk Reject optional reason & On Hold toggle with candidate preview",
        evidence: "Captured notifications were mostly promos/recommendations; 5/7 hiring pros already reply to >60% and need minimal friction",
        userValue: "Timely, non-spammy outcome alerts linking directly to the right application",
        bizValue: "Hypothesis: Higher notification engagement, lower opt-outs, hypothesised reduction in recruiter effort",
        deps: "Conceptual recruiter workflow, subject to feasibility validation + notification preference service"
      }
    ];

    return `
      <div class="light-surface">
        <div class="desk-container">
          <!-- Hiring Manager Portfolio Journey Banner (Item 7) -->
          <div class="desk-card" style="margin-bottom:18px;border-left:4px solid #275df5;">
            <span class="desk-pill dpill-blue" style="margin-bottom:8px;">Hiring Manager Guided Tour · Portfolio Case Study</span>
            <h1 style="margin:0;font-size:23px;color:#121224;">Naukri Application Clarity — End-to-End Case Study</h1>
            <p style="margin:6px 0 12px;font-size:13.5px;color:#474d6a;line-height:1.5;">
              <strong>Core Design Philosophy:</strong> Improve the post-application experience without reinventing Naukri's interface, visual system, monetization model, or recruiter workflow.
            </p>

            <!-- Structured Flow Strip -->
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:14px;font-size:12px;font-weight:600;color:#1e293b;">
              <a href="#sec-research" style="color:#275df5;text-decoration:none;">1. Research</a>
              <span style="color:#94a3b8;">→</span>
              <a href="#sec-problem" style="color:#275df5;text-decoration:none;">2. Problem</a>
              <span style="color:#94a3b8;">→</span>
              <a href="#sec-prioritisation" style="color:#275df5;text-decoration:none;">3. Prioritisation (P0–P2)</a>
              <span style="color:#94a3b8;">→</span>
              <button class="mob-link" style="font-size:12px;" data-action="switch-mode" data-mode="comparisons">4. Before vs After</button>
              <span style="color:#94a3b8;">→</span>
              <button class="mob-link" style="font-size:12px;" data-action="switch-mode" data-mode="mobile">5. Interactive Prototype</button>
              <span style="color:#94a3b8;">→</span>
              <a href="#sec-metrics" style="color:#275df5;text-decoration:none;">6. Success Metrics</a>
            </div>

            <!-- 2-Minute Recommended Demo Journey -->
            <div style="background:#f5f8ff;border:1px solid #dbe5ff;border-radius:10px;padding:12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
                <div style="font-size:13.5px;font-weight:700;color:#121224;">Recommended 2-Minute Demo Journey</div>
                <button class="mob-btn-primary" style="width:auto;padding:6px 13px;font-size:12px;" data-action="nav-prototype" data-mode="mobile" data-screen="home">
                  Start 2-Min Demo →
                </button>
              </div>
              <ol style="margin:0;padding-left:18px;font-size:12.5px;color:#334155;line-height:1.6;">
                <li><strong>Mobile Apply &amp; Track (30s):</strong> Open <em>Senior Product Analyst — Growth (ZenithPay India)</em> → tap <strong>Apply</strong> → tap <strong>Track Application</strong> on Screen 03.</li>
                <li><strong>Inactivity &amp; Outcome Clarity (30s):</strong> Inspect <em>05/06 14d Viewed</em> (switch 7d/14d/30d threshold), <em>07 Not Shortlisted</em>, and <em>08 Hiring On Hold</em>.</li>
                <li><strong>Recruiter Live Sync (30s):</strong> Switch to <strong>Recruiter Panel (11)</strong> → shortlist or reject <em>Aarav Mehta</em> with an optional structured reason, or mark a job <em>On Hold</em> / <em>Closed</em> without overwriting existing decisions.</li>
                <li><strong>Before vs. After (30s):</strong> Open <strong>Before vs. After</strong> to compare audited Naukri screenshots side-by-side with the prototype.</li>
              </ol>
            </div>
          </div>

          <!-- 1 & 2: Research & Problem -->
          <div id="sec-research" class="desk-card" style="margin-bottom:18px;">
            <span class="desk-pill dpill-slate" style="margin-bottom:6px;">1. Research &amp; 2. Problem Statement</span>
            <h2 style="margin:0 0 8px;font-size:18px;color:#121224;">Directional Research Findings &amp; Core Problem</h2>
            <div id="sec-problem" style="font-size:13px;color:#334155;line-height:1.55;margin-bottom:10px;">
              <strong>Problem:</strong> Although Naukri already provides application tracking, candidates remain uncertain about progress, hiring availability, and final outcomes when applications stay at <em>Application Sent</em>, <em>Application Viewed</em>, or <em>Awaiting Recruiter Action</em> for weeks.
            </div>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;font-size:12.5px;color:#78350f;margin-bottom:10px;">
              <strong>Small-Sample Research Caveat:</strong> Insights come from a directional small-sample discovery set (10 job seeker surveys incl. 6 recent Naukri applicants, 7 hiring professional responses, 4 Google Play Store reviews, desktop/mobile audits, and recruiter training analysis) — not statistically representative metrics for all Naukri users. No baseline metrics or measured post-launch improvements are claimed.
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;font-size:12.5px;">
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;"><strong>3 / 6</strong> eligible job seekers received no response within 14 days.</div>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;"><strong>3 / 6</strong> struggled to understand what was happening to their applications.</div>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;"><strong>2.67 / 5</strong> average confidence in job &amp; recruiter genuineness.</div>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;"><strong>11–12 weeks</strong> observed timelines remained unchanged in audited history screens.</div>
            </div>
          </div>

          <!-- 3: MVP Prioritisation (Item 6) -->
          <div id="sec-prioritisation" class="desk-card" style="margin-bottom:18px;">
            <span class="desk-pill dpill-blue" style="margin-bottom:6px;">3. Initial Proposed Roadmap &amp; MVP Prioritisation</span>
            <h2 style="margin:0 0 4px;font-size:18px;color:#121224;">Phased Rollout: P0 → P1 → P2</h2>
            <p style="margin:0 0 14px;font-size:12.5px;color:#64748b;">
              Note: All relative effort estimates below are <strong>initial PM assumptions pending engineering feasibility validation</strong>.
            </p>

            ${roadmap.map(group => `
              <div style="margin-bottom:16px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <div style="background:#f8fafc;padding:9px 14px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;">
                  <span class="desk-pill ${group.badgeClass}" style="font-size:12px;">${group.tier}</span>
                </div>
                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;">
                    <thead>
                      <tr style="border-bottom:1px solid #e2e8f0;color:#474d6a;background:#ffffff;">
                        <th style="padding:9px 10px;">Initiative</th>
                        <th style="padding:9px 10px;">User Impact</th>
                        <th style="padding:9px 10px;">Potential Business Impact</th>
                        <th style="padding:9px 10px;">Estimated Relative Effort</th>
                        <th style="padding:9px 10px;">Dependencies</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${group.items.map(it => `
                        <tr style="border-bottom:1px solid #f1f5f9;vertical-align:top;">
                          <td style="padding:9px 10px;font-weight:700;color:#121224;">${it.feature}</td>
                          <td style="padding:9px 10px;color:#15803d;">${it.userImpact}</td>
                          <td style="padding:9px 10px;color:#1d4ed8;">${it.bizImpact}</td>
                          <td style="padding:9px 10px;color:#474d6a;">${it.effort}</td>
                          <td style="padding:9px 10px;color:#64748b;">${it.deps}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Change Matrix -->
          <div class="desk-card" style="margin-bottom:18px;overflow-x:auto;">
            <h2 style="margin:0 0 12px;font-size:17px;color:#121224;">Change-by-Change Rationale &amp; Implementation Matrix</h2>
            <table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;">
              <thead>
                <tr style="border-bottom:2px solid #e2e8f0;color:#474d6a;">
                  <th style="padding:10px 8px;">Area</th>
                  <th style="padding:10px 8px;">Proposed Change</th>
                  <th style="padding:10px 8px;">Research Evidence</th>
                  <th style="padding:10px 8px;">Candidate Value</th>
                  <th style="padding:10px 8px;">Business Value</th>
                  <th style="padding:10px 8px;">Dependencies</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map(r => `
                  <tr style="border-bottom:1px solid #eef1f7;vertical-align:top;">
                    <td style="padding:10px 8px;font-weight:700;color:#121224;white-space:nowrap;">${r.screen}</td>
                    <td style="padding:10px 8px;color:#1e293b;">${r.change}</td>
                    <td style="padding:10px 8px;color:#474d6a;">${r.evidence}</td>
                    <td style="padding:10px 8px;color:#15803d;">${r.userValue}</td>
                    <td style="padding:10px 8px;color:#1d4ed8;">${r.bizValue}</td>
                    <td style="padding:10px 8px;color:#64748b;">${r.deps}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- 6: Success Metrics -->
          <div id="sec-metrics" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:16px;margin-bottom:18px;">
            <div class="desk-card">
              <h3 style="margin:0 0 10px;font-size:15px;color:#121224;">6. Primary &amp; Secondary Success Metrics</h3>
              <div style="font-size:12.5px;color:#334155;line-height:1.6;">
                <strong>Primary Metrics:</strong>
                <ul style="margin:4px 0 10px;padding-left:18px;">
                  <li>Candidate-reported application clarity score</li>
                  <li>% of eligible applications receiving meaningful status updates</li>
                  <li>Time from confirmed recruiter action to candidate-facing update</li>
                </ul>
                <strong>Secondary Metrics:</strong>
                <ul style="margin:4px 0 0;padding-left:18px;">
                  <li>Application tracker adoption &amp; notification engagement</li>
                  <li>Candidate satisfaction &amp; retention</li>
                  <li>Relevant repeat applications</li>
                </ul>
              </div>
            </div>

            <div class="desk-card">
              <h3 style="margin:0 0 10px;font-size:15px;color:#121224;">Guardrail Metrics &amp; Trust Principles</h3>
              <div style="font-size:12.5px;color:#334155;line-height:1.6;">
                <strong>Guardrail Metrics:</strong>
                <ul style="margin:4px 0 10px;padding-left:18px;">
                  <li>Recruiter workload (time per response triage)</li>
                  <li>Notification opt-out rate &amp; incorrect/misleading updates</li>
                  <li>Application abandonment &amp; Naukri Pro revenue impact</li>
                </ul>
                <strong>Non-Negotiable Product Guardrails:</strong>
                <ul style="margin:4px 0 0;padding-left:18px;">
                  <li>Never auto-reject applications due to inactivity</li>
                  <li>Never generate speculative AI rejection reasons</li>
                  <li>Never imply employer verification without reliable evidence</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Google Play Store Reviews (Research Evidence Only — Reviewer PII Redacted) -->
          <div class="desk-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
              <div>
                <span class="desk-pill dpill-slate" style="margin-bottom:6px;">Supporting Research Evidence · Google Play Store Audit</span>
                <h2 style="margin:0;font-size:17px;color:#121224;">Directional User Pain Points from Play Store Reviews</h2>
                <p style="margin:4px 0 0;font-size:12.5px;color:#474d6a;">
                  Used strictly as qualitative research evidence (reviewer names and photos redacted). Click any review screenshot to enlarge.
                </p>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:14px;">
              ${[
                {
                  src: "./assets/evidence/review-1-notifications.jpg",
                  title: "Irrelevant Notification Noise",
                  theme: "Supports Screen 10 (Application Updates tab & Preferences)",
                  note: "User reports receiving no recruiter calls while notifications are dominated by irrelevant alerts.",
                  alt: "Redacted Google Play Store review describing irrelevant notifications instead of recruiter responses"
                },
                {
                  src: "./assets/evidence/review-2-upsells.jpg",
                  title: "Paid Upsell Frustration",
                  theme: "Supports Screen 03 & 05 (Contextual Pro below tracking)",
                  note: "User criticizes aggressive paid upsells targeting frustrated job seekers without clarity.",
                  alt: "Redacted Google Play Store review describing frustration with paid fast-forward upsells"
                },
                {
                  src: "./assets/evidence/review-3-unviewed.jpg",
                  title: "Unviewed Applications & Match Gaps",
                  theme: "Supports Screen 05 (Job Activity) & Screen 07 (Match Criteria)",
                  note: "User notes recruiters had not viewed applications and flags confusing location-match warnings.",
                  alt: "Redacted Google Play Store review describing unviewed applications and location mismatch confusion"
                },
                {
                  src: "./assets/evidence/review-4-verification.jpg",
                  title: "Consultancy & Verification Trust Gap",
                  theme: "Supports Screen 02 (Verified Employer badge only when confirmed)",
                  note: "User highlights inability to verify consultancy/recruiter legitimacy on job listings.",
                  alt: "Redacted Google Play Store review describing difficulty verifying consultancy and recruiter legitimacy"
                }
              ].map(ev => `
                <div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px;background:#f8fafc;display:flex;flex-direction:column;gap:8px;">
                  <div style="font-size:13.5px;font-weight:700;color:#121224;">${ev.title}</div>
                  <div class="comp-img-stage light-stage" style="min-height:200px;max-height:240px;"
                    data-action="open-lightbox"
                    data-src="${ev.src}"
                    data-alt="${ev.alt}"
                    data-caption="${ev.title} (Research Evidence · PII Redacted)"
                    data-tag="RESEARCH EVIDENCE">
                    <img src="${ev.src}" alt="${ev.alt}" />
                    <span class="comp-zoom-hint">Click to enlarge</span>
                  </div>
                  <div style="font-size:11.5px;font-weight:600;color:#1d4ed8;">${ev.theme}</div>
                  <div style="font-size:12px;color:#474d6a;line-height:1.45;">${ev.note}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return { renderComparisons, renderRationale };
})();
