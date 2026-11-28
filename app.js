/* Central State Store, Interaction Engine & Live Recruiter-Candidate Sync */

(function () {
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function createInitialState() {
    const base = deepClone(window.NAUKRI_DATA);
    const params = new URLSearchParams(window.location.search);
    const qMode = params.get("mode");
    const qScreen = params.get("screen");
    const qApp = params.get("app");
    const qJob = params.get("job");
    const qSub = params.get("sub");
    return {
      mode: qMode || "overview",
      interviews: base.interviews || [],
      showReadinessPlan: null,
      analytics_events: [], // "overview" | "casestudy" | "mobile" | "desktop" | "recruiter" | "comparisons" | "documentation" | "testing" | "rationale"
      testing: {
        subView: params.get("testsub") || "participant", // "participant" | "dashboard" | "report"
        participantStage: "consent", // "consent" | "background" | "tasks" | "postTest" | "complete"
        activeParticipant: null,
        activeTaskIndex: 0
      },
      mobileScreen: qScreen || "home", // "home" | "job" | "success" | "applies" | "details" | "notifications" | "similar"
      mobileHistory: [],
      desktopSubView: qSub || "home", // "home" | "tracker" | "jobs" | "jobDetail" | "applySuccess" | "companies" | "services"
      deskDropdown: null, // null | "companies" | "services"
      deskProfileDrawer: false,
      deskRecTab: "handpicked",
      savedJobIds: [],
      recruiterSubView: "responses", // "jobs" | "responses"
      selectedRecJobId: "rec-job-01",
      recJobFilter: "All",
      recSelectedCandIds: [],
      selectedJobId: qJob || "job-101",
      selectedAppId: qApp || "app-03",
      lastAppliedAppId: "app-01",
      appCategory: "All",
      appFilter: "All Applications",
      notifCategory: "All",
      inactivityThreshold: 14,
      loadingMode: false,
      unavailableDataMode: false,
      showComparisonPins: true,
      compCategoryFilter: "All",
      modal: null, // null | { type: "notifPrefs" } | { type: "rejectModal", ... } | { type: "lightbox", src, alt, caption, tag }
      toast: null,
      candidate: base.candidate,
      jobs: base.jobs,
      applications: base.applications,
      notifications: base.notifications,
      notificationPrefs: base.notificationPrefs,
      recruiterJobs: base.recruiterJobs,
      structuredRejectionReasons: base.structuredRejectionReasons,
      companiesList: base.companiesList,
      earlyAccessRoles: base.earlyAccessRoles,
      careerBlogs: base.careerBlogs
    };
  }

  let state = createInitialState();
  let toastTimer = null;

  function showToast(msg) {
    state.toast = msg;
    render();
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      state.toast = null;
      render();
    }, 3400);
  }

  function navigateMobile(nextScreen, opts = {}) {
    if (state.mobileScreen !== nextScreen) {
      state.mobileHistory.push(state.mobileScreen);
    }
    state.mobileScreen = nextScreen;
    if (opts.appId) state.selectedAppId = opts.appId;
    if (opts.jobId) state.selectedJobId = opts.jobId;
  }

  function applyToJob(jobId) {
    const job = state.jobs.find(j => j.id === jobId);
    if (!job) return;
    if (job.hiringStatusConfirmed && job.hiringStatus === "Closed") {
      showToast("This position is closed and no longer accepting applications.");
      return;
    }

    const existing = state.applications.find(a => a.jobId === job.id && !a.archived);
    if (existing) {
      state.selectedAppId = existing.id;
      if (state.mode === "mobile") navigateMobile("details", { appId: existing.id });
      else state.desktopSubView = "tracker";
      showToast("You already applied for this job — opened tracker.");
      render();
      return;
    }

    const newAppId = "app-new-" + Date.now();
    const newApp = {
      id: newAppId,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyRating: job.rating,
      location: job.location,
      salary: job.salary,
      experienceReq: job.experience,
      category: "Applies on Naukri",
      appliedDate: "27 Nov 2026 (Today)",
      lastUpdatedDate: "27 Nov 2026",
      inactivityDays: 0,
      status: "Awaiting Action",
      statusLabel: "Application Sent",
      statusExplanation: "Your application has been sent successfully. You can track recorded recruiter actions and application updates from My Applications.",
      hiringStatus: job.hiringStatus,
      hiringStatusConfirmed: job.hiringStatusConfirmed,
      hiringStatusUpdated: job.hiringStatusUpdated,
      employerVerified: job.employerVerified,
      verificationLabel: job.verificationLabel,
      recruiterName: job.recruiterName,
      recruiterLastActive: job.recruiterLastActive,
      totalApplicants: job.applicantsCount + 1,
      viewedByRecruiter: job.viewedCount,
      isExternal: false,
      archived: false,
      notifyOnResume: false,
      recruiterDecisionReason: null,
      recruiterActivityNote: "Submitted today. Recruiter has not reviewed your application yet.",
      timeline: [
        { stage: "Applied", date: "27 Nov 2026, Just now", state: "done" },
        { stage: "Application Sent", date: "27 Nov 2026, Just now", state: "done" },
        { stage: "Application Viewed", date: "Pending", state: "pending" },
        { stage: "Awaiting Recruiter Action", date: "Current stage", state: "current" }
      ],
      matchInsights: {
        score: job.matchPercentage,
        criteria: Object.values(job.matchCriteria)
      }
    };

    state.applications.unshift(newApp);
    state.lastAppliedAppId = newAppId;
    state.selectedAppId = newAppId;

    if (state.notificationPrefs.applicationUpdates) {
      pushNotification(
        "Application Updates",
        `Application sent · ${job.company}`,
        `Your application for ${job.title} was submitted on 27 Nov 2026.`,
        newAppId,
        "Application sent"
      );
    }

    if (state.mode === "mobile") {
      navigateMobile("success");
    } else {
      state.desktopSubView = "applySuccess";
      showToast(`Applied successfully to ${job.title} at ${job.company}!`);
    }
    render();
  }

  function pushNotification(category, title, body, appId, eventType, opts = {}) {
    const prefs = state.notificationPrefs;
    if (category === "Recruiter Activity" && !prefs.recruiterActivity) return false;
    if (category === "Job Recommendations" && !prefs.jobRecommendations) return false;
    if (category === "Application Updates") {
      if (eventType === "Hiring paused" || eventType === "Role closed") {
        if (!prefs.hiringStatusChanges) return false;
      } else if (eventType === "Hiring resumed") {
        if (!prefs.hiringStatusChanges || !opts.notifyOnResume) return false;
      } else if (!prefs.applicationUpdates) {
        return false;
      }
    }

    // Deduplicate identical consecutive/active event for the same application:
    // If the latest notification recorded for this app already has this eventType and body, suppress it.
    // However, if other events happened since then (e.g. On Hold -> Active -> On Hold), state.notifications[0]
    // for this appId won't match, allowing legitimate recurring transitions to notify.
    const latestForApp = state.notifications.find(n => n.appId === appId);
    if (latestForApp && latestForApp.eventType === eventType && latestForApp.body === body) {
      return false;
    }

    state.notifications.unshift({
      id: "notif-" + Date.now() + "-" + Math.floor(Math.random() * 999),
      category,
      title,
      body,
      time: "Just now",
      unread: true,
      appId,
      eventType
    });
    return true;
  }

  function appendConfirmedTimelineEvent(app, stageName, dateStr, stageState) {
    // Keep historical confirmed events untouched; remove only non-confirmed placeholders
    const preserved = app.timeline.filter(s => s.state !== "current" && s.state !== "pending");
    const existingIdx = preserved.findIndex(s => s.stage === stageName);
    if (existingIdx !== -1) {
      // Preserve historical timestamp if already confirmed unless upgrading state
      if (preserved[existingIdx].state === stageState) return;
      preserved[existingIdx] = { stage: stageName, date: dateStr, state: stageState };
    } else {
      preserved.push({ stage: stageName, date: dateStr, state: stageState });
    }
    app.timeline = preserved;
  }

  function syncRecruiterCandidateStatus(recJobId, candId, newStatus, reasonText) {
    const recJob = state.recruiterJobs.find(j => j.id === recJobId);
    if (!recJob) return { changed: false, notified: false };
    const cand = recJob.candidates.find(c => c.id === candId);
    if (!cand) return { changed: false, notified: false };

    const prevStatus = cand.recruiterStatus;
    const prevReason = cand.decisionReason || null;
    const nextReason = newStatus === "Not Shortlisted" ? (reasonText || null) : null;

    if (prevStatus === newStatus && prevReason === nextReason) {
      return { changed: false, notified: false };
    }

    cand.recruiterStatus = newStatus;
    cand.decisionReason = nextReason;

    if (prevStatus !== "Shortlisted" && newStatus === "Shortlisted") recJob.shortlistedCount += 1;
    if (prevStatus === "Shortlisted" && newStatus !== "Shortlisted") recJob.shortlistedCount = Math.max(0, recJob.shortlistedCount - 1);

    let notified = false;
    if (cand.isPrototypeUser && cand.linkedAppId) {
      const app = state.applications.find(a => a.id === cand.linkedAppId);
      if (app) {
        app.lastUpdatedDate = "27 Nov 2026 (Just now)";
        app.inactivityDays = 0;
        app.recruiterLastActive = "Active just now";

        if (newStatus === "Shortlisted") {
          app.status = "Shortlisted";
          app.statusLabel = "Shortlisted";
          app.statusExplanation = "The recruiter has shortlisted your profile. Watch your registered email and NVites inbox for interview scheduling.";
          app.recruiterDecisionReason = null;
          app.individualDecisionAvailable = true;
          app.individualDecisionText = "Shortlisted";
          app.recruiterActivityNote = `Shortlisted by ${recJob.postedBy.replace(" (Me)", "")} on 27 Nov 2026.`;
          appendConfirmedTimelineEvent(app, "Shortlisted", "27 Nov 2026, Just now", "done");
          notified = pushNotification(
            "Application Updates",
            `Shortlisted · ${app.company}`,
            `Your application for ${app.jobTitle} was shortlisted.`,
            app.id,
            "Shortlisted"
          );
        } else if (newStatus === "Not Shortlisted") {
          app.status = "Not Shortlisted";
          app.statusLabel = "Not Shortlisted";
          app.statusExplanation = "You have not been shortlisted for this position.";
          app.recruiterDecisionDate = "27 Nov 2026";
          app.recruiterDecisionReason = nextReason;
          app.individualDecisionAvailable = true;
          app.individualDecisionText = "Not Shortlisted";
          app.recruiterActivityNote = "Recruiter updated candidate status to Not Shortlisted on 27 Nov 2026.";
          appendConfirmedTimelineEvent(app, "Not Shortlisted", "27 Nov 2026, Just now", "rejected");
          notified = pushNotification(
            "Application Updates",
            `Status updated · ${app.company}`,
            nextReason
              ? `Not shortlisted for ${app.jobTitle}. Note: ${nextReason}`
              : `You have not been shortlisted for ${app.jobTitle}.`,
            app.id,
            "Not shortlisted"
          );
        } else if (newStatus === "Viewed") {
          app.status = "Viewed";
          app.statusLabel = "Application Viewed";
          app.statusExplanation = "The recruiter has viewed your application. No further decision has been shared yet.";
          app.recruiterActivityNote = "Application viewed by recruiter on 27 Nov 2026.";
          app.recruiterDecisionReason = null;
          app.recruiterDecisionDate = null;
          app.individualDecisionAvailable = false;
          app.individualDecisionText = null;
          appendConfirmedTimelineEvent(app, "Application Viewed", "27 Nov 2026, Just now", "done");
          app.timeline.push({ stage: "Awaiting Recruiter Action", date: "Current stage", state: "current" });
          notified = pushNotification(
            "Recruiter Activity",
            `Application viewed · ${app.company}`,
            `Recruiter opened your application for ${app.jobTitle}.`,
            app.id,
            "Application viewed"
          );
        } else if (newStatus === "Maybe") {
          app.status = "Viewed";
          app.statusLabel = "Application Viewed";
          app.statusExplanation = "The recruiter has reviewed your application and kept it under consideration. No final decision has been shared yet.";
          app.recruiterActivityNote = "Application reviewed by recruiter (under consideration) on 27 Nov 2026.";
          app.recruiterDecisionReason = null;
          app.recruiterDecisionDate = null;
          app.individualDecisionAvailable = false;
          app.individualDecisionText = null;
          appendConfirmedTimelineEvent(app, "Application Viewed", "27 Nov 2026, Just now", "done");
          app.timeline.push({ stage: "Awaiting Recruiter Action", date: "Under review", state: "current" });
        }
        state.selectedAppId = app.id;
      }
    }
    return { changed: true, notified };
  }

  function syncRecruiterJobStatus(recJobId, newJobStatus) {
    const recJob = state.recruiterJobs.find(j => j.id === recJobId);
    if (!recJob) return;
    const prev = recJob.jobStatus;
    if (prev === newJobStatus) return;
    recJob.jobStatus = newJobStatus;

    let notifStatusMsg = "Candidate hiring status updated.";
    if (recJob.linkedAppId) {
      const app = state.applications.find(a => a.id === recJob.linkedAppId);
      if (app) {
        // Keep individual application status & historical timeline untouched
        app.hiringStatus = newJobStatus;
        app.hiringStatusConfirmed = true;
        app.hiringStatusUpdated = "27 Nov 2026 (Just now)";

        if (newJobStatus === "On Hold") {
          const sent = pushNotification(
            "Application Updates",
            `Hiring paused · ${app.company}`,
            `Hiring for ${app.jobTitle} is currently on hold.`,
            app.id,
            "Hiring paused"
          );
          notifStatusMsg = sent
            ? "Job marked On Hold — individual decision preserved & candidate notified."
            : "Job marked On Hold — individual decision preserved (alert suppressed by preferences).";
        } else if (newJobStatus === "Closed") {
          const sent = pushNotification(
            "Application Updates",
            `Role closed · ${app.company}`,
            `${app.jobTitle} is no longer accepting applications.`,
            app.id,
            "Role closed"
          );
          notifStatusMsg = sent
            ? "Job marked Closed — existing candidate decision preserved & candidate notified."
            : "Job marked Closed — existing candidate decision preserved (alert suppressed by preferences).";
        } else if (newJobStatus === "Active" && (prev === "On Hold" || prev === "Closed")) {
          const sent = pushNotification(
            "Application Updates",
            `Hiring resumed · ${app.company}`,
            `${app.jobTitle} is actively hiring again.`,
            app.id,
            "Hiring resumed",
            { notifyOnResume: app.notifyOnResume }
          );
          notifStatusMsg = sent
            ? "Job reopened (Active) — candidate notified via resume alert subscription."
            : "Job reopened (Active) — individual decision preserved (no resume alert sent: opt-in or preference off).";
        }
        state.selectedAppId = app.id;
      }
    }
    showToast(notifStatusMsg);
    render();
  }

  function renderModals() {
    if (!state.modal) return "";

    if (state.modal.type === "notifPrefs") {
      const p = state.notificationPrefs;
      const items = [
        { key: "applicationUpdates", label: "Application status updates", desc: "Shortlisted, Interview scheduled, Not shortlisted" },
        { key: "hiringStatusChanges", label: "Hiring status changes", desc: "Role paused (On Hold), hiring resumed, or role closed" },
        { key: "inactivityDigest", label: "Inactivity summary alerts", desc: `Optional reminder after ${state.inactivityThreshold} days with no update` },
        { key: "recruiterActivity", label: "Recruiter activity", desc: "When your application is viewed" },
        { key: "jobRecommendations", label: "Job recommendations", desc: "Matched roles from verified employers" },
        { key: "promotional", label: "Naukri Pro & promotional offers", desc: "Paid add-ons and career services" }
      ];
      return `
        <div class="modal-backdrop" data-backdrop-close="true">
          <div class="modal-panel modal-panel-dark">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:16px;">Notification Preferences</h3>
              <button class="mob-btn-secondary" style="padding:4px 10px;" data-action="close-modal">✕</button>
            </div>
            <p style="font-size:12px;color:#9ca3af;margin:0 0 12px;">Control which updates you receive. Essential application updates stay clean and non-promotional.</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${items.map(it => `
                <label style="display:flex;justify-content:space-between;align-items:center;gap:12px;background:#222838;padding:10px 12px;border-radius:10px;cursor:pointer;">
                  <div>
                    <div style="font-size:13px;font-weight:600;color:#f3f4f8;">${it.label}</div>
                    <div style="font-size:11.5px;color:#9ca3af;">${it.desc}</div>
                  </div>
                  <input type="checkbox" ${p[it.key] ? "checked" : ""} data-action="toggle-pref" data-pref-key="${it.key}" style="width:18px;height:18px;">
                </label>
              `).join("")}
            </div>
            <button class="mob-btn-primary" style="margin-top:14px;" data-action="close-modal">Save Preferences</button>
          </div>
        </div>
      `;
    }

    if (state.modal.type === "rejectModal") {
      const isBulk = state.modal.bulk;
      return `
        <div class="modal-backdrop" data-backdrop-close="true">
          <div class="modal-panel">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h3 style="margin:0;font-size:17px;color:#121224;">
                ${isBulk ? `Update ${state.recSelectedCandIds.length} Selected Candidate(s) to Not Shortlisted` : "Mark Candidate as Not Shortlisted"}
              </h3>
              <button class="mob-btn-secondary" style="background:#fff;color:#121224;border-color:#d5dce9;padding:4px 10px;" data-action="close-modal">✕</button>
            </div>
            <p style="font-size:12.5px;color:#474d6a;margin:0 0 12px;">
              Optional: select a structured reason to help candidates understand the outcome without writing manual messages.
            </p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
              ${state.structuredRejectionReasons.map((reason, idx) => `
                <label style="display:flex;align-items:center;gap:10px;padding:9px 11px;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;cursor:pointer;">
                  <input type="radio" name="rejectReasonRadio" value="${idx}" ${idx === 0 ? "checked" : ""}>
                  <span>${window.NaukriMobile.esc(reason)}</span>
                </label>
              `).join("")}
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;">
              <button class="mob-btn-secondary" style="background:#fff;color:#121224;border-color:#cbd5e1;" data-action="close-modal">Cancel</button>
              <button class="mob-btn-primary" style="width:auto;background:#dc2626;border-radius:8px;" data-action="confirm-reject">Confirm &amp; Notify Candidate</button>
            </div>
          </div>
        </div>
      `;
    }

    if (state.modal.type === "lightbox") {
      return `
        <div class="modal-backdrop" data-backdrop-close="true">
          <div class="lightbox-modal">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="desk-pill dpill-blue">${window.NaukriMobile.esc(state.modal.tag)}</span>
                <span style="font-size:13px;font-weight:600;color:#f8fafc;">${window.NaukriMobile.esc(state.modal.caption)}</span>
              </div>
              <button class="proto-reset" data-action="close-modal">✕ Close</button>
            </div>
            <img src="${window.NaukriMobile.esc(state.modal.src)}" alt="${window.NaukriMobile.esc(state.modal.alt)}" />
          </div>
        </div>
      `;
    }

    if (state.modal.type === "logIssueModal") {
      const sessions = window.NaukriTesting ? window.NaukriTesting.getStoredSessions() : [];
      return `
        <div class="modal-backdrop" data-backdrop-close="true">
          <div class="modal-panel modal-panel-dark" style="max-width:540px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;font-size:16px;color:#f8fafc;">Log Observed Usability Friction / Issue</h3>
              <button class="mob-btn-secondary" style="padding:4px 10px;" data-action="close-modal">✕</button>
            </div>
            <p style="font-size:12px;color:#94a3b8;margin:0 0 14px;">
              Record friction points noticed during participant observations with rigorous severity classification.
            </p>
            <form id="log-issue-form" style="display:flex;flex-direction:column;gap:12px;">
              <div>
                <label class="testing-obs-label">Participant:</label>
                <select name="participantId" class="testing-select" required>
                  ${sessions.map(s => `<option value="${s.id}">${s.id} (${s.background.employmentStatus || 'Participant'})</option>`).join("")}
                </select>
              </div>
              <div>
                <label class="testing-obs-label">Affected Task:</label>
                <select name="taskName" class="testing-select" required>
                  <option value="General Prototype">General Prototype / Navigation</option>
                  <option value="Task 1 — Application Tracking">Task 1 — Application Tracking</option>
                  <option value="Task 2 — Prolonged Inactivity">Task 2 — Prolonged Inactivity</option>
                  <option value="Task 3 — Not Shortlisted">Task 3 — Not Shortlisted</option>
                  <option value="Task 4 — Hiring On Hold">Task 4 — Hiring On Hold</option>
                  <option value="Task 5 — Application Notifications">Task 5 — Application Notifications</option>
                  <option value="Task 6 — Application Management">Task 6 — Application Management</option>
                </select>
              </div>
              <div>
                <label class="testing-obs-label">Severity Level:</label>
                <select name="severity" class="testing-select" required>
                  <option value="Critical">Critical — Prevents task completion</option>
                  <option value="Major">Major — Causes significant confusion or requires assistance</option>
                  <option value="Minor" selected>Minor — Creates friction but does not prevent completion</option>
                  <option value="Suggestion">Suggestion — Optional improvement</option>
                </select>
              </div>
              <div>
                <label class="testing-obs-label">Issue Summary:</label>
                <input type="text" name="title" class="testing-input" placeholder="e.g., Looked for notifications on profile icon instead of bell" required />
              </div>
              <div>
                <label class="testing-obs-label">Observed Evidence / Quotes:</label>
                <textarea name="evidence" class="testing-textarea" rows="2" placeholder="Participant spent 40s searching the bottom bar before clicking top bell..." required></textarea>
              </div>
              <div>
                <label class="testing-obs-label">Recommended Action:</label>
                <input type="text" name="recommendedAction" class="testing-input" placeholder="e.g., Add an inline notification badge on the My Applications tab" required />
              </div>
              <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
                <button type="button" class="testing-sec-btn" data-action="close-modal">Cancel</button>
                <button type="submit" class="testing-primary-btn">Save Issue to Log ✓</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    return "";
  }

  function render() {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    const unread = state.notifications.filter(n => n.unread).length;
    const header = `
      <header class="proto-bar">
        <div class="proto-bar-title" data-action="switch-mode" data-mode="overview" title="Go to Portfolio Overview">
          <span style="font-weight:700;letter-spacing:-0.2px;">Naukri Application Clarity</span>
          <span class="proto-tag">PM Portfolio Case Study</span>
        </div>

        <nav class="proto-tabs" aria-label="Portfolio Sections">
          <button class="proto-tab ${state.mode === 'overview' ? 'active' : ''}" data-action="switch-mode" data-mode="overview">
            Overview
          </button>
          <button class="proto-tab ${state.mode === 'casestudy' ? 'active' : ''}" data-action="switch-mode" data-mode="casestudy">
            Case Study (PRD)
          </button>
          <button class="proto-tab ${(state.mode === 'mobile' || state.mode === 'desktop' || state.mode === 'recruiter') ? 'active' : ''}" data-action="switch-mode" data-mode="mobile">
            Interactive Prototype
            ${unread > 0 ? `<span class="notif-dot-count">${unread}</span>` : ""}
          </button>
          <button class="proto-tab ${state.mode === 'comparisons' ? 'active' : ''}" data-action="switch-mode" data-mode="comparisons">
            Before vs. After
          </button>
          <button class="proto-tab ${state.mode === 'documentation' || state.mode === 'rationale' ? 'active' : ''}" data-action="switch-mode" data-mode="documentation">
            Product Documentation
          </button>
          <button class="proto-tab ${state.mode === 'testing' ? 'active' : ''}" style="margin-left:6px;border-color:#334155;color:#94a3b8;" data-action="switch-mode" data-mode="testing">
            🧪 Usability Lab
          </button>
        </nav>

        <div style="display:flex;align-items:center;gap:8px;">
          ${(state.mode === 'mobile' || state.mode === 'desktop' || state.mode === 'recruiter') ? `
            <div style="display:flex;gap:4px;background:#18181b;padding:2px 4px;border-radius:6px;border:1px solid #27272a;">
              <button class="proto-tab ${state.mode === 'mobile' ? 'active' : ''}" style="padding:4px 8px;font-size:11.5px;" data-action="switch-mode" data-mode="mobile">Mobile (Dark)</button>
              <button class="proto-tab ${state.mode === 'desktop' ? 'active' : ''}" style="padding:4px 8px;font-size:11.5px;" data-action="switch-mode" data-mode="desktop">Desktop</button>
              <button class="proto-tab ${state.mode === 'recruiter' ? 'active' : ''}" style="padding:4px 8px;font-size:11.5px;" data-action="switch-mode" data-mode="recruiter">Recruiter</button>
            </div>
          ` : ""}
          <!-- Deterministic Demo Clock Simulator (FR23, FR25) -->
          <div style="display:flex;align-items:center;gap:4px;background:#0f172a;border:1px solid #334155;border-radius:6px;padding:2px 8px;font-size:11px;color:#94a3b8;">
            <span style="color:#38bdf8;font-weight:700;">⏱ Demo Clock:</span>
            <span style="color:#f8fafc;font-family:monospace;font-size:11px;">${window.NaukriInterviewDomain ? window.NaukriInterviewDomain.DemoClock.format() : 'Current'}</span>
            <button class="proto-tab" style="padding:2px 6px;font-size:10px;background:#1e293b;border-color:#475569;" data-action="advance-clock-hours" data-hours="2" title="Advance clock by 2 hours">+2h</button>
            <button class="proto-tab" style="padding:2px 6px;font-size:10px;background:#1e293b;border-color:#475569;" data-action="advance-clock-days" data-days="1" title="Advance clock by 1 day">+1d</button>
            <button class="proto-tab" style="padding:2px 6px;font-size:10px;background:#1e293b;border-color:#475569;" data-action="advance-clock-days" data-days="7" title="Advance clock by 7 days">+7d</button>
            <button class="proto-tab" style="padding:2px 6px;font-size:10px;color:#f87171;background:#1e293b;border-color:#475569;" data-action="reset-clock" title="Reset clock to current wall time">Reset</button>
          </div>
          <button class="proto-reset" data-action="reset-demo">Reset Demo</button>
        </div>
      </header>
    `;

    let body = "";
    if (state.mode === "overview" && window.NaukriCaseStudy) body = window.NaukriCaseStudy.renderOverview(state);
    else if (state.mode === "casestudy" && window.NaukriCaseStudy) body = window.NaukriCaseStudy.renderCaseStudy(state);
    else if (state.mode === "documentation" && window.NaukriCaseStudy) body = window.NaukriCaseStudy.renderDocumentation(state);
    else if (state.mode === "mobile") body = window.NaukriMobile.render(state);
    else if (state.mode === "desktop") body = window.NaukriDesktop.render(state);
    else if (state.mode === "recruiter") body = window.NaukriRecruiter.render(state);
    else if (state.mode === "comparisons") body = window.NaukriPortfolio.renderComparisons(state);
    else if (state.mode === "rationale") body = window.NaukriPortfolio.renderRationale();
    else if (state.mode === "testing" && window.NaukriTesting) body = window.NaukriTesting.render(state);
    else if (window.NaukriCaseStudy) body = window.NaukriCaseStudy.renderOverview(state);

    const toastHtml = state.toast ? `<div class="toast-banner">✓ ${window.NaukriMobile.esc(state.toast)}</div>` : "";
    appEl.innerHTML = header + body + renderModals() + toastHtml;
  }

  /* Event Delegation */
  document.addEventListener("click", function (e) {
    if (e.target && e.target.getAttribute && e.target.getAttribute("data-backdrop-close") === "true") {
      state.modal = null;
      render();
      return;
    }
    const target = e.target.closest("[data-action]");
    if (!target) {
      if (state.deskDropdown && !e.target.closest("[data-stop-close]")) {
        state.deskDropdown = null;
        render();
      }
      return;
    }
    const action = target.getAttribute("data-action");

    if (action === "switch-mode") {
      state.mode = target.getAttribute("data-mode");
      const targetScreen = target.getAttribute("data-screen");
      if (targetScreen) state.mobileScreen = targetScreen;
      render();
      return;
    }

    if (action === "nav-prototype") {
      state.mode = target.getAttribute("data-mode");
      const scr = target.getAttribute("data-screen");
      const appId = target.getAttribute("data-app");
      const sub = target.getAttribute("data-sub");
      if (scr) state.mobileScreen = scr;
      if (appId) state.selectedAppId = appId;
      if (sub) state.desktopSubView = sub;
      window.scrollTo({ top: 0, behavior: "smooth" });
      render();
      return;
    }

    if (action === "open-lightbox") {
      state.modal = {
        type: "lightbox",
        src: target.getAttribute("data-src"),
        alt: target.getAttribute("data-alt"),
        caption: target.getAttribute("data-caption"),
        tag: target.getAttribute("data-tag")
      };
      render();
      return;
    }

    if (action === "toggle-comp-pins") {
      state.showComparisonPins = !state.showComparisonPins;
      render();
      return;
    }

    if (action === "set-comp-cat") {
      state.compCategoryFilter = target.getAttribute("data-cat");
      render();
      return;
    }

    if (action === "advance-clock-hours") {
      const h = Number(target.getAttribute("data-hours") || 1);
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.DemoClock.advanceHours(h);
        showToast(`Advanced simulated Demo Clock by ${h} hour(s).`);
      }
      render();
      return;
    }

    if (action === "advance-clock-days") {
      const d = Number(target.getAttribute("data-days") || 1);
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.DemoClock.advanceDays(d);
        showToast(`Advanced simulated Demo Clock by ${d} day(s).`);
      }
      render();
      return;
    }

    if (action === "reset-clock") {
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.DemoClock.reset();
        showToast("Demo Clock reset to live time.");
      }
      render();
      return;
    }

    if (action === "reset-demo") {
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.DemoClock.reset();
      }
      state = createInitialState();
      showToast("Prototype data reset to initial 10 scenarios.");
      return;
    }

    if (action === "jump-mobile") {
      const scr = target.getAttribute("data-screen");
      const appId = target.getAttribute("data-app-id");
      const jobId = target.getAttribute("data-job-id");
      state.loadingMode = false;
      navigateMobile(scr, { appId: appId || undefined, jobId: jobId || undefined });
      render();
      return;
    }

    if (action === "go-home") { navigateMobile("home"); render(); return; }
    if (action === "go-applies") { navigateMobile("applies"); render(); return; }
    if (action === "go-notifs") { navigateMobile("notifications"); render(); return; }
    if (action === "open-similar") { navigateMobile("similar"); render(); return; }

    if (action === "mob-back") {
      const prev = state.mobileHistory.pop() || "home";
      state.mobileScreen = prev;
      render();
      return;
    }

    if (action === "open-job") {
      const jobId = target.getAttribute("data-job-id");
      navigateMobile("job", { jobId });
      render();
      return;
    }

    if (action === "open-app") {
      e.stopPropagation();
      const appId = target.getAttribute("data-app-id");
      navigateMobile("details", { appId });
      render();
      return;
    }

    if (action === "apply-job") {
      const jobId = target.getAttribute("data-job-id");
      applyToJob(jobId);
      return;
    }

    if (action === "set-app-category") {
      state.appCategory = target.getAttribute("data-cat");
      state.appFilter = "All Applications";
      render();
      return;
    }

    if (action === "set-app-filter") {
      state.appFilter = target.getAttribute("data-filter");
      render();
      return;
    }

    if (action === "reset-app-filters") {
      state.appCategory = "All";
      state.appFilter = "All Applications";
      render();
      return;
    }

    if (action === "archive-app") {
      e.stopPropagation();
      const appId = target.getAttribute("data-app-id");
      const app = state.applications.find(a => a.id === appId);
      if (app) {
        app.archived = true;
        showToast(`Archived "${app.jobTitle}". Filter by "Archived" to restore.`);
        render();
      }
      return;
    }

    if (action === "restore-app") {
      e.stopPropagation();
      const appId = target.getAttribute("data-app-id");
      const app = state.applications.find(a => a.id === appId);
      if (app) {
        app.archived = false;
        showToast(`Restored "${app.jobTitle}" to active list.`);
        render();
      }
      return;
    }

    if (action === "toggle-resume-notify") {
      const appId = target.getAttribute("data-app-id");
      const app = state.applications.find(a => a.id === appId);
      if (app) {
        app.notifyOnResume = !app.notifyOnResume;
        showToast(app.notifyOnResume ? "Subscribed: we'll notify you if hiring resumes." : "Resume alert turned off.");
        render();
      }
      return;
    }

    if (action === "set-threshold") {
      state.inactivityThreshold = Number(target.getAttribute("data-days"));
      showToast(`Inactivity alert threshold updated to ${state.inactivityThreshold} days.`);
      render();
      return;
    }

    if (action === "toggle-loading") {
      state.loadingMode = !state.loadingMode;
      render();
      return;
    }

    if (action === "toggle-unavailable") {
      state.unavailableDataMode = !state.unavailableDataMode;
      showToast(state.unavailableDataMode ? "Simulating unavailable employer data fallback." : "Restored confirmed employer data.");
      render();
      return;
    }

    if (action === "set-notif-cat") {
      state.notifCategory = target.getAttribute("data-cat");
      render();
      return;
    }

    if (action === "click-notif") {
      const nid = target.getAttribute("data-notif-id");
      const n = state.notifications.find(item => item.id === nid);
      if (n) {
        n.unread = false;
        if (n.appId) navigateMobile("details", { appId: n.appId });
        else if (n.jobId) navigateMobile("job", { jobId: n.jobId });
        render();
      }
      return;
    }

    if (action === "open-notif-prefs") {
      state.modal = { type: "notifPrefs" };
      render();
      return;
    }

    if (action === "close-modal") {
      state.modal = null;
      render();
      return;
    }

    if (action === "toggle-pref") {
      const key = target.getAttribute("data-pref-key");
      state.notificationPrefs[key] = target.checked;
      return;
    }

    /* Desktop actions */
    if (action === "desk-subview") {
      state.desktopSubView = target.getAttribute("data-view");
      state.deskDropdown = null;
      state.deskProfileDrawer = false;
      render();
      return;
    }

    if (action === "desk-toggle-dropdown") {
      e.stopPropagation();
      const menu = target.getAttribute("data-menu");
      state.deskDropdown = state.deskDropdown === menu ? null : menu;
      render();
      return;
    }

    if (action === "desk-toggle-drawer") {
      state.deskProfileDrawer = !state.deskProfileDrawer;
      state.deskDropdown = null;
      render();
      return;
    }

    if (action === "desk-close-drawer") {
      state.deskProfileDrawer = false;
      render();
      return;
    }

    if (action === "desk-rec-tab") {
      state.deskRecTab = target.getAttribute("data-tab");
      render();
      return;
    }

    if (action === "desk-open-job") {
      state.selectedJobId = target.getAttribute("data-job-id");
      state.desktopSubView = "jobDetail";
      render();
      return;
    }

    if (action === "desk-save-job") {
      e.stopPropagation();
      const jid = target.getAttribute("data-job-id");
      if (state.savedJobIds.includes(jid)) state.savedJobIds = state.savedJobIds.filter(id => id !== jid);
      else state.savedJobIds.push(jid);
      render();
      return;
    }

    if (action === "desk-select-app" || action === "desk-open-app") {
      state.selectedAppId = target.getAttribute("data-app-id");
      state.desktopSubView = "tracker";
      state.deskDropdown = null;
      state.deskProfileDrawer = false;
      render();
      return;
    }

    /* Recruiter actions */
    if (action === "rec-open-job") {
      state.selectedRecJobId = target.getAttribute("data-rec-job-id");
      state.recruiterSubView = "responses";
      state.recSelectedCandIds = [];
      render();
      return;
    }

    if (action === "rec-back-jobs") {
      state.recruiterSubView = "jobs";
      render();
      return;
    }

    if (action === "rec-toggle-cand") {
      const cid = target.getAttribute("data-cand-id");
      if (state.recSelectedCandIds.includes(cid)) {
        state.recSelectedCandIds = state.recSelectedCandIds.filter(id => id !== cid);
      } else {
        state.recSelectedCandIds.push(cid);
      }
      render();
      return;
    }

    if (action === "rec-select-all") {
      const recJob = state.recruiterJobs.find(j => j.id === target.getAttribute("data-rec-job-id"));
      if (recJob) {
        if (state.recSelectedCandIds.length === recJob.candidates.length) state.recSelectedCandIds = [];
        else state.recSelectedCandIds = recJob.candidates.map(c => c.id);
        render();
      }
      return;
    }

    if (action === "rec-cand-status") {
      const recJobId = target.getAttribute("data-rec-job-id");
      const candId = target.getAttribute("data-cand-id");
      const status = target.getAttribute("data-status");
      const res = syncRecruiterCandidateStatus(recJobId, candId, status, null);
      if (!res.changed) {
        showToast(`Status is already "${status}" — no duplicate notification sent.`);
      } else if (res.notified) {
        showToast(`Candidate marked "${status}" — Candidate view & notification synced.`);
      } else {
        showToast(`Candidate marked "${status}" — View synced (notification off in preferences).`);
      }
      render();
      return;
    }

    if (action === "rec-bulk-status") {
      if (state.recSelectedCandIds.length === 0) {
        showToast("Select at least one candidate first.");
        return;
      }
      const status = target.getAttribute("data-status");
      let changedCount = 0;
      state.recSelectedCandIds.forEach(cid => {
        const res = syncRecruiterCandidateStatus(state.selectedRecJobId, cid, status, null);
        if (res.changed) changedCount += 1;
      });
      showToast(changedCount > 0 ? `Updated ${changedCount} candidate(s) to "${status}".` : `Selected candidate(s) already at "${status}".`);
      state.recSelectedCandIds = [];
      render();
      return;
    }

    if (action === "rec-open-reject") {
      state.modal = {
        type: "rejectModal",
        recJobId: target.getAttribute("data-rec-job-id"),
        candId: target.getAttribute("data-cand-id"),
        bulk: false
      };
      render();
      return;
    }

    if (action === "rec-open-bulk-reject") {
      if (state.recSelectedCandIds.length === 0) {
        showToast("Select at least one candidate first.");
        return;
      }
      state.modal = {
        type: "rejectModal",
        recJobId: state.selectedRecJobId,
        bulk: true
      };
      render();
      return;
    }

    if (action === "confirm-reject") {
      const checked = document.querySelector('input[name="rejectReasonRadio"]:checked');
      const idx = checked ? Number(checked.value) : 4;
      const chosen = idx === 4 ? null : state.structuredRejectionReasons[idx];
      if (state.modal.bulk) {
        let changedCount = 0;
        state.recSelectedCandIds.forEach(cid => {
          const res = syncRecruiterCandidateStatus(state.modal.recJobId, cid, "Not Shortlisted", chosen);
          if (res.changed) changedCount += 1;
        });
        showToast(changedCount > 0 ? `Bulk updated ${changedCount} candidate(s) to Not Shortlisted.` : "Selected candidate(s) already at Not Shortlisted.");
        state.recSelectedCandIds = [];
      } else {
        const res = syncRecruiterCandidateStatus(state.modal.recJobId, state.modal.candId, "Not Shortlisted", chosen);
        showToast(res.changed
          ? (res.notified ? "Candidate marked Not Shortlisted — Candidate view & notification synced." : "Candidate marked Not Shortlisted — View synced (notification off in preferences).")
          : "Candidate is already Not Shortlisted with this reason — no duplicate update sent.");
      }
      state.modal = null;
      render();
      return;
    }

    if (action === "toast-pro") { showToast("Naukri Pro: Optional paid boosts — basic tracking remains 100% free."); return; }
    if (action === "toast-neo") { showToast("Neo AI: Contextual career assistant retained inside existing header."); return; }
    if (action === "toast-improve") { showToast("Profile checklist: Add measurable SQL & A/B testing outcomes."); return; }
    if (action === "toast-recruiter-note") { showToast("Preserved existing Naukri Recruiter Panel action."); return; }

    /* Usability Testing Actions */
    if (action === "test-switch-subview") {
      if (!state.testing) state.testing = {};
      state.testing.subView = target.getAttribute("data-sub");
      render();
      return;
    }

    if (action === "test-start-consent") {
      const cb = document.getElementById("participant-consent-cb");
      if (!cb || !cb.checked) {
        alert("Please check the consent box to proceed with the usability session.");
        return;
      }
      if (!state.testing) state.testing = {};
      state.testing.participantStage = "background";
      render();
      return;
    }

    if (action === "test-start-participant" || action === "test-new-participant") {
      if (!state.testing) state.testing = {};
      state.testing.subView = "participant";
      state.testing.participantStage = "consent";
      state.testing.activeParticipant = null;
      state.testing.activeTaskIndex = 0;
      render();
      return;
    }

    if (action === "test-prev-task") {
      if (state.testing && state.testing.activeTaskIndex > 0) {
        state.testing.activeTaskIndex -= 1;
        render();
      }
      return;
    }

    if (action === "test-load-sample-template") {
      showToast("Ready for live participant! Click 'Launch First Participant Session' to begin.");
      return;
    }

    if (action === "test-export-csv") {
      if (window.NaukriTesting) window.NaukriTesting.exportCSV();
      return;
    }

    if (action === "test-export-json") {
      if (window.NaukriTesting) window.NaukriTesting.exportJSON();
      return;
    }

    if (action === "test-export-report-md") {
      if (window.NaukriTesting) window.NaukriTesting.exportReportMD();
      return;
    }


    /* V2.0 Interview Progression & Coordination Action Handlers (FR18–FR28) */
    if (action === "accept-invitation") {
      const intId = target.getAttribute("data-interview-id");
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.respondToInvitation(state, { interview_id: intId, response: "Accepted" });
      }
      render();
      return;
    }

    if (action === "decline-invitation") {
      const intId = target.getAttribute("data-interview-id");
      const reason = prompt("Optional: Provide a reason for declining this interview invitation:", "Schedule conflict / other commitments");
      if (reason !== null && window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.respondToInvitation(state, { interview_id: intId, response: "Declined", decline_reason: reason });
      }
      render();
      return;
    }

    if (action === "open-reschedule-modal") {
      const intId = target.getAttribute("data-interview-id");
      const proposed = prompt("Propose alternative interview date & time (e.g. 2026-12-04T16:00:00+05:30 or 'Tomorrow 4 PM'):", "2026-12-04T16:00:00+05:30");
      if (proposed && window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.proposeReschedule(state, { interview_id: intId, proposed_slot: proposed, reason: "Schedule clash with current workday" });
      }
      render();
      return;
    }

    if (action === "confirm-candidate-attendance") {
      const intId = target.getAttribute("data-interview-id");
      const result = target.getAttribute("data-result"); // 'positive' or 'negative'
      if (window.NaukriInterviewDomain) {
        const interview = (state.interviews || []).find(i => i.id === intId);
        // Explicit simulated occurrence timestamp: align with interview start time or persisted occurrence
        const explicitOccurrence = interview ? (interview.simulated_actual_occurrence || interview.starts_at) : null;
        window.NaukriInterviewDomain.recordAttendance(state, {
          interview_id: intId,
          actor_role: "candidate",
          result: result,
          simulated_occurrence_at: explicitOccurrence
        });
      }
      render();
      return;
    }

    if (action === "export-calendar") {
      const intId = target.getAttribute("data-interview-id");
      const interview = (state.interviews || []).find(i => i.id === intId);
      const app = interview ? state.applications.find(a => a.id === interview.application_id) : null;
      if (window.NaukriInterviewDomain && interview) {
        const icsContent = window.NaukriInterviewDomain.generateICS(interview, app);
        if (icsContent) {
          const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `interview_${interview.id}.ics`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
        }
      }
      return;
    }

    if (action === "toggle-readiness-plan") {
      const intId = target.getAttribute("data-interview-id");
      state.showReadinessPlan = (state.showReadinessPlan === intId) ? null : intId;
      render();
      return;
    }

    if (action === "open-withdraw-modal") {
      const appId = target.getAttribute("data-app-id");
      if (confirm("Are you sure you want to withdraw this application from consideration?\n\nThis will cancel any pending or scheduled interviews while safely preserving your prior interview and application history.")) {
        if (window.NaukriInterviewDomain) {
          window.NaukriInterviewDomain.withdrawApplication(state, { application_id: appId, reason: "Candidate withdrew application" });
        }
        render();
      }
      return;
    }

    if (action === "rec-send-invite") {
      const appId = target.getAttribute("data-app-id");
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.createInvitation(state, {
          application_id: appId,
          round_name: "Technical Product Case Interview",
          format: "Video Call (Google Meet)",
          starts_at: "2026-12-05T14:30:00+05:30"
        });
      }
      render();
      return;
    }

    if (action === "rec-confirm-reschedule") {
      const intId = target.getAttribute("data-interview-id");
      if (window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.confirmReschedule(state, { interview_id: intId });
      }
      render();
      return;
    }

    if (action === "rec-confirm-attendance") {
      const intId = target.getAttribute("data-interview-id");
      const result = target.getAttribute("data-result");
      if (window.NaukriInterviewDomain) {
        const interview = (state.interviews || []).find(i => i.id === intId);
        // Explicit simulated occurrence timestamp: align with interview start time or persisted occurrence
        const explicitOccurrence = interview ? (interview.simulated_actual_occurrence || interview.starts_at) : null;
        window.NaukriInterviewDomain.recordAttendance(state, {
          interview_id: intId,
          actor_role: "recruiter",
          result: result,
          simulated_occurrence_at: explicitOccurrence
        });
      }
      render();
      return;
    }

    if (action === "rec-cancel-interview") {
      const intId = target.getAttribute("data-interview-id");
      const reason = prompt("Enter interview cancellation reason:", "Hiring requirements modified");
      if (reason !== null && window.NaukriInterviewDomain) {
        window.NaukriInterviewDomain.cancelInterview(state, { interview_id: intId, reason: reason, cancelled_by: "recruiter" });
      }
      render();
      return;
    }

    if (action === "download-prd-md") {
      if (window.NaukriCaseStudy) window.NaukriCaseStudy.downloadPRD();
      return;
    }

    if (action === "test-open-issue-modal") {
      const sessions = window.NaukriTesting ? window.NaukriTesting.getStoredSessions() : [];
      if (sessions.length === 0) {
        alert("No participants have completed a session yet. Complete at least one participant task session before logging participant-specific issues.");
        return;
      }
      state.modal = { type: "logIssueModal" };
      render();
      return;
    }

    if (action === "test-clear-data") {
      if (confirm("Are you sure you want to clear all locally stored usability test sessions on this browser? This cannot be undone.")) {
        if (window.NaukriTesting) window.NaukriTesting.clearAllSessions();
        showToast("All usability test session data cleared.");
      }
      return;
    }
  });

  /* Form Submit Event Delegation */
  document.addEventListener("submit", function (e) {
    if (e.target.id === "participant-bg-form") {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const bg = {
        employmentStatus: formData.get("employmentStatus"),
        yearsExperience: formData.get("yearsExperience"),
        applicationFrequency: formData.get("applicationFrequency"),
        naukriUsageLast3Mos: formData.get("naukriUsageLast3Mos"),
        currentSatisfaction: Number(formData.get("currentSatisfaction")) || 3
      };
      const p = window.NaukriTesting.createNewParticipant(bg);
      if (!state.testing) state.testing = {};
      state.testing.activeParticipant = p;
      state.testing.participantStage = "tasks";
      state.testing.activeTaskIndex = 0;
      showToast(`Participant ${p.id} registered. Task 1 ready!`);
      render();
      return;
    }

    if (e.target.id === "observer-task-form") {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const taskId = formData.get("taskId");
      const p = state.testing && state.testing.activeParticipant;
      if (!p) {
        showToast("No active participant session found.");
        return;
      }
      if (!p.taskResults) p.taskResults = {};
      p.taskResults[taskId] = {
        completionType: formData.get("completionType") || "independent",
        timeTakenSec: Number(formData.get("timeTakenSec")) || 45,
        incorrectActions: Number(formData.get("incorrectActions")) || 0,
        confusionObserved: formData.get("confusionObserved") || "",
        participantComments: formData.get("participantComments") || "",
        easeRating: Number(formData.get("easeRating")) || 5
      };

      const nextIdx = state.testing.activeTaskIndex + 1;
      if (nextIdx < window.NaukriTesting.TASKS.length) {
        state.testing.activeTaskIndex = nextIdx;
        showToast(`Task ${taskId} recorded. Proceeding to Task ${nextIdx + 1}.`);
      } else {
        state.testing.participantStage = "postTest";
        showToast("All tasks recorded! Proceeding to Post-Test Questionnaire.");
      }
      render();
      return;
    }

    if (e.target.id === "post-test-form") {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const p = state.testing && state.testing.activeParticipant;
      if (!p) return;

      p.postTest = {
        trackingEase: Number(formData.get("trackingEase")) || 4,
        statusClarity: Number(formData.get("statusClarity")) || 4,
        inactivityUnderstanding: Number(formData.get("inactivityUnderstanding")) || 4,
        hiringVsCandidateClarity: Number(formData.get("hiringVsCandidateClarity")) || 4,
        nextStepsConfidence: Number(formData.get("nextStepsConfidence")) || 4,
        transparencyPerception: Number(formData.get("transparencyPerception")) || 4,
        overallSatisfaction: Number(formData.get("overallSatisfaction")) || 4,
        mostUseful: formData.get("mostUseful") || "",
        confusingParts: formData.get("confusingParts") || "",
        missingInfo: formData.get("missingInfo") || "",
        comparisonNaukri: formData.get("comparisonNaukri") || "",
        suggestedChange: formData.get("suggestedChange") || ""
      };

      // Save to localStorage
      const sessions = window.NaukriTesting.getStoredSessions();
      sessions.push(p);
      window.NaukriTesting.saveStoredSessions(sessions);

      state.testing.participantStage = "complete";
      showToast(`Session for ${p.id} saved successfully!`);
      render();
      return;
    }

    if (e.target.id === "log-issue-form") {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const participantId = formData.get("participantId");
      const issue = {
        id: "ISSUE-" + Date.now().toString(36).toUpperCase(),
        title: formData.get("title"),
        taskName: formData.get("taskName"),
        severity: formData.get("severity"),
        evidence: formData.get("evidence"),
        recommendedAction: formData.get("recommendedAction")
      };

      const sessions = window.NaukriTesting.getStoredSessions();
      const targetS = sessions.find(s => s.id === participantId);
      if (targetS) {
        if (!targetS.issues) targetS.issues = [];
        targetS.issues.push(issue);
        window.NaukriTesting.saveStoredSessions(sessions);
        showToast(`Logged ${issue.severity} issue for ${participantId}.`);
      }
      state.modal = null;
      render();
      return;
    }
  });

  document.addEventListener("change", function (e) {
    const target = e.target.closest("[data-action]");
    if (!target) {
      if (state.deskDropdown && !e.target.closest("[data-stop-close]")) {
        state.deskDropdown = null;
        render();
      }
      return;
    }
    const action = target.getAttribute("data-action");
    if (action === "rec-change-job-status") {
      syncRecruiterJobStatus(target.getAttribute("data-rec-job-id"), target.value);
    }
    if (action === "rec-filter-jobs") {
      state.recJobFilter = target.getAttribute("data-status");
      render();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.modal) {
      state.modal = null;
      render();
    }
  });

  render();
})();
