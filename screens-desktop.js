/* Desktop Web Application Tracker (Screen 12) — Authentic Naukri Light Theme */

window.NaukriDesktop = (function () {
  function esc(str) { return window.NaukriMobile.esc(str); }
  function initials(name) { return window.NaukriMobile.initials(name); }
  const ICONS = window.NaukriMobile.ICONS;

  function renderDesktopHeader(state) {
    const unread = state.notifications.filter(n => n.unread).length;
    return `
      <header class="naukri-desk-navbar">
        <div style="display:flex;align-items:center;gap:28px;height:100%;">
          ${window.NaukriMobile.naukriLogoSvg(28, false)}
          <nav class="naukri-desk-nav-links" aria-label="Desktop Navigation">
            <button class="desk-nav-link ${state.desktopSubView === 'jobs' ? 'active' : ''}" data-action="desk-subview" data-view="jobs">Jobs</button>
            <button class="desk-nav-link ${state.desktopSubView === 'tracker' ? 'active' : ''}" data-action="desk-subview" data-view="tracker">My Applications</button>
            <button class="desk-nav-link" data-action="toast-pro">Services</button>
          </nav>
        </div>

        <div style="display:flex;align-items:center;gap:14px;">
          <div class="desk-search-pill" data-action="desk-subview" data-view="jobs" style="cursor:pointer;">
            ${ICONS.search}<span>Search jobs here</span>
          </div>
          <button class="desk-btn-outline" style="color:#6d28d9;border-color:#ddd6fe;" data-action="toast-neo">
            Neo AI
          </button>
          <button class="desk-btn-outline" style="padding:6px 10px;" data-action="switch-mode" data-mode="mobile" data-screen="notifications" aria-label="Notifications">
            ${ICONS.bell} ${unread > 0 ? `<span class="notif-dot-count">${unread}</span>` : ""}
          </button>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:999px;background:#275df5;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;">
              ${esc(state.candidate.initials)}
            </div>
            <span style="font-size:13px;font-weight:600;color:#121224;">${esc(state.candidate.name)}</span>
          </div>
        </div>
      </header>
    `;
  }

  function renderDesktopJobDiscovery(state) {
    return `
      <div class="desk-container">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 style="margin:0;font-size:20px;color:#121224;">Recommended Jobs</h2>
            <p style="margin:4px 0 0;font-size:13px;color:#717b9e;">Showing confirmed hiring status, last updated timestamp, and direct apply.</p>
          </div>
          <button class="desk-btn-outline" data-action="desk-subview" data-view="tracker">
            ← Back to My Applications
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:14px;">
          ${state.jobs.map(job => {
            const applied = state.applications.find(a => a.jobId === job.id && !a.archived);
            const isClosed = job.hiringStatusConfirmed && job.hiringStatus === "Closed";
            const isOnHold = job.hiringStatusConfirmed && job.hiringStatus === "On Hold";
            return `
              <div class="desk-card" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
                <div>
                  <div style="display:flex;gap:11px;align-items:flex-start;">
                    <div class="company-logo-box">${esc(initials(job.company))}</div>
                    <div style="flex:1;">
                      <div style="font-size:15px;font-weight:700;color:#121224;">${esc(job.title)}</div>
                      <div style="font-size:12.5px;color:#474d6a;margin-top:2px;">${esc(job.company)} · <span style="color:#d97706;">★</span> ${job.rating} (${esc(job.reviewsCount)})</div>
                    </div>
                  </div>
                  <div style="font-size:12px;color:#717b9e;margin:10px 0;display:flex;flex-wrap:wrap;gap:12px;">
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.briefcase} ${esc(job.experience)}</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.rupee} ${esc(job.salary)}</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.pin} ${esc(job.location)}</span>
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                    ${window.NaukriMobile.getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, false)}
                    ${job.employerVerified && job.verificationLabel ? `<span class="desk-pill dpill-blue">${esc(job.verificationLabel)}</span>` : ""}
                  </div>
                  <div style="font-size:11.5px;color:#717b9e;">
                    Posted: ${esc(job.postedDate)} · Status updated: ${job.hiringStatusConfirmed && job.hiringStatusUpdated ? esc(job.hiringStatusUpdated) : "Not confirmed"}
                  </div>
                </div>

                <div>
                  ${isClosed ? `
                    <button class="mob-btn-primary" disabled style="background:#e2e8f0;color:#64748b;">Position Closed — Disabled</button>
                  ` : isOnHold && job.holdAcceptingApplications === false ? `
                    <button class="mob-btn-primary" disabled style="background:#fef3c7;color:#92400e;">Applications Paused (On Hold)</button>
                  ` : applied ? `
                    <button class="mob-btn-primary" data-action="desk-open-app" data-app-id="${esc(applied.id)}">Applied · Track Application</button>
                  ` : `
                    <button class="mob-btn-primary" data-action="apply-job" data-job-id="${esc(job.id)}">Apply</button>
                  `}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderDesktopTracker(state) {
    const categories = ["All", "Applies on Naukri", "Recruiter Actions", "Applies via Neo", "External Applications"];
    const baseList = state.applications.filter(a => state.appCategory === "All" || a.category === state.appCategory);
    const availableStatuses = ["All Applications"];
    ["Awaiting Action", "Viewed", "Shortlisted", "Not Shortlisted", "Closed", "Archived"].forEach(st => {
      if (st === "Archived" && baseList.some(a => a.archived)) availableStatuses.push("Archived");
      else if (st !== "Archived" && baseList.some(a => !a.archived && a.status === st)) availableStatuses.push(st);
    });

    const list = baseList.filter(a => {
      if (state.appFilter === "Archived") return a.archived;
      if (a.archived) return false;
      if (state.appFilter === "All Applications") return true;
      return a.status === state.appFilter;
    });

    const selected = state.applications.find(a => a.id === state.selectedAppId) || list[0] || state.applications[0];
    const unavailable = state.unavailableDataMode;
    const isInactive = selected && !selected.isExternal && selected.inactivityDays >= state.inactivityThreshold && (selected.status === "Awaiting Action" || selected.status === "Viewed") && selected.hiringStatus !== "On Hold" && selected.hiringStatus !== "Closed";
    const isOnHold = selected && !unavailable && selected.hiringStatus === "On Hold";
    const isClosed = selected && !unavailable && (selected.hiringStatus === "Closed" || selected.status === "Closed");
    const isNotShortlisted = selected && selected.status === "Not Shortlisted";

    return `
      <div class="desk-container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap;margin-bottom:14px;">
          <div>
            <h1 style="margin:0;font-size:21px;font-weight:700;color:#121224;">My Applications</h1>
            <p style="margin:3px 0 0;font-size:13px;color:#717b9e;">
              Application status, recorded recruiter actions, and confirmed hiring availability.
            </p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="font-size:12px;color:#474d6a;font-weight:600;">Inactivity reminder:</span>
            ${[7, 14, 30].map(d => `
              <button class="ctrl-pill ${state.inactivityThreshold === d ? 'active' : ''}" data-action="set-threshold" data-days="${d}">${d}d</button>
            `).join("")}
            <button class="desk-btn-outline" data-action="switch-mode" data-mode="recruiter">
              Simulate Recruiter Action →
            </button>
          </div>
        </div>

        <!-- Existing Underline Category Tabs + Lightweight Status Filter Chips -->
        <div class="desk-card" style="padding:0 16px 12px;margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-bottom:1px solid #eef0f6;">
            <div style="display:flex;gap:22px;flex-wrap:wrap;">
              ${categories.map(cat => `
                <button class="desk-nav-link ${state.appCategory === cat ? 'active' : ''}" style="height:44px;font-size:13px;" data-action="set-app-category" data-cat="${esc(cat)}">
                  ${esc(cat)}
                </button>
              `).join("")}
            </div>
            <button class="mob-link" style="color:#275df5;" data-action="desk-subview" data-view="jobs">Explore Jobs</button>
          </div>

          <div style="display:flex;gap:7px;flex-wrap:wrap;padding-top:11px;">
            ${availableStatuses.map(st => `
              <button class="ctrl-pill ${state.appFilter === st ? 'active' : ''}" style="border-radius:999px;padding:4px 11px;" data-action="set-app-filter" data-filter="${esc(st)}">
                ${esc(st)}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Existing Desktop Split-Pane Layout: Left Application List + Right Details -->
        <div class="desk-split-layout">
          <div class="desk-card" style="padding:14px;">
            <div style="font-size:13px;font-weight:700;color:#121224;margin-bottom:10px;">
              Applications (${list.length})
            </div>
            ${list.length === 0 ? `
              <div style="text-align:center;padding:28px 12px;color:#717b9e;font-size:13px;">
                No applications match this filter.
                <div style="margin-top:10px;">
                  <button class="desk-btn-outline" data-action="reset-app-filters">Reset Filters</button>
                </div>
              </div>
            ` : list.map(app => {
              const showInact = !app.isExternal && app.inactivityDays >= state.inactivityThreshold && (app.status === "Awaiting Action" || app.status === "Viewed");
              return `
                <div class="desk-app-item ${selected && selected.id === app.id ? 'selected' : ''}" data-action="desk-select-app" data-app-id="${esc(app.id)}">
                  <div style="display:flex;gap:10px;align-items:flex-start;">
                    <div class="company-logo-box" style="width:34px;height:34px;font-size:11px;">${esc(initials(app.company))}</div>
                    <div style="flex:1;min-width:0;">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px;">
                        <div style="font-size:13.5px;font-weight:700;color:#121224;">${esc(app.jobTitle)}</div>
                        <span class="desk-pill ${window.NaukriMobile.getStatusPillClass(app, false)}">${esc(app.statusLabel)}</span>
                      </div>
                      <div style="font-size:12px;color:#474d6a;margin-top:2px;">${esc(app.company)}</div>
                      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:7px;">
                        ${!unavailable ? window.NaukriMobile.getHiringBadge(app.hiringStatus, app.hiringStatusConfirmed, false) : `<span class="desk-pill dpill-slate">Hiring status not confirmed</span>`}
                        ${showInact ? `<span class="desk-pill dpill-amber">No update · ${app.inactivityDays}d</span>` : ""}
                      </div>
                      <div style="font-size:11px;color:#717b9e;margin-top:6px;">
                        Applied ${esc(app.appliedDate)} · Updated ${esc(app.lastUpdatedDate)}
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <!-- Right-Side Application Details -->
          <div>
            ${!selected ? "" : state.loadingMode ? `
              <div class="desk-card">
                <div class="skeleton-light" style="height:22px;width:45%;margin-bottom:12px;"></div>
                <div class="skeleton-light" style="height:84px;width:100%;margin-bottom:14px;"></div>
                <div class="skeleton-light" style="height:150px;width:100%;"></div>
              </div>
            ` : `
              <div class="desk-card">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;padding-bottom:14px;border-bottom:1px solid #eef0f6;">
                  <div style="display:flex;gap:12px;align-items:flex-start;">
                    <div class="company-logo-box">${esc(initials(selected.company))}</div>
                    <div>
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <h2 style="margin:0;font-size:18px;color:#121224;">${esc(selected.jobTitle)}</h2>
                        <span class="desk-pill ${window.NaukriMobile.getStatusPillClass(selected, false)}">${esc(selected.statusLabel)}</span>
                      </div>
                      <div style="font-size:13px;color:#474d6a;margin-top:3px;">
                        ${esc(selected.company)} · ★ ${selected.companyRating} · ${esc(selected.location)} · ${esc(selected.salary)}
                      </div>
                      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
                        ${!unavailable ? window.NaukriMobile.getHiringBadge(selected.hiringStatus, selected.hiringStatusConfirmed, false) : `<span class="desk-pill dpill-slate">Hiring status not confirmed</span>`}
                        ${!unavailable && selected.employerVerified && selected.verificationLabel ? `<span class="desk-pill dpill-blue">${esc(selected.verificationLabel)}</span>` : ""}
                        ${selected.isExternal ? `<span class="desk-pill dpill-slate">External application · Limited visibility</span>` : ""}
                      </div>
                    </div>
                  </div>
                  <div style="display:flex;gap:8px;">
                    <button class="desk-btn-outline" data-action="desk-subview" data-view="jobs">Similar Jobs</button>
                    ${selected.archived
                      ? `<button class="desk-btn-outline" data-action="restore-app" data-app-id="${esc(selected.id)}">Restore</button>`
                      : `<button class="desk-btn-outline" data-action="archive-app" data-app-id="${esc(selected.id)}">Archive</button>`
                    }
                  </div>
                </div>

                <!-- Horizontal Timeline (Preserved Naukri Desktop Pattern) -->
                <div style="margin-top:14px;">
                  <div style="font-size:13.5px;font-weight:700;color:#121224;">Application status</div>
                  <div class="h-timeline">
                    ${selected.timeline.map(step => `
                      <div class="h-step ${step.state === 'done' ? 'done' : ''}">
                        <div class="h-dot ${step.state}">
                          ${step.state === "done" ? "✓" : step.state === "rejected" ? "✕" : step.state === "hold" ? "II" : step.state === "closed" ? "—" : ""}
                        </div>
                        <div style="font-size:12px;font-weight:600;color:#121224;">${esc(step.stage)}</div>
                        <div style="font-size:11px;color:#717b9e;margin-top:2px;">${esc(step.date)}</div>
                      </div>
                    `).join("")}
                  </div>
                  <div style="background:#f8f9fa;border:1px solid #e7e7f1;border-radius:8px;padding:9px 12px;font-size:12.5px;color:#334155;">
                    ${esc(selected.statusExplanation)}
                  </div>
                </div>

                ${isInactive ? `
                  <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;">
                    <div style="font-size:13.5px;font-weight:700;color:#92400e;">No new application update for ${selected.inactivityDays} days.</div>
                    <div style="font-size:12.5px;color:#78350f;margin-top:3px;">
                      No further recruiter action has been recorded. This does not mean your application has been rejected. Last recorded update: ${esc(selected.lastUpdatedDate)}.
                    </div>
                  </div>
                ` : ""}

                ${isOnHold ? `
                  <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
                    <div>
                      <div style="font-size:13.5px;font-weight:700;color:#92400e;">Hiring for this position is currently on hold.</div>
                      <div style="font-size:12.5px;color:#78350f;margin-top:2px;">
                        The employer has temporarily paused hiring (${esc(selected.hiringStatusUpdated)}). Your individual application outcome has not been confirmed.
                      </div>
                    </div>
                    <button class="desk-btn-outline" style="border-color:#d97706;color:#92400e;" data-action="toggle-resume-notify" data-app-id="${esc(selected.id)}">
                      ${selected.notifyOnResume ? "✓ Subscribed to resume alerts" : "Notify me if hiring resumes"}
                    </button>
                  </div>
                ` : ""}

                ${isClosed ? `
                  <div style="margin-top:12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;padding:12px;">
                    <div style="font-size:13.5px;font-weight:700;color:#1e293b;">This position is no longer accepting applications.</div>
                    <div style="font-size:12.5px;color:#475569;margin-top:3px;">
                      ${selected.individualDecisionAvailable && selected.individualDecisionText
                        ? `Individual decision: <strong>${esc(selected.individualDecisionText)}</strong>`
                        : "The role has closed, but your individual application outcome has not been shared."}
                    </div>
                  </div>
                ` : ""}

                ${isNotShortlisted ? `
                  <div style="margin-top:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;">
                    <div style="font-size:13.5px;font-weight:700;color:#991b1b;">You have not been shortlisted for this position.</div>
                    <div style="font-size:12px;color:#7f1d1d;margin-top:2px;">Decision date: ${esc(selected.recruiterDecisionDate || selected.lastUpdatedDate)}</div>
                    <div style="margin-top:7px;background:#fff;border:1px solid #fecaca;border-radius:6px;padding:8px 10px;font-size:12.5px;color:#1e293b;">
                      <strong>Recruiter Decision Note:</strong>
                      ${selected.recruiterDecisionReason ? esc(selected.recruiterDecisionReason) : "The recruiter has not shared a specific reason for this decision."}
                    </div>
                  </div>
                ` : ""}

                <!-- Activity on Job + Profile Match Insights -->
                <div class="desk-insights-grid">
                  <div style="border:1px solid #e7e7f1;border-radius:10px;padding:13px;">
                    <div style="font-size:13.5px;font-weight:700;color:#121224;margin-bottom:9px;">Activity on this job</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                      <div style="background:#f8f9fa;border-radius:8px;padding:9px;">
                        <div style="font-size:17px;font-weight:700;color:#121224;">${unavailable || selected.totalApplicants === null ? "—" : selected.totalApplicants}</div>
                        <div style="font-size:11px;color:#717b9e;">Total Applicants</div>
                      </div>
                      <div style="background:#f8f9fa;border-radius:8px;padding:9px;">
                        <div style="font-size:17px;font-weight:700;color:#121224;">${unavailable || selected.viewedByRecruiter === null ? "—" : selected.viewedByRecruiter}</div>
                        <div style="font-size:11px;color:#717b9e;">Applications Viewed</div>
                      </div>
                    </div>
                    <div style="font-size:11.5px;color:#474d6a;margin-top:9px;line-height:1.45;">
                      ${unavailable ? "Recruiter activity unavailable." : esc(selected.recruiterActivityNote)}
                    </div>
                  </div>

                  <div style="border:1px solid #e7e7f1;border-radius:10px;padding:13px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;">
                      <div>
                        <div style="font-size:13.5px;font-weight:700;color:#121224;">Profile Match Insights</div>
                        <div style="font-size:11px;color:#717b9e;">JD match criteria (separate from recruiter rejection reasons)</div>
                      </div>
                      <span class="desk-pill dpill-blue">${selected.matchInsights.score}% match</span>
                    </div>
                    <div style="display:grid;gap:5px;">
                      ${selected.matchInsights.criteria.map(c => `
                        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:5px 8px;background:#f8f9fa;border-radius:6px;">
                          <span><strong>${esc(c.label)}:</strong> <span style="color:#474d6a;">${esc(c.detail)}</span></span>
                          <span class="desk-pill ${c.status === 'match' ? 'dpill-green' : c.status === 'mismatch' ? 'dpill-red' : 'dpill-amber'}">
                            ${c.status === "match" ? "✓ Match" : c.status === "mismatch" ? "✕ Gap" : "Partial"}
                          </span>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                </div>

                <!-- Contextual Naukri Pro Strip (Non-intrusive below status) -->
                <div style="margin-top:14px;padding:10px 14px;border-radius:8px;background:#fafbfe;border:1px solid #e7e7f1;border-left:3px solid #eab308;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
                  <div style="font-size:12.5px;color:#121224;">
                    <strong>Naukri Pro:</strong> Prepare for Product interviews &amp; boost profile visibility. <span style="color:#717b9e;">Basic application tracking is free.</span>
                  </div>
                  <button class="desk-btn-outline" data-action="toast-pro">Know more</button>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function render(state) {
    return `
      <div class="light-surface">
        ${renderDesktopHeader(state)}
        ${state.desktopSubView === "jobs" ? renderDesktopJobDiscovery(state) : renderDesktopTracker(state)}
      </div>
    `;
  }

  return { render };
})();
