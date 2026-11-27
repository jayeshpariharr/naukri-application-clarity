/* Deliverables #6 & #7:
   - Visual Before vs. After Comparisons using actual Naukri reference screenshots (Before)
     and actual captured prototype screenshots (After), with numbered annotations,
     click-to-enlarge lightbox, PM rationale, and View Interactive Screen navigation.
   - Design Rationale & Product Case Study
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
        problem: "Candidates had no immediate visibility into application updates from the homepage feed and had to navigate into separate menus.",
        evidence: "Validated observation (small sample): 3 of 6 recent Naukri applicants struggled to understand what was happening to their applications.",
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
        problem: "The existing post-apply screen foregrounded a paid Naukri Pro upsell immediately after applying, leaving candidates unsure how to track their application.",
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
        problem: "Application lists mixed status tracking with promotional banners, lacked status filters, and offered no way to separate active vs. stale or external applications.",
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
        evidence: "3 of 6 job seekers struggled to understand application progress; 2 of 6 had applications viewed without reply; audit showed promo cards inside timeline.",
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
      category: "Proposed New State",
      isDesktop: false,
      isNewState: true,
      newStateNote: "Existing Naukri does not distinguish an inactive application from an active review — timelines simply remain unchanged for 11–12 weeks. No original Before screenshot exists for this state.",
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
        evidence: "3 of 6 eligible applicants received no response within 14 days; observed timelines remained unchanged for 11–12 weeks.",
        whatChanged: "Introduced a configurable (7 / 14 / 30-day) non-punitive inactivity callout with pivot actions.",
        whyChanged: "Replaces silent waiting with honest factual state while ensuring Naukri never auto-rejects candidates without recruiter action.",
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
        problem: "Candidates saw 'Not Shortlisted' next to algorithmic JD match scores ('4 out of 6') and mistook automated match criteria for confirmed recruiter rejection reasons.",
        evidence: "5 of 7 hiring professionals cited profile mismatch as a reason for not replying; existing UI blurred match insights and decision reasons.",
        whatChanged: "Separated the confirmed Recruiter Decision Note (with honest fallback when unshared) from automated Profile Match Insights.",
        whyChanged: "Prevents false attribution while allowing recruiters to optionally share structured reasons.",
        userValue: "Actionable next steps (Improve Profile / Explore Similar Jobs) without misleading or fabricated explanations.",
        bizValue: "Hypothesis: Higher profile-improvement engagement and candidate trust.",
        metric: "Share of Not Shortlisted events with structured reasons; Improve Profile & Similar Jobs CTR.",
        deps: "Optional structured rejection reason field from Recruiter Panel."
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
      newStateNote: "Candidate-facing screens in existing Naukri do not surface a 'Hiring On Hold' state or clearly separate role closure from individual rejection. Below are the two proposed new states side by side.",
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
        problem: "When companies paused hiring or closed a requisition without screening all applicants, candidates remained indefinitely in limbo or assumed rejection.",
        evidence: "Recruiter panel analysis showed 'Close' job actions exist without a candidate-facing 'On Hold' or neutral 'Role Closed' explanation.",
        whatChanged: "Added distinct Hiring On Hold (with resume alert opt-in) and Role Closed states decoupled from individual rejection.",
        whyChanged: "Reflects real hiring lifecycle events honestly without forcing recruiters to manually reject every unscreened applicant.",
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
        problem: "Notifications were dominated by generic job recommendations, Naukri Minis, and vague profile interest instead of actual application status updates.",
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
        problem: "Desktop application history showed applications stuck '11 weeks ago' with no status filters, hiring availability, or status explanation.",
        evidence: "Desktop product audit (`myapply/historypage`) showing 11-week stalled cards and no separation of job availability vs. candidate outcome.",
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
        problem: "Recruiters already triage candidates using Shortlist/Maybe/Reject, but lacked a low-effort way to mark roles On Hold or share optional structured rejection reasons.",
        evidence: "Recruiter panel training analysis + 5 of 7 hiring pros already replying to >60% of applicants; solution must not add manual writing workload.",
        whatChanged: "Reused existing recruiter actions and added Job Availability toggle, optional skippable rejection reasons, and candidate preview.",
        whyChanged: "Candidate transparency only scales if recruiter effort per decision remains near zero.",
        userValue: "Faster, clearer candidate updates triggered directly by normal recruiter triage.",
        bizValue: "Hypothesis: Higher candidate update coverage without increasing recruiter workload.",
        metric: "Recruiter time per response triage (guardrail) and % eligible applications updated.",
        deps: "Conceptual until verified with Naukri recruiter ATS/backend capabilities."
      },
      navLabel: "View Interactive Screen",
      navAttrs: `data-action="nav-prototype" data-mode="recruiter"`
    }
  ];

  function renderComparisons(state) {
    const showPins = state && state.showComparisonPins !== false;
    const catFilter = (state && state.compCategoryFilter) || "All";
    const cats = ["All", "Discovery & Home", "Post-Apply", "Application List", "Application Details", "Proposed New State", "Outcome Clarity", "Notifications", "Cross-Platform", "Recruiter Sync"];
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
              <div style="display:flex;gap:8px;align-items:center;">
                <button class="desk-btn-outline" data-action="toggle-comp-pins">
                  ${showPins ? "Hide Annotations" : "Show Annotations"}
                </button>
              </div>
            </div>

            <!-- Category Filter Pills -->
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

              <div class="comp-visual-grid">
                <!-- BEFORE PANEL -->
                <div class="comp-frame-box">
                  <div class="comp-frame-head">
                    <span class="${sec.isNewState ? 'comp-tag-new' : 'comp-tag-before'}">
                      ${sec.isNewState ? "PROPOSED NEW STATE" : "BEFORE · EXISTING NAUKRI"}
                    </span>
                    <span style="font-size:11.5px;color:#64748b;">
                      ${sec.isNewState ? "No existing Naukri screen" : "Original audit screenshot"}
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
                      <img src="${esc(sec.beforeImg)}" alt="${esc(sec.beforeAlt)}" loading="lazy" />
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
                        <img src="${esc(sec.afterImg)}" alt="${esc(sec.afterAlt)}" loading="lazy" />
                        ${showPins && sec.annotations[0] ? `<span class="comp-pin" style="left:${sec.annotations[0].x};top:${sec.annotations[0].y};">1</span>` : ""}
                        <span class="comp-zoom-hint">Enlarge</span>
                      </div>
                      <div class="comp-img-stage" style="min-height:320px;"
                        data-action="open-lightbox"
                        data-src="${esc(sec.secondaryAfterImg)}"
                        data-alt="${esc(sec.secondaryAfterAlt)}"
                        data-caption="${esc(sec.secondaryAfterCaption)}"
                        data-tag="AFTER · PROPOSED PROTOTYPE">
                        <img src="${esc(sec.secondaryAfterImg)}" alt="${esc(sec.secondaryAfterAlt)}" loading="lazy" />
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
                      <img src="${esc(sec.afterImg)}" alt="${esc(sec.afterAlt)}" loading="lazy" />
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
        evidence: "Avg confidence in job/recruiter genuineness was 2.67/5; Play Store reviews cited stale/unverified postings",
        userValue: "Prevents wasted effort on closed/paused postings and avoids false trust signals on unverified listings",
        bizValue: "Hypothesis: More relevant applications per requisition & improved marketplace credibility",
        deps: "Employer KYC/GST verification flag + requisition status event timestamps"
      },
      {
        screen: "03 Apply Success Flow",
        change: "Submission timestamp, next-step copy, Track & Similar Jobs CTAs above Naukri Pro",
        evidence: "Existing screens prioritize immediate upsells over tracking clarity (Play Store reviews)",
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
        evidence: "5/7 hiring pros cited profile mismatch; candidates lacked clear distinction between role closure and personal rejection",
        userValue: "Actionable clarity without AI-hallucinated rejection reasons or unfair auto-reject labels",
        bizValue: "Hypothesis: Higher candidate satisfaction and re-engagement when paused roles resume",
        deps: "Requisition pause/close webhook decoupled from candidate-level decision state"
      },
      {
        screen: "10–11 Notifications & Recruiter Sync",
        change: "Categorized application alerts + Recruiter bulk Reject optional reason & On Hold toggle with candidate preview",
        evidence: "Captured notifications were mostly promos/recommendations; 5/7 hiring pros already reply to >60% and need zero extra friction",
        userValue: "Timely, non-spammy outcome alerts linking directly to the right application",
        bizValue: "Hypothesis: Higher notification engagement, lower opt-outs, minimal recruiter workload",
        deps: "Recruiter Dashboard bulk action API extension + notification preference service"
      }
    ];

    return `
      <div class="light-surface">
        <div class="desk-container">
          <div class="desk-card" style="margin-bottom:18px;">
            <span class="desk-pill dpill-blue" style="margin-bottom:8px;">Deliverable 07 · PM Case Study &amp; Design Rationale</span>
            <h1 style="margin:0;font-size:24px;color:#121224;">Naukri Application Clarity — Product Rationale</h1>
            <p style="margin:8px 0 0;font-size:13.5px;color:#474d6a;line-height:1.55;">
              <strong>Core Design Philosophy:</strong> Improve the post-application experience without reinventing Naukri's interface, visual system, monetization model, or recruiter workflow.
            </p>
            <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;font-size:12.5px;color:#78350f;">
              <strong>Research Scope Caveat:</strong> Insights come from a directional small-sample discovery set (10 job seeker surveys incl. 6 recent Naukri applicants, 7 hiring professional responses, 4 Google Play Store reviews, desktop/mobile audits, and recruiter panel training analysis) — not representative statistics for all Naukri users.
            </div>
          </div>

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

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:16px;">
            <div class="desk-card">
              <h3 style="margin:0 0 10px;font-size:15px;color:#121224;">Primary &amp; Secondary Success Metrics</h3>
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
        </div>
      </div>
    `;
  }

  return { renderComparisons, renderRationale };
})();
