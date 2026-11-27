/* Deliverables #6 & #7:
   - Existing vs. Proposed Screen Comparisons
   - Design Rationale, Research Evidence, User & Business Value, Implementation Dependencies & Metrics
*/

window.NaukriPortfolio = (function () {
  const comparisons = [
    {
      screen: "01 · Homepage",
      beforeTitle: "Existing Naukri Homepage",
      beforePoints: [
        "Shows Profile completeness, Search appearances, Job recommendations, NVites, and Naukri Pro banners.",
        "No compact application status summary on the home feed; users must hunt through navigation to check progress."
      ],
      afterTitle: "Proposed Homepage (Minimal Addition)",
      afterPoints: [
        "Retains profile card, recommendations, NVites, and Naukri Pro in their exact positions.",
        "Adds a compact 'My Applications' summary card: Total, Recent updates, Awaiting action, and Attention count with a 'View all applications' CTA."
      ]
    },
    {
      screen: "02 · Job Details",
      beforeTitle: "Existing Job Details",
      beforePoints: [
        "Shows job posting age and Apply CTA even when hiring may be stalled, paused, or unverified.",
        "Candidates in research reported low confidence (2.67/5 avg) in job and recruiter genuineness."
      ],
      afterTitle: "Proposed Job Details",
      afterPoints: [
        "Displays confirmed Hiring Status (Active / On Hold / Closed), posting date, status last updated, and employer verification ONLY when verified.",
        "Falls back honestly to 'Hiring status not confirmed' when unavailable; disables Apply on confirmed Closed roles."
      ]
    },
    {
      screen: "03 · Application Success",
      beforeTitle: "Existing Application Success",
      beforePoints: [
        "Shows 'Applied Successfully' with immediate paid Naukri Pro / Fast-Forward upsells dominating the screen.",
        "Leaves candidates unsure where to track updates or what happens next."
      ],
      afterTitle: "Proposed Application Success",
      afterPoints: [
        "Displays submission date, plain-language next steps, primary 'Track Application' CTA, and secondary 'Explore Similar Jobs' CTA.",
        "Moves Naukri Pro below essential confirmation and tracking actions without removing monetization."
      ]
    },
    {
      screen: "04 · My Applications",
      beforeTitle: "Existing Application History",
      beforePoints: [
        "Timelines often remain unchanged for 11–12 weeks with promotional cards interrupting the status list.",
        "No lightweight status filters, inactivity indicators, or clear visibility disclaimer for External ATS applications."
      ],
      afterTitle: "Proposed My Applications",
      afterPoints: [
        "Preserves existing categories (Applies on Naukri, Recruiter Actions, Applies via Neo, External Applications).",
        "Adds lightweight status filters, confirmed hiring availability, recruiter last active, inactivity duration, archive/restore, and explicit limited-visibility note for external applies."
      ]
    },
    {
      screen: "05–09 · Application Details & States",
      beforeTitle: "Existing Application Timeline",
      beforePoints: [
        "Applications stall indefinitely at 'Application Sent' or 'Application Viewed' with zero explanation.",
        "Candidates confuse profile-match insights or resume downloads with actual shortlisting or rejection reasons."
      ],
      afterTitle: "Proposed Enhanced Details & Edge States",
      afterPoints: [
        "Adds plain-language explanations below the latest confirmed status.",
        "Introduces non-punitive Inactivity state (7/14/30d configurable, never auto-rejects), separate 'Hiring On Hold' (notify on resume) & 'Role Closed' states, and clearly separates automated Profile-Match Insights from confirmed Recruiter Rejection Reasons."
      ]
    },
    {
      screen: "10 · Notifications",
      beforeTitle: "Existing Notifications",
      beforePoints: [
        "Play Store reviews and research logs showed notifications dominated by generic job recommendations and promotional blasts rather than application outcomes."
      ],
      afterTitle: "Proposed Categorized Notifications",
      afterPoints: [
        "Adds lightweight tabs (All, Application Updates, Job Recommendations, Recruiter Activity) and deep-links every update to its exact application.",
        "Includes granular notification preferences and eliminates repetitive inactivity spam."
      ]
    },
    {
      screen: "11 · Recruiter Responses Panel",
      beforeTitle: "Existing Recruiter Dashboard",
      beforePoints: [
        "Already has Shortlist / Maybe / Reject buttons and Select All bulk actions, plus Active / Closed job filters — but no low-friction way to signal 'On Hold' or share optional structured rejection reasons."
      ],
      afterTitle: "Proposed Supporting Recruiter Workflow",
      afterPoints: [
        "Reuses existing Shortlist / Maybe / Reject and Select All controls; adds a 1-click optional structured reason popover on Reject, an 'On Hold' availability state, and a live candidate notification preview."
      ]
    }
  ];

  function renderComparisons() {
    return `
      <div class="light-surface">
        <div class="desk-container">
          <div style="margin-bottom:20px;">
            <span class="desk-pill dpill-blue" style="margin-bottom:8px;">Deliverable 06 · Before vs. After Audit</span>
            <h1 style="margin:0;font-size:24px;color:#121224;">Existing vs. Proposed Naukri Experience</h1>
            <p style="margin:6px 0 0;font-size:13.5px;color:#474d6a;max-width:780px;">
              Every update preserves Naukri's visual system, card patterns, monetization surfaces (Naukri Pro, Neo AI, NVites), and recruiter workflows while closing the post-application clarity gap.
            </p>
          </div>

          <div style="display:flex;flex-direction:column;gap:18px;">
            ${comparisons.map(c => `
              <div class="desk-card">
                <div style="font-size:15.5px;font-weight:700;color:#121224;margin-bottom:12px;">${c.screen}</div>
                <div class="comparison-grid">
                  <div class="comp-box" style="background:#fffafa;border-color:#fecaca;">
                    <div style="margin-bottom:8px;"><span class="comp-tag-before">EXISTING</span></div>
                    <div style="font-size:14px;font-weight:700;color:#121224;margin-bottom:8px;">${c.beforeTitle}</div>
                    <ul style="margin:0;padding-left:18px;font-size:13px;color:#474d6a;line-height:1.55;">
                      ${c.beforePoints.map(p => `<li>${p}</li>`).join("")}
                    </ul>
                  </div>
                  <div class="comp-box" style="background:#f8fffb;border-color:#bbf7d0;">
                    <div style="margin-bottom:8px;"><span class="comp-tag-after">PROPOSED</span></div>
                    <div style="font-size:14px;font-weight:700;color:#121224;margin-bottom:8px;">${c.afterTitle}</div>
                    <ul style="margin:0;padding-left:18px;font-size:13px;color:#1e293b;line-height:1.55;">
                      ${c.afterPoints.map(p => `<li>${p}</li>`).join("")}
                    </ul>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
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
        bizValue: "Higher application tracker adoption and repeat meaningful engagement",
        deps: "Aggregate count endpoint over existing 90-day application log"
      },
      {
        screen: "02 Job Details Availability",
        change: "Verified Hiring Status (Active / On Hold / Closed), last updated date, and verified employer badge only when confirmed",
        evidence: "Avg confidence in job/recruiter genuineness was 2.67/5; Play Store reviews cited stale/unverified postings",
        userValue: "Prevents wasted effort on closed/paused jobs and avoids false trust signals on unverified listings",
        bizValue: "More relevant applications per requisition & improved marketplace credibility",
        deps: "Employer KYC/GST verification flag + requisition status event timestamps"
      },
      {
        screen: "03 Apply Success Flow",
        change: "Submission timestamp, next-step copy, Track & Similar Jobs CTAs above Naukri Pro",
        evidence: "Existing screens prioritize immediate upsells over tracking clarity (Play Store reviews)",
        userValue: "Clear confirmation that basic tracking is free and immediately accessible",
        bizValue: "Contextual Naukri Pro discovery without eroding candidate trust",
        deps: "Deep-link route from post-apply state to Application Details ID"
      },
      {
        screen: "04–06 Tracker & Inactivity Clarity",
        change: "Status filters, plain-language explanations, configurable 7/14/30d inactivity callout (never auto-rejects), external visibility notice",
        evidence: "3/6 eligible seekers received no response in 14d; 2/6 viewed without reply; timelines stuck 11–12 weeks",
        userValue: "Eliminates ambiguity between 'stalled' vs 'rejected' and helps candidates pivot to active roles",
        bizValue: "Better user retention, relevant repeat applications, fewer unnecessary candidate follow-ups",
        deps: "Last-recorded recruiter event timestamp + user preference storage for threshold"
      },
      {
        screen: "07–09 Outcome Separation",
        change: "Distinct 'Not Shortlisted' (with separate Match Insights vs Recruiter Reason), 'Hiring On Hold', and 'Role Closed' states",
        evidence: "5/7 hiring pros cited profile mismatch; candidates lacked clear distinction between role closure and personal rejection",
        userValue: "Actionable clarity without AI-hallucinated rejection reasons or unfair auto-reject labels",
        bizValue: "Higher candidate satisfaction and re-engagement when paused roles resume",
        deps: "Requisition pause/close webhook decoupled from candidate-level decision state"
      },
      {
        screen: "10–11 Notifications & Recruiter Sync",
        change: "Categorized application alerts + Recruiter bulk Reject optional reason & On Hold toggle with candidate preview",
        evidence: "Captured notifications were mostly promos/recommendations; 5/7 hiring pros already reply to >60% and need zero extra friction",
        userValue: "Timely, non-spammy outcome alerts linking directly to the right application",
        bizValue: "Higher notification engagement, lower opt-outs, minimal recruiter workload",
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

          <!-- Metrics & Ethical Guardrails -->
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
