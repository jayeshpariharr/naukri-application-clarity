/* Mobile App Prototype (Screens 01–10) — Authentic Naukri Mobile Dark Theme
   Uses crisp vector SVG icons, square company badges, underline category tabs,
   and minimal incremental transparency additions.
*/

window.NaukriMobile = (function () {
  function esc(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initials(name) {
    const parts = String(name || "C").trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const ICONS = {
    search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    bell: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    applies: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    jobs: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    profile: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    briefcase: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    pin: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    rupee: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a4 4 0 0 0 0-10"/></svg>`,
    clock: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bookmark: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
    sliders: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>`
  };

  function naukriLogoSvg(size = 24, lightText = true) {
    return `
      <span style="display:inline-flex;align-items:center;gap:6px;">
        <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="18" fill="#275DF5"/>
          <circle cx="19.5" cy="9.5" r="2.7" fill="#FFFFFF"/>
          <path d="M13 15.5C15.5 14 19.5 14.5 22 17.5C19.2 17.5 17 19.2 16 22L22.5 26.5L20 29L12.5 23.5C11.2 21.2 11.4 17.5 13 15.5Z" fill="#FFFFFF"/>
        </svg>
        <span style="font-weight:800;font-size:${Math.round(size * 0.72)}px;letter-spacing:-0.03em;color:${lightText ? '#ffffff' : '#275DF5'};">naukri</span>
      </span>`;
  }

  function getStatusPillClass(app, dark = true) {
    if (app.archived) return dark ? "pill-slate" : "dpill-slate";
    if (app.hiringStatus === "On Hold") return dark ? "pill-amber" : "dpill-amber";
    if (app.hiringStatus === "Closed" || app.status === "Closed") return dark ? "pill-slate" : "dpill-slate";
    if (app.status === "Shortlisted") return dark ? "pill-green" : "dpill-green";
    if (app.status === "Not Shortlisted") return dark ? "pill-red" : "dpill-red";
    if (app.status === "Viewed") return dark ? "pill-blue" : "dpill-blue";
    return dark ? "pill-slate" : "dpill-slate";
  }

  function getHiringBadge(hiringStatus, confirmed, dark = true) {
    if (!confirmed || hiringStatus === "Unconfirmed") {
      return `<span class="${dark ? 'mob-pill pill-slate' : 'desk-pill dpill-slate'}">Hiring status not confirmed</span>`;
    }
    if (hiringStatus === "Active") {
      return `<span class="${dark ? 'mob-pill pill-green' : 'desk-pill dpill-green'}">Hiring Active</span>`;
    }
    if (hiringStatus === "On Hold") {
      return `<span class="${dark ? 'mob-pill pill-amber' : 'desk-pill dpill-amber'}">Hiring On Hold</span>`;
    }
    return `<span class="${dark ? 'mob-pill pill-red' : 'desk-pill dpill-red'}">Closed</span>`;
  }

  function renderLoadingSkeleton() {
    return `
      <div class="mob-card">
        <div class="skeleton" style="height:15px;width:62%;margin-bottom:10px;"></div>
        <div class="skeleton" style="height:12px;width:44%;margin-bottom:12px;"></div>
        <div class="skeleton" style="height:40px;width:100%;"></div>
      </div>
      <div class="mob-card">
        <div class="skeleton" style="height:15px;width:70%;margin-bottom:10px;"></div>
        <div class="skeleton" style="height:12px;width:52%;margin-bottom:12px;"></div>
        <div class="skeleton" style="height:34px;width:100%;"></div>
      </div>
      <div style="text-align:center;font-size:11.5px;color:var(--mob-text-muted);margin-top:8px;">
        Loading application updates…
      </div>`;
  }

  /* SCREEN 01: HOMEPAGE */
  function renderHomepage(state) {
    const activeApps = state.applications.filter(a => !a.archived);
    const awaiting = activeApps.filter(a => a.status === "Awaiting Action" || a.status === "Viewed").length;
    const recentUpdates = activeApps.filter(a => a.inactivityDays <= 3).length;
    const attentionCount = activeApps.filter(a =>
      a.hiringStatus === "On Hold" ||
      a.hiringStatus === "Closed" ||
      (!a.isExternal && a.inactivityDays >= state.inactivityThreshold && (a.status === "Awaiting Action" || a.status === "Viewed"))
    ).length;

    const latestUpdated = activeApps.slice().sort((a, b) => a.inactivityDays - b.inactivityDays)[0];

    return `
      <!-- Existing Naukri Profile Summary Card -->
      <div class="mob-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:42px;height:42px;border-radius:999px;border:2px solid #16a34a;background:#26262e;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:14px;">
              ${esc(state.candidate.initials)}
            </div>
            <div>
              <div style="font-size:14.5px;font-weight:700;color:var(--mob-text);">${esc(state.candidate.name)}</div>
              <div style="font-size:11.5px;color:var(--mob-text-secondary);">${esc(state.candidate.headline)}</div>
              <div style="font-size:10.5px;color:var(--mob-text-muted);margin-top:1px;">${esc(state.candidate.lastUpdated)} · ${state.candidate.profileScore}% profile strength</div>
            </div>
          </div>
          <span class="neo-chip">Neo AI</span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:11px;padding-top:10px;border-top:1px solid var(--mob-border);">
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--mob-text);">${state.candidate.searchAppearances}</div>
            <div style="font-size:11px;color:var(--mob-text-muted);">Search appearances</div>
          </div>
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--mob-text);">${state.candidate.recruiterActions}</div>
            <div style="font-size:11px;color:var(--mob-text-muted);">Recruiter actions</div>
          </div>
        </div>
      </div>

      <!-- Incremental Addition: Compact "My Applications" Summary inside existing homepage layout -->
      <div class="mob-card mob-card-clickable" data-action="go-applies" role="button" tabindex="0">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">My Applications</div>
          <button class="mob-link" data-action="go-applies">View all applications</button>
        </div>

        <div class="summary-kpi-grid">
          <div class="summary-kpi">
            <div class="summary-kpi-num">${activeApps.length}</div>
            <div class="summary-kpi-label">Total</div>
          </div>
          <div class="summary-kpi">
            <div class="summary-kpi-num" style="color:var(--mob-blue);">${recentUpdates}</div>
            <div class="summary-kpi-label">Recent updates</div>
          </div>
          <div class="summary-kpi">
            <div class="summary-kpi-num">${awaiting}</div>
            <div class="summary-kpi-label">Awaiting action</div>
          </div>
        </div>

        ${attentionCount > 0 ? `
          <div style="font-size:11px;color:var(--mob-amber);margin-bottom:5px;">
            ${attentionCount} applications need attention (${state.inactivityThreshold}d+ inactive, on hold, or closed)
          </div>
        ` : ""}

        ${latestUpdated ? `
          <div style="font-size:11px;color:var(--mob-text-muted);display:flex;justify-content:space-between;gap:8px;">
            <span>Recent: <strong style="color:var(--mob-text-secondary);">${esc(latestUpdated.jobTitle)}</strong> · ${esc(latestUpdated.statusLabel)}</span>
            <span>${esc(latestUpdated.lastUpdatedDate)}</span>
          </div>
        ` : ""}
      </div>

      <!-- Existing Job Recommendations -->
      <div class="mob-section-head">
        <h4 class="mob-section-title">Recommended jobs for you</h4>
        <button class="mob-link" data-action="open-similar">View all</button>
      </div>

      ${state.jobs.slice(0, 3).map(job => `
        <div class="mob-card mob-card-clickable" data-action="open-job" data-job-id="${esc(job.id)}">
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <div class="company-logo-box">${esc(initials(job.company))}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">${esc(job.title)}</div>
              <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:2px;">
                ${esc(job.company)} &nbsp;·&nbsp; <span style="color:#fbbf24;">★</span> ${job.rating} (${esc(job.reviewsCount)})
              </div>
              <div style="font-size:11px;color:var(--mob-text-muted);margin-top:6px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
                <span style="display:inline-flex;align-items:center;gap:3px;">${ICONS.briefcase} ${esc(job.experience)}</span>
                <span style="display:inline-flex;align-items:center;gap:3px;">${ICONS.pin} ${esc(job.location)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
                ${getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, true)}
                <span style="font-size:10.5px;color:var(--mob-text-muted);">Posted ${esc(job.postedDate)}</span>
              </div>
            </div>
          </div>
        </div>
      `).join("")}

      <!-- Existing NVites & Naukri Pro Retained -->
      <div class="mob-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--mob-text);">NVites · Recruiter messages</div>
            <div style="font-size:11.5px;color:var(--mob-text-muted);margin-top:2px;">2 invites from recruiters</div>
          </div>
          <button class="mob-link" data-action="go-notifs">Open inbox</button>
        </div>
      </div>

      <div class="naukri-pro-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
          <div>
            <div style="font-size:11px;font-weight:700;color:#facc15;text-transform:uppercase;">Naukri Pro</div>
            <div style="font-size:12.5px;font-weight:600;color:var(--mob-text);margin-top:2px;">Stand out to recruiters with Priority Applicant</div>
          </div>
          <button class="mob-btn-secondary" style="padding:6px 10px;font-size:11px;white-space:nowrap;" data-action="toast-pro">Know more</button>
        </div>
      </div>
    `;
  }

  /* SCREEN 02: JOB DETAILS */
  function renderJobDetails(state) {
    let job = state.jobs.find(j => j.id === state.selectedJobId);
    if (!job) {
      const fromApp = state.applications.find(a => a.jobId === state.selectedJobId);
      if (fromApp) {
        job = {
          id: fromApp.jobId,
          title: fromApp.jobTitle,
          company: fromApp.company,
          rating: fromApp.companyRating,
          reviewsCount: "140+ Reviews",
          experience: fromApp.experienceReq,
          salary: fromApp.salary,
          location: fromApp.location,
          postedDate: fromApp.appliedDate,
          hiringStatus: fromApp.hiringStatus,
          hiringStatusConfirmed: fromApp.hiringStatusConfirmed,
          hiringStatusUpdated: fromApp.hiringStatusUpdated,
          employerVerified: fromApp.employerVerified,
          verificationLabel: fromApp.verificationLabel,
          matchPercentage: fromApp.matchInsights.score,
          skills: state.candidate.skills.slice(0, 5),
          summary: `Role overview for ${fromApp.jobTitle} at ${fromApp.company}. Partner with product, engineering, and analytics teams on core user journeys.`,
          highlights: [
            "Own funnel metrics, cohort analysis, and product experimentation",
            "Collaborate with cross-functional teams to ship user-facing improvements"
          ],
          holdAcceptingApplications: false
        };
      } else {
        job = state.jobs[0];
      }
    }
    const unavailable = state.unavailableDataMode;
    const alreadyApplied = state.applications.find(a => a.jobId === job.id && !a.archived);
    const isClosed = !unavailable && job.hiringStatusConfirmed && job.hiringStatus === "Closed";
    const isOnHold = !unavailable && job.hiringStatusConfirmed && job.hiringStatus === "On Hold";

    return `
      <div class="mob-card">
        <div style="display:flex;gap:11px;align-items:flex-start;">
          <div class="company-logo-box">${esc(initials(job.company))}</div>
          <div style="flex:1;">
            <div style="font-size:15.5px;font-weight:700;color:var(--mob-text);line-height:1.3;">${esc(job.title)}</div>
            <div style="font-size:12.5px;color:var(--mob-text-secondary);margin-top:3px;">
              ${esc(job.company)} · <span style="color:#fbbf24;">★</span> ${job.rating} (${esc(job.reviewsCount)})
            </div>
          </div>
        </div>

        <div style="margin-top:12px;display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--mob-text-secondary);">
          <div style="display:flex;align-items:center;gap:6px;">${ICONS.briefcase} <span>${esc(job.experience)}</span> &nbsp;·&nbsp; ${ICONS.rupee} <span>${esc(job.salary)}</span></div>
          <div style="display:flex;align-items:center;gap:6px;">${ICONS.pin} <span>${esc(job.location)}</span></div>
        </div>

        <!-- Incremental Transparency Block: Confirmed Availability & Verification -->
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--mob-border);">
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            ${unavailable
              ? `<span class="mob-pill pill-slate">Hiring status not confirmed</span>`
              : getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, true)}
            ${!unavailable && job.employerVerified && job.verificationLabel
              ? `<span class="mob-pill pill-blue">${esc(job.verificationLabel)}</span>`
              : ""}
          </div>
          <div style="font-size:11px;color:var(--mob-text-muted);margin-top:7px;">
            Posted: ${esc(job.postedDate)} &nbsp;|&nbsp; Status updated: ${!unavailable && job.hiringStatusConfirmed && job.hiringStatusUpdated ? esc(job.hiringStatusUpdated) : "Not confirmed"}
          </div>
        </div>

        ${isClosed ? `
          <div class="state-callout state-callout-red">
            <div style="font-size:12px;font-weight:700;color:var(--mob-red);">This position is no longer accepting applications.</div>
            <div style="font-size:11px;color:var(--mob-text-secondary);margin-top:2px;">Confirmed closed on ${esc(job.hiringStatusUpdated)}.</div>
          </div>
        ` : ""}

        ${isOnHold ? `
          <div class="state-callout state-callout-amber">
            <div style="font-size:12px;font-weight:700;color:var(--mob-amber);">Hiring for this position is currently on hold.</div>
            <div style="font-size:11px;color:var(--mob-text-secondary);margin-top:2px;">
              ${esc(job.holdNote || "Employer has paused hiring. New applications are currently paused.")}
            </div>
          </div>
        ` : ""}

        <div style="margin-top:12px;">
          ${isClosed ? `
            <button class="mob-btn-primary" disabled>Position Closed — Applications Disabled</button>
          ` : isOnHold && job.holdAcceptingApplications === false ? `
            <button class="mob-btn-primary" disabled>Applications Paused While On Hold</button>
            <button class="mob-btn-secondary" style="width:100%;margin-top:8px;" data-action="open-similar">Explore Similar Jobs</button>
          ` : alreadyApplied ? `
            <button class="mob-btn-primary" data-action="open-app" data-app-id="${esc(alreadyApplied.id)}">Already Applied · Track Application</button>
          ` : `
            <button class="mob-btn-primary" data-action="apply-job" data-job-id="${esc(job.id)}">Apply</button>
          `}
        </div>
      </div>

      <div class="mob-card">
        <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);margin-bottom:7px;">Job description</div>
        <p style="font-size:12px;line-height:1.5;color:var(--mob-text-secondary);margin:0 0 10px;">${esc(job.summary)}</p>
        <ul style="margin:0 0 10px;padding-left:18px;font-size:12px;color:var(--mob-text-secondary);line-height:1.5;">
          ${job.highlights.map(h => `<li>${esc(h)}</li>`).join("")}
        </ul>
        <div style="font-size:12px;font-weight:600;color:var(--mob-text);margin-bottom:6px;">Key skills</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${job.skills.map(s => `<span class="mob-pill pill-slate">${esc(s)}</span>`).join("")}
        </div>
      </div>
    `;
  }

  /* SCREEN 03: APPLICATION SUCCESS */
  function renderApplySuccess(state) {
    const app = state.applications.find(a => a.id === state.lastAppliedAppId) || state.applications[0];
    return `
      <div class="mob-card" style="text-align:center;padding:20px 14px;">
        <div style="width:46px;height:46px;border-radius:999px;background:var(--mob-green-soft);color:var(--mob-green);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;margin:0 auto 10px;">
          ✓
        </div>
        <div style="font-size:16px;font-weight:700;color:var(--mob-text);">Applied Successfully</div>
        <div style="font-size:12.5px;color:var(--mob-text-secondary);margin-top:4px;">
          ${esc(app.jobTitle)} · ${esc(app.company)}
        </div>
        <div style="font-size:11px;color:var(--mob-text-muted);margin-top:4px;">
          Submitted on ${esc(app.appliedDate)}
        </div>

        <div style="text-align:left;margin-top:12px;padding:10px;border-radius:8px;background:var(--mob-elevated);font-size:12px;color:var(--mob-text-secondary);line-height:1.45;">
          Your application has been sent successfully. You can track recorded recruiter actions and application updates from My Applications.
        </div>

        <div style="display:flex;flex-direction:column;gap:8px;margin-top:14px;">
          <button class="mob-btn-primary" data-action="open-app" data-app-id="${esc(app.id)}">Track Application</button>
          <button class="mob-btn-secondary" data-action="open-similar">Explore Similar Jobs</button>
        </div>
      </div>

      <!-- Existing Naukri Pro retained below essential confirmation -->
      <div class="naukri-pro-card">
        <div style="font-size:11px;font-weight:700;color:#facc15;text-transform:uppercase;">Naukri Pro</div>
        <div style="font-size:12.5px;font-weight:600;color:var(--mob-text);margin:3px 0;">Highlight your profile for similar roles</div>
        <div style="font-size:11px;color:var(--mob-text-muted);margin-bottom:8px;">
          Application tracking in My Applications remains free.
        </div>
        <button class="mob-btn-secondary" style="width:100%;" data-action="toast-pro">Explore Naukri Pro</button>
      </div>
    `;
  }

  /* SCREEN 04: MY APPLICATIONS */
  function renderMyApplications(state) {
    const categories = ["All", "Applies on Naukri", "Recruiter Actions", "Applies via Neo", "External Applications"];
    const baseList = state.applications.filter(app => state.appCategory === "All" || app.category === state.appCategory);

    const availableStatuses = ["All Applications"];
    ["Awaiting Action", "Viewed", "Shortlisted", "Not Shortlisted", "Closed", "Archived"].forEach(st => {
      if (st === "Archived") {
        if (baseList.some(a => a.archived)) availableStatuses.push("Archived");
      } else if (st === "Closed") {
        if (baseList.some(a => !a.archived && a.hiringStatus === "Closed")) availableStatuses.push("Closed");
      } else if (baseList.some(a => !a.archived && a.status === st)) {
        availableStatuses.push(st);
      }
    });

    const filtered = baseList.filter(app => {
      if (state.appFilter === "Archived") return app.archived;
      if (app.archived) return false;
      if (state.appFilter === "All Applications") return true;
      if (state.appFilter === "Closed") return app.hiringStatus === "Closed";
      return app.status === state.appFilter;
    });

    return `
      <!-- Existing Naukri Underline Category Tabs -->
      <div class="mob-underline-tabs">
        ${categories.map(cat => `
          <button class="mob-utab ${state.appCategory === cat ? 'active' : ''}" data-action="set-app-category" data-cat="${esc(cat)}">
            ${esc(cat)}
          </button>
        `).join("")}
      </div>

      <!-- Lightweight Status Filter Chips -->
      <div class="mob-chips-scroll">
        ${availableStatuses.map(st => `
          <button class="mob-filter-chip ${state.appFilter === st ? 'active' : ''}" data-action="set-app-filter" data-filter="${esc(st)}">
            ${esc(st)}
          </button>
        `).join("")}
      </div>

      ${filtered.length === 0 ? `
        <div class="mob-card" style="text-align:center;padding:24px 12px;">
          <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">No applications match this filter</div>
          <div style="font-size:11.5px;color:var(--mob-text-muted);margin:4px 0 12px;">Switch categories or reset filters to view all applications.</div>
          <button class="mob-btn-secondary" data-action="reset-app-filters">Show All Applications</button>
        </div>
      ` : filtered.map(app => {
        const showInactivity = !app.isExternal && app.inactivityDays >= state.inactivityThreshold && (app.status === "Awaiting Action" || app.status === "Viewed");
        return `
          <div class="mob-card mob-card-clickable" data-action="open-app" data-app-id="${esc(app.id)}">
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <div class="company-logo-box">${esc(initials(app.company))}</div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                  <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">${esc(app.jobTitle)}</div>
                  <span class="mob-pill ${getStatusPillClass(app, true)}">${esc(app.statusLabel)}</span>
                </div>
                <div style="font-size:12px;color:var(--mob-text-secondary);margin-top:2px;">${esc(app.company)} · ${esc(app.location)}</div>

                <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;">
                  ${!state.unavailableDataMode ? getHiringBadge(app.hiringStatus, app.hiringStatusConfirmed, true) : `<span class="mob-pill pill-slate">Hiring status not confirmed</span>`}
                  ${showInactivity ? `<span class="mob-pill pill-amber">No update · ${app.inactivityDays}d</span>` : ""}
                </div>

                <div style="font-size:11px;color:var(--mob-text-muted);margin-top:7px;">
                  Applied ${esc(app.appliedDate)} · Updated ${esc(app.lastUpdatedDate)}
                  ${app.recruiterLastActive && !state.unavailableDataMode ? ` · ${esc(app.recruiterLastActive)}` : ""}
                </div>

                ${app.isExternal ? `
                  <div style="margin-top:6px;font-size:11px;color:var(--mob-text-secondary);background:var(--mob-elevated);padding:5px 8px;border-radius:6px;">
                    External application — Naukri has limited visibility into progress on the company's website.
                  </div>
                ` : ""}

                <div style="display:flex;gap:12px;margin-top:9px;padding-top:8px;border-top:1px solid var(--mob-border);font-size:11.5px;">
                  <button class="mob-link" data-action="open-app" data-app-id="${esc(app.id)}">View status</button>
                  ${app.archived
                    ? `<button class="mob-link" data-action="restore-app" data-app-id="${esc(app.id)}">Restore</button>`
                    : `<button class="mob-link" style="color:var(--mob-text-muted);" data-action="archive-app" data-app-id="${esc(app.id)}">Archive</button>`
                  }
                  <button class="mob-link" style="margin-left:auto;" data-action="open-similar">Similar jobs</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("")}

      <!-- Existing Interview Prep & Contextual Pro retained below -->
      <div class="naukri-pro-card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <div>
            <div style="font-size:12.5px;font-weight:700;color:var(--mob-text);">Prepare for interviews</div>
            <div style="font-size:11px;color:var(--mob-text-muted);margin-top:2px;">Role-specific Q&amp;A with Naukri Pro</div>
          </div>
          <button class="mob-btn-secondary" style="padding:5px 10px;font-size:11px;" data-action="toast-pro">Explore</button>
        </div>
      </div>
    `;
  }

  /* SCREENS 05–09: ENHANCED APPLICATION DETAILS + VARIATIONS */
  
  function renderInterviewProgressionCard(state, app) {
    if (!state.interviews) return '';
    const interview = state.interviews.find(i => i.application_id === app.id);
    if (!interview) return '';

    const domain = window.NaukriInterviewDomain;
    const derivedState = domain ? domain.deriveInterviewState(interview) : interview.schedule_state;
    const outcome = domain ? domain.deriveOutcome(interview) : { status: 'Pending' };

    const candAttended = interview.attendance_candidate && interview.attendance_candidate.result === 'positive';
    const recInterviewed = interview.attendance_recruiter && interview.attendance_recruiter.result === 'positive';
    const isCancelled = interview.cancellation && interview.cancellation.cancelled;

    return `
      <!-- V2.0 INTERVIEW PROGRESSION & COORDINATION (FR18–FR27) -->
      <div class="mob-card" style="border:1px solid #3b82f6;background:linear-gradient(180deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));box-shadow:0 4px 16px rgba(37,99,235,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div>
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;color:#60a5fa;">
              Interview Coordination (V2.0)
            </div>
            <div style="font-size:14px;font-weight:700;color:#ffffff;margin-top:2px;">
              ${esc(interview.round_name || 'Interview Round')}
            </div>
          </div>
          <span class="mob-pill ${isCancelled ? 'pill-red' : interview.schedule_state === 'Confirmed' ? 'pill-green' : 'pill-amber'}">
            ${esc(derivedState)}
          </span>
        </div>

        <div style="background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:8px;padding:10px;margin-bottom:12px;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;font-size:11.5px;">
            <span style="color:#94a3b8;">Format:</span>
            <span style="font-weight:600;color:#f8fafc;">${esc(interview.format)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;">
            <span style="color:#94a3b8;">Scheduled Time:</span>
            <span style="font-weight:600;color:#60a5fa;">${domain ? domain.formatDateDisplay(interview.starts_at) : interview.starts_at} (${esc(interview.timezone)})</span>
          </div>
          ${interview.venue_or_link && !isCancelled ? `
            <div style="display:flex;justify-content:space-between;font-size:11.5px;">
              <span style="color:#94a3b8;">Meeting Link:</span>
              <a href="${esc(interview.venue_or_link)}" target="_blank" style="color:#38bdf8;text-decoration:underline;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(interview.venue_or_link)}</a>
            </div>
          ` : ''}
          ${interview.schedule_version > 1 ? `
            <div style="font-size:10px;color:#94a3b8;border-top:1px dashed #334155;padding-top:4px;">
              Schedule Version: v${interview.schedule_version} (Rescheduled)
            </div>
          ` : ''}
        </div>

        ${isCancelled ? `
          <div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;border-radius:7px;padding:8px 10px;margin-bottom:10px;">
            <div style="font-size:11.5px;font-weight:700;color:#fca5a5;">Interview Cancelled</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:2px;">${esc(interview.cancellation.reason)}</div>
          </div>
        ` : ''}

        ${interview.schedule_state === 'Reschedule Pending' ? `
          <div style="background:rgba(245,158,11,0.15);border:1px solid #f59e0b;border-radius:7px;padding:8px 10px;margin-bottom:10px;">
            <div style="font-size:11.5px;font-weight:700;color:#fde047;">Reschedule Requested</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:2px;">
              Proposed slot: <strong>${domain && interview.proposed_slot ? domain.formatDateDisplay(interview.proposed_slot.slot) : ''}</strong>. Pending recruiter confirmation.
            </div>
          </div>
        ` : ''}

        <!-- Candidate Action Controls (FR19, FR20, FR22, FR23) -->
        ${!isCancelled ? `
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${interview.response === 'Pending' ? `
              <div style="display:flex;gap:8px;">
                <button class="mob-btn-primary" style="flex:1;font-size:11.5px;padding:8px;" data-action="accept-invitation" data-interview-id="${interview.id}">
                  ✓ Accept Invitation
                </button>
                <button class="mob-btn-secondary" style="flex:1;font-size:11.5px;padding:8px;color:#f87171;" data-action="decline-invitation" data-interview-id="${interview.id}">
                  ✕ Decline
                </button>
              </div>
            ` : ''}

            ${interview.response === 'Accepted' && interview.schedule_state === 'Confirmed' ? `
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <button class="mob-btn-secondary" style="flex:1;font-size:11px;padding:6px 8px;" data-action="export-calendar" data-interview-id="${interview.id}">
                  📅 Export to Calendar (.ics)
                </button>
                <button class="mob-btn-secondary" style="flex:1;font-size:11px;padding:6px 8px;" data-action="open-reschedule-modal" data-interview-id="${interview.id}">
                  🔄 Request Reschedule
                </button>
              </div>

              <!-- Post-Interview Attendance Recording (FR23, FR25) -->
              <div style="margin-top:6px;background:rgba(30,41,59,0.6);border:1px solid #334155;border-radius:8px;padding:10px;">
                <div style="font-size:11px;font-weight:700;color:#e2e8f0;margin-bottom:6px;">
                  Post-Interview Attendance Confirmation
                </div>
                
                <div style="display:flex;gap:8px;margin-bottom:8px;">
                  <button class="mob-btn-secondary" style="flex:1;font-size:11px;padding:6px;background:${candAttended ? '#059669' : 'rgba(15,23,42,0.8)'};color:${candAttended ? '#ffffff' : '#94a3b8'};border-color:${candAttended ? '#10b981' : '#475569'};" data-action="confirm-candidate-attendance" data-interview-id="${interview.id}" data-result="positive">
                    ${candAttended ? '✓ I Attended' : 'Confirm I Attended'}
                  </button>
                  <button class="mob-btn-secondary" style="flex:1;font-size:11px;padding:6px;color:#fca5a5;" data-action="confirm-candidate-attendance" data-interview-id="${interview.id}" data-result="negative">
                    Did Not Attend
                  </button>
                </div>

                <!-- Independent Status Verification Badges -->
                <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(15,23,42,0.8);border-radius:6px;font-size:10.5px;">
                  <span style="color:#94a3b8;">Candidate Confirmation:</span>
                  <strong style="color:${interview.attendance_candidate ? '#86efac' : '#cbd5e1'};">
                    ${interview.attendance_candidate ? (interview.attendance_candidate.result === 'positive' ? '✓ Attended' : '✕ Missed') : 'Pending'}
                  </strong>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(15,23,42,0.8);border-radius:6px;font-size:10.5px;margin-top:4px;">
                  <span style="color:#94a3b8;">Recruiter Confirmation:</span>
                  <strong style="color:${interview.attendance_recruiter ? '#86efac' : '#cbd5e1'};">
                    ${interview.attendance_recruiter ? (interview.attendance_recruiter.result === 'positive' ? '✓ Conducted' : '✕ No-Show') : 'Pending'}
                  </strong>
                </div>

                <!-- Derived Attendance Outcome -->
                <div style="margin-top:8px;padding:6px 8px;border-radius:6px;background:${outcome.status === 'Confirmed' ? 'rgba(34,197,94,0.15)' : outcome.status === 'Disputed' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)'};border:1px solid ${outcome.status === 'Confirmed' ? '#22c55e' : outcome.status === 'Disputed' ? '#ef4444' : '#3b82f6'};display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:10.5px;color:#cbd5e1;">CAIR Outcome Status:</span>
                  <span style="font-size:11px;font-weight:700;color:${outcome.status === 'Confirmed' ? '#86efac' : outcome.status === 'Disputed' ? '#fca5a5' : '#93c5fd'};">
                    ${outcome.status === 'Confirmed' ? '🎯 Dual Confirmed' : outcome.status}
                  </span>
                </div>
              </div>

              <!-- P2 Optional Interview Readiness Assistant -->
              <div style="margin-top:8px;padding:8px 10px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:11px;font-weight:700;color:#c4b5fd;">✨ Interview Readiness Assistant (P2)</span>
                  <button class="mob-btn-ghost" style="font-size:10px;padding:3px 6px;color:#a78bfa;" data-action="toggle-readiness-plan" data-interview-id="${interview.id}">
                    ${state.showReadinessPlan === interview.id ? 'Hide Plan' : 'View Checklist'}
                  </button>
                </div>
                ${state.showReadinessPlan === interview.id ? `
                  <div style="margin-top:8px;font-size:11px;color:#cbd5e1;display:flex;flex-direction:column;gap:5px;">
                    <div style="display:flex;gap:6px;align-items:center;">
                      <span>✓</span> <span>Review ${esc(app.company)} recent product analytics releases</span>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;">
                      <span>✓</span> <span>Prepare 2 SQL & metric decomposition case examples</span>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;">
                      <span>✓</span> <span>Test audio, webcam, and Google Meet connection</span>
                    </div>
                    <div style="font-size:9.5px;color:#94a3b8;margin-top:4px;">
                      Note: Rule-based simulation; does not auto-schedule or predict hiring outcomes.
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Explicit Application Withdrawal Link (FR26) -->
        <div style="margin-top:10px;text-align:center;">
          <button style="background:none;border:none;color:#94a3b8;font-size:10.5px;text-decoration:underline;cursor:pointer;" data-action="open-withdraw-modal" data-app-id="${app.id}">
            Withdraw Application from Consideration
          </button>
        </div>
      </div>
    `;
  }

function renderAppDetails(state) {
    const app = state.applications.find(a => a.id === state.selectedAppId) || state.applications[0];
    const unavailable = state.unavailableDataMode;
    const isInactive = !app.isExternal && app.inactivityDays >= state.inactivityThreshold && (app.status === "Awaiting Action" || app.status === "Viewed") && app.hiringStatus !== "On Hold" && app.hiringStatus !== "Closed";
    const isOnHold = !unavailable && app.hiringStatus === "On Hold";
    const isClosed = !unavailable && (app.hiringStatus === "Closed" || app.status === "Closed");
    const isNotShortlisted = app.status === "Not Shortlisted";

    return `
      <!-- Top Job Header Card (existing structure + verified hiring availability) -->
      <div class="mob-card">
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <div class="company-logo-box">${esc(initials(app.company))}</div>
          <div style="flex:1;">
            <div style="font-size:15px;font-weight:700;color:var(--mob-text);">${esc(app.jobTitle)}</div>
            <div style="font-size:12px;color:var(--mob-text-secondary);margin-top:2px;">
              ${esc(app.company)} · <span style="color:#fbbf24;">★</span> ${app.companyRating}
            </div>
            <button class="mob-link" style="margin-top:4px;font-size:11.5px;" data-action="open-job" data-job-id="${esc(app.jobId)}">View description</button>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
          <span class="mob-pill ${getStatusPillClass(app, true)}">${esc(app.statusLabel)}</span>
          ${unavailable ? `<span class="mob-pill pill-slate">Hiring status not confirmed</span>` : getHiringBadge(app.hiringStatus, app.hiringStatusConfirmed, true)}
        </div>

        <div style="font-size:11px;color:var(--mob-text-muted);margin-top:8px;display:flex;flex-direction:column;gap:2px;">
          <div>Applied ${esc(app.appliedDate)} · Last application update: ${esc(app.lastUpdatedDate)}</div>
          ${!unavailable && app.hiringStatusConfirmed && app.hiringStatusUpdated ? `<div>Hiring status updated: ${esc(app.hiringStatusUpdated)}</div>` : ""}
        </div>
      </div>

      <!-- SCREEN 06: INACTIVE STATE -->
      ${isInactive ? `
        <div class="state-callout state-callout-amber">
          <div style="font-size:12.5px;font-weight:700;color:var(--mob-amber);">
            No new application update for ${app.inactivityDays} days.
          </div>
          <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:3px;line-height:1.45;">
            No further recruiter action has been recorded. This does not mean your application has been rejected.
          </div>
          <div style="font-size:10.5px;color:var(--mob-text-muted);margin-top:5px;">
            Last recorded update: ${esc(app.lastUpdatedDate)} · Threshold: ${state.inactivityThreshold} days (not a recruiter deadline)
          </div>
          <div style="display:flex;gap:8px;margin-top:9px;flex-wrap:wrap;">
            <button class="mob-btn-primary" style="flex:1;padding:7px 10px;font-size:11.5px;" data-action="open-similar">Explore Similar Jobs</button>
            <button class="mob-btn-secondary" style="padding:7px 10px;font-size:11.5px;" data-action="archive-app" data-app-id="${esc(app.id)}">Archive</button>
            <button class="mob-btn-secondary" style="padding:7px 10px;font-size:11.5px;" data-action="open-job" data-job-id="${esc(app.jobId)}">Job Details</button>
          </div>
        </div>
      ` : ""}

      <!-- SCREEN 08: HIRING ON HOLD -->
      ${isOnHold ? `
        <div class="state-callout state-callout-amber">
          <div style="font-size:12.5px;font-weight:700;color:var(--mob-amber);">Hiring for this position is currently on hold.</div>
          <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:3px;line-height:1.45;">
            The employer has temporarily paused hiring. Your individual application outcome has not been confirmed.
          </div>
          <div style="font-size:10.5px;color:var(--mob-text-muted);margin-top:5px;">
            Employer status updated: ${esc(app.hiringStatusUpdated)}
          </div>
          <div style="display:flex;gap:8px;margin-top:9px;flex-wrap:wrap;">
            <button class="mob-btn-secondary" style="flex:1;padding:7px 9px;font-size:11.5px;${app.notifyOnResume ? 'border-color:var(--mob-green);color:var(--mob-green);' : ''}" data-action="toggle-resume-notify" data-app-id="${esc(app.id)}">
              ${app.notifyOnResume ? "Subscribed to resume updates" : "Notify me if hiring resumes"}
            </button>
            <button class="mob-btn-primary" style="flex:1;padding:7px 9px;font-size:11.5px;" data-action="open-similar">Similar Jobs</button>
          </div>
        </div>
      ` : ""}

      <!-- SCREEN 09: ROLE CLOSED -->
      ${isClosed ? `
        <div class="state-callout state-callout-slate">
          <div style="font-size:12.5px;font-weight:700;color:var(--mob-text);">This position is no longer accepting applications.</div>
          <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:3px;line-height:1.45;">
            ${(app.status === "Shortlisted" || app.status === "Not Shortlisted")
              ? `Confirmed individual decision: <strong>${esc(app.statusLabel)}</strong> (preserved independently of role closure).`
              : "The role has closed, but your individual application outcome has not been shared."}
          </div>
          <div style="display:flex;gap:8px;margin-top:9px;">
            <button class="mob-btn-primary" style="flex:1;padding:7px 10px;font-size:11.5px;" data-action="open-similar">Explore Similar Jobs</button>
            <button class="mob-btn-secondary" style="padding:7px 10px;font-size:11.5px;" data-action="archive-app" data-app-id="${esc(app.id)}">Archive</button>
          </div>
        </div>
      ` : ""}

      <!-- SCREEN 07: NOT SHORTLISTED -->
      ${isNotShortlisted ? `
        <div class="state-callout state-callout-red">
          <div style="font-size:12.5px;font-weight:700;color:var(--mob-red);">You have not been shortlisted for this position.</div>
          <div style="font-size:11px;color:var(--mob-text-muted);margin-top:3px;">
            Decision date: ${esc(app.recruiterDecisionDate || app.lastUpdatedDate)}
          </div>
          <div style="margin-top:7px;padding:8px;border-radius:7px;background:rgba(0,0,0,0.22);font-size:11.5px;color:var(--mob-text-secondary);">
            <strong style="color:var(--mob-text);">Recruiter reason:</strong>
            ${app.recruiterDecisionReason
              ? esc(app.recruiterDecisionReason)
              : "The recruiter has not shared a specific reason for this decision."}
          </div>
          <div style="display:flex;gap:8px;margin-top:9px;flex-wrap:wrap;">
            <button class="mob-btn-primary" style="flex:1;padding:7px 10px;font-size:11.5px;" data-action="open-similar">Explore Similar Jobs</button>
            <button class="mob-btn-secondary" style="padding:7px 10px;font-size:11.5px;" data-action="toast-improve">Improve Profile</button>
            <button class="mob-btn-secondary" style="padding:7px 10px;font-size:11.5px;" data-action="archive-app" data-app-id="${esc(app.id)}">Archive</button>
          </div>
        </div>
      ` : ""}

      <!-- SCREEN 05: EXISTING APPLICATION TIMELINE PRESERVED + EXPLANATION -->
      <div class="mob-card">
        <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);margin-bottom:8px;">Application status</div>
        <div class="v-timeline">
          ${app.timeline.map((step, idx) => `
            <div class="v-step">
              <div class="v-step-rail">
                <div class="v-dot ${step.state}">
                  ${step.state === "done" ? "✓" : step.state === "rejected" ? "✕" : step.state === "hold" ? "II" : step.state === "closed" ? "—" : ""}
                </div>
                ${idx < app.timeline.length - 1 ? `<div class="v-line ${step.state === 'done' ? 'done' : ''}"></div>` : ""}
              </div>
              <div class="v-step-content">
                <div class="v-step-title">${esc(step.stage || step.title || "Update")}</div>
                <div class="v-step-date">${esc(step.date)}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <div style="margin-top:9px;padding:9px;border-radius:8px;background:var(--mob-elevated);font-size:12px;color:var(--mob-text-secondary);line-height:1.45;">
          ${esc(app.statusExplanation)}
        </div>
      </div>

      <!-- Existing Activity on This Job -->
      <div class="mob-card">
        <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);margin-bottom:8px;">Activity on this job</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="summary-kpi">
            <div class="summary-kpi-num">${unavailable || app.totalApplicants === null ? "—" : app.totalApplicants}</div>
            <div class="summary-kpi-label">Total applicants</div>
          </div>
          <div class="summary-kpi">
            <div class="summary-kpi-num">${unavailable || app.viewedByRecruiter === null ? "—" : app.viewedByRecruiter}</div>
            <div class="summary-kpi-label">Applications viewed</div>
          </div>
        </div>
        <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:8px;">
          ${unavailable ? "Recruiter activity unavailable." : esc(app.recruiterActivityNote)}
        </div>
        <div style="font-size:10.5px;color:var(--mob-text-muted);margin-top:4px;">
          Profile views or CV downloads do not confirm shortlisting.
        </div>
      </div>

      <!-- Existing Profile Match Insights -->
      ${renderInterviewProgressionCard(state, app)}

      <div class="mob-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">Profile match insights</div>
            <div style="font-size:10.5px;color:var(--mob-text-muted);">JD match criteria (not a recruiter rejection reason)</div>
          </div>
          <span class="mob-pill pill-blue">${app.matchInsights.score}% match</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          ${app.matchInsights.criteria.map(c => `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 8px;background:var(--mob-elevated);border-radius:7px;">
              <div>
                <div style="font-size:11.5px;font-weight:600;color:var(--mob-text);">${esc(c.label)}</div>
                <div style="font-size:10.5px;color:var(--mob-text-muted);">${esc(c.detail)}</div>
              </div>
              <span class="mob-pill ${c.status === 'match' ? 'pill-green' : c.status === 'mismatch' ? 'pill-red' : 'pill-amber'}">
                ${c.status === "match" ? "✓ Match" : c.status === "mismatch" ? "✕ Gap" : "Partial"}
              </span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  /* SCREEN 10: NOTIFICATIONS */
  function renderNotifications(state) {
    const cats = ["All", "Application Updates", "Job Recommendations", "Recruiter Activity"];
    const visible = state.notifications.filter(n => state.notifCategory === "All" || n.category === state.notifCategory);

    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div style="font-size:14px;font-weight:700;color:var(--mob-text);">Notifications</div>
        <button class="mob-link" data-action="open-notif-prefs">Preferences</button>
      </div>

      <div class="mob-chips-scroll">
        ${cats.map(c => `
          <button class="mob-filter-chip ${state.notifCategory === c ? 'active' : ''}" data-action="set-notif-cat" data-cat="${esc(c)}">
            ${esc(c)}
          </button>
        `).join("")}
      </div>

      ${visible.length === 0 ? `
        <div class="mob-card" style="text-align:center;padding:22px 12px;">
          <div style="font-size:13px;font-weight:700;color:var(--mob-text);">No notifications in this category</div>
        </div>
      ` : visible.map(n => `
        <div class="mob-card mob-card-clickable" style="${n.unread ? 'border-color:#5282ff;' : ''}" data-action="click-notif" data-notif-id="${esc(n.id)}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="mob-pill ${n.category === 'Application Updates' ? 'pill-blue' : n.category === 'Recruiter Activity' ? 'pill-green' : 'pill-slate'}">
              ${esc(n.eventType)}
            </span>
            <span style="font-size:10.5px;color:var(--mob-text-muted);">${esc(n.time)}</span>
          </div>
          <div style="font-size:13px;font-weight:700;color:var(--mob-text);">${esc(n.title)}</div>
          <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:3px;line-height:1.4;">${esc(n.body)}</div>
        </div>
      `).join("")}
    `;
  }

  function renderSimilarJobs(state) {
    return `
      <div style="font-size:13px;font-weight:700;color:var(--mob-text);margin:2px 2px 10px;">Similar Jobs</div>
      ${state.jobs.map(job => `
        <div class="mob-card mob-card-clickable" data-action="open-job" data-job-id="${esc(job.id)}">
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <div class="company-logo-box">${esc(initials(job.company))}</div>
            <div style="flex:1;">
              <div style="font-size:13.5px;font-weight:700;color:var(--mob-text);">${esc(job.title)}</div>
              <div style="font-size:11.5px;color:var(--mob-text-secondary);margin-top:2px;">${esc(job.company)} · ★ ${job.rating}</div>
              <div style="font-size:11px;color:var(--mob-text-muted);margin:5px 0;">
                ${esc(job.experience)} · ${esc(job.salary)} · ${esc(job.location)}
              </div>
              ${getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, true)}
            </div>
          </div>
        </div>
      `).join("")}
    `;
  }

  function renderPhoneHeader(state) {
    const screen = state.mobileScreen;
    if (screen === "home") {
      return `
        ${naukriLogoSvg(22, true)}
        <div class="mob-search-bar" data-action="open-similar">
          ${ICONS.search}<span>Search jobs here</span>
        </div>
        <button class="mob-link" style="color:var(--mob-text-secondary);display:inline-flex;" data-action="go-notifs" aria-label="Notifications">
          ${ICONS.bell}
        </button>
      `;
    }
    const titles = {
      job: "Job Details",
      success: "Applied Successfully",
      applies: "My Applications",
      details: "Application Status",
      notifications: "Notifications",
      similar: "Similar Jobs"
    };
    return `
      <button class="mob-link" style="color:var(--mob-text-secondary);font-size:13px;" data-action="mob-back">← Back</button>
      <div style="font-size:14px;font-weight:700;color:var(--mob-text);">${titles[screen] || "Naukri"}</div>
      <button class="mob-link" style="font-size:12px;" data-action="go-home">Home</button>
    `;
  }

  function render(state) {
    const unreadCount = state.notifications.filter(n => n.unread).length;
    const screenContent = state.loadingMode
      ? renderLoadingSkeleton()
      : state.mobileScreen === "home" ? renderHomepage(state)
      : state.mobileScreen === "job" ? renderJobDetails(state)
      : state.mobileScreen === "success" ? renderApplySuccess(state)
      : state.mobileScreen === "applies" ? renderMyApplications(state)
      : state.mobileScreen === "details" ? renderAppDetails(state)
      : state.mobileScreen === "notifications" ? renderNotifications(state)
      : renderSimilarJobs(state);

    const screenQuickMap = [
      { id: "home", label: "01 Homepage", screen: "home" },
      { id: "job", label: "02 Job Details", screen: "job", jobId: "job-101" },
      { id: "job-hold", label: "02b On Hold", screen: "job", jobId: "job-102" },
      { id: "job-closed", label: "02c Closed", screen: "job", jobId: "job-103" },
      { id: "job-unconf", label: "02d Unconfirmed", screen: "job", jobId: "job-104" },
      { id: "success", label: "03 Apply Success", screen: "success" },
      { id: "applies", label: "04 My Applications", screen: "applies" },
      { id: "app-03", label: "05/06 14d Viewed", screen: "details", appId: "app-03" },
      { id: "app-02", label: "06a 7d Inactive", screen: "details", appId: "app-02" },
      { id: "app-04", label: "06b 37d Inactive", screen: "details", appId: "app-04" },
      { id: "app-05", label: "05b Shortlisted", screen: "details", appId: "app-05" },
      { id: "app-06", label: "07 Not Shortlisted", screen: "details", appId: "app-06" },
      { id: "app-07", label: "08 Hiring On Hold", screen: "details", appId: "app-07" },
      { id: "app-08", label: "09 Role Closed", screen: "details", appId: "app-08" },
      { id: "app-09", label: "04b External", screen: "details", appId: "app-09" },
      { id: "notifications", label: "10 Notifications", screen: "notifications" }
    ];

    return `
      <div class="mobile-stage-wrap">
        <aside class="mob-control-panel">
          <div class="ctrl-group">
            <h3>Screens (01–10)</h3>
            <div class="ctrl-pills">
              ${screenQuickMap.map(item => {
                const isActive =
                  state.mobileScreen === item.screen &&
                  (!item.appId || state.selectedAppId === item.appId) &&
                  (!item.jobId || state.selectedJobId === item.jobId);
                return `
                  <button class="ctrl-pill ${isActive ? 'active' : ''}"
                    data-action="jump-mobile"
                    data-screen="${item.screen}"
                    data-app-id="${item.appId || ''}"
                    data-job-id="${item.jobId || ''}">
                    ${item.label}
                  </button>`;
              }).join("")}
            </div>
          </div>

          <div class="ctrl-group">
            <h3>Inactivity Threshold</h3>
            <div class="ctrl-pills">
              ${[7, 14, 30].map(days => `
                <button class="ctrl-pill ${state.inactivityThreshold === days ? 'active' : ''}" data-action="set-threshold" data-days="${days}">
                  ${days} days
                </button>
              `).join("")}
            </div>
          </div>

          <div class="ctrl-group">
            <h3>Edge States</h3>
            <div class="ctrl-pills">
              <button class="ctrl-pill ${state.loadingMode ? 'active' : ''}" data-action="toggle-loading">
                ${state.loadingMode ? "Loading: On" : "Loading State"}
              </button>
              <button class="ctrl-pill ${state.unavailableDataMode ? 'active' : ''}" data-action="toggle-unavailable">
                ${state.unavailableDataMode ? "Unavailable Data: On" : "Unavailable Data"}
              </button>
            </div>
          </div>

          <button class="mob-btn-primary" style="border-radius:8px;padding:8px 10px;font-size:12px;" data-action="switch-mode" data-mode="recruiter">
            Simulate in Recruiter Panel →
          </button>
        </aside>

        <main class="phone-center">
          <div class="phone-frame">
            <div class="phone-statusbar">
              <span>11:30</span>
              <span>5G · 92%</span>
            </div>
            <header class="phone-header">
              ${renderPhoneHeader(state)}
            </header>
            <div class="phone-scroll">
              ${screenContent}
            </div>
            <nav class="phone-bottom-nav" aria-label="Mobile Navigation">
              <button class="mob-nav-btn ${state.mobileScreen === 'home' ? 'active' : ''}" data-action="go-home">
                ${ICONS.home}<span>Home</span>
              </button>
              <button class="mob-nav-btn ${state.mobileScreen === 'applies' || state.mobileScreen === 'details' || state.mobileScreen === 'success' ? 'active' : ''}" data-action="go-applies">
                ${ICONS.applies}<span>Applies</span>
              </button>
              <button class="mob-nav-btn ${state.mobileScreen === 'job' || state.mobileScreen === 'similar' ? 'active' : ''}" data-action="open-similar">
                ${ICONS.jobs}<span>Jobs</span>
              </button>
              <button class="mob-nav-btn ${state.mobileScreen === 'notifications' ? 'active' : ''}" data-action="go-notifs">
                ${unreadCount > 0 ? `<span class="mob-nav-badge">${unreadCount}</span>` : ""}
                ${ICONS.bell}<span>Updates</span>
              </button>
              <button class="mob-nav-btn" data-action="open-notif-prefs">
                ${ICONS.profile}<span>Profile</span>
              </button>
            </nav>
          </div>
        </main>
      </div>
    `;
  }

  return {
    render,
    naukriLogoSvg,
    getStatusPillClass,
    getHiringBadge,
    initials,
    ICONS,
    esc
  };
})();
