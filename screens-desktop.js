/* Desktop Web Experience (Screen 12 + Images 1–7 Full Naukri Screen Utilization)
   Preserves Naukri's exact light theme, 3-column My Home layout (Image 5),
   mega-menus (Images 1–2), Companies directory (Image 3), Naukri 360 Services (Image 4),
   Profile Drawer & Footer (Image 6), Jobs Filter layout (Image 7), and Split-Pane Tracker (Screen 12).
*/

window.NaukriDesktop = (function () {
  function esc(str) { return window.NaukriMobile.esc(str); }
  function initials(name) { return window.NaukriMobile.initials(name); }
  const ICONS = window.NaukriMobile.ICONS;

  function renderDesktopHeader(state) {
    const unread = state.notifications.filter(n => n.unread).length;
    const isCompaniesOpen = state.deskDropdown === "companies";
    const isServicesOpen = state.deskDropdown === "services";

    return `
      <header class="naukri-desk-navbar">
        <div style="display:flex;align-items:center;gap:24px;height:100%;">
          <button style="background:none;border:none;padding:0;display:flex;align-items:center;" data-action="desk-subview" data-view="home" aria-label="Naukri Home">
            ${window.NaukriMobile.naukriLogoSvg(28, false)}
          </button>

          <nav class="naukri-desk-nav-links" aria-label="Desktop Navigation">
            <button class="desk-nav-link ${state.desktopSubView === 'jobs' || state.desktopSubView === 'jobDetail' ? 'active' : ''}" data-action="desk-subview" data-view="jobs">
              Jobs<span class="naukri-nav-badge">2</span>
            </button>

            <div class="desk-nav-item-wrap">
              <button class="desk-nav-link ${state.desktopSubView === 'companies' || isCompaniesOpen ? 'active' : ''}" data-action="desk-toggle-dropdown" data-menu="companies">
                Companies
              </button>
              ${isCompaniesOpen ? `
                <div class="desk-mega-menu" data-stop-close="true">
                  <div class="desk-mega-col">
                    <h4>Explore categories</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Unicorn</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">MNC</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Startup</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Product based</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Internet</button>
                  </div>
                  <div class="desk-mega-col">
                    <h4>Explore collections</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Top companies</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">IT companies</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Fintech companies</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Sponsored companies</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Featured companies</button>
                  </div>
                  <div class="desk-mega-col">
                    <h4>Research companies</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Interview questions</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Company salaries</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Company reviews</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="companies">Salary Calculator</button>
                  </div>
                </div>
              ` : ""}
            </div>

            <div class="desk-nav-item-wrap">
              <button class="desk-nav-link ${state.desktopSubView === 'services' || isServicesOpen ? 'active' : ''}" data-action="desk-toggle-dropdown" data-menu="services">
                Services<span class="naukri-nav-badge">1</span>
              </button>
              ${isServicesOpen ? `
                <div class="desk-mega-menu" data-stop-close="true">
                  <div class="desk-mega-col">
                    <h4>AI career tools</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Neo AI job agent</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Resume score checker</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">AI resume maker</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Interview Q&amp;A</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">AI mock interview</button>
                  </div>
                  <div class="desk-mega-col">
                    <h4>Premium services</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Naukri Pro <span class="desk-pill dpill-green">Most popular</span></button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Expert resume writing</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Expert power profile</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">AI Bootcamps <span class="desk-pill dpill-slate">New</span></button>
                  </div>
                  <div class="desk-mega-col">
                    <h4>Free resources</h4>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Resume samples</button>
                    <button class="desk-mega-link" data-action="desk-subview" data-view="services">Job letter samples</button>
                    <div style="margin-top:12px;padding-top:10px;border-top:1px solid #eef0f6;">
                      <div style="font-size:12px;font-weight:700;color:#121224;">Promotional Offer</div>
                      <div style="font-size:11.5px;color:#474d6a;margin-top:3px;">PROSALE Flat 25% off on Naukri 360 Pro. Limited Period Offer.</div>
                    </div>
                  </div>
                </div>
              ` : ""}
            </div>

            <button class="desk-nav-link ${state.desktopSubView === 'tracker' ? 'active' : ''}" data-action="desk-subview" data-view="tracker">
              My Applications
            </button>
          </nav>
        </div>

        <div style="display:flex;align-items:center;gap:12px;">
          <div class="desk-search-pill" data-action="desk-subview" data-view="jobs" style="cursor:pointer;padding:4px 5px 4px 14px;">
            <span>Search jobs here</span>
            <span class="desk-search-circle-btn">${ICONS.search}</span>
          </div>

          <button class="naukri360-btn" data-action="desk-subview" data-view="services">
            naukri <span>360</span>
          </button>

          <button class="neo-orb-btn" data-action="desk-subview" data-view="services" title="Neo AI Job Agent" aria-label="Neo AI Job Agent"></button>

          <button class="desk-btn-outline" style="padding:6px 9px;border:none;" data-action="switch-mode" data-mode="mobile" data-screen="notifications" aria-label="Notifications">
            ${ICONS.bell} ${unread > 0 ? `<span class="naukri-nav-badge" style="margin-left:-4px;">${unread}</span>` : ""}
          </button>

          <button class="desk-avatar-pill" data-action="desk-toggle-drawer" aria-label="Open profile menu">
            <span style="font-size:14px;color:#474d6a;">≡</span>
            <span style="width:28px;height:28px;border-radius:999px;background:#275df5;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">
              ${esc(state.candidate.initials)}
            </span>
            <span class="naukri-nav-badge" style="margin-left:-4px;">2</span>
          </button>
        </div>
      </header>
    `;
  }

  function renderProfileDrawer(state) {
    if (!state.deskProfileDrawer) return "";
    return `
      <div class="desk-drawer-backdrop" data-action="desk-close-drawer">
        <aside class="desk-profile-drawer" onclick="event.stopPropagation()">
          <div style="display:flex;justify-content:flex-end;">
            <button class="desk-btn-outline" style="border:none;font-size:16px;padding:4px 8px;" data-action="desk-close-drawer">✕</button>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
            <div style="width:52px;height:52px;border-radius:999px;border:3px solid #16a34a;background:#eff4ff;color:#121224;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">
              ${esc(state.candidate.initials)}
            </div>
            <div>
              <div style="font-size:15px;font-weight:700;color:#121224;">${esc(state.candidate.name)}</div>
              <div style="font-size:12px;color:#474d6a;margin-top:2px;">${esc(state.candidate.currentRole)}</div>
              <button class="mob-link" style="margin-top:4px;font-size:12px;" data-action="toast-improve">View &amp; Update Profile</button>
            </div>
          </div>

          <button style="width:100%;background:linear-gradient(90deg,#fffaf0,#fef3c7);border:1px solid #fde68a;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700;color:#92400e;margin-bottom:16px;" data-action="desk-subview" data-view="services">
            <span>Upgrade to Naukri Pro</span><span>›</span>
          </button>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:13px;font-weight:700;color:#121224;">Your profile performance</span>
            <span style="font-size:11px;color:#717b9e;">Last 90 days</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f8f9fa;border:1px solid #e7e7f1;border-radius:10px;padding:12px;margin-bottom:16px;text-align:center;">
            <div>
              <div style="font-size:18px;font-weight:700;color:#121224;">${state.candidate.searchAppearances}</div>
              <div style="font-size:11.5px;color:#474d6a;">Search Appearances</div>
              <button class="mob-link" style="font-size:11.5px;margin-top:3px;" data-action="desk-subview" data-view="jobs">View all</button>
            </div>
            <div style="border-left:1px solid #e2e5ec;">
              <div style="font-size:18px;font-weight:700;color:#121224;">${state.candidate.recruiterActions}</div>
              <div style="font-size:11.5px;color:#474d6a;">Recruiter Actions</div>
              <button class="mob-link" style="font-size:11.5px;margin-top:3px;" data-action="desk-subview" data-view="tracker">View all</button>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:4px;">
            <button class="desk-left-nav-item" data-action="desk-subview" data-view="tracker">My Applications</button>
            <button class="desk-left-nav-item" data-action="desk-subview" data-view="home">Naukri Blog</button>
            <button class="desk-left-nav-item" data-action="open-notif-prefs">Notification Settings</button>
            <button class="desk-left-nav-item" data-action="toast-pro">FAQs</button>
          </div>
        </aside>
      </div>
    `;
  }

  function renderLeftSidebar(state) {
    const activeCount = state.applications.filter(a => !a.archived).length;
    return `
      <aside class="desk-card" style="padding:18px 14px;">
        <div style="text-align:center;">
          <div style="width:66px;height:66px;border-radius:999px;border:3px solid #16a34a;background:#eff4ff;color:#121224;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;margin:0 auto 6px;">
            ${esc(state.candidate.initials)}
          </div>
          <span style="display:inline-block;background:#ecfdf5;color:#15803d;font-size:10.5px;font-weight:700;padding:1px 7px;border-radius:999px;margin-bottom:8px;">
            ${state.candidate.profileScore}%
          </span>
          <div style="font-size:15px;font-weight:700;color:#121224;">${esc(state.candidate.name)}</div>
          <div style="font-size:12px;color:#474d6a;margin-top:2px;">${esc(state.candidate.currentRole)}</div>
          <div style="font-size:11px;color:#717b9e;margin-top:4px;">${esc(state.candidate.lastUpdated)}</div>
          <button class="mob-btn-primary" style="margin-top:12px;padding:8px 14px;font-size:12.5px;" data-action="toast-improve">
            View profile
          </button>
        </div>

        <div style="background:#f8f9fa;border:1px solid #eef0f6;border-radius:10px;padding:12px;margin-top:14px;">
          <div style="font-size:12.5px;font-weight:700;color:#121224;margin-bottom:8px;">Profile performance</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <div style="font-size:11px;color:#474d6a;">Search appearances</div>
              <div style="font-size:15px;font-weight:700;color:#275df5;margin-top:2px;">${state.candidate.searchAppearances} ›</div>
            </div>
            <div style="border-left:1px solid #e2e5ec;padding-left:8px;">
              <div style="font-size:11px;color:#474d6a;">Recruiter actions</div>
              <div style="font-size:15px;font-weight:700;color:#275df5;margin-top:2px;">${state.candidate.recruiterActions} ›</div>
            </div>
          </div>
          <button style="margin-top:10px;width:100%;background:#ffffff;border:1px solid #e2e5ec;border-radius:8px;padding:6px 8px;font-size:11px;font-weight:600;color:#474d6a;" data-action="desk-subview" data-view="services">
            Upto 3X boost to your profile ›
          </button>
        </div>

        <div style="margin-top:14px;display:flex;flex-direction:column;gap:3px;">
          <button class="desk-left-nav-item ${state.desktopSubView === 'home' ? 'active' : ''}" data-action="desk-subview" data-view="home">
            <span>My home</span>
          </button>
          <button class="desk-left-nav-item ${state.desktopSubView === 'tracker' ? 'active' : ''}" data-action="desk-subview" data-view="tracker">
            <span>My Applications</span>
            <span class="desk-pill dpill-blue">${activeCount}</span>
          </button>
          <button class="desk-left-nav-item ${state.desktopSubView === 'jobs' ? 'active' : ''}" data-action="desk-subview" data-view="jobs">
            <span>Jobs</span>
          </button>
          <button class="desk-left-nav-item ${state.desktopSubView === 'companies' ? 'active' : ''}" data-action="desk-subview" data-view="companies">
            <span>Companies</span>
          </button>
          <button class="desk-left-nav-item ${state.desktopSubView === 'services' ? 'active' : ''}" data-action="desk-subview" data-view="services">
            <span>Naukri 360 / Pro</span>
          </button>
        </div>
      </aside>
    `;
  }

  /* IMAGE 5: NAUKRI DESKTOP 3-COLUMN "MY HOME" */
  function renderDesktopHome(state) {
    const activeApps = state.applications.filter(a => !a.archived);
    const awaiting = activeApps.filter(a => a.status === "Awaiting Action" || a.status === "Viewed").length;
    const recentUpdates = activeApps.filter(a => a.inactivityDays <= 3).length;
    const attentionCount = activeApps.filter(a =>
      a.hiringStatus === "On Hold" ||
      a.hiringStatus === "Closed" ||
      (!a.isExternal && a.inactivityDays >= state.inactivityThreshold && (a.status === "Awaiting Action" || a.status === "Viewed"))
    ).length;

    const recTab = state.deskRecTab || "handpicked";
    const recJobs = recTab === "applies"
      ? state.jobs.filter(j => state.applications.some(a => a.jobId === j.id))
      : state.jobs;

    return `
      <div class="desk-home-grid">
        ${renderLeftSidebar(state)}

        <!-- Center Main Feed (Image 5 + Image 6) -->
        <main style="min-width:0;">
          <!-- Existing Naukri Pro Top Card -->
          <div class="desk-pro-banner">
            <div>
              <div style="font-size:12px;color:#78350f;font-weight:600;">With</div>
              <div style="font-size:26px;font-weight:800;color:#b45309;line-height:1.1;">PRO</div>
              <div style="font-size:12.5px;color:#78350f;margin-bottom:10px;">you get hired faster</div>
              <button class="desk-pro-btn" data-action="desk-subview" data-view="services">Become a Pro</button>
            </div>
            <div style="font-size:12.5px;color:#121224;">
              <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:6px;">
                <span>What will you get</span>
                <span style="color:#92400e;">You &nbsp;&nbsp; PRO</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(180,83,9,0.12);">
                <span>+ Hidden job invitations</span><span>— &nbsp;&nbsp; ✓</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(180,83,9,0.12);">
                <span>+ AI-enhanced profile</span><span>— &nbsp;&nbsp; ✓</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:4px 0;">
                <span>+ Auto-Apply on Naukri</span><span>— &nbsp;&nbsp; ✓</span>
              </div>
            </div>
          </div>

          <!-- INCREMENTAL ADDITION: Compact "My Applications" Summary Card (Screen 01 on Desktop) -->
          <div class="desk-card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <div style="font-size:15px;font-weight:700;color:#121224;">My Applications</div>
                <div style="font-size:12px;color:#717b9e;">Recent updates, awaiting responses, and confirmed hiring status</div>
              </div>
              <button class="mob-link" style="color:#275df5;font-size:13px;" data-action="desk-subview" data-view="tracker">
                View all applications →
              </button>
            </div>

            <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:10px;">
              <div style="background:#f8f9fa;border-radius:8px;padding:10px;cursor:pointer;" data-action="desk-subview" data-view="tracker">
                <div style="font-size:18px;font-weight:700;color:#121224;">${activeApps.length}</div>
                <div style="font-size:11.5px;color:#474d6a;">Total applications</div>
              </div>
              <div style="background:#f8f9fa;border-radius:8px;padding:10px;cursor:pointer;" data-action="desk-subview" data-view="tracker">
                <div style="font-size:18px;font-weight:700;color:#275df5;">${recentUpdates}</div>
                <div style="font-size:11.5px;color:#474d6a;">Recent updates</div>
              </div>
              <div style="background:#f8f9fa;border-radius:8px;padding:10px;cursor:pointer;" data-action="desk-subview" data-view="tracker">
                <div style="font-size:18px;font-weight:700;color:#121224;">${awaiting}</div>
                <div style="font-size:11.5px;color:#474d6a;">Awaiting action</div>
              </div>
              <div style="background:${attentionCount > 0 ? '#fffbeb' : '#f8f9fa'};border-radius:8px;padding:10px;cursor:pointer;" data-action="desk-subview" data-view="tracker">
                <div style="font-size:18px;font-weight:700;color:#b45309;">${attentionCount}</div>
                <div style="font-size:11.5px;color:#92400e;">Need attention</div>
              </div>
            </div>
          </div>

          <!-- Recommended Jobs for You (Image 5) -->
          <div class="desk-card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <div style="font-size:15.5px;font-weight:700;color:#121224;">Recommended jobs for you</div>
              <button class="mob-link" style="color:#275df5;" data-action="desk-subview" data-view="jobs">View all</button>
            </div>
            <div style="display:flex;gap:18px;border-bottom:1px solid #eef0f6;">
              ${[
                { id: "handpicked", label: `Handpicked for you (${state.jobs.length})` },
                { id: "searches", label: "Searches (12)" },
                { id: "applies", label: `Applies (${activeApps.length})` },
                { id: "preferences", label: "Preferences" }
              ].map(t => `
                <button class="desk-nav-link ${recTab === t.id ? 'active' : ''}" style="height:36px;font-size:12.5px;" data-action="desk-rec-tab" data-tab="${t.id}">
                  ${t.label}
                </button>
              `).join("")}
            </div>

            ${recJobs.length === 0 ? `
              <div style="padding:20px;text-align:center;color:#717b9e;font-size:12.5px;">
                Open <button class="mob-link" data-action="desk-subview" data-view="tracker">My Applications</button> to view all ${activeApps.length} submitted applications.
              </div>
            ` : `
              <div class="desk-rec-cards-row">
                ${recJobs.slice(0, 3).map(job => `
                  <div class="desk-mini-job-card" data-action="desk-open-job" data-job-id="${esc(job.id)}">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                      <div class="company-logo-box" style="width:34px;height:34px;font-size:11px;">${esc(initials(job.company))}</div>
                      <span style="font-size:10.5px;color:#717b9e;">${esc(job.postedDate)}</span>
                    </div>
                    <div style="font-size:13px;font-weight:700;color:#121224;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(job.title)}</div>
                    <div style="font-size:11.5px;color:#474d6a;margin-top:2px;">${esc(job.company)} · ★ ${job.rating}</div>
                    <div style="font-size:11px;color:#717b9e;margin-top:5px;">${esc(job.location)}</div>
                    <div style="margin-top:8px;">
                      ${window.NaukriMobile.getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, false)}
                    </div>
                  </div>
                `).join("")}
              </div>
            `}
          </div>

          <!-- Early Access Roles (Image 5) -->
          <div class="desk-card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <div style="font-size:15px;font-weight:700;color:#121224;">Early access roles from top companies</div>
                <div style="font-size:11.5px;color:#717b9e;">See what recruiters are searching for, even before they post a job</div>
              </div>
              <button class="mob-link" style="color:#275df5;" data-action="desk-subview" data-view="jobs">View all</button>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:12px;">
              ${state.earlyAccessRoles.map(role => `
                <div style="border:1px solid #e7e7f1;border-radius:10px;padding:12px;">
                  <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:#121224;">
                    <span>${esc(role.title)}</span>
                    <span style="font-size:11px;color:#717b9e;font-weight:400;">${esc(role.posted)}</span>
                  </div>
                  <div style="font-size:12px;color:#474d6a;margin-top:2px;">${esc(role.domain)}</div>
                  <div style="font-size:11.5px;color:#717b9e;margin:6px 0 10px;">★ ${esc(role.rating)} · ${esc(role.exp)} · ${esc(role.salary)}</div>
                  <button class="desk-btn-outline" style="color:#275df5;border-color:#bfdbfe;" data-action="toast-pro">Share interest</button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Top Companies & Career Blogs (Image 6) -->
          <div class="desk-card" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <div style="font-size:15px;font-weight:700;color:#121224;">Top companies</div>
                <div style="font-size:11.5px;color:#717b9e;">Hiring for Product Management &amp; Analytics</div>
              </div>
              <button class="mob-link" style="color:#275df5;" data-action="desk-subview" data-view="companies">View all</button>
            </div>
            <div class="desk-rec-cards-row">
              ${state.companiesList.slice(0, 3).map(c => `
                <div style="border:1px solid #e7e7f1;border-radius:10px;padding:12px;text-align:center;">
                  <div class="company-logo-box" style="margin:0 auto 8px;">${esc(initials(c.name))}</div>
                  <div style="font-size:13px;font-weight:700;color:#121224;">${esc(c.name)}</div>
                  <div style="font-size:11.5px;color:#717b9e;margin:3px 0 8px;">★ ${c.rating} · ${esc(c.reviews)}</div>
                  <button class="mob-link" style="font-size:12px;" data-action="desk-subview" data-view="jobs">View jobs</button>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="desk-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div style="font-size:15px;font-weight:700;color:#121224;">Stay updated with our blogs</div>
              <button class="mob-link" style="color:#275df5;" data-action="toast-pro">View all</button>
            </div>
            <div class="desk-rec-cards-row">
              ${state.careerBlogs.map(b => `
                <div style="border:1px solid #e7e7f1;border-radius:10px;padding:11px;">
                  <div style="font-size:12.5px;font-weight:700;color:#121224;line-height:1.35;">${esc(b.title)}</div>
                  <div style="font-size:11px;color:#717b9e;margin-top:8px;">${esc(b.tag)} · ${esc(b.date)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </main>

        <!-- Right Rail: MINIs & Insights (Image 5) -->
        <aside class="desk-home-right">
          <div class="minis-card">
            <div style="font-size:18px;font-weight:800;color:#121224;">minis</div>
            <div style="font-size:11.5px;color:#717b9e;">Explore top career content</div>
            <div class="minis-preview-box">
              <div style="font-size:10.5px;color:#93c5fd;font-weight:600;">Product &amp; Hiring Insights · 2d ago</div>
              <div style="font-size:13px;font-weight:700;margin-top:5px;line-height:1.35;">
                What hiring managers look for when shortlisting 3–5 yr Product Analysts
              </div>
            </div>
            <button class="mob-btn-primary" style="padding:8px 14px;font-size:12.5px;" data-action="toast-pro">Explore MINIs</button>
          </div>

          <div class="desk-card">
            <div style="font-size:13px;font-weight:700;color:#121224;line-height:1.4;">
              61% of jobseekers say transparent application updates improve trust in hiring portals.
            </div>
            <button class="mob-link" style="margin-top:8px;font-size:12px;" data-action="switch-mode" data-mode="rationale">Read case study →</button>
          </div>
        </aside>
      </div>
    `;
  }

  /* IMAGE 7: JOBS SEARCH & FILTERS + RIGHT PRO RAIL */
  function renderDesktopJobsSearch(state) {
    return `
      <div class="desk-home-grid">
        <aside class="desk-card" style="padding:16px;">
          <div style="font-size:14px;font-weight:700;color:#121224;margin-bottom:12px;">All Filters</div>
          <div style="font-size:12.5px;color:#474d6a;margin-bottom:14px;">
            <div style="font-weight:700;color:#121224;margin-bottom:6px;">Hiring Status (New)</div>
            <div>☑ Active Hiring (${state.jobs.filter(j => j.hiringStatus === "Active").length})</div>
            <div>☑ On Hold (${state.jobs.filter(j => j.hiringStatus === "On Hold").length})</div>
            <div>☑ Closed (${state.jobs.filter(j => j.hiringStatus === "Closed").length})</div>
          </div>
          <div style="border-top:1px solid #eef0f6;padding-top:12px;font-size:12.5px;color:#474d6a;">
            <div style="font-weight:700;color:#121224;margin-bottom:6px;">Department</div>
            <div>☐ Product Management (4)</div>
            <div>☐ Analytics &amp; BI (2)</div>
          </div>
          <div style="border-top:1px solid #eef0f6;padding-top:12px;margin-top:12px;font-size:12.5px;color:#474d6a;">
            <div style="font-weight:700;color:#121224;margin-bottom:6px;">Location</div>
            <div>☐ Bengaluru (4)</div>
            <div>☐ Gurugram (1)</div>
          </div>
        </aside>

        <main style="min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <div style="font-size:13px;color:#474d6a;">1 – ${state.jobs.length} of ${state.jobs.length} Product &amp; Analytics Jobs</div>
            <span class="desk-btn-outline" style="font-size:12px;">Sort by: Recommended ▾</span>
          </div>

          ${state.jobs.map(job => {
            const applied = state.applications.find(a => a.jobId === job.id && !a.archived);
            const saved = (state.savedJobIds || []).includes(job.id);
            return `
              <div class="desk-card" style="margin-bottom:12px;cursor:pointer;" data-action="desk-open-job" data-job-id="${esc(job.id)}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                  <div style="flex:1;">
                    <div style="font-size:15.5px;font-weight:700;color:#121224;">${esc(job.title)}</div>
                    <div style="font-size:13px;color:#474d6a;margin-top:2px;">
                      ${esc(job.company)} · <span style="color:#d97706;">★</span> ${job.rating} · ${esc(job.reviewsCount)}
                    </div>
                  </div>
                  <div class="company-logo-box">${esc(initials(job.company))}</div>
                </div>

                <div style="font-size:12px;color:#474d6a;margin:10px 0;display:flex;flex-wrap:wrap;gap:14px;">
                  <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.briefcase} ${esc(job.experience)}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.rupee} ${esc(job.salary)}</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.pin} ${esc(job.location)}</span>
                </div>

                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                  <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
                    ${window.NaukriMobile.getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, false)}
                    ${job.employerVerified && job.verificationLabel ? `<span class="desk-pill dpill-blue">✓ Verified Employer</span>` : ""}
                    ${applied ? `<span class="desk-pill dpill-green">Applied</span>` : ""}
                  </div>
                  <button class="mob-link" style="color:#474d6a;font-size:12px;" data-action="desk-save-job" data-job-id="${esc(job.id)}">
                    ${saved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </main>

        <aside class="desk-home-right">
          <div class="desk-card">
            <div style="font-size:15px;font-weight:800;color:#b45309;margin-bottom:6px;">PRO</div>
            <div style="font-size:13.5px;font-weight:700;color:#121224;">Increase profile views upto 3 times</div>
            <div style="font-size:12px;color:#474d6a;margin:6px 0 10px;">Improve your profile with AI and Priority Applicant highlights.</div>
            <button class="mob-link" style="color:#275df5;" data-action="desk-subview" data-view="services">Get Naukri Pro</button>
          </div>
        </aside>
      </div>
    `;
  }

  /* DESKTOP JOB DETAILS (Screen 02 on Desktop) & APPLY SUCCESS (Screen 03 on Desktop) */
  function renderDesktopJobDetail(state) {
    const job = state.jobs.find(j => j.id === state.selectedJobId) || state.jobs[0];
    const applied = state.applications.find(a => a.jobId === job.id && !a.archived);
    const isClosed = job.hiringStatusConfirmed && job.hiringStatus === "Closed";
    const isOnHold = job.hiringStatusConfirmed && job.hiringStatus === "On Hold";

    return `
      <div class="desk-container" style="max-width:920px;">
        <button class="desk-btn-outline" style="margin-bottom:14px;" data-action="desk-subview" data-view="jobs">← Back to Jobs</button>
        <div class="desk-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;">
            <div style="display:flex;gap:12px;align-items:flex-start;">
              <div class="company-logo-box">${esc(initials(job.company))}</div>
              <div>
                <h1 style="margin:0;font-size:20px;color:#121224;">${esc(job.title)}</h1>
                <div style="font-size:13.5px;color:#474d6a;margin-top:3px;">${esc(job.company)} · ★ ${job.rating} (${esc(job.reviewsCount)})</div>
                <div style="font-size:12.5px;color:#717b9e;margin-top:8px;">
                  ${esc(job.experience)} &nbsp;|&nbsp; ${esc(job.salary)} &nbsp;|&nbsp; ${esc(job.location)}
                </div>
              </div>
            </div>
            <div>
              ${isClosed ? `
                <button class="mob-btn-primary" disabled style="background:#e2e8f0;color:#64748b;width:auto;">Position Closed — Disabled</button>
              ` : isOnHold && job.holdAcceptingApplications === false ? `
                <button class="mob-btn-primary" disabled style="background:#fef3c7;color:#92400e;width:auto;">Applications Paused (On Hold)</button>
              ` : applied ? `
                <button class="mob-btn-primary" style="width:auto;" data-action="desk-open-app" data-app-id="${esc(applied.id)}">Already Applied · Track Application</button>
              ` : `
                <button class="mob-btn-primary" style="width:auto;padding:10px 26px;" data-action="apply-job" data-job-id="${esc(job.id)}">Apply</button>
              `}
            </div>
          </div>

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid #eef0f6;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            ${window.NaukriMobile.getHiringBadge(job.hiringStatus, job.hiringStatusConfirmed, false)}
            ${job.employerVerified && job.verificationLabel ? `<span class="desk-pill dpill-blue">✓ ${esc(job.verificationLabel)}</span>` : ""}
            <span style="font-size:12px;color:#717b9e;margin-left:auto;">
              Posted: ${esc(job.postedDate)} · Status updated: ${job.hiringStatusConfirmed && job.hiringStatusUpdated ? esc(job.hiringStatusUpdated) : "Not confirmed"}
            </span>
          </div>

          ${isOnHold ? `
            <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;font-size:12.5px;color:#78350f;">
              <strong>Hiring On Hold:</strong> ${esc(job.holdNote || "Employer has temporarily paused hiring.")}
            </div>
          ` : ""}
          ${isClosed ? `
            <div style="margin-top:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 12px;font-size:12.5px;color:#991b1b;">
              <strong>Position Closed:</strong> This position is no longer accepting applications.
            </div>
          ` : ""}

          <div style="margin-top:16px;padding-top:14px;border-top:1px solid #eef0f6;">
            <h3 style="margin:0 0 8px;font-size:15px;color:#121224;">Job description</h3>
            <p style="font-size:13.5px;color:#334155;line-height:1.55;">${esc(job.summary)}</p>
            <ul style="font-size:13px;color:#474d6a;line-height:1.6;">
              ${job.highlights.map(h => `<li>${esc(h)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderDesktopApplySuccess(state) {
    const app = state.applications.find(a => a.id === state.lastAppliedAppId) || state.applications[0];
    return `
      <div class="desk-container" style="max-width:700px;">
        <div class="desk-card" style="text-align:center;padding:28px 24px;">
          <div style="width:52px;height:52px;border-radius:999px;background:#ecfdf5;color:#15803d;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;margin:0 auto 12px;">✓</div>
          <h2 style="margin:0;font-size:20px;color:#121224;">Applied Successfully</h2>
          <div style="font-size:14px;color:#474d6a;margin-top:4px;">${esc(app.jobTitle)} · ${esc(app.company)}</div>
          <div style="font-size:12px;color:#717b9e;margin-top:4px;">Submitted on ${esc(app.appliedDate)}</div>

          <div style="background:#f8f9fa;border:1px solid #e7e7f1;border-radius:10px;padding:12px 14px;margin:16px auto;text-align:left;font-size:13px;color:#334155;">
            Your application has been sent successfully. You can track recorded recruiter actions and application updates from My Applications.
          </div>

          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button class="mob-btn-primary" style="width:auto;padding:10px 22px;" data-action="desk-open-app" data-app-id="${esc(app.id)}">Track Application</button>
            <button class="desk-btn-outline" data-action="desk-subview" data-view="jobs">Explore Similar Jobs</button>
          </div>
        </div>

        <div class="desk-card" style="margin-top:14px;border-left:3px solid #eab308;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
            <div>
              <div style="font-size:13.5px;font-weight:700;color:#121224;">Naukri Pro · Optional Career Boost</div>
              <div style="font-size:12px;color:#717b9e;">Basic application tracking in My Applications remains free.</div>
            </div>
            <button class="desk-btn-outline" data-action="desk-subview" data-view="services">View Naukri Pro</button>
          </div>
        </div>
      </div>
    `;
  }

  /* IMAGE 3: TOP COMPANIES HIRING NOW */
  function renderDesktopCompanies(state) {
    return `
      <div class="desk-container">
        <h1 style="margin:0 0 14px;font-size:20px;color:#121224;">Top companies hiring now</h1>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(170px, 1fr));gap:12px;margin-bottom:20px;">
          ${[
            { name: "MNCs", count: "2.5K+ Companies" },
            { name: "Fintech", count: "160 Companies" },
            { name: "FMCG & Retail", count: "191 Companies" },
            { name: "Startups", count: "941 Companies" },
            { name: "Edtech", count: "159 Companies" }
          ].map(cat => `
            <div class="desk-card" style="padding:14px;cursor:pointer;" data-action="desk-subview" data-view="jobs">
              <div style="font-size:14.5px;font-weight:700;color:#121224;">${cat.name}</div>
              <div style="font-size:12px;color:#275df5;margin-top:4px;">${cat.count} ›</div>
            </div>
          `).join("")}
        </div>

        <div class="desk-split-layout" style="grid-template-columns:250px 1fr;">
          <aside class="desk-card">
            <div style="font-size:14px;font-weight:700;margin-bottom:12px;">All Filters</div>
            <div style="font-size:12.5px;color:#474d6a;display:flex;flex-direction:column;gap:6px;">
              <strong>Company type</strong>
              <label>☐ Corporate (4)</label>
              <label>☐ Indian MNC (1)</label>
              <label>☐ Startup (2)</label>
              <strong style="margin-top:8px;">Location</strong>
              <label>☐ Bengaluru (7)</label>
              <label>☐ Mumbai (1)</label>
            </div>
          </aside>

          <div>
            <div style="font-size:13px;color:#474d6a;margin-bottom:12px;">Showing ${state.companiesList.length} verified hiring companies</div>
            <div class="desk-companies-grid">
              ${state.companiesList.map(c => `
                <div class="desk-card" style="display:flex;align-items:center;gap:14px;cursor:pointer;" data-action="desk-subview" data-view="jobs">
                  <div class="company-logo-box" style="width:46px;height:46px;">${esc(initials(c.name))}</div>
                  <div style="flex:1;">
                    <div style="font-size:14.5px;font-weight:700;color:#121224;">${esc(c.name)}</div>
                    <div style="font-size:12px;color:#474d6a;margin:2px 0 6px;">★ ${c.rating} | ${esc(c.reviews)} · ${c.openJobs} jobs</div>
                    <div style="display:flex;gap:5px;flex-wrap:wrap;">
                      ${c.tags.map(t => `<span class="desk-pill dpill-slate">${esc(t)}</span>`).join("")}
                    </div>
                  </div>
                  <span style="color:#717b9e;font-size:18px;">›</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* IMAGE 4: NAUKRI 360 / PRO & NEO AI */
  function renderDesktopServices(state) {
    return `
      <div class="desk-container" style="max-width:860px;">
        <div style="background:linear-gradient(90deg,#fde68a,#fef3c7);border:1px solid #f59e0b;border-radius:14px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:18px;">
          <div>
            <div style="font-size:11.5px;font-weight:700;letter-spacing:0.06em;color:#78350f;">ELEVATE YOUR CAREER</div>
            <div style="font-size:24px;font-weight:800;color:#121224;margin-top:2px;">25% Off on Pro</div>
          </div>
          <button class="desk-pro-btn" style="background:#78350f;" data-action="toast-pro">Claim your offer</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:18px;">
          ${["Naukri Pro", "Neo-AI Job Agent", "Build your resume", "Prepare for interview", "Get industry insights"].map(tool => `
            <div class="desk-card" style="text-align:center;padding:14px 10px;cursor:pointer;" data-action="toast-pro">
              <div style="font-size:13px;font-weight:700;color:#121224;">${tool}</div>
            </div>
          `).join("")}
        </div>

        <div class="desk-card" style="background:#fffaf0;border-color:#fde68a;margin-bottom:16px;">
          <div style="font-size:15px;font-weight:700;color:#121224;">${esc(state.candidate.name)}, explore Naukri Pro features</div>
          <div style="font-size:12.5px;color:#474d6a;margin-top:3px;">Hidden job invitations, AI-enhanced profile, and Auto-Apply on Naukri. Basic application tracking remains free for everyone.</div>
        </div>

        <div class="desk-card" style="background:#f5f8ff;border-color:#dbe5ff;display:flex;align-items:center;gap:16px;">
          <div class="neo-orb-btn" style="width:44px;height:44px;"></div>
          <div>
            <div style="font-size:15px;font-weight:700;color:#121224;">I'm Neo, your AI Job Agent!</div>
            <div style="font-size:12.5px;color:#474d6a;margin-top:2px;">From job discovery to instant updates — I'm here to make it easier.</div>
          </div>
        </div>
      </div>
    `;
  }

  /* SCREEN 12: DESKTOP WEB APPLICATION TRACKER */
  
  function renderDesktopInterviewCard(state, selected) {
    if (!state.interviews) return '';
    const interview = state.interviews.find(i => i.application_id === selected.id);
    if (!interview) return '';

    const domain = window.NaukriInterviewDomain;
    const derivedState = domain ? domain.deriveInterviewState(interview) : interview.schedule_state;
    const outcome = domain ? domain.deriveOutcome(interview) : { status: 'Pending' };

    const candAttended = interview.attendance_candidate && interview.attendance_candidate.result === 'positive';
    const recInterviewed = interview.attendance_recruiter && interview.attendance_recruiter.result === 'positive';
    const isCancelled = interview.cancellation && interview.cancellation.cancelled;

    return `
      <div style="margin-top:14px;border:1px solid #bfdbfe;background:#eff6ff;border-radius:10px;padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div>
            <span style="font-size:11px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:0.5px;">Interview Coordination (V2.0)</span>
            <div style="font-size:15px;font-weight:700;color:#1e3a8a;margin-top:2px;">
              ${esc(interview.round_name || 'Interview Round')}
            </div>
          </div>
          <span class="desk-pill ${isCancelled ? 'dpill-red' : interview.schedule_state === 'Confirmed' ? 'dpill-green' : 'dpill-amber'}">
            ${esc(derivedState)}
          </span>
        </div>

        <div style="background:#ffffff;border:1px solid #dbeafe;border-radius:8px;padding:12px;margin-bottom:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12.5px;">
          <div><span style="color:#64748b;">Format:</span> <strong>${esc(interview.format)}</strong></div>
          <div><span style="color:#64748b;">Scheduled Time:</span> <strong style="color:#2563eb;">${domain ? domain.formatDateDisplay(interview.starts_at) : interview.starts_at} (${esc(interview.timezone)})</strong></div>
          ${interview.venue_or_link && !isCancelled ? `
            <div style="grid-column:1 / -1;"><span style="color:#64748b;">Link/Venue:</span> <a href="${esc(interview.venue_or_link)}" target="_blank" style="color:#2563eb;text-decoration:underline;">${esc(interview.venue_or_link)}</a></div>
          ` : ''}
          ${interview.schedule_version > 1 ? `
            <div style="grid-column:1 / -1;font-size:11px;color:#64748b;">Schedule Version: v${interview.schedule_version} (Rescheduled)</div>
          ` : ''}
        </div>

        ${isCancelled ? `
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px;color:#991b1b;font-size:12px;margin-bottom:10px;">
            <strong>Interview Cancelled:</strong> ${esc(interview.cancellation.reason)}
          </div>
        ` : ''}

        ${interview.schedule_state === 'Reschedule Pending' ? `
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px;color:#92400e;font-size:12px;margin-bottom:10px;">
            <strong>Reschedule Requested:</strong> Proposed time ${domain && interview.proposed_slot ? domain.formatDateDisplay(interview.proposed_slot.slot) : ''}. Pending recruiter confirmation.
          </div>
        ` : ''}

        ${!isCancelled ? `
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
            ${interview.response === 'Pending' ? `
              <button class="desk-btn-primary" style="font-size:12px;padding:6px 14px;" data-action="accept-invitation" data-interview-id="${interview.id}">
                ✓ Accept Invitation
              </button>
              <button class="desk-btn-outline" style="font-size:12px;padding:6px 14px;color:#b91c1c;border-color:#f87171;" data-action="decline-invitation" data-interview-id="${interview.id}">
                ✕ Decline
              </button>
            ` : ''}

            ${interview.response === 'Accepted' && interview.schedule_state === 'Confirmed' ? `
              <button class="desk-btn-outline" style="font-size:12px;padding:6px 12px;" data-action="export-calendar" data-interview-id="${interview.id}">
                📅 Export to Calendar (.ics)
              </button>
              <button class="desk-btn-outline" style="font-size:12px;padding:6px 12px;" data-action="open-reschedule-modal" data-interview-id="${interview.id}">
                🔄 Request Reschedule
              </button>
              <button class="desk-btn-outline" style="font-size:12px;padding:6px 12px;background:${candAttended ? '#ecfdf5' : '#ffffff'};color:${candAttended ? '#047857' : '#1e293b'};border-color:${candAttended ? '#10b981' : '#cbd5e1'};" data-action="confirm-candidate-attendance" data-interview-id="${interview.id}" data-result="positive">
                ${candAttended ? '✓ I Attended' : 'Confirm Attendance'}
              </button>
              <button class="desk-btn-outline" style="font-size:12px;padding:6px 12px;color:#b91c1c;border-color:#fca5a5;" data-action="confirm-candidate-attendance" data-interview-id="${interview.id}" data-result="negative">
                Did Not Attend
              </button>
            ` : ''}
          </div>

          <!-- Attendance Dual Confirmation Status Bar -->
          <div style="margin-top:10px;padding:10px;background:#ffffff;border:1px solid #dbeafe;border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;">
            <div>
              <span style="color:#64748b;">Candidate Confirmed:</span> <strong style="color:${interview.attendance_candidate ? '#059669' : '#64748b'};">${interview.attendance_candidate ? (interview.attendance_candidate.result === 'positive' ? '✓ Attended' : '✕ Missed') : 'Pending'}</strong>
              <span style="margin:0 8px;color:#cbd5e1;">|</span>
              <span style="color:#64748b;">Recruiter Confirmed:</span> <strong style="color:${interview.attendance_recruiter ? '#059669' : '#64748b'};">${interview.attendance_recruiter ? (interview.attendance_recruiter.result === 'positive' ? '✓ Conducted' : '✕ No-Show') : 'Pending'}</strong>
            </div>
            <span class="desk-pill ${outcome.status === 'Confirmed' ? 'dpill-green' : outcome.status === 'Disputed' ? 'dpill-red' : 'dpill-blue'}">
              Outcome: ${outcome.status === 'Confirmed' ? '🎯 Dual Confirmed' : outcome.status}
            </span>
          </div>
        ` : ''}

        <div style="margin-top:10px;text-align:right;">
          <button style="background:none;border:none;color:#64748b;font-size:11px;text-decoration:underline;cursor:pointer;" data-action="open-withdraw-modal" data-app-id="${selected.id}">
            Withdraw Application from Consideration
          </button>
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
      else if (st === "Closed" && baseList.some(a => !a.archived && a.hiringStatus === "Closed")) availableStatuses.push("Closed");
      else if (st !== "Archived" && st !== "Closed" && baseList.some(a => !a.archived && a.status === st)) availableStatuses.push(st);
    });

    const list = baseList.filter(a => {
      if (state.appFilter === "Archived") return a.archived;
      if (a.archived) return false;
      if (state.appFilter === "All Applications") return true;
      if (state.appFilter === "Closed") return a.hiringStatus === "Closed";
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
            <div style="display:flex;align-items:center;gap:10px;">
              <button class="mob-link" style="font-size:12.5px;" data-action="desk-subview" data-view="home">← My home</button>
              <span style="color:#cbd5e1;">/</span>
              <span style="font-size:12.5px;color:#474d6a;">My Applications</span>
            </div>
            <h1 style="margin:4px 0 0;font-size:21px;font-weight:700;color:#121224;">Job Application Status</h1>
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

        <div class="desk-split-layout">
          <div class="desk-card" style="padding:14px;">
            <div style="font-size:13px;font-weight:700;color:#121224;margin-bottom:10px;">Applications (${list.length})</div>
            ${list.length === 0 ? `
              <div style="text-align:center;padding:28px 12px;color:#717b9e;font-size:13px;">
                No applications match this filter.
                <div style="margin-top:10px;"><button class="desk-btn-outline" data-action="reset-app-filters">Reset Filters</button></div>
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
                      <div style="font-size:11px;color:#717b9e;margin-top:6px;">Applied ${esc(app.appliedDate)} · Updated ${esc(app.lastUpdatedDate)}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <div>
            ${!selected ? "" : `
              <div class="desk-card">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;padding-bottom:14px;border-bottom:1px solid #eef0f6;">
                  <div style="display:flex;gap:12px;align-items:flex-start;">
                    <div class="company-logo-box">${esc(initials(selected.company))}</div>
                    <div>
                      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <h2 style="margin:0;font-size:18px;color:#121224;">${esc(selected.jobTitle)}</h2>
                        <span class="desk-pill ${window.NaukriMobile.getStatusPillClass(selected, false)}">${esc(selected.statusLabel)}</span>
                      </div>
                      <div style="font-size:13px;color:#474d6a;margin-top:3px;">${esc(selected.company)} · ★ ${selected.companyRating} · ${esc(selected.location)} · ${esc(selected.salary)}</div>
                      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
                        ${!unavailable ? window.NaukriMobile.getHiringBadge(selected.hiringStatus, selected.hiringStatusConfirmed, false) : `<span class="desk-pill dpill-slate">Hiring status not confirmed</span>`}
                        ${!unavailable && selected.employerVerified && selected.verificationLabel ? `<span class="desk-pill dpill-blue">${esc(selected.verificationLabel)}</span>` : ""}
                        ${selected.isExternal ? `<span class="desk-pill dpill-slate">External application · Limited visibility</span>` : ""}
                      </div>
                      <div style="font-size:11.5px;color:#717b9e;margin-top:6px;">
                        Last application update: ${esc(selected.lastUpdatedDate)}
                        ${!unavailable && selected.hiringStatusConfirmed && selected.hiringStatusUpdated ? ` · Hiring status updated: ${esc(selected.hiringStatusUpdated)}` : ""}
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

                <div style="margin-top:14px;">
                  <div style="font-size:13.5px;font-weight:700;color:#121224;">Application status</div>
                  <div class="h-timeline">
                    ${selected.timeline.map(step => `
                      <div class="h-step ${step.state === 'done' ? 'done' : ''}">
                        <div class="h-dot ${step.state}">
                          ${step.state === "done" ? "✓" : step.state === "rejected" ? "✕" : step.state === "hold" ? "II" : step.state === "closed" ? "—" : ""}
                        </div>
                        <div style="font-size:12px;font-weight:600;color:#121224;">${esc(step.stage || step.title || "Update")}</div>
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
                    <div style="font-size:12.5px;color:#78350f;margin-top:3px;">No further recruiter action has been recorded. This does not mean your application has been rejected. Last recorded update: ${esc(selected.lastUpdatedDate)}.</div>
                  </div>
                ` : ""}

                ${isOnHold ? `
                  <div style="margin-top:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
                    <div>
                      <div style="font-size:13.5px;font-weight:700;color:#92400e;">Hiring for this position is currently on hold.</div>
                      <div style="font-size:12.5px;color:#78350f;margin-top:2px;">The employer has temporarily paused hiring (${esc(selected.hiringStatusUpdated)}). Your individual application outcome has not been confirmed.</div>
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
                      ${(selected.status === "Shortlisted" || selected.status === "Not Shortlisted")
                        ? `Confirmed individual decision: <strong>${esc(selected.statusLabel)}</strong> (preserved independently of role closure).`
                        : "The role has closed, but your individual application outcome has not been shared."}
                    </div>
                  </div>
                ` : ""}

                ${isNotShortlisted ? `
                  <div style="margin-top:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;">
                    <div style="font-size:13.5px;font-weight:700;color:#991b1b;">You have not been shortlisted for this position.</div>
                    <div style="font-size:12px;color:#7f1d1d;margin-top:2px;">Decision date: ${esc(selected.recruiterDecisionDate || selected.lastUpdatedDate)}</div>
                    <div style="margin-top:7px;background:#fff;border:1px solid #fecaca;border-radius:6px;padding:8px 10px;font-size:12.5px;color:#1e293b;">
                      <strong>Recruiter Decision Note:</strong> ${selected.recruiterDecisionReason ? esc(selected.recruiterDecisionReason) : "The recruiter has not shared a specific reason for this decision."}
                    </div>
                  </div>
                ` : ""}

                ${renderDesktopInterviewCard(state, selected)}

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
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="desk-footer">
        <div class="desk-footer-inner">
          <div>
            ${window.NaukriMobile.naukriLogoSvg(26, false)}
            <div style="margin-top:12px;font-weight:600;color:#121224;">Unofficial PM Prototype</div>
            <div style="font-size:11px;color:#717b9e;margin-top:4px;">Independent case study</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <span>About us</span><span>Careers</span><span>Employer home</span><span>Sitemap</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <span>Help center</span><span>Summons/Notices</span><span>Grievances</span><span>Report issue</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <span>Privacy policy</span><span>Terms &amp; conditions</span><span>Fraud alert</span><span>Trust &amp; safety</span>
          </div>
          <div style="background:#f8f9fa;border:1px solid #e7e7f1;border-radius:10px;padding:12px;">
            <div style="font-weight:700;color:#121224;">Apply on the go</div>
            <div style="font-size:11px;color:#717b9e;margin-top:2px;">Get real-time job updates on our App</div>
            <div style="display:flex;gap:8px;margin-top:10px;">
              <button class="desk-btn-outline" style="font-size:11px;" data-action="switch-mode" data-mode="mobile">Open Mobile App</button>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function render(state) {
    let viewHtml = "";
    if (state.desktopSubView === "home") viewHtml = renderDesktopHome(state);
    else if (state.desktopSubView === "jobs") viewHtml = renderDesktopJobsSearch(state);
    else if (state.desktopSubView === "jobDetail") viewHtml = renderDesktopJobDetail(state);
    else if (state.desktopSubView === "applySuccess") viewHtml = renderDesktopApplySuccess(state);
    else if (state.desktopSubView === "companies") viewHtml = renderDesktopCompanies(state);
    else if (state.desktopSubView === "services") viewHtml = renderDesktopServices(state);
    else viewHtml = renderDesktopTracker(state);

    return `
      <div class="light-surface">
        ${renderDesktopHeader(state)}
        ${viewHtml}
        ${renderFooter()}
        ${renderProfileDrawer(state)}
      </div>
    `;
  }

  return { render };
})();
