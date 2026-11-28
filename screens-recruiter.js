/* Screen 11: Recruiter-Side Supporting Workflow
   Strictly matches the uploaded Naukri Recruiter Dashboard screenshots:
   - Top bar: naukri logo, Jobs & Responses (red underline), Resdex, Reports, Recent, Search, Bookmark, Bell, Avatar, naukri talent cloud
   - Manage Jobs and Responses + Candidate Response list (Shortlist / Maybe / Reject, Contact | Status, Call from app)
   - Minimal conceptual additions: On Hold availability option, optional structured rejection reason, candidate preview
*/

window.NaukriRecruiter = (function () {
  function esc(str) { return window.NaukriMobile.esc(str); }
  const ICONS = window.NaukriMobile.ICONS;

  function renderRecruiterNavbar() {
    return `
      <header class="naukri-desk-navbar" style="background:#ffffff;">
        <div style="display:flex;align-items:center;gap:28px;height:100%;">
          ${window.NaukriMobile.naukriLogoSvg(28, false)}
          <nav class="naukri-desk-nav-links">
            <button class="desk-nav-link active">Jobs &amp; Responses</button>
            <button class="desk-nav-link" data-action="toast-recruiter-note">Resdex</button>
            <button class="desk-nav-link" data-action="toast-recruiter-note">Reports</button>
          </nav>
        </div>

        <div style="display:flex;align-items:center;gap:14px;">
          <span style="font-size:13px;color:#474d6a;display:inline-flex;align-items:center;gap:5px;">${ICONS.clock} Recent</span>
          <div style="background:#fff;border:1px solid #d1d5db;border-radius:6px;padding:6px 10px;min-width:170px;display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:#9ca3af;">
            <span>Search</span>${ICONS.search}
          </div>
          <span style="color:#474d6a;display:inline-flex;">${ICONS.bookmark}</span>
          <span style="color:#474d6a;display:inline-flex;">${ICONS.bell}</span>
          <div style="width:30px;height:30px;border-radius:999px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:700;color:#4b5563;">KS</div>
          <span class="talent-cloud-btn">
            <span style="color:#4f46e5;font-weight:800;">:::</span> naukri <span style="color:#7e22ce;">talent cloud</span>
          </span>
        </div>
      </header>
    `;
  }

  function renderManageJobs(state) {
    const filteredJobs = state.recruiterJobs.filter(j => state.recJobFilter === "All" || j.jobStatus === state.recJobFilter);

    return `
      <div class="rec-layout">
        <!-- Left Filters matching screenshot -->
        <aside class="desk-card" style="padding:16px;">
          <div style="font-size:14.5px;font-weight:700;color:#121224;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            ${ICONS.sliders} Filters
          </div>
          <input type="text" placeholder="Search by Title/Ref Code/Job ID" readonly style="width:100%;border:1px solid #e5e7eb;border-radius:6px;padding:7px 10px;font-size:12px;margin-bottom:14px;color:#6b7280;" />

          <div style="margin-bottom:14px;">
            <div style="font-size:12.5px;font-weight:700;color:#121224;margin-bottom:8px;">Job status</div>
            ${["All", "Active", "On Hold", "Closed"].map(st => `
              <label style="display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:#474d6a;padding:4px 0;cursor:pointer;">
                <span style="display:flex;align-items:center;gap:7px;">
                  <input type="radio" name="recJobFilter" ${state.recJobFilter === st ? 'checked' : ''} data-action="rec-filter-jobs" data-status="${st}">
                  ${st === "All" ? "All Jobs" : st === "On Hold" ? "On Hold (Proposed)" : st + " Jobs"}
                </span>
                <span style="color:#717b9e;font-size:11.5px;">
                  ${st === "All" ? state.recruiterJobs.length : state.recruiterJobs.filter(j => j.jobStatus === st).length}
                </span>
              </label>
            `).join("")}
          </div>

          <div style="border-top:1px solid #eef0f5;padding-top:12px;">
            <div style="font-size:12.5px;font-weight:700;color:#121224;margin-bottom:7px;">Category</div>
            <div style="font-size:12px;color:#474d6a;display:flex;flex-direction:column;gap:5px;">
              <div>☐ NVite <span style="float:right;color:#717b9e;">1</span></div>
              <div>☐ Classified <span style="float:right;color:#717b9e;">2</span></div>
              <div>☐ Hot Vacancy <span style="float:right;color:#717b9e;">1</span></div>
            </div>
          </div>
        </aside>

        <!-- Main Manage Jobs and Responses List -->
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:12px;">
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <h1 style="margin:0;font-size:24px;font-weight:700;color:#121224;">Manage Jobs and Responses</h1>
                <span class="desk-pill dpill-slate">Conceptual workflow (subject to feasibility validation)</span>
              </div>
              <div style="font-size:12.5px;color:#717b9e;margin-top:3px;">
                Responses to your jobs and NVites will appear here
              </div>
            </div>
            <button class="mob-btn-primary" style="width:auto;border-radius:6px;background:#1167e6;padding:8px 16px;" data-action="toast-recruiter-note">
              Post job ▾
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:20px;border-bottom:1px solid #e5e7eb;margin-bottom:10px;">
            <span style="font-size:13px;font-weight:700;color:#121224;padding:8px 2px;border-bottom:2px solid #f05537;">All Jobs ${state.recruiterJobs.length}</span>
            <span style="font-size:13px;color:#717b9e;padding:8px 2px;">Drafts</span>
          </div>

          <div class="desk-card" style="padding:10px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;border-radius:8px;">
            <div style="display:flex;gap:16px;align-items:center;font-size:12.5px;color:#474d6a;">
              <span>☐ Select All</span>
              <span>↻ Refresh</span>
              <span>Collaborate</span>
              <span>⊘ Close</span>
            </div>
            <span style="font-size:12px;color:#717b9e;">Sort by: Posted/sent date ▾</span>
          </div>

          ${filteredJobs.map(job => `
            <div class="rec-job-row">
              <div>
                <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
                  <span style="font-size:14.5px;font-weight:600;color:#121224;cursor:pointer;" data-action="rec-open-job" data-rec-job-id="${esc(job.id)}">${esc(job.title)}</span>
                  ${job.jobStatus !== "Active" ? `
                    <span class="desk-pill ${job.jobStatus === 'On Hold' ? 'dpill-amber' : 'dpill-red'}" style="border-radius:4px;">${esc(job.jobStatus)}</span>
                  ` : ""}
                </div>
                <div style="font-size:12px;color:#717b9e;margin-top:3px;">${esc(job.location)}</div>
                <span style="display:inline-block;margin-top:6px;background:#f3f4f6;color:#6b7280;font-size:11px;padding:2px 7px;border-radius:4px;">${esc(job.category)}</span>
              </div>

              <div style="display:flex;gap:28px;align-items:center;">
                <div style="cursor:pointer;" data-action="rec-open-job" data-rec-job-id="${esc(job.id)}">
                  <div style="font-size:15px;font-weight:700;color:#1167e6;">
                    ${job.totalResponses}
                    ${job.newResponses > 0 ? `<span style="background:#1167e6;color:#fff;font-size:10px;padding:1px 6px;border-radius:999px;vertical-align:middle;margin-left:3px;">${job.newResponses} New</span>` : ""}
                  </div>
                  <div style="font-size:11.5px;color:#717b9e;">Total Responses</div>
                </div>
                <div>
                  <div style="font-size:15px;font-weight:700;color:#1167e6;">${job.shortlistedCount}</div>
                  <div style="font-size:11.5px;color:#717b9e;">Shortlisted</div>
                </div>
              </div>

              <div style="text-align:right;">
                <div style="display:inline-flex;align-items:center;gap:6px;margin-bottom:6px;">
                  <span style="font-size:11.5px;color:#474d6a;">Status:</span>
                  <select data-action="rec-change-job-status" data-rec-job-id="${esc(job.id)}" style="border:1px solid #d1d5db;border-radius:5px;padding:3px 7px;font-size:12px;background:#fff;color:#121224;">
                    <option value="Active" ${job.jobStatus === "Active" ? "selected" : ""}>Active</option>
                    <option value="On Hold" ${job.jobStatus === "On Hold" ? "selected" : ""}>On Hold</option>
                    <option value="Closed" ${job.jobStatus === "Closed" ? "selected" : ""}>Closed</option>
                  </select>
                </div>
                <div style="font-size:11.5px;color:#717b9e;">posted by ${esc(job.postedBy)} | ${esc(job.postedDate)}</div>
                <button class="mob-link" style="font-size:12px;color:#1167e6;margin-top:4px;" data-action="rec-open-job" data-rec-job-id="${esc(job.id)}">
                  View Responses →
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderJobResponses(state) {
    const job = state.recruiterJobs.find(j => j.id === state.selectedRecJobId) || state.recruiterJobs[0];
    const selectedIds = state.recSelectedCandIds || [];

    return `
      <div class="rec-layout">
        <aside class="desk-card" style="padding:16px;">
          <button class="mob-link" style="color:#1167e6;font-size:12px;margin-bottom:12px;" data-action="rec-back-jobs">← Manage Jobs and Responses</button>
          <div style="font-size:14.5px;font-weight:700;color:#121224;margin-bottom:10px;">Filters</div>
          <div style="font-size:12.5px;color:#474d6a;display:flex;flex-direction:column;gap:8px;">
            <label><input type="checkbox" checked> AI-recommendations <span style="float:right;color:#717b9e;">${job.candidates.filter(c => c.recommended).length}</span></label>
            <label><input type="checkbox"> Video profile attached <span style="float:right;color:#717b9e;">1</span></label>
            <div style="border-top:1px solid #eef0f5;padding-top:10px;margin-top:4px;">
              <div style="font-weight:700;color:#121224;margin-bottom:6px;">Job Availability (Proposed)</div>
              <select data-action="rec-change-job-status" data-rec-job-id="${esc(job.id)}" style="width:100%;border:1px solid #d1d5db;border-radius:6px;padding:6px 8px;font-size:12px;background:#fff;color:#121224;">
                <option value="Active" ${job.jobStatus === "Active" ? "selected" : ""}>Active</option>
                <option value="On Hold" ${job.jobStatus === "On Hold" ? "selected" : ""}>On Hold (Paused)</option>
                <option value="Closed" ${job.jobStatus === "Closed" ? "selected" : ""}>Closed</option>
              </select>
              <div style="font-size:11px;color:#717b9e;margin-top:5px;">
                Updates candidate-facing hiring availability automatically.
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:10px;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <h2 style="margin:0;font-size:19px;color:#121224;">${esc(job.title)}</h2>
                <span class="desk-pill ${job.jobStatus === 'Active' ? 'dpill-green' : job.jobStatus === 'On Hold' ? 'dpill-amber' : 'dpill-red'}">${esc(job.jobStatus)}</span>
                <span class="desk-pill dpill-slate">Conceptual workflow (subject to feasibility validation)</span>
              </div>
              <div style="font-size:12px;color:#717b9e;margin-top:2px;">
                ${esc(job.location)} · Actions on <strong>Aarav Mehta</strong> sync directly to candidate Mobile &amp; Desktop views.
              </div>
            </div>
            <button class="desk-btn-outline" data-action="switch-mode" data-mode="mobile">
              View Candidate Side →
            </button>
          </div>

          <!-- Existing Select All / Bulk Bar Reused -->
          <div class="desk-card" style="padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;border-radius:8px;">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <label style="display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:#121224;cursor:pointer;">
                <input type="checkbox" ${selectedIds.length === job.candidates.length && job.candidates.length > 0 ? 'checked' : ''} data-action="rec-select-all" data-rec-job-id="${esc(job.id)}">
                Select All (${selectedIds.length})
              </label>
              <button class="rec-action-pill rec-shortlist" data-action="rec-bulk-status" data-status="Shortlisted">✓ Shortlist</button>
              <button class="rec-action-pill rec-reject" data-action="rec-open-bulk-reject">⊗ Reject</button>
            </div>
            <span style="font-size:11.5px;color:#717b9e;">Bulk actions notify candidates without manual messaging</span>
          </div>

          ${job.candidates.map(cand => {
            const isSel = selectedIds.includes(cand.id);
            return `
              <div class="rec-cand-card" style="${cand.isPrototypeUser ? 'border-color:#93c5fd;' : ''}">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
                    <input type="checkbox" ${isSel ? 'checked' : ''} data-action="rec-toggle-cand" data-cand-id="${esc(cand.id)}">
                    <span style="font-size:15px;font-weight:700;color:#121224;">${esc(cand.name)}</span>
                    ${cand.recommended ? `<span style="background:#ccfbf1;color:#0f766e;font-size:11px;font-weight:600;padding:2px 8px;border-radius:6px;">Recommended</span>` : ""}
                    ${cand.isPrototypeUser ? `<span class="desk-pill dpill-blue">Prototype Candidate</span>` : ""}
                  </div>

                  <div style="font-size:12px;color:#474d6a;margin-bottom:8px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.briefcase} ${esc(cand.experience)}</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.rupee} ${esc(cand.ctc)}</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.clock} ${esc(cand.notice)}</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.pin} ${esc(cand.location)}</span>
                  </div>

                  <div style="font-size:12px;color:#334155;display:grid;grid-template-columns:88px 1fr;gap:3px 10px;line-height:1.45;">
                    <span style="color:#717b9e;">Current</span><span>${esc(cand.currentRole)}</span>
                    <span style="color:#717b9e;">Previous</span><span>${esc(cand.previousRole)}</span>
                    <span style="color:#717b9e;">Education</span><span>${esc(cand.education)}</span>
                    <span style="color:#717b9e;">Pref. locations</span><span>${esc(cand.prefLocations)}</span>
                    <span style="color:#717b9e;">Key skills</span><span>${cand.keySkills.map(s => esc(s)).join(" | ")}</span>
                  </div>

                  ${cand.decisionReason ? `
                    <div style="margin-top:8px;font-size:11.5px;color:#991b1b;background:#fef2f2;padding:5px 8px;border-radius:6px;">
                      Shared reason: ${esc(cand.decisionReason)}
                    </div>
                  ` : ""}

                  <!-- Existing Naukri Shortlist / Maybe / Reject Action Row -->
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:10px;border-top:1px solid #eef0f5;flex-wrap:wrap;">
                    <span style="font-size:12px;color:#1167e6;cursor:pointer;" data-action="toast-recruiter-note">Add comment</span>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;">
                      <button class="rec-action-pill rec-shortlist ${cand.recruiterStatus === 'Shortlisted' ? 'active' : ''}" data-action="rec-cand-status" data-rec-job-id="${esc(job.id)}" data-cand-id="${esc(cand.id)}" data-status="Shortlisted">✓ Shortlist</button>
                      <button class="rec-action-pill rec-maybe ${cand.recruiterStatus === 'Maybe' ? 'active' : ''}" data-action="rec-cand-status" data-rec-job-id="${esc(job.id)}" data-cand-id="${esc(cand.id)}" data-status="Maybe">Maybe</button>
                      <button class="rec-action-pill rec-reject ${cand.recruiterStatus === 'Not Shortlisted' ? 'active' : ''}" data-action="rec-open-reject" data-rec-job-id="${esc(job.id)}" data-cand-id="${esc(cand.id)}">⊗ Reject</button>
                    </div>
                  </div>

                  <!-- V2.0 Contextual Recruiter Interview Actions (FR14, FR18, FR20, FR24, FR27) -->
                  ${(() => {
                    const matchApp = state.applications.find(a => a.company === job.company || (cand.isPrototypeUser && a.id === 'app-05') || a.jobTitle === job.title);
                    const interview = matchApp && state.interviews ? state.interviews.find(i => i.application_id === matchApp.id) : null;
                    const domain = window.NaukriInterviewDomain;
                    
                    return `
                      <div style="margin-top:10px;padding:10px 12px;background:#f8faff;border:1px solid #dbeafe;border-radius:8px;display:flex;flex-direction:column;gap:6px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                          <strong style="font-size:11.5px;color:#1e3a8a;">📅 Interview Coordination & Confirmation (V2.0)</strong>
                          <span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:#eff6ff;color:#2563eb;font-weight:700;">
                            ${interview ? (domain ? domain.deriveInterviewState(interview) : interview.schedule_state) : 'No Invite Sent'}
                          </span>
                        </div>
                        
                        ${interview ? `
                          <div style="font-size:11.5px;color:#334155;">
                            Slot: <strong>${domain ? domain.formatDateDisplay(interview.starts_at) : interview.starts_at}</strong> (${esc(interview.format)})
                          </div>
                          
                          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
                            ${interview.schedule_state === 'Reschedule Pending' ? `
                              <button class="desk-btn-primary" style="font-size:11px;padding:4px 8px;background:#059669;" data-action="rec-confirm-reschedule" data-interview-id="${interview.id}">
                                ✓ Accept Proposed Slot (${domain && interview.proposed_slot ? domain.formatDateDisplay(interview.proposed_slot.slot) : 'New Time'})
                              </button>
                            ` : ''}

                            ${interview.schedule_state === 'Confirmed' && !interview.cancellation?.cancelled ? `
                              <button class="desk-btn-outline" style="font-size:11px;padding:4px 8px;border-color:#10b981;color:#047857;background:#ecfdf5;" data-action="rec-confirm-attendance" data-interview-id="${interview.id}" data-result="positive">
                                ${interview.attendance_recruiter?.result === 'positive' ? '✓ Interviewed Confirmed' : 'Mark Interviewed (Conducted)'}
                              </button>
                              <button class="desk-btn-outline" style="font-size:11px;padding:4px 8px;border-color:#f87171;color:#b91c1c;" data-action="rec-confirm-attendance" data-interview-id="${interview.id}" data-result="negative">
                                Mark Candidate No-Show
                              </button>
                              <button class="desk-btn-outline" style="font-size:11px;padding:4px 8px;color:#64748b;" data-action="rec-cancel-interview" data-interview-id="${interview.id}">
                                Cancel Interview
                              </button>
                            ` : ''}
                          </div>

                          <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#64748b;margin-top:2px;">
                            <span>Recruiter Confirmed: <strong style="color:${interview.attendance_recruiter ? '#059669' : '#64748b'};">${interview.attendance_recruiter?.result || 'Pending'}</strong></span>
                            <span>Candidate Confirmed: <strong style="color:${interview.attendance_candidate ? '#059669' : '#64748b'};">${interview.attendance_candidate?.result || 'Pending'}</strong></span>
                          </div>
                        ` : `
                          <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:11px;color:#64748b;">Invite this shortlisted candidate to schedule Round 1:</span>
                            <button class="desk-btn-primary" style="font-size:11px;padding:4px 10px;" data-action="rec-send-invite" data-app-id="${matchApp ? matchApp.id : 'app-01'}">
                              + Send Interview Invitation
                            </button>
                          </div>
                        `}
                      </div>
                    `;
                  })()}
                </div>

                <!-- Right Column matching Naukri Recruiter screenshot -->
                <div style="border-left:1px solid #eef0f5;padding-left:14px;display:flex;flex-direction:column;justify-content:space-between;">
                  <div style="text-align:center;">
                    <div style="width:46px;height:46px;border-radius:999px;background:#e5e7eb;color:#374151;display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 8px;">
                      ${esc(cand.name.split(" ").map(p => p[0]).join(""))}
                    </div>
                    <div style="font-size:11.5px;color:#474d6a;margin-bottom:10px;">${esc(cand.currentRole)}</div>
                    <div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px;">
                      <button class="desk-btn-outline" style="color:#1167e6;border-color:#bfdbfe;padding:4px 9px;font-size:11.5px;" data-action="toast-recruiter-note">Contact</button>
                      <button class="desk-btn-outline" style="padding:4px 9px;font-size:11.5px;" data-action="rec-cand-status" data-rec-job-id="${esc(job.id)}" data-cand-id="${esc(cand.id)}" data-status="Viewed">Status: ${esc(cand.recruiterStatus)}</button>
                    </div>
                    <div style="font-size:11.5px;color:#1167e6;">Call from app →</div>
                  </div>
                  <div style="font-size:11px;color:#717b9e;text-align:right;margin-top:10px;">
                    Applied on : ${esc(cand.appliedDate)}
                  </div>
                </div>
              </div>
            `;
          }).join("")}

          <!-- Candidate-Facing Notification Preview (Conceptual Supporting Feature) -->
          <div class="desk-card" style="margin-top:12px;border-color:#dbeafe;background:#f8faff;">
            <div style="font-size:13px;font-weight:700;color:#121224;margin-bottom:4px;">
              Preview of Candidate-Facing Update
            </div>
            ${(() => {
              const target = job.candidates.find(c => c.isPrototypeUser) || job.candidates[0];
              let previewTitle = "Application Viewed · " + job.title;
              let previewBody = "The recruiter has viewed your application. No further decision has been shared yet.";
              if (job.jobStatus === "On Hold") {
                previewTitle = "Hiring paused · " + job.title;
                previewBody = target.recruiterStatus === "Shortlisted" || target.recruiterStatus === "Not Shortlisted"
                  ? `The employer has temporarily paused hiring. Your existing individual status (${target.recruiterStatus}) remains preserved.`
                  : "The employer has temporarily paused hiring. Your individual application outcome has not been confirmed.";
              } else if (job.jobStatus === "Closed") {
                previewTitle = "Role closed · " + job.title;
                previewBody = target.recruiterStatus === "Shortlisted" || target.recruiterStatus === "Not Shortlisted"
                  ? `This position is no longer accepting applications. Confirmed individual decision: ${target.recruiterStatus}.`
                  : "This position is no longer accepting applications. Your individual application outcome has not been shared.";
              } else if (target.recruiterStatus === "Shortlisted") {
                previewTitle = "Shortlisted · " + job.title;
                previewBody = "Your profile has been shortlisted. Watch your registered email and NVites for next steps.";
              } else if (target.recruiterStatus === "Not Shortlisted") {
                previewTitle = "Status updated · " + job.title;
                previewBody = target.decisionReason
                  ? `You have not been shortlisted. Recruiter reason: ${target.decisionReason}`
                  : "You have not been shortlisted for this position. The recruiter has not shared a specific reason for this decision.";
              }
              return `
                <div style="font-size:12.5px;color:#1e293b;">
                  <strong>${esc(previewTitle)}:</strong> ${esc(previewBody)}
                </div>
              `;
            })()}
          </div>
        </div>
      </div>
    `;
  }

  function render(state) {
    return `
      <div class="light-surface">
        ${renderRecruiterNavbar()}
        ${state.recruiterSubView === "responses" ? renderJobResponses(state) : renderManageJobs(state)}
      </div>
    `;
  }

  return { render };
})();
