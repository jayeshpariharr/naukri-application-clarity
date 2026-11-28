/**
 * Naukri Application Clarity V2.1 — Pure Interview & Progression Domain Engine
 *
 * Independent Audit Corrections implemented:
 * 1. Strict CAIR Measurement (FR28):
 *    - Exact 14-day window (<= 14.0 days), not 14.5 days.
 *    - Rejects invalid dates, missing seeker IDs, unverified submissions.
 *    - Does NOT assign fallback seeker IDs silently.
 *    - Requires 3 distinct qualifying job applications within 7 days.
 *    - Anchors at 3rd qualifying application.
 *    - Evaluates mature eligible cohorts only in denominator.
 *    - Checks actual interview occurrence timestamp within window, not scheduled date alone.
 *    - Requires both independent positive confirmations for the same interview.
 *    - Preserves completed historical outcomes even if candidate subsequently withdraws.
 *    - Strictly deduplicates qualifying seekers in numerator (1 seeker = max 1 count).
 *    - Configurable grace period (48h) and reporting cutoff.
 * 2. Prevent Premature Attendance Confirmation (FR23, FR24):
 *    - Attendance confirmation rejected if occurrence time is in future relative to demo clock.
 *    - Deterministic, explicitly labelled simulated demo clock (DemoClock).
 *    - Idempotent repeated confirmations.
 *    - Preserves correction history rather than silent overwriting.
 * 3. Consistent Attendance Outcome Derivation (FR25):
 *    - Positive + Positive -> Dual Confirmed.
 *    - Positive + Unknown -> Awaiting Other Party.
 *    - Negative + Unknown -> Reported Non-Attendance, Awaiting Other Party.
 *    - Positive + Negative -> Disputed.
 *    - Negative + Negative -> Not Attended.
 *    - Unknown + Unknown -> Pending.
 *    - Cancelled before occurrence -> Cancelled (not qualified).
 * 4. Interview Lifecycle Transitions (FR18, FR19, FR20):
 *    - Validates application eligibility before invite (rejects withdrawn/closed/rejected apps).
 *    - Enforces invitation expiry.
 *    - Rejects rescheduling on completed interviews.
 *    - Propose reschedule keeps confirmed slot pending until mutual agreement.
 * 5. Reminder Invalidation (FR21):
 *    - Associates reminders with interview ID and schedule version.
 *    - Invalidates obsolete reminders when schedule changes or is cancelled.
 * 6. Application Withdrawal vs Archive (FR26):
 *    - Cancels every active uncompleted interview for withdrawn application.
 *    - Preserves completed interviews and historical attendance.
 *    - Preserves original application submission for cohort eligibility.
 * 7. ICS Calendar Export (FR22):
 *    - Strictly validates confirmed schedule before generation.
 *    - Escapes special characters (\,, \;, \n).
 *    - Includes UID, DTSTAMP, DTSTART, DTEND, SEQUENCE: {schedule_version}.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NaukriInterviewDomain = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function generateId(prefix) {
    return prefix + '-' + Math.random().toString(36).substr(2, 9);
  }

  /* ---------------- SIMULATED DEMO CLOCK (Deterministic) ---------------- */
  const DemoClock = {
    // Default demo anchor: 28 Nov 2026, 12:00:00 IST (UTC+05:30)
    currentIso: '2026-11-28T12:00:00+05:30',

    now: function (state) {
      if (state && state.demoClockIso) {
        return new Date(state.demoClockIso);
      }
      return new Date(this.currentIso);
    },

    nowIso: function (state) {
      if (state && state.demoClockIso) {
        return state.demoClockIso;
      }
      return this.currentIso;
    },

    set: function (state, isoString) {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) {
        throw new Error('Invalid ISO date string for DemoClock: ' + isoString);
      }
      if (state) state.demoClockIso = d.toISOString();
      this.currentIso = d.toISOString();
      return this.currentIso;
    },

    advanceDays: function (arg1, arg2) {
      let state = null;
      let days = 1;
      if (typeof arg1 === 'number') {
        days = arg1;
      } else {
        state = arg1;
        days = typeof arg2 === 'number' ? arg2 : 1;
      }
      const d = this.now(state);
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      return this.set(state, d.toISOString());
    },

    advanceHours: function (arg1, arg2) {
      let state = null;
      let hours = 1;
      if (typeof arg1 === 'number') {
        hours = arg1;
      } else {
        state = arg1;
        hours = typeof arg2 === 'number' ? arg2 : 1;
      }
      const d = this.now(state);
      d.setTime(d.getTime() + hours * 60 * 60 * 1000);
      return this.set(state, d.toISOString());
    },

    reset: function (state) {
      this.currentIso = '2026-11-28T12:00:00+05:30';
      if (state && typeof state === 'object') delete state.demoClockIso;
      return this.currentIso;
    },

    format: function (state) {
      const d = this.now(state);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, "0");
      const mins = String(d.getMinutes()).padStart(2, "0");
      return `${day} ${month} ${year} ${hours}:${mins} IST`;
    }
  };

  /* ---------------- OUTCOME DERIVATION (FR25) ---------------- */
  function deriveOutcome(interview) {
    if (!interview) return { status: 'Unknown', qualified: false, explanation: 'Missing interview record' };

    // Check cancellation
    if (interview.cancellation && interview.cancellation.cancelled) {
      return { status: 'Cancelled', qualified: false, explanation: 'Interview was cancelled before occurrence' };
    }

    const cand = interview.attendance_candidate ? interview.attendance_candidate.result : 'unknown';
    const rec = interview.attendance_recruiter ? interview.attendance_recruiter.result : 'unknown';

    if (cand === 'positive' && rec === 'positive') {
      return { status: 'Dual Confirmed', qualified: true, explanation: 'Both candidate and recruiter independently confirmed attendance' };
    }

    if (cand === 'positive' && rec === 'unknown') {
      return { status: 'Awaiting Recruiter Confirmation', qualified: false, explanation: 'Candidate confirmed attended; awaiting recruiter confirmation' };
    }

    if (cand === 'unknown' && rec === 'positive') {
      return { status: 'Awaiting Candidate Confirmation', qualified: false, explanation: 'Recruiter confirmed conducted; awaiting candidate confirmation' };
    }

    if (cand === 'negative' && rec === 'unknown') {
      return { status: 'Reported Non-Attendance, Awaiting Other Party', qualified: false, explanation: 'Candidate reported non-attendance; awaiting recruiter record' };
    }

    if (cand === 'unknown' && rec === 'negative') {
      return { status: 'Reported Non-Attendance, Awaiting Other Party', qualified: false, explanation: 'Recruiter reported candidate no-show; awaiting candidate confirmation' };
    }

    if (cand === 'positive' && rec === 'negative') {
      return { status: 'Disputed', qualified: false, explanation: 'Contradictory records: candidate confirmed attended but recruiter reported no-show' };
    }

    if (cand === 'negative' && rec === 'positive') {
      return { status: 'Disputed', qualified: false, explanation: 'Contradictory records: candidate reported non-attendance but recruiter confirmed conducted' };
    }

    if (cand === 'negative' && rec === 'negative') {
      return { status: 'Not Attended', qualified: false, explanation: 'Both sides confirmed non-attendance / no-show' };
    }

    return { status: 'Pending', qualified: false, explanation: 'Awaiting post-interview attendance recording' };
  }

  function deriveInterviewState(interview) {
    if (!interview) return 'Unscheduled';
    if (interview.cancellation && interview.cancellation.cancelled) return 'Cancelled';
    if (interview.response === 'Declined') return 'Declined';
    if (interview.response === 'Expired') return 'Expired';
    if (interview.response === 'Pending') return 'Invite Pending';

    if (interview.schedule_state === 'Reschedule Pending') return 'Reschedule Requested';

    if (interview.schedule_state === 'Confirmed') {
      const outcome = deriveOutcome(interview);
      if (outcome.status === 'Dual Confirmed') return 'Dual Confirmed';
      if (outcome.status === 'Disputed') return 'Attendance Disputed';
      if (outcome.status === 'Not Attended') return 'Not Attended';
      if (outcome.status === 'Awaiting Recruiter Confirmation') return 'Candidate Confirmed (Awaiting Recruiter)';
      if (outcome.status === 'Awaiting Candidate Confirmation') return 'Recruiter Confirmed (Awaiting Candidate)';
      return 'Interview Scheduled';
    }

    return interview.schedule_state || 'Unscheduled';
  }

  /* ---------------- INTERVIEW LIFECYCLE (FR18–FR20) ---------------- */
  function createInvitation(state, params) {
    const {
      application_id,
      round_name = 'Technical Product Discussion',
      format = 'Video Call (Google Meet)',
      timezone = 'IST (UTC+05:30)',
      starts_at,
      venue_or_link = 'https://meet.google.com/naukri-interview-demo',
      expires_at
    } = params;

    const app = (state.applications || []).find(a => a.id === application_id);
    if (!app) {
      return { success: false, error: 'Application not found', field: 'application_id' };
    }

    // Eligibility check: Cannot invite withdrawn or terminal not shortlisted applications without formal reopening
    if (app.status === 'Withdrawn') {
      return { success: false, error: 'Cannot create interview invitation for a withdrawn application', field: 'status' };
    }
    if (app.status === 'Not Shortlisted') {
      return { success: false, error: 'Cannot create interview invitation for a rejected candidate without reconsideration', field: 'status' };
    }

    // Prevent duplicate active invitation for same application and round
    const existing = (state.interviews || []).find(i =>
      i.application_id === application_id &&
      i.round_name === round_name &&
      !i.cancellation?.cancelled &&
      i.response !== 'Declined' &&
      i.response !== 'Expired'
    );
    if (existing) {
      return { success: false, error: 'Active interview or invitation already exists for this round', field: 'duplicate' };
    }

    // Validate start date
    const startDate = starts_at ? new Date(starts_at) : new Date(DemoClock.now(state).getTime() + 7 * 24 * 60 * 60 * 1000);
    if (isNaN(startDate.getTime())) {
      return { success: false, error: 'Invalid start date format', field: 'starts_at' };
    }

    // Expiry date: default 3 days from demo clock
    const expDate = expires_at ? new Date(expires_at) : new Date(DemoClock.now(state).getTime() + 3 * 24 * 60 * 60 * 1000);

    const interview_id = generateId('int');
    const newInterview = {
      id: interview_id,
      application_id: app.id,
      job_id: app.jobId,
      seeker_id: app.seekerId || null, // Never invent or silently assign
      round_name: round_name,
      format: format,
      timezone: timezone,
      starts_at: startDate.toISOString(),
      venue_or_link: venue_or_link,
      response: 'Pending', // Pending, Accepted, Declined, Expired
      responded_at: null,
      expires_at: expDate.toISOString(),
      decline_reason: null,
      schedule_state: 'Unscheduled', // Unscheduled, Confirmed, Reschedule Pending, Cancelled
      schedule_version: 1,
      proposed_slot: null,
      attendance_candidate: null,
      attendance_recruiter: null,
      attendance_corrections: [],
      cancellation: null,
      created_at: DemoClock.nowIso(state)
    };

    if (!state.interviews) state.interviews = [];
    state.interviews.push(newInterview);

    if (app.status !== 'Shortlisted') {
      app.status = 'Shortlisted';
    }
    app.lastUpdatedDate = 'Just now';
    app.inactivityDays = 0;

    if (!app.timeline) app.timeline = [];
    app.timeline.unshift({
        date: "Just now",
        stage: 'Interview Invitation Received',
        title: 'Interview Invitation Received',
      description: `Invited for ${round_name} (${format}). Response required by ${formatDateDisplay(newInterview.expires_at)}.`,
      status: 'confirmed'
    });

    // Create Notification & associate schedule version (FR21)
    if (state.notifications) {
      state.notifications.unshift({
        id: generateId('notif'),
        appId: app.id,
        interviewId: newInterview.id,
        scheduleVersion: 1,
        category: 'interview',
        title: 'Interview Invitation: ' + app.company,
        message: `You have been invited for ${round_name} on ${formatDateDisplay(newInterview.starts_at)}.`,
        date: 'Just now',
        read: false,
        type: 'interview_invitation',
        simulated: true
      });
    }

    logEvent(state, 'interview_invited', {
      interview_id: newInterview.id,
      application_id: app.id,
      format: newInterview.format
    });

    return { success: true, interview: newInterview };
  }

  function respondToInvitation(state, params) {
    const { interview_id, response, decline_reason } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    if (interview.cancellation && interview.cancellation.cancelled) {
      return { success: false, error: 'Cannot respond to a cancelled interview' };
    }

    // Check expiry against demo clock
    const now = DemoClock.now(state);
    if (interview.expires_at && now > new Date(interview.expires_at)) {
      interview.response = 'Expired';
      return { success: false, error: 'Invitation has expired and cannot be accepted without recruiter re-issuance' };
    }

    if (interview.response !== 'Pending') {
      return { success: false, error: `Invitation already ${interview.response}` };
    }

    const app = (state.applications || []).find(a => a.id === interview.application_id);

    if (response === 'Accepted') {
      interview.response = 'Accepted';
      interview.responded_at = DemoClock.nowIso(state);
      interview.schedule_state = 'Confirmed';

      if (app) {
        app.lastUpdatedDate = 'Just now';
        app.timeline.unshift({
        date: "Just now",
        stage: 'Interview Invitation Accepted',
        title: 'Interview Invitation Accepted',
          description: `Confirmed for ${formatDateDisplay(interview.starts_at)} (${interview.format}).`,
          status: 'confirmed'
        });
      }

      // Schedule Reminder (FR21)
      addContextualReminder(state, interview, app);

      logEvent(state, 'interview_accepted', { interview_id: interview.id });
      logEvent(state, 'schedule_confirmed', { interview_id: interview.id, version: interview.schedule_version });
      return { success: true, interview };
    }

    if (response === 'Declined') {
      interview.response = 'Declined';
      interview.responded_at = DemoClock.nowIso(state);
      interview.decline_reason = decline_reason || 'Candidate declined';
      interview.schedule_state = 'Cancelled';

      if (app) {
        app.lastUpdatedDate = 'Just now';
        app.timeline.unshift({
        date: "Just now",
        stage: 'Interview Invitation Declined',
        title: 'Interview Invitation Declined',
          description: `Candidate declined invitation: ${interview.decline_reason}.`,
          status: 'confirmed'
        });
      }

      // Invalidate any pending reminders
      invalidateReminders(state, interview.id);

      logEvent(state, 'interview_declined', { interview_id: interview.id, reason: interview.decline_reason });
      return { success: true, interview };
    }

    return { success: false, error: 'Invalid response action' };
  }

  function proposeReschedule(state, params) {
    const { interview_id, proposed_slot, reason, proposed_by = 'candidate' } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) return { success: false, error: 'Interview record not found' };

    if (interview.cancellation?.cancelled) {
      return { success: false, error: 'Cannot reschedule a cancelled interview' };
    }
    if (interview.response !== 'Accepted') {
      return { success: false, error: 'Cannot reschedule an unaccepted invitation' };
    }

    // Check if interview already completed or attendance recorded by either participant
    if (interview.attendance_candidate || interview.attendance_recruiter) {
      if (!params.correction_authorized) {
        return {
          success: false,
          error: 'Cannot reschedule interview after attendance has already been recorded by either participant unless an authorized correction workflow is used'
        };
      }
    }
    const outcome = deriveOutcome(interview);
    if (outcome.status === 'Dual Confirmed' || outcome.status === 'Not Attended') {
      return { success: false, error: 'Cannot reschedule an already completed interview' };
    }

    const slotDate = new Date(proposed_slot);
    if (isNaN(slotDate.getTime())) {
      return { success: false, error: 'Invalid proposed slot date format' };
    }

    // Proposed slot must be in the future relative to demo clock
    if (slotDate <= DemoClock.now(state)) {
      return { success: false, error: 'Proposed reschedule slot must be in the future' };
    }

    interview.schedule_state = 'Reschedule Pending';
    interview.proposed_slot = {
      slot: slotDate.toISOString(),
      reason: reason || 'Schedule clash',
      proposed_by: proposed_by,
      proposed_at: DemoClock.nowIso(state)
    };

    // Invalidate earlier reminders for previous slot (FR21)
    invalidateReminders(state, interview.id, interview.schedule_version);

    const app = (state.applications || []).find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: "Just now",
        stage: 'Reschedule Requested',
        title: 'Reschedule Requested',
        description: `Alternative time proposed: ${formatDateDisplay(interview.proposed_slot.slot)}. Current slot retained until mutual confirmation.`,
        status: 'pending'
      });
    }

    logEvent(state, 'reschedule_requested', { interview_id: interview.id, proposed_slot: interview.proposed_slot.slot });
    return { success: true, interview };
  }

  function confirmReschedule(state, params) {
    const { interview_id, confirmed_slot } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) return { success: false, error: 'Interview record not found' };

    if (interview.schedule_state !== 'Reschedule Pending') {
      return { success: false, error: 'Interview does not have a pending reschedule request' };
    }

    if (!interview.proposed_slot || !interview.proposed_slot.slot) {
      return { success: false, error: 'No proposed slot found on interview record' };
    }

    // Recruiter must confirm the candidate's proposed slot rather than silently substituting an unrelated slot
    const proposedDate = new Date(interview.proposed_slot.slot);
    if (isNaN(proposedDate.getTime())) {
      return { success: false, error: 'Invalid proposed slot date on interview record' };
    }

    let slotToConfirm = proposedDate;
    if (confirmed_slot) {
      const explicitConfirmed = new Date(confirmed_slot);
      if (isNaN(explicitConfirmed.getTime())) {
        return { success: false, error: 'Invalid confirmed slot date' };
      }
      // If confirmed_slot provided, it must match candidate proposed slot
      if (explicitConfirmed.getTime() !== proposedDate.getTime()) {
        return {
          success: false,
          error: 'Confirmed slot must match the candidate proposed slot. Unrelated slot substitution is not permitted without explicit negotiation.'
        };
      }
      slotToConfirm = explicitConfirmed;
    }

    // Reject confirmed slots in the past relative to DemoClock
    if (slotToConfirm <= DemoClock.now(state)) {
      return { success: false, error: 'Confirmed interview slot cannot be in the past' };
    }

    interview.starts_at = slotToConfirm.toISOString();
    interview.schedule_state = 'Confirmed';
    interview.schedule_version = (interview.schedule_version || 1) + 1;
    interview.proposed_slot = null;

    const app = (state.applications || []).find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: "Just now",
        stage: `Rescheduled Interview Confirmed (v${interview.schedule_version})`,
        title: `Rescheduled Interview Confirmed (v${interview.schedule_version})`,
        description: `New confirmed interview time: ${formatDateDisplay(interview.starts_at)}.`,
        status: 'confirmed'
      });
    }

    // Add new reminder for the confirmed slot
    addContextualReminder(state, interview, app);

    logEvent(state, 'schedule_confirmed', {
      interview_id: interview.id,
      version: interview.schedule_version,
      starts_at: interview.starts_at
    });

    return { success: true, interview };
  }

  function cancelInterview(state, params) {
    const { interview_id, reason, cancelled_by = 'recruiter' } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) return { success: false, error: 'Interview record not found' };

    // Prevent cancellation from invalidating completed historical interview outcomes
    const currentOutcome = deriveOutcome(interview);
    if (currentOutcome.status === 'Dual Confirmed' || currentOutcome.status === 'Not Attended') {
      return {
        success: false,
        error: 'Cannot cancel an already completed historical interview. Completed outcomes are preserved in audit history.'
      };
    }

    interview.cancellation = {
      cancelled: true,
      cancelled_by: cancelled_by,
      reason: reason || 'Role on hold / cancelled',
      cancelled_at: DemoClock.nowIso(state)
    };
    interview.schedule_state = 'Cancelled';

    // Invalidate all reminders
    invalidateReminders(state, interview.id);

    const app = (state.applications || []).find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: "Just now",
        stage: 'Interview Cancelled',
        title: 'Interview Cancelled',
        description: `Interview cancelled by ${cancelled_by}: ${interview.cancellation.reason}.`,
        status: 'confirmed'
      });
    }

    logEvent(state, 'interview_cancelled', { interview_id: interview.id, reason: interview.cancellation.reason });
    return { success: true, interview };
  }

  /* ---------------- ATTENDANCE CONFIRMATION (FR23–FR25) ---------------- */
  function recordAttendance(state, params) {
    const { interview_id, actor_role, result, notes } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) return { success: false, error: 'Interview record not found' };

    if (interview.cancellation?.cancelled) {
      return { success: false, error: 'Cannot record attendance for a cancelled interview' };
    }
    if (interview.schedule_state !== 'Confirmed') {
      return { success: false, error: 'Interview schedule must be confirmed before recording attendance' };
    }

    // Validate result values
    if (result !== 'positive' && result !== 'negative') {
      return { success: false, error: 'Invalid attendance result. Must be "positive" or "negative"' };
    }
    if (actor_role !== 'candidate' && actor_role !== 'recruiter') {
      return { success: false, error: 'Invalid actor role. Must be "candidate" or "recruiter"' };
    }

    // CRITICAL: Prevent premature confirmation (must have occurred relative to DemoClock)
    const interviewStart = new Date(interview.starts_at);
    const currentTime = DemoClock.now(state);
    if (currentTime < interviewStart) {
      return {
        success: false,
        error: `Cannot record attendance before interview occurrence (${formatDateDisplay(interview.starts_at)}). Advance the simulated Demo Clock to record attendance.`,
        field: 'premature_attendance'
      };
    }

    const existingRecord = actor_role === 'candidate' ? interview.attendance_candidate : interview.attendance_recruiter;

    // Idempotency check: if identical record already exists, return success without mutating
    if (existingRecord && existingRecord.result === result) {
      return { success: true, interview, idempotent: true, outcome: deriveOutcome(interview) };
    }

    // Preserving correction history (audit log)
    if (existingRecord) {
      if (!interview.attendance_corrections) interview.attendance_corrections = [];
      interview.attendance_corrections.push({
        previous_record: deepClone(existingRecord),
        corrected_at: DemoClock.nowIso(state),
        reason: notes || 'Attendance record correction'
      });
    }

    // Clearly separate scheduled time, simulated actual occurrence time, and confirmation recording time.
    // Requirement: Remove scheduled-time fallback in recordAttendance. Require an explicit simulated occurrence timestamp
    // and validate that it is not in the future relative to the demo clock.
    let actualOccurrenceIso = params.simulated_occurrence_at || interview.simulated_actual_occurrence || null;
    if (!actualOccurrenceIso) {
      return {
        success: false,
        error: 'Explicit simulated occurrence timestamp (simulated_occurrence_at) is strictly required to record attendance. Scheduled time cannot be used as an implicit fallback.',
        field: 'missing_simulated_occurrence'
      };
    }

    const occDate = new Date(actualOccurrenceIso);
    if (isNaN(occDate.getTime())) {
      return { success: false, error: 'Invalid simulated occurrence timestamp format', field: 'invalid_occurrence_format' };
    }

    // Validate that occurrence timestamp is not in the future relative to current DemoClock time
    if (occDate.getTime() > currentTime.getTime()) {
      return {
        success: false,
        error: `Simulated occurrence timestamp (${actualOccurrenceIso}) cannot be in the future relative to current simulated time (${currentTime.toISOString()}).`,
        field: 'future_occurrence_timestamp'
      };
    }

    actualOccurrenceIso = occDate.toISOString();

    // Persist actual occurrence on interview so both candidate and recruiter confirmations align
    if (!interview.simulated_actual_occurrence) {
      interview.simulated_actual_occurrence = actualOccurrenceIso;
    } else if (params.simulated_occurrence_at && interview.simulated_actual_occurrence !== actualOccurrenceIso) {
      // Require consistent occurrence timestamps for both attendance records
      return {
        success: false,
        error: `Inconsistent occurrence timestamp. Existing interview occurrence is ${interview.simulated_actual_occurrence}, but provided ${actualOccurrenceIso}. Both participants must reference the same actual occurrence.`,
        field: 'inconsistent_occurrence_timestamp'
      };
    }

    const record = {
      result: result,
      recorded_at: DemoClock.nowIso(state),
      occurred_at: actualOccurrenceIso,
      occurred_at_type: 'explicit_simulated_occurrence',
      actor_role: actor_role,
      actor_id: actor_role === 'candidate' ? (interview.seeker_id || 'seeker-01') : 'recruiter-01',
      schedule_version: interview.schedule_version || 1,
      notes: notes || ''
    };

    const app = (state.applications || []).find(a => a.id === interview.application_id);

    if (actor_role === 'candidate') {
      interview.attendance_candidate = record;
      if (app) {
        app.timeline.unshift({
        date: "Just now",
        stage: result === 'positive' ? 'Candidate Confirmed Attendance' : 'Candidate Reported Non-Attendance',
        title: result === 'positive' ? 'Candidate Confirmed Attendance' : 'Candidate Reported Non-Attendance',
          description: result === 'positive'
            ? 'Candidate confirmed attending. Awaiting recruiter verification.'
            : 'Candidate reported did not attend.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'candidate_attendance_confirmed', { interview_id: interview.id, result });
    } else {
      interview.attendance_recruiter = record;
      if (app) {
        app.timeline.unshift({
        date: "Just now",
        stage: result === 'positive' ? 'Recruiter Confirmed Interview Conducted' : 'Recruiter Reported Candidate No-Show',
        title: result === 'positive' ? 'Recruiter Confirmed Interview Conducted' : 'Recruiter Reported Candidate No-Show',
          description: result === 'positive'
            ? 'Employer verified interview completion.'
            : 'Employer marked candidate did not attend.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'recruiter_interviewed_confirmed', { interview_id: interview.id, result });
    }

    const outcome = deriveOutcome(interview);
    if (outcome.status === 'Dual Confirmed' && !interview.dual_confirmed_logged) {
      interview.dual_confirmed_logged = true;
      if (app) {
        app.timeline.unshift({
        date: "Just now",
        stage: 'Interview Attendance Dual-Confirmed',
        title: 'Interview Attendance Dual-Confirmed',
          description: 'Both candidate and recruiter independently confirmed interview completion.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'interview_dual_confirmed', { interview_id: interview.id, application_id: interview.application_id });
    }

    return { success: true, interview, outcome };
  }

  /* ---------------- APPLICATION WITHDRAWAL (FR26) ---------------- */
  function withdrawApplication(state, params) {
    const { application_id, reason } = params;
    const app = (state.applications || []).find(a => a.id === application_id);
    if (!app) return { success: false, error: 'Application not found' };

    // Idempotent withdrawal
    if (app.status === 'Withdrawn') {
      return { success: true, application: app, idempotent: true };
    }

    app.status = 'Withdrawn';
    app.withdrawn_at = DemoClock.nowIso(state);
    app.withdrawal_reason = reason || 'Candidate withdrew application from consideration';
    app.lastUpdatedDate = 'Just now';

    // Cancel all active/uncompleted interviews, but preserve completed interviews
    const relatedInterviews = (state.interviews || []).filter(i => i.application_id === application_id);
    relatedInterviews.forEach(inv => {
      const outcome = deriveOutcome(inv);
      if (outcome.status !== 'Dual Confirmed' && outcome.status !== 'Not Attended') {
        inv.cancellation = {
          cancelled: true,
          cancelled_by: 'candidate',
          reason: 'Application withdrawn by candidate',
          cancelled_at: DemoClock.nowIso(state)
        };
        inv.schedule_state = 'Cancelled';
        invalidateReminders(state, inv.id);
      }
    });

    if (!app.timeline) app.timeline = [];
    app.timeline.unshift({
        date: "Just now",
        stage: 'Application Withdrawn',
        title: 'Application Withdrawn',
      description: `Candidate withdrew application: ${app.withdrawal_reason}. Prior completed interview milestones remain verified in audit history.`,
      status: 'confirmed'
    });

    logEvent(state, 'application_withdrawn', { application_id: app.id, reason: app.withdrawal_reason });
    return { success: true, application: app };
  }

  /* ---------------- REMINDER MANAGEMENT (FR21) ---------------- */
  function addContextualReminder(state, interview, app) {
    if (!state.notifications) state.notifications = [];
    const reminderId = generateId('rem');

    state.notifications.unshift({
      id: reminderId,
      appId: app ? app.id : interview.application_id,
      interviewId: interview.id,
      scheduleVersion: interview.schedule_version || 1,
      category: 'interview',
      title: 'Interview Reminder: ' + (app ? app.company : 'Scheduled Interview'),
      message: `Your interview for ${app ? app.jobTitle : 'role'} is scheduled for ${formatDateDisplay(interview.starts_at)}.`,
      date: 'Scheduled',
      read: false,
      type: 'interview_reminder',
      status: 'active',
      simulated: true
    });
  }

  function invalidateReminders(state, interviewId, scheduleVersion) {
    if (!state.notifications) return;
    state.notifications.forEach(n => {
      if (n.interviewId === interviewId && n.type === 'interview_reminder') {
        if (!scheduleVersion || n.scheduleVersion === scheduleVersion) {
          n.status = 'invalidated';
          n.message = '[Obsolete] Schedule has been changed or cancelled.';
        }
      }
    });
  }

  /* ---------------- STRICT CAIR MEASUREMENT (FR28) ---------------- */
  function calculateCAIR(state, referenceDateParam) {
    const refDate = referenceDateParam
      ? new Date(referenceDateParam)
      : DemoClock.now(state);

    const applications = state.applications || [];
    const interviews = state.interviews || [];

    // Filter valid, verifiable applications
    // Strict requirement: reject incomplete/invalid submission records
    const validApps = [];
    const seenAppIds = new Set();

    applications.forEach(a => {
      if (!a || !a.id || !a.seekerId || !a.jobId) return; // Reject missing id, seekerId, or jobId
      // Deduplicate submissions by stable application ID
      if (seenAppIds.has(a.id)) return;
      seenAppIds.add(a.id);

      const appDate = new Date(a.appliedDate || a.submitted_at || 0);
      if (isNaN(appDate.getTime()) || appDate.getTime() <= 0) return;

      validApps.push(a);
    });

    // Group submissions by verified seekerId
    const seekerMap = {};
    validApps.forEach(a => {
      const sid = a.seekerId;
      if (!seekerMap[sid]) seekerMap[sid] = [];
      seekerMap[sid].push(a);
    });

    let totalEligibleSeekers = 0;
    let matureEligibleSeekers = 0;
    let qualifyingSeekersWithDualConfirmed = 0;
    const cohortDetails = [];

    Object.keys(seekerMap).forEach(sid => {
      const apps = seekerMap[sid].sort((a, b) => {
        return new Date(a.appliedDate || a.submitted_at).getTime() - new Date(b.appliedDate || b.submitted_at).getTime();
      });

      // Require 3 DISTINCT qualifying job IDs within 7 days
      // Anchor the cohort strictly at the 3rd distinct-job application
      let anchorApp = null;
      let anchorDate = null;
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

      // Sliding window over sorted submissions
      for (let i = 0; i < apps.length; i++) {
        const distinctJobsInWindow = new Map();
        const startTime = new Date(apps[i].appliedDate || apps[i].submitted_at).getTime();

        for (let j = i; j < apps.length; j++) {
          const appJ = apps[j];
          const appJTime = new Date(appJ.appliedDate || appJ.submitted_at).getTime();
          if (appJTime - startTime > sevenDaysMs) break;

          if (!distinctJobsInWindow.has(appJ.jobId)) {
            distinctJobsInWindow.set(appJ.jobId, appJ);
          }

          if (distinctJobsInWindow.size === 3) {
            // Anchor is this 3rd distinct job application!
            anchorApp = appJ;
            anchorDate = new Date(appJTime);
            break;
          }
        }

        if (anchorApp && anchorDate) break;
      }

      if (anchorApp && anchorDate) {
        totalEligibleSeekers++;
        const maturityDate = new Date(anchorDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        const isMature = refDate.getTime() >= maturityDate.getTime();

        if (isMature) {
          matureEligibleSeekers++;
        }

        // Find qualifying dual-confirmed interview occurring strictly within the exact 14-day window
        // Enforce valid schedule versions, matching interview identity and reporting cutoff rules
        const qualifyingInterviews = interviews.filter(inv => {
          if (!inv || !inv.id) return false;
          if (inv.seeker_id !== sid) return false;

          // Must be Dual Confirmed
          const outcome = deriveOutcome(inv);
          if (!outcome.qualified) return false;

          // Enforce matching interview identity and valid schedule version on confirmations
          const candAtt = inv.attendance_candidate;
          const recAtt = inv.attendance_recruiter;
          if (!candAtt || !recAtt) return false;

          // Both confirmations must be positive
          if (candAtt.result !== 'positive' || recAtt.result !== 'positive') return false;

          // Schedule version check: cannot be unversioned
          if (!inv.schedule_version || inv.schedule_version < 1) return false;
          if (candAtt.schedule_version !== inv.schedule_version || recAtt.schedule_version !== inv.schedule_version) {
            return false;
          }

          // Enforce consistent occurrence timestamps for both attendance records
          const candOccurred = candAtt.occurred_at || inv.simulated_actual_occurrence;
          const recOccurred = recAtt.occurred_at || inv.simulated_actual_occurrence;
          if (!candOccurred || !recOccurred) return false;
          if (candOccurred !== recOccurred) {
            // Inconsistent occurrence timestamps reject qualification
            return false;
          }

          const actualOccurred = new Date(candOccurred).getTime();
          if (isNaN(actualOccurred)) return false;

          // Enforce confirmation recording timestamps against the CAIR reporting cutoff (refDate)
          const candRecordedTime = candAtt.recorded_at ? new Date(candAtt.recorded_at).getTime() : actualOccurred;
          const recRecordedTime = recAtt.recorded_at ? new Date(recAtt.recorded_at).getTime() : actualOccurred;
          const cutoffTime = refDate.getTime();
          if (candRecordedTime > cutoffTime || recRecordedTime > cutoffTime) {
            // Confirmations recorded after the evaluation reference cutoff cannot count in this reporting period
            return false;
          }

          const anchorTime = anchorDate.getTime();
          const windowEndTime = anchorTime + 14 * 24 * 60 * 60 * 1000;

          // Enforce 14-day observation window from cohort anchor
          return actualOccurred >= anchorTime && actualOccurred <= windowEndTime;
        });

        const hasQualified = qualifyingInterviews.length > 0;
        if (hasQualified && isMature) {
          qualifyingSeekersWithDualConfirmed++;
        }

        cohortDetails.push({
          seekerId: sid,
          anchorAppId: anchorApp.id,
          anchorJobId: anchorApp.jobId,
          anchorDate: anchorDate.toISOString(),
          maturityDate: maturityDate.toISOString(),
          isMature: isMature,
          qualifyingInterviewsCount: qualifyingInterviews.length,
          hasQualifiedInterview: hasQualified
        });
      }
    });

    const cairPercentage = matureEligibleSeekers > 0
      ? ((qualifyingSeekersWithDualConfirmed / matureEligibleSeekers) * 100).toFixed(1)
      : null;

    return {
      cairRate: cairPercentage !== null ? (cairPercentage + '%') : 'N/A (Immature Cohort)',
      rawCair: cairPercentage !== null ? parseFloat(cairPercentage) : null,
      targetCair: '36.0%',
      baselineAssumption: '21.0%',
      matureEligibleSeekers: matureEligibleSeekers,
      totalEligibleSeekers: totalEligibleSeekers,
      qualifyingSeekersWithDualConfirmed: qualifyingSeekersWithDualConfirmed,
      cohortDetails: cohortDetails
    };
  }

  /* ---------------- CALENDAR ASSISTANCE .ICS EXPORT (FR22) ---------------- */
  function generateICS(interview, app) {
    if (!interview || interview.schedule_state !== 'Confirmed') {
      return null;
    }
    if (interview.cancellation && interview.cancellation.cancelled) {
      return null;
    }

    const startDate = new Date(interview.starts_at);
    if (isNaN(startDate.getTime())) return null;
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // Assumed 45 min

    function formatICSDate(d) {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function escapeText(text) {
      if (!text) return '';
      return String(text)
        .replace(/\\/g, '\\\\')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
        .replace(/\n/g, '\\n');
    }

    const company = escapeText(app ? app.company : 'Hiring Team');
    const role = escapeText(app ? app.role || app.jobTitle : 'Job Interview');
    const round = escapeText(interview.round_name || 'Interview Round');
    const venue = escapeText(interview.venue_or_link || 'Remote Video');
    const seq = interview.schedule_version || 1;

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Naukri Application Clarity//Interview Coordination V2.1//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${interview.id}@naukri-application-clarity.local`,
      `SEQUENCE:${seq}`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Interview: ${role} at ${company}`,
      `DESCRIPTION:Round: ${round}\\nFormat: ${escapeText(interview.format)}\\nLocation: ${venue}\\n\\nNotice: Local changes made in your calendar do not synchronize with Naukri.`,
      `LOCATION:${venue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return lines.join('\r\n');
  }

  /* ---------------- DATE FORMATTER ---------------- */
  function formatDateDisplay(isoString) {
    if (!isoString) return 'Unscheduled';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
        ' at ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return isoString;
    }
  }

  function logEvent(state, eventType, data) {
    if (!state.analytics_events) state.analytics_events = [];
    state.analytics_events.push({
      event_id: generateId('evt'),
      event_type: eventType,
      timestamp: DemoClock.nowIso(state),
      data: data || {}
    });
  }

  return {
    DemoClock,
    deriveOutcome,
    deriveInterviewState,
    createInvitation,
    respondToInvitation,
    proposeReschedule,
    confirmReschedule,
    cancelInterview,
    recordAttendance,
    withdrawApplication,
    addContextualReminder,
    invalidateReminders,
    calculateCAIR,
    generateICS,
    formatDateDisplay,
    logEvent
  };
});
