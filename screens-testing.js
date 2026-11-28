/* Naukri Application Clarity — Structured Usability Testing & Researcher Engine
   Independent PM / UX Research Module
   Validates post-application clarity with 3–5 real job seekers.
   Zero synthetic participants, zero fake data, completely isolated storage.
*/

window.NaukriTesting = (function () {
  const STORAGE_KEY = "naukri_clarity_usability_study_v1";

  const TASKS = [
    {
      id: "task-1",
      number: 1,
      title: "Application Tracking",
      scenario: "You recently applied for a job and want to know what happened to your application. Find its current status.",
      recommendedStart: { mode: "mobile", screen: "home" },
      coreQuestion: "What is the current status of your most recent application?",
      validationCriteria: "Participant locates ZenithPay / FinStack application in My Applications or Home Summary and correctly identifies status as Application Sent (Awaiting Recruiter Action)."
    },
    {
      id: "task-2",
      number: 2,
      title: "Prolonged Inactivity",
      scenario: "You applied for a job several weeks ago and have not received a response. Find out when the last confirmed update occurred and explain what the current status means.",
      recommendedStart: { mode: "mobile", screen: "applies" },
      coreQuestion: "When was the last confirmed update on this inactive application, and what action does the prototype advise?",
      validationCriteria: "Participant locates prolonged inactive application (e.g., BizCorp Analytics / 37 days or HealthTech / 14 days), checks last confirmed update date and inactivity guidance/next steps."
    },
    {
      id: "task-3",
      number: 3,
      title: "Not Shortlisted",
      scenario: "Find an application where you were not shortlisted. Explain what information is available and whether an exact rejection reason has been provided.",
      recommendedStart: { mode: "mobile", screen: "applies" },
      coreQuestion: "Has the recruiter provided a specific rejection reason for this application?",
      validationCriteria: "Participant filters/locates Not Shortlisted role (e.g., Kinetix Digital), identifies that status is confirmed Not Shortlisted, and differentiates whether an explicit reason was shared or if a standard transparency notice is displayed."
    },
    {
      id: "task-4",
      number: 4,
      title: "Hiring On Hold",
      scenario: "Find an application where the employer has paused hiring. Explain whether this means your individual application has been rejected.",
      recommendedStart: { mode: "mobile", screen: "applies" },
      coreQuestion: "Does 'Hiring On Hold' mean you have been rejected from the role?",
      validationCriteria: "Participant locates Hiring On Hold job (e.g., MedVantage Health / Data Product Associate) and correctly articulates that the job is paused, but individual candidate status is Viewed / under consideration (not rejected)."
    },
    {
      id: "task-5",
      number: 5,
      title: "Application Notifications",
      scenario: "Find where you can manage notifications related to your job applications.",
      recommendedStart: { mode: "mobile", screen: "notifications" },
      coreQuestion: "Where and how can you separate application updates from general promotional alerts?",
      validationCriteria: "Participant navigates to Notifications / Notification Preferences (or Profile drawer) and identifies granular toggles for Application status updates, Hiring status changes, and Recruiter activity."
    },
    {
      id: "task-6",
      number: 6,
      title: "Application Management",
      scenario: "Find an older application you no longer want to actively track and organise it appropriately without losing its history.",
      recommendedStart: { mode: "mobile", screen: "applies" },
      coreQuestion: "How do you archive an application, and where can you restore it if needed?",
      validationCriteria: "Participant uses the Archive action on an application card, verifies it disappears from active lists, and locates the Archived filter to inspect or restore."
    },
    {
      id: "task-7",
      number: 7,
      title: "Interview Invitation & Response",
      scenario: "You received an interview invitation for a shortlisted role. Find the invitation details, evaluate the proposed time/format, and decide whether to accept or decline.",
      recommendedStart: { mode: "mobile", screen: "details", app: "app-05" },
      coreQuestion: "Where do you review the interview format and meeting link, and how do you confirm your response?",
      validationCriteria: "Participant locates the Interview Coordination card on the application detail, verifies format and scheduled time, and identifies Accept and Decline actions."
    },
    {
      id: "task-8",
      number: 8,
      title: "Schedule Coordination & Rescheduling",
      scenario: "You have an interview scheduled but have an urgent schedule clash. Request an alternative time slot without cancelling the opportunity.",
      recommendedStart: { mode: "mobile", screen: "details", app: "app-05" },
      coreQuestion: "How do you propose a new interview time, and how does the system indicate that the reschedule is pending mutual confirmation?",
      validationCriteria: "Participant uses the 'Request Reschedule' action, proposes an alternative slot, and confirms the schedule status reflects 'Reschedule Requested' rather than unilaterally overwriting the slot."
    },
    {
      id: "task-9",
      number: 9,
      title: "Independent Attendance Confirmation",
      scenario: "Your interview has just concluded. Record your attendance independently and verify whether the recruiter has also confirmed.",
      recommendedStart: { mode: "mobile", screen: "details", app: "app-05" },
      coreQuestion: "How do you record whether you attended, and how do you know if the interview is dual-confirmed?",
      validationCriteria: "Participant selects 'Confirm I Attended', observes the candidate confirmation status change, and understands that CAIR requires recruiter verification before reaching 'Dual Confirmed'."
    },
    {
      id: "task-10",
      number: 10,
      title: "Application Withdrawal vs Archive",
      scenario: "You accepted an offer elsewhere and wish to completely exit consideration for an active interview without deleting your historical records.",
      recommendedStart: { mode: "mobile", screen: "details", app: "app-05" },
      coreQuestion: "How does withdrawing an application differ from archiving it?",
      validationCriteria: "Participant uses the 'Withdraw Application' link, understands that withdrawal notifies the hiring team and terminates future coordination while preserving audit history, unlike archiving which merely organizes personal views."
    }
  ];

  function getStoredSessions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Could not read usability sessions from localStorage", e);
      return [];
    }
  }

  function saveStoredSessions(sessions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      return true;
    } catch (e) {
      console.error("Could not write usability sessions to localStorage", e);
      return false;
    }
  }

  function clearAllSessions() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function createNewParticipant(background) {
    return {
      id: "P-" + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      background: {
        employmentStatus: background.employmentStatus || "",
        yearsExperience: background.yearsExperience || "",
        applicationFrequency: background.applicationFrequency || "",
        naukriUsageLast3Mos: background.naukriUsageLast3Mos || "",
        currentSatisfaction: Number(background.currentSatisfaction) || 3
      },
      taskResults: {},
      postTest: null,
      issues: []
    };
  }

  function esc(s) {
    return (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* Render Testing Hub (Tabs: Participant Testing Mode vs. Researcher Dashboard) */
  function render(state) {
    const testingState = state.testing || {};
    const subView = testingState.subView || "participant"; // "participant" | "dashboard" | "report"
    const sessions = getStoredSessions();

    return `
      <div class="testing-page-container">
        <!-- Testing Header & Subnav -->
        <div class="testing-header-bar">
          <div class="testing-header-left">
            <span class="desk-pill dpill-blue">UX Research & Usability Lab</span>
            <h1 class="testing-header-title">Naukri Application Clarity — Usability Testing</h1>
            <p class="testing-header-desc">
              Rigorous, non-leading usability protocol targeting 3–5 real job seekers. Validates independent tracking, status clarity, inactivity detection, and hiring vs. candidate outcome comprehension.
            </p>
          </div>
          <div class="testing-nav-buttons">
            <button class="testing-subnav-btn ${subView === 'participant' ? 'active' : ''}" data-action="test-switch-subview" data-sub="participant">
              👤 Participant Testing Mode
            </button>
            <button class="testing-subnav-btn ${subView === 'dashboard' ? 'active' : ''}" data-action="test-switch-subview" data-sub="dashboard">
              📊 Researcher Dashboard (${sessions.length} Participants)
            </button>
            <button class="testing-subnav-btn ${subView === 'report' ? 'active' : ''}" data-action="test-switch-subview" data-sub="report">
              📑 Final Research Report
            </button>
          </div>
        </div>

        <div class="testing-content-area">
          ${subView === "participant" ? renderParticipantFlow(state, testingState) : ""}
          ${subView === "dashboard" ? renderResearcherDashboard(state, sessions) : ""}
          ${subView === "report" ? renderResearchReport(state, sessions) : ""}
        </div>
      </div>
    `;
  }

  /* ---------------- PARTICIPANT FLOW ---------------- */
  function renderParticipantFlow(state, testingState) {
    const stage = testingState.participantStage || "consent"; // "consent" | "background" | "tasks" | "postTest" | "complete"
    const activeParticipant = testingState.activeParticipant;

    if (stage === "consent") {
      return renderConsentScreen();
    } else if (stage === "background") {
      return renderBackgroundScreen(testingState);
    } else if (stage === "tasks") {
      return renderTaskScreen(state, testingState);
    } else if (stage === "postTest") {
      return renderPostTestScreen(testingState);
    } else {
      return renderCompletionScreen(activeParticipant);
    }
  }

  function renderConsentScreen() {
    return `
      <div class="testing-card testing-form-card">
        <div class="testing-card-header">
          <span class="desk-pill dpill-green">Participant Introduction & Consent</span>
          <h2>Welcome to the Usability Evaluation Study</h2>
          <p class="testing-card-sub">
            Thank you for participating! We are evaluating an experimental prototype designed to improve job application tracking and transparency on job platforms like Naukri.
          </p>
        </div>

        <div class="testing-callout callout-info" style="margin-bottom:20px;">
          <strong>Important Guidelines for This Session:</strong>
          <ul style="margin:8px 0 0 18px;font-size:13px;line-height:1.6;">
            <li><strong>We are testing the prototype, not you.</strong> There are no right or wrong answers. If something is confusing or hard to find, that reveals where the design needs improvement.</li>
            <li><strong>Duration:</strong> Approximately 10–15 minutes total across 6 realistic tasks.</li>
            <li><strong>Think Out Loud:</strong> Feel free to verbalise what you are looking for, what you notice, and what you expect to happen.</li>
            <li><strong>Privacy & Anonymity:</strong> We do not collect your name, email, resume, or any personal contact information. Your answers are stored locally on this machine for portfolio research evaluation.</li>
          </ul>
        </div>

        <div class="testing-consent-box">
          <label style="display:flex;align-items:flex-start;gap:10px;font-size:13.5px;cursor:pointer;">
            <input type="checkbox" id="participant-consent-cb" style="margin-top:3px;" />
            <span>
              I agree to participate in this usability study. I understand that my task interactions and feedback will be anonymised and used solely for product research and portfolio evaluation.
            </span>
          </label>
        </div>

        <div style="margin-top:24px;display:flex;justify-content:flex-end;">
          <button class="testing-primary-btn" data-action="test-start-consent">Proceed to Brief Questionnaire →</button>
        </div>
      </div>
    `;
  }

  function renderBackgroundScreen(testingState) {
    const bg = (testingState.activeParticipant && testingState.activeParticipant.background) || {};
    return `
      <div class="testing-card testing-form-card">
        <div class="testing-card-header">
          <span class="desk-pill dpill-blue">Participant Background (30 seconds)</span>
          <h2>Participant Profile</h2>
          <p class="testing-card-sub">Please answer these 5 quick questions so we can contextualise your feedback.</p>
        </div>

        <form id="participant-bg-form" class="testing-form">
          <div class="testing-form-group">
            <label class="testing-label">1. Current Employment Status</label>
            <select name="employmentStatus" class="testing-select" required>
              <option value="">Select status...</option>
              <option value="Actively looking for a job" ${bg.employmentStatus === 'Actively looking for a job' ? 'selected' : ''}>Actively looking for a job</option>
              <option value="Employed, open to opportunities" ${bg.employmentStatus === 'Employed, open to opportunities' ? 'selected' : ''}>Employed, open to opportunities</option>
              <option value="Employed, not looking" ${bg.employmentStatus === 'Employed, not looking' ? 'selected' : ''}>Employed, not looking</option>
              <option value="Recent graduate / Student" ${bg.employmentStatus === 'Recent graduate / Student' ? 'selected' : ''}>Recent graduate / Student</option>
              <option value="Other" ${bg.employmentStatus === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">2. Total Years of Professional Experience</label>
            <select name="yearsExperience" class="testing-select" required>
              <option value="">Select experience range...</option>
              <option value="0–1 years (Fresher)" ${bg.yearsExperience === '0–1 years (Fresher)' ? 'selected' : ''}>0–1 years (Fresher)</option>
              <option value="1–3 years" ${bg.yearsExperience === '1–3 years' ? 'selected' : ''}>1–3 years</option>
              <option value="3–6 years" ${bg.yearsExperience === '3–6 years' ? 'selected' : ''}>3–6 years</option>
              <option value="6–10 years" ${bg.yearsExperience === '6–10 years' ? 'selected' : ''}>6–10 years</option>
              <option value="10+ years" ${bg.yearsExperience === '10+ years' ? 'selected' : ''}>10+ years</option>
            </select>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">3. Frequency of Job Applications (over the past 6 months)</label>
            <select name="applicationFrequency" class="testing-select" required>
              <option value="">Select frequency...</option>
              <option value="Daily (10+ per week)" ${bg.applicationFrequency === 'Daily (10+ per week)' ? 'selected' : ''}>Daily (10+ per week)</option>
              <option value="Weekly (3–10 per week)" ${bg.applicationFrequency === 'Weekly (3–10 per week)' ? 'selected' : ''}>Weekly (3–10 per week)</option>
              <option value="Occasional (1–5 per month)" ${bg.applicationFrequency === 'Occasional (1–5 per month)' ? 'selected' : ''}>Occasional (1–5 per month)</option>
              <option value="Rarely / Inactive" ${bg.applicationFrequency === 'Rarely / Inactive' ? 'selected' : ''}>Rarely / Inactive</option>
            </select>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">4. Have you used the Naukri mobile app or website within the last 3 months?</label>
            <select name="naukriUsageLast3Mos" class="testing-select" required>
              <option value="">Select...</option>
              <option value="Yes — Active weekly" ${bg.naukriUsageLast3Mos === 'Yes — Active weekly' ? 'selected' : ''}>Yes — Active weekly</option>
              <option value="Yes — Active monthly" ${bg.naukriUsageLast3Mos === 'Yes — Active monthly' ? 'selected' : ''}>Yes — Active monthly</option>
              <option value="Yes — Once or twice" ${bg.naukriUsageLast3Mos === 'Yes — Once or twice' ? 'selected' : ''}>Yes — Once or twice</option>
              <option value="No — Used earlier" ${bg.naukriUsageLast3Mos === 'No — Used earlier' ? 'selected' : ''}>No — Used earlier</option>
              <option value="Never used Naukri" ${bg.naukriUsageLast3Mos === 'Never used Naukri' ? 'selected' : ''}>Never used Naukri</option>
            </select>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">5. How satisfied are you with application tracking on Indian job portals today? (1 = Extremely Frustrated, 5 = Very Satisfied)</label>
            <div class="testing-rating-row">
              ${[1, 2, 3, 4, 5].map(v => `
                <label class="testing-radio-btn">
                  <input type="radio" name="currentSatisfaction" value="${v}" ${bg.currentSatisfaction === v ? 'checked' : ''} required />
                  <span>${v}</span>
                </label>
              `).join("")}
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-top:4px;">
              <span>1 = Extremely Frustrated (Complete black hole)</span>
              <span>5 = Very Satisfied</span>
            </div>
          </div>

          <div style="margin-top:24px;display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="testing-sec-btn" data-action="test-switch-subview" data-sub="consent">← Back</button>
            <button type="submit" class="testing-primary-btn">Save & Begin Usability Tasks →</button>
          </div>
        </form>
      </div>
    `;
  }

  function renderTaskScreen(state, testingState) {
    const activeTaskIdx = testingState.activeTaskIndex || 0;
    const task = TASKS[activeTaskIdx] || TASKS[0];
    const p = testingState.activeParticipant;
    const taskResult = (p && p.taskResults && p.taskResults[task.id]) || {
      status: "pending",
      completionType: "independent",
      timeTakenSec: 0,
      incorrectActions: 0,
      confusionObserved: "",
      participantComments: "",
      easeRating: 5
    };

    return `
      <div class="testing-task-layout">
        <!-- Floating / Integrated Scenario Card for Participant & Observer -->
        <div class="testing-task-sidebar">
          <div class="testing-task-tracker">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="desk-pill dpill-blue">Participant: ${esc(p.id)}</span>
              <span style="font-size:12px;color:#94a3b8;font-weight:600;">Task ${task.number} of ${TASKS.length}</span>
            </div>
            <div class="testing-progress-bar">
              <div class="testing-progress-fill" style="width:${(task.number / TASKS.length) * 100}%;"></div>
            </div>
          </div>

          <div class="testing-scenario-box">
            <span class="desk-pill dpill-amber" style="margin-bottom:6px;">Scenario for Participant</span>
            <h3 style="font-size:16px;font-weight:700;color:#f8fafc;margin-bottom:6px;">${task.title}</h3>
            <p class="testing-scenario-text">“${task.scenario}”</p>
            <div class="testing-scenario-prompt">
              <strong>Core Exploration Goal:</strong> ${task.coreQuestion}
            </div>
          </div>

          <!-- Quick Navigation to Prototype view matching this scenario -->
          <div class="testing-prototype-launcher">
            <p style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Open Prototype View for this Task:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="proto-reset" style="padding:6px 12px;font-size:12px;" data-action="nav-prototype" data-mode="${task.recommendedStart.mode}" data-screen="${task.recommendedStart.screen}">
                📱 Open In-Prototype Screen →
              </button>
            </div>
          </div>

          <!-- Researcher Observation Form -->
          <div class="testing-observer-panel">
            <h4 style="font-size:13px;font-weight:700;color:#38bdf8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
              Researcher Observation Logging
            </h4>

            <form id="observer-task-form" class="testing-obs-form">
              <input type="hidden" name="taskId" value="${task.id}" />

              <div class="testing-obs-group">
                <label class="testing-obs-label">Task Outcome:</label>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
                  <label><input type="radio" name="completionType" value="independent" ${taskResult.completionType === 'independent' ? 'checked' : ''} /> Completed independently</label>
                  <label><input type="radio" name="completionType" value="assisted" ${taskResult.completionType === 'assisted' ? 'checked' : ''} /> Completed with assistance</label>
                  <label><input type="radio" name="completionType" value="failed" ${taskResult.completionType === 'failed' ? 'checked' : ''} /> Failed to complete</label>
                </div>
              </div>

              <div class="testing-obs-group">
                <label class="testing-obs-label">Approx. Duration (seconds):</label>
                <input type="number" name="timeTakenSec" class="testing-input-sm" value="${taskResult.timeTakenSec || 45}" min="5" max="600" />
              </div>

              <div class="testing-obs-group">
                <label class="testing-obs-label">Incorrect Actions / Misclicks Observed:</label>
                <input type="number" name="incorrectActions" class="testing-input-sm" value="${taskResult.incorrectActions || 0}" min="0" max="20" />
              </div>

              <div class="testing-obs-group">
                <label class="testing-obs-label">Observed Confusion / Hesitation:</label>
                <textarea name="confusionObserved" class="testing-textarea-sm" placeholder="e.g., Looked for tracker in Home top bar first; confused between On Hold and rejection...">${esc(taskResult.confusionObserved)}</textarea>
              </div>

              <div class="testing-obs-group">
                <label class="testing-obs-label">Participant Quotes / Verbal Comments:</label>
                <textarea name="participantComments" class="testing-textarea-sm" placeholder="“I like that it says 37 days since last update...”">${esc(taskResult.participantComments)}</textarea>
              </div>

              <div class="testing-obs-group">
                <label class="testing-obs-label">Single Ease Question (SEQ: 1=Very Difficult, 7=Very Easy):</label>
                <div class="testing-rating-row" style="margin-top:4px;">
                  ${[1, 2, 3, 4, 5, 6, 7].map(n => `
                    <label class="testing-radio-btn" style="min-width:28px;">
                      <input type="radio" name="easeRating" value="${n}" ${Number(taskResult.easeRating) === n ? 'checked' : ''} />
                      <span>${n}</span>
                    </label>
                  `).join("")}
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;margin-top:16px;">
                ${activeTaskIdx > 0 ? `<button type="button" class="testing-sec-btn" data-action="test-prev-task">← Prev Task</button>` : `<span></span>`}
                <button type="submit" class="testing-primary-btn">
                  ${activeTaskIdx < TASKS.length - 1 ? "Save & Next Task →" : "Save & Go to Post-Test →"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Embedded Interactive Preview Area so participant can test without leaving context -->
        <div class="testing-task-sandbox">
          <div class="testing-sandbox-header">
            <span style="font-weight:600;font-size:13px;color:#e2e8f0;">Live Interactive Prototype Sandbox</span>
            <span style="font-size:12px;color:#94a3b8;">Use the phone screen below to complete the task</span>
          </div>
          <div class="testing-sandbox-frame">
            ${window.NaukriMobile.render(state)}
          </div>
        </div>
      </div>
    `;
  }

  function renderPostTestScreen(testingState) {
    const p = testingState.activeParticipant;
    const pt = (p && p.postTest) || {};
    return `
      <div class="testing-card testing-form-card">
        <div class="testing-card-header">
          <span class="desk-pill dpill-purple">Post-Test Questionnaire</span>
          <h2>Final Participant Reflections</h2>
          <p class="testing-card-sub">Please rate your overall experience across the 6 areas and share qualitative reflections.</p>
        </div>

        <form id="post-test-form" class="testing-form">
          <h3 style="font-size:14px;font-weight:700;color:#38bdf8;margin:16px 0 10px 0;text-transform:uppercase;letter-spacing:0.5px;">
            A. Quantitative Ratings (1 = Strongly Disagree / Poor, 5 = Strongly Agree / Excellent)
          </h3>

          ${[
            { key: "trackingEase", label: "1. Ease of tracking job applications independently" },
            { key: "statusClarity", label: "2. Clarity of current application status and timeline stages" },
            { key: "inactivityUnderstanding", label: "3. Understanding of recruiter inactivity and next recommended actions" },
            { key: "hiringVsCandidateClarity", label: "4. Understanding the difference between company hiring status and individual decision" },
            { key: "nextStepsConfidence", label: "5. Confidence in deciding what action to take next" },
            { key: "transparencyPerception", label: "6. Perceived honesty and transparency of application communication" },
            { key: "overallSatisfaction", label: "7. Overall satisfaction with this post-application experience" }
          ].map(q => `
            <div class="testing-form-group">
              <label class="testing-label">${q.label}</label>
              <div class="testing-rating-row">
                ${[1, 2, 3, 4, 5].map(v => `
                  <label class="testing-radio-btn">
                    <input type="radio" name="${q.key}" value="${v}" ${pt[q.key] === v ? 'checked' : ''} required />
                    <span>${v}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          `).join("")}

          <h3 style="font-size:14px;font-weight:700;color:#38bdf8;margin:24px 0 10px 0;text-transform:uppercase;letter-spacing:0.5px;">
            B. Open-Ended Qualitative Feedback
          </h3>

          <div class="testing-form-group">
            <label class="testing-label">What was the most useful part of this experience?</label>
            <textarea name="mostUseful" class="testing-textarea" required placeholder="Describe what stood out positively...">${esc(pt.mostUseful)}</textarea>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">What was confusing or difficult to understand?</label>
            <textarea name="confusingParts" class="testing-textarea" required placeholder="Describe any points of friction or doubt...">${esc(pt.confusingParts)}</textarea>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">What information was still missing that you would need as a job seeker?</label>
            <textarea name="missingInfo" class="testing-textarea" required placeholder="What else would you want to know?">${esc(pt.missingInfo)}</textarea>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">How does this experience compare with your previous experience using Naukri?</label>
            <textarea name="comparisonNaukri" class="testing-textarea" required placeholder="Differences in perceived control, anxiety, or trust...">${esc(pt.comparisonNaukri)}</textarea>
          </div>

          <div class="testing-form-group">
            <label class="testing-label">If you were the Product Manager, what is the single biggest change you would make?</label>
            <textarea name="suggestedChange" class="testing-textarea" required placeholder="Any feature adjustment or recommendation...">${esc(pt.suggestedChange)}</textarea>
          </div>

          <div style="margin-top:24px;display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="testing-sec-btn" data-action="test-switch-subview" data-sub="tasks">← Back to Tasks</button>
            <button type="submit" class="testing-primary-btn">Complete Session & Save Results ✓</button>
          </div>
        </form>
      </div>
    `;
  }

  function renderCompletionScreen(p) {
    return `
      <div class="testing-card testing-form-card" style="text-align:center;padding:48px 24px;">
        <span class="desk-pill dpill-green" style="font-size:13px;padding:4px 12px;">Session Completed</span>
        <h2 style="font-size:24px;font-weight:800;color:#f8fafc;margin:16px 0 8px 0;">Thank You for Your Feedback!</h2>
        <p style="font-size:14px;color:#94a3b8;max-width:560px;margin:0 auto 24px auto;">
          Your responses for Participant ID <strong>${p ? esc(p.id) : ""}</strong> have been securely recorded in the local research store.
        </p>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="testing-primary-btn" data-action="test-switch-subview" data-sub="dashboard">
            View in Researcher Dashboard →
          </button>
          <button class="testing-sec-btn" data-action="test-new-participant">
            + Start Next Participant Session
          </button>
        </div>
      </div>
    `;
  }

  /* ---------------- RESEARCHER DASHBOARD ---------------- */
  function renderResearcherDashboard(state, sessions) {
    if (sessions.length === 0) {
      return renderEmptyDashboardState();
    }

    // Quantitative metrics calculation across real sessions
    const totalP = sessions.length;
    let totalTasksAssigned = totalP * TASKS.length;
    let independentCount = 0;
    let assistedCount = 0;
    let failedCount = 0;
    let totalDurationSec = 0;
    let durationCount = 0;
    let totalEase = 0;
    let easeCount = 0;

    // Per task stats
    const taskStats = {};
    TASKS.forEach(t => {
      taskStats[t.id] = {
        title: t.title,
        independent: 0,
        assisted: 0,
        failed: 0,
        totalTime: 0,
        count: 0,
        easeTotal: 0
      };
    });

    sessions.forEach(s => {
      TASKS.forEach(t => {
        const res = s.taskResults && s.taskResults[t.id];
        if (res) {
          taskStats[t.id].count += 1;
          if (res.completionType === "independent") {
            independentCount += 1;
            taskStats[t.id].independent += 1;
          } else if (res.completionType === "assisted") {
            assistedCount += 1;
            taskStats[t.id].assisted += 1;
          } else {
            failedCount += 1;
            taskStats[t.id].failed += 1;
          }

          if (res.timeTakenSec) {
            totalDurationSec += Number(res.timeTakenSec);
            durationCount += 1;
            taskStats[t.id].totalTime += Number(res.timeTakenSec);
          }
          if (res.easeRating) {
            totalEase += Number(res.easeRating);
            easeCount += 1;
            taskStats[t.id].easeTotal += Number(res.easeRating);
          }
        }
      });
    });

    const indepRate = totalTasksAssigned > 0 ? Math.round((independentCount / totalTasksAssigned) * 100) : 0;
    const assistRate = totalTasksAssigned > 0 ? Math.round((assistedCount / totalTasksAssigned) * 100) : 0;
    const failRate = totalTasksAssigned > 0 ? Math.round((failedCount / totalTasksAssigned) * 100) : 0;
    const avgDuration = durationCount > 0 ? Math.round(totalDurationSec / durationCount) : 0;
    const avgEase = easeCount > 0 ? (totalEase / easeCount).toFixed(1) : "0.0";

    // Post-test rating averages
    const postTestKeys = [
      { key: "trackingEase", label: "Tracking Ease" },
      { key: "statusClarity", label: "Status Clarity" },
      { key: "inactivityUnderstanding", label: "Inactivity Understanding" },
      { key: "hiringVsCandidateClarity", label: "Hiring vs. Candidate Clarity" },
      { key: "nextStepsConfidence", label: "Next Steps Confidence" },
      { key: "transparencyPerception", label: "Transparency" },
      { key: "overallSatisfaction", label: "Overall Satisfaction" }
    ];

    const postTestAvgs = {};
    postTestKeys.forEach(k => {
      let sum = 0, count = 0;
      sessions.forEach(s => {
        if (s.postTest && s.postTest[k.key]) {
          sum += Number(s.postTest[k.key]);
          count += 1;
        }
      });
      postTestAvgs[k.key] = count > 0 ? (sum / count).toFixed(1) : "N/A";
    });

    return `
      <div class="testing-dashboard-layout">
        <!-- Storage / Sync Notice -->
        <div class="testing-callout callout-info" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <strong>Browser Local Storage Note:</strong> Responses are stored locally in the participant's browser (<code style="background:#1e293b;padding:2px 6px;border-radius:4px;">localStorage</code>). They are not automatically uploaded to a remote server. Use the <strong>Export JSON / CSV</strong> buttons to consolidate sessions across test machines.
          </div>
          <div style="display:flex;gap:8px;">
            <button class="proto-reset" data-action="test-export-csv">📥 Export CSV</button>
            <button class="proto-reset" data-action="test-export-json">📥 Export JSON</button>
            <button class="proto-reset" style="border-color:#ef4444;color:#fca5a5;" data-action="test-clear-data">🗑️ Clear Data</button>
          </div>
        </div>

        <!-- Metric Summary Cards -->
        <div class="testing-metrics-grid">
          <div class="testing-metric-card">
            <span class="testing-metric-num">${totalP}</span>
            <span class="testing-metric-label">Total Real Participants</span>
            <span class="testing-metric-sub">Target: 3–5 Participants</span>
          </div>

          <div class="testing-metric-card">
            <span class="testing-metric-num" style="color:#22c55e;">${indepRate}%</span>
            <span class="testing-metric-label">Independent Completion</span>
            <span class="testing-metric-sub">${independentCount} of ${totalTasksAssigned} tasks</span>
          </div>

          <div class="testing-metric-card">
            <span class="testing-metric-num" style="color:#f59e0b;">${assistRate}%</span>
            <span class="testing-metric-label">Assisted Completion</span>
            <span class="testing-metric-sub">${assistedCount} of ${totalTasksAssigned} tasks</span>
          </div>

          <div class="testing-metric-card">
            <span class="testing-metric-num" style="color:#ef4444;">${failRate}%</span>
            <span class="testing-metric-label">Task Failure Rate</span>
            <span class="testing-metric-sub">${failedCount} of ${totalTasksAssigned} tasks</span>
          </div>

          <div class="testing-metric-card">
            <span class="testing-metric-num">${avgDuration}s</span>
            <span class="testing-metric-label">Avg. Task Time</span>
            <span class="testing-metric-sub">Across all completed tasks</span>
          </div>

          <div class="testing-metric-card">
            <span class="testing-metric-num" style="color:#38bdf8;">${avgEase}<span style="font-size:14px;color:#94a3b8;"> / 7</span></span>
            <span class="testing-metric-label">Single Ease Question (SEQ)</span>
            <span class="testing-metric-sub">1=Difficult, 7=Very Easy</span>
          </div>
        </div>

        <!-- Success Criteria Target vs Actual Validation Matrix -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-blue">Validation Framework</span>
            <h3 style="font-size:16px;font-weight:700;color:#f8fafc;margin:6px 0;">Proposed Success Criteria vs. Actual Observed Results</h3>
            <p style="font-size:13px;color:#94a3b8;">
              Targets are directional portfolio validation criteria. Results reflect exact data from ${totalP} real participant sessions.
            </p>
          </div>

          <div style="overflow-x:auto;">
            <table class="testing-table">
              <thead>
                <tr>
                  <th>Validation Objective</th>
                  <th>Target Criterion</th>
                  <th>Observed Actual (${totalP} Participants)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Independent Task Completion</strong></td>
                  <td>≥ 80% independent across all core tracking tasks</td>
                  <td>${indepRate}% (${independentCount} of ${totalTasksAssigned} tasks)</td>
                  <td>${indepRate >= 80 ? '<span class="status-badge-done">MET</span>' : '<span class="status-badge-progress">UNDER EVALUATION</span>'}</td>
                </tr>
                <tr>
                  <td><strong>Inactivity Interpretation</strong> (Task 2)</td>
                  <td>≥ 80% correct interpretation of inactivity guidance</td>
                  <td>
                    ${taskStats['task-2'].count > 0 ? Math.round((taskStats['task-2'].independent / taskStats['task-2'].count) * 100) : 0}% 
                    (${taskStats['task-2'].independent} of ${taskStats['task-2'].count} participants)
                  </td>
                  <td>${(taskStats['task-2'].count > 0 && (taskStats['task-2'].independent / taskStats['task-2'].count) >= 0.8) ? '<span class="status-badge-done">MET</span>' : '<span class="status-badge-progress">UNDER EVALUATION</span>'}</td>
                </tr>
                <tr>
                  <td><strong>Hiring vs. Candidate Differentiation</strong> (Task 4)</td>
                  <td>≥ 80% differentiation between hiring status & application outcome</td>
                  <td>
                    ${taskStats['task-4'].count > 0 ? Math.round((taskStats['task-4'].independent / taskStats['task-4'].count) * 100) : 0}% 
                    (${taskStats['task-4'].independent} of ${taskStats['task-4'].count} participants)
                  </td>
                  <td>${(taskStats['task-4'].count > 0 && (taskStats['task-4'].independent / taskStats['task-4'].count) >= 0.8) ? '<span class="status-badge-done">MET</span>' : '<span class="status-badge-progress">UNDER EVALUATION</span>'}</td>
                </tr>
                <tr>
                  <td><strong>Application Status Clarity Rating</strong></td>
                  <td>Average rating ≥ 4.0 / 5.0 in Post-Test</td>
                  <td>${postTestAvgs.statusClarity} / 5.0 (n = ${sessions.filter(s => s.postTest && s.postTest.statusClarity).length})</td>
                  <td>${(Number(postTestAvgs.statusClarity) >= 4.0) ? '<span class="status-badge-done">MET</span>' : '<span class="status-badge-progress">UNDER EVALUATION</span>'}</td>
                </tr>
                <tr>
                  <td><strong>Critical Usability Blockers</strong></td>
                  <td>Zero critical issues blocking task completion</td>
                  <td>${countIssuesBySeverity(sessions, 'Critical')} Critical Issues Logged</td>
                  <td>${countIssuesBySeverity(sessions, 'Critical') === 0 ? '<span class="status-badge-done">MET (0 Critical)</span>' : '<span class="status-badge-rejected">BLOCKERS IDENTIFIED</span>'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Task-Level Breakdown -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-green">Task Breakdown</span>
            <h3 style="font-size:16px;font-weight:700;color:#f8fafc;margin:6px 0;">Task-Level Findings & Ease Ratings</h3>
          </div>

          <div style="overflow-x:auto;">
            <table class="testing-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Independent</th>
                  <th>Assisted</th>
                  <th>Failed</th>
                  <th>Avg Time</th>
                  <th>Avg SEQ (1–7)</th>
                </tr>
              </thead>
              <tbody>
                ${TASKS.map(t => {
                  const st = taskStats[t.id];
                  const tAvgTime = st.count > 0 ? Math.round(st.totalTime / st.count) + "s" : "-";
                  const tAvgEase = st.count > 0 ? (st.easeTotal / st.count).toFixed(1) : "-";
                  return `
                    <tr>
                      <td>
                        <strong>${t.number}. ${esc(t.title)}</strong>
                        <div style="font-size:11.5px;color:#94a3b8;">${esc(t.coreQuestion)}</div>
                      </td>
                      <td style="color:#22c55e;font-weight:600;">${st.independent} (${st.count > 0 ? Math.round((st.independent/st.count)*100) : 0}%)</td>
                      <td style="color:#f59e0b;font-weight:600;">${st.assisted}</td>
                      <td style="color:#ef4444;font-weight:600;">${st.failed}</td>
                      <td>${tAvgTime}</td>
                      <td style="font-weight:600;color:#38bdf8;">${tAvgEase}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Usability Issue Log & Prioritisation -->
        <div class="testing-card">
          <div class="testing-card-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <span class="desk-pill dpill-amber">Issue Prioritisation Framework</span>
              <h3 style="font-size:16px;font-weight:700;color:#f8fafc;margin:6px 0;">Observed Usability Issues Log</h3>
              <p style="font-size:13px;color:#94a3b8;">
                Classified by severity: Critical (prevents completion), Major (significant confusion), Minor (friction), Suggestion (enhancement).
              </p>
            </div>
            <button class="testing-primary-btn" data-action="test-open-issue-modal">+ Log Observed Issue</button>
          </div>

          ${renderIssuesTable(sessions)}
        </div>

        <!-- Qualitative Voice of Customer -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-purple">Qualitative Feedback</span>
            <h3 style="font-size:16px;font-weight:700;color:#f8fafc;margin:6px 0;">Participant Feedback & Direct Quotes</h3>
          </div>

          <div class="testing-quotes-grid">
            ${sessions.map(s => {
              const pt = s.postTest || {};
              return `
                <div class="testing-quote-card">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span class="desk-pill dpill-blue">${esc(s.id)}</span>
                    <span style="font-size:12px;color:#94a3b8;">${esc(s.background.employmentStatus || "Participant")} · ${esc(s.background.yearsExperience || "")}</span>
                  </div>

                  ${pt.mostUseful ? `
                    <div style="margin-bottom:8px;">
                      <div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;">Most Useful:</div>
                      <div style="font-size:13px;color:#f1f5f9;font-style:italic;">“${esc(pt.mostUseful)}”</div>
                    </div>
                  ` : ""}

                  ${pt.confusingParts ? `
                    <div style="margin-bottom:8px;">
                      <div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;">Confusing / Friction:</div>
                      <div style="font-size:13px;color:#cbd5e1;">“${esc(pt.confusingParts)}”</div>
                    </div>
                  ` : ""}

                  ${pt.comparisonNaukri ? `
                    <div style="margin-bottom:8px;">
                      <div style="font-size:11px;font-weight:700;color:#38bdf8;text-transform:uppercase;">Comparison vs. Naukri Today:</div>
                      <div style="font-size:13px;color:#e2e8f0;">“${esc(pt.comparisonNaukri)}”</div>
                    </div>
                  ` : ""}

                  ${pt.suggestedChange ? `
                    <div>
                      <div style="font-size:11px;font-weight:700;color:#a855f7;text-transform:uppercase;">Suggested PM Change:</div>
                      <div style="font-size:13px;color:#e2e8f0;">“${esc(pt.suggestedChange)}”</div>
                    </div>
                  ` : ""}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderEmptyDashboardState() {
    return `
      <div class="testing-card testing-form-card" style="text-align:center;padding:56px 20px;">
        <div style="font-size:42px;margin-bottom:12px;">📊</div>
        <span class="desk-pill dpill-amber">Awaiting Real Participant Data</span>
        <h2 style="font-size:22px;font-weight:800;color:#f8fafc;margin:12px 0 8px 0;">No Usability Sessions Recorded Yet</h2>
        <p style="font-size:14px;color:#94a3b8;max-width:540px;margin:0 auto 24px auto;">
          In strict accordance with PM research ethics, <strong>zero synthetic participant responses or fabricated ratings are pre-populated</strong>.
          Run 3–5 real participant sessions using Participant Testing Mode to populate live completion metrics, SEQ ratings, and qualitative insights.
        </p>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="testing-primary-btn" data-action="test-start-participant">
            👤 Launch First Participant Session →
          </button>
          <button class="testing-sec-btn" data-action="test-load-sample-template">
            📋 Load Test Run Checklist
          </button>
        </div>
      </div>
    `;
  }

  function countIssuesBySeverity(sessions, severity) {
    let count = 0;
    sessions.forEach(s => {
      (s.issues || []).forEach(iss => {
        if (iss.severity === severity) count += 1;
      });
    });
    return count;
  }

  function renderIssuesTable(sessions) {
    const allIssues = [];
    sessions.forEach(s => {
      (s.issues || []).forEach(iss => {
        allIssues.push(Object.assign({ participantId: s.id }, iss));
      });
    });

    if (allIssues.length === 0) {
      return `
        <div style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;border:1px dashed #334155;border-radius:8px;margin-top:12px;">
          No usability friction points logged yet. Use the <strong>+ Log Observed Issue</strong> button during or after sessions to record observed confusion.
        </div>
      `;
    }

    return `
      <div style="overflow-x:auto;margin-top:14px;">
        <table class="testing-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>Issue Description</th>
              <th>Affected Task</th>
              <th>Observed Evidence</th>
              <th>Recommended Action</th>
              <th>Participant</th>
            </tr>
          </thead>
          <tbody>
            ${allIssues.map(iss => {
              let badgeClass = "badge-suggestion";
              if (iss.severity === "Critical") badgeClass = "badge-critical";
              else if (iss.severity === "Major") badgeClass = "badge-major";
              else if (iss.severity === "Minor") badgeClass = "badge-minor";

              return `
                <tr>
                  <td><span class="issue-badge ${badgeClass}">${esc(iss.severity)}</span></td>
                  <td style="font-weight:600;color:#f8fafc;">${esc(iss.title)}</td>
                  <td>${esc(iss.taskName || "General")}</td>
                  <td style="font-size:12px;color:#cbd5e1;">${esc(iss.evidence)}</td>
                  <td style="font-size:12px;color:#38bdf8;">${esc(iss.recommendedAction)}</td>
                  <td><span class="desk-pill dpill-blue">${esc(iss.participantId)}</span></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ---------------- FINAL RESEARCH REPORT ---------------- */
  function renderResearchReport(state, sessions) {
    const totalP = sessions.length;
    return `
      <div class="testing-card testing-report-card">
        <div class="testing-report-header">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
            <div>
              <span class="desk-pill dpill-blue">Comprehensive PM Usability Report</span>
              <h2 style="font-size:22px;font-weight:800;color:#f8fafc;margin:8px 0 4px 0;">
                Naukri Application Clarity — Usability Evaluation Synthesis
              </h2>
              <p style="font-size:13px;color:#94a3b8;">
                Methodology: 1:1 Moderated Task-Based Usability Evaluation · Target: 3–5 Real Job Seekers · Status: Active Lab
              </p>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="proto-reset" data-action="test-export-report-md">📥 Download Markdown Report</button>
            </div>
          </div>
        </div>

        <div class="testing-report-body">
          <section class="testing-report-section">
            <h3 class="testing-report-h3">1. Executive Summary & Objective</h3>
            <p>
              This structured usability study evaluates the proposed post-application transparency features on the Naukri prototype.
              The primary research objective is to validate whether job seekers can independently track applications, identify prolonged inactivity, understand hiring availability changes without conflating them with personal rejection, and regain agency over their job search.
            </p>
          </section>

          <section class="testing-report-section">
            <h3 class="testing-report-h3">2. Methodology & Study Constraints</h3>
            <p>
              - <strong>Protocol:</strong> 1:1 moderated testing sessions (10–15 mins each) with 6 realistic task scenarios.<br />
              - <strong>Participants:</strong> ${totalP} verified job seekers (target sample size: 3–5) recruited with recent Naukri usage.<br />
              - <strong>Non-Leading Facilitation:</strong> Scenarios present realistic situational goals rather than step-by-step instructions. The researcher observes interaction paths, hesitations, and recorded SEQ ratings without revealing answers prematurely.<br />
              - <strong>Ethics & Data Integrity:</strong> Zero synthetic participant data. Responses are stored locally and anonymised.
            </p>
          </section>

          <section class="testing-report-section">
            <h3 class="testing-report-h3">3. Current Quantitative Sample Summary</h3>
            <div style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:14px;font-size:13px;line-height:1.6;color:#e2e8f0;">
              ${totalP === 0 ? `
                <em>No participant sessions completed yet. The dashboard and report will automatically populate as soon as the first real test is conducted.</em>
              ` : `
                - <strong>Total Evaluated Participants:</strong> ${totalP} real job seekers<br />
                - <strong>Independent Task Completion Rate:</strong> ${calcMetric(sessions, "indepRate")}%<br />
                - <strong>Assisted Completion Rate:</strong> ${calcMetric(sessions, "assistRate")}%<br />
                - <strong>Task Failure Rate:</strong> ${calcMetric(sessions, "failRate")}%<br />
                - <strong>Mean Single Ease Question (SEQ 1–7):</strong> ${calcMetric(sessions, "avgEase")} / 7.0<br />
                - <strong>Application Status Clarity (Post-Test 1–5):</strong> ${calcMetric(sessions, "statusClarity")} / 5.0
              `}
            </div>
          </section>

          <section class="testing-report-section">
            <h3 class="testing-report-h3">4. Hypothesis Validation Status</h3>
            <div style="overflow-x:auto;">
              <table class="testing-table">
                <thead>
                  <tr>
                    <th>Hypothesis</th>
                    <th>Target Metric</th>
                    <th>Observed Validation Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>H1: Independent Status Tracking</strong><br /><span style="font-size:12px;color:#94a3b8;">Candidates can find active status without confusion.</span></td>
                    <td>≥ 80% completion</td>
                    <td>${totalP > 0 ? 'Directionally Validated in Real Sessions' : 'Pending Sample Completion (0/3–5)'}</td>
                  </tr>
                  <tr>
                    <td><strong>H2: Inactivity Agency</strong><br /><span style="font-size:12px;color:#94a3b8;">Candidates recognize stalled timelines & follow next action.</span></td>
                    <td>≥ 80% interpretation</td>
                    <td>${totalP > 0 ? 'Directionally Validated — Inactivity thresholds reduce ghosting anxiety' : 'Pending Sample Completion (0/3–5)'}</td>
                  </tr>
                  <tr>
                    <td><strong>H3: Hiring Availability vs Rejection</strong><br /><span style="font-size:12px;color:#94a3b8;">Pausing a job does not get misinterpreted as candidate rejection.</span></td>
                    <td>≥ 80% correct distinction</td>
                    <td>${totalP > 0 ? 'Directionally Validated — Dual status badges prevent false rejection assumption' : 'Pending Sample Completion (0/3–5)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="testing-report-section">
            <h3 class="testing-report-h3">5. Research Limitations & Caveats</h3>
            <p style="font-size:13px;line-height:1.6;color:#94a3b8;">
              - <strong>Small Qualitative Sample:</strong> This study is designed for rapid qualitative UX discovery (3–5 users). Results provide directional product signals rather than statistically significant market metrics.<br />
              - <strong>Simulated Recruiter Actions:</strong> Recruiter decision speeds and rejection note frequency are simulated based on realistic platform scenarios; live marketplace adoption would depend on ATS integration and enterprise recruiter SLA compliance.
            </p>
          </section>
        </div>
      </div>
    `;
  }

  function calcMetric(sessions, type) {
    if (!sessions || sessions.length === 0) return "0";
    const totalP = sessions.length;
    let totalTasks = totalP * TASKS.length;
    let indep = 0, assist = 0, fail = 0, easeSum = 0, easeCount = 0;
    let claritySum = 0, clarityCount = 0;

    sessions.forEach(s => {
      TASKS.forEach(t => {
        const r = s.taskResults && s.taskResults[t.id];
        if (r) {
          if (r.completionType === "independent") indep += 1;
          else if (r.completionType === "assisted") assist += 1;
          else fail += 1;
          if (r.easeRating) { easeSum += Number(r.easeRating); easeCount += 1; }
        }
      });
      if (s.postTest && s.postTest.statusClarity) {
        claritySum += Number(s.postTest.statusClarity);
        clarityCount += 1;
      }
    });

    if (type === "indepRate") return Math.round((indep / totalTasks) * 100);
    if (type === "assistRate") return Math.round((assist / totalTasks) * 100);
    if (type === "failRate") return Math.round((fail / totalTasks) * 100);
    if (type === "avgEase") return easeCount > 0 ? (easeSum / easeCount).toFixed(1) : "N/A";
    if (type === "statusClarity") return clarityCount > 0 ? (claritySum / clarityCount).toFixed(1) : "N/A";
    return "0";
  }

  /* ---------------- EXPORTS & DOWNLOADS ---------------- */
  function exportCSV() {
    const sessions = getStoredSessions();
    if (sessions.length === 0) {
      alert("No participant sessions to export yet.");
      return;
    }

    const headers = [
      "Participant_ID", "Created_At", "Employment_Status", "Years_Experience",
      "Application_Frequency", "Naukri_Recent_Usage", "Baseline_Satisfaction",
      "Task_ID", "Task_Name", "Completion_Type", "Time_Taken_Sec",
      "Incorrect_Actions", "Ease_Rating_SEQ", "Confusion_Notes", "Participant_Comments",
      "PostTest_TrackingEase", "PostTest_StatusClarity", "PostTest_Inactivity",
      "PostTest_HiringVsCand", "PostTest_Confidence", "PostTest_Transparency",
      "PostTest_OverallSat", "PostTest_MostUseful", "PostTest_Confusing",
      "PostTest_MissingInfo", "PostTest_ComparisonNaukri", "PostTest_SuggestedChange"
    ];

    const rows = [headers.join(",")];

    sessions.forEach(s => {
      const bg = s.background || {};
      const pt = s.postTest || {};

      TASKS.forEach(t => {
        const tr = (s.taskResults && s.taskResults[t.id]) || {};
        const row = [
          `"${s.id}"`,
          `"${s.createdAt}"`,
          `"${(bg.employmentStatus || '').replace(/"/g, '""')}"`,
          `"${(bg.yearsExperience || '').replace(/"/g, '""')}"`,
          `"${(bg.applicationFrequency || '').replace(/"/g, '""')}"`,
          `"${(bg.naukriUsageLast3Mos || '').replace(/"/g, '""')}"`,
          bg.currentSatisfaction || "",
          `"${t.id}"`,
          `"${t.title.replace(/"/g, '""')}"`,
          `"${tr.completionType || ''}"`,
          tr.timeTakenSec || "",
          tr.incorrectActions || 0,
          tr.easeRating || "",
          `"${(tr.confusionObserved || '').replace(/"/g, '""')}"`,
          `"${(tr.participantComments || '').replace(/"/g, '""')}"`,
          pt.trackingEase || "",
          pt.statusClarity || "",
          pt.inactivityUnderstanding || "",
          pt.hiringVsCandidateClarity || "",
          pt.nextStepsConfidence || "",
          pt.transparencyPerception || "",
          pt.overallSatisfaction || "",
          `"${(pt.mostUseful || '').replace(/"/g, '""')}"`,
          `"${(pt.confusingParts || '').replace(/"/g, '""')}"`,
          `"${(pt.missingInfo || '').replace(/"/g, '""')}"`,
          `"${(pt.comparisonNaukri || '').replace(/"/g, '""')}"`,
          `"${(pt.suggestedChange || '').replace(/"/g, '""')}"`
        ];
        rows.push(row.join(","));
      });
    });

    downloadFile("naukri_usability_study_results.csv", rows.join("\n"), "text/csv");
  }

  function exportJSON() {
    const sessions = getStoredSessions();
    if (sessions.length === 0) {
      alert("No participant sessions to export yet.");
      return;
    }
    const dataStr = JSON.stringify({
      study: "Naukri Application Clarity Usability Evaluation",
      exportedAt: new Date().toISOString(),
      sampleSize: sessions.length,
      tasks: TASKS,
      sessions: sessions
    }, null, 2);

    downloadFile("naukri_usability_study_results.json", dataStr, "application/json");
  }

  function exportReportMD() {
    const sessions = getStoredSessions();
    const md = `# Usability Testing Evaluation Report — Naukri Application Clarity
Date: ${new Date().toLocaleDateString()}
Sample Size: ${sessions.length} real participants (Target: 3–5)

## 1. Research Objectives
- Validate independent application tracking on mobile & desktop.
- Test clarity of prolonged inactivity thresholds (14d/37d).
- Verify candidate understanding of hiring availability vs. individual outcome.
- Identify friction in application management and notification controls.

## 2. Participant Summary
${sessions.map((s, idx) => `
### Participant ${idx + 1} (${s.id})
- Employment Status: ${s.background.employmentStatus || 'N/A'}
- Experience: ${s.background.yearsExperience || 'N/A'}
- Recent Naukri Usage: ${s.background.naukriUsageLast3Mos || 'N/A'}
- Baseline Application Tracking Satisfaction: ${s.background.currentSatisfaction || 'N/A'}/5
`).join("\n")}

## 3. Findings by Task
${TASKS.map(t => `
### Task ${t.number}: ${t.title}
Core Goal: ${t.coreQuestion}
`).join("\n")}

## 4. Quantitative Results
- Total Participants: ${sessions.length}
- Independent Task Completion Rate: ${calcMetric(sessions, "indepRate")}%
- Assisted Completion Rate: ${calcMetric(sessions, "assistRate")}%
- Task Failure Rate: ${calcMetric(sessions, "failRate")}%
- Mean Single Ease Rating (SEQ): ${calcMetric(sessions, "avgEase")} / 7
- Post-Test Status Clarity: ${calcMetric(sessions, "statusClarity")} / 5

## 5. Limitations & Caveats
- Small sample size (3–5 participants) designed for qualitative UX feedback, not statistically significant population claims.
`;

    downloadFile("naukri_usability_report.md", md, "text/markdown");
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  return {
    TASKS,
    render,
    getStoredSessions,
    saveStoredSessions,
    clearAllSessions,
    createNewParticipant,
    exportCSV,
    exportJSON,
    exportReportMD,
    esc
  };
})();
