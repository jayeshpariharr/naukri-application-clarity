/**
 * Naukri Application Clarity V2 — Pure Interview & Progression Domain Engine
 * Implements FR18–FR28:
 * - Structured Interview Invitations (FR18)
 * - Candidate Accept/Decline (FR19)
 * - Proposed Rescheduling & Versioned Confirmation (FR20)
 * - Contextual Attendance Reminders (FR21)
 * - Calendar Assistance (.ics Export) (FR22)
 * - Candidate Independent Attendance Confirmation (FR23)
 * - Recruiter Independent Interviewed Confirmation (FR24)
 * - Dual Confirmation & Disputed Resolution (FR25)
 * - Explicit Application Withdrawal vs Archive (FR26)
 * - Cancellation & No-Show Distinctions (FR27)
 * - Cohort Instrumentation & CAIR Calculation (FR28)
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

  /**
   * Derive Interview State from response, schedule, and attendance
   */
  function deriveInterviewState(interview) {
    if (!interview) return null;
    const { response, schedule_state, attendance_candidate, attendance_recruiter, cancellation } = interview;

    if (cancellation && cancellation.cancelled) {
      return 'Cancelled';
    }

    if (response === 'Declined') {
      return 'Declined';
    }

    if (response === 'Expired') {
      return 'Expired';
    }

    if (response === 'Pending') {
      return 'Invite Pending';
    }

    // Response is Accepted
    if (schedule_state === 'Reschedule Pending') {
      return 'Reschedule Requested';
    }

    if (schedule_state === 'Confirmed') {
      // Check attendance
      const cand = attendance_candidate ? attendance_candidate.result : 'unknown';
      const rec = attendance_recruiter ? attendance_recruiter.result : 'unknown';

      if (cand === 'positive' && rec === 'positive') {
        return 'Dual Confirmed';
      }
      if (cand === 'positive' && rec === 'unknown') {
        return 'Candidate Confirmed (Awaiting Recruiter)';
      }
      if (cand === 'unknown' && rec === 'positive') {
        return 'Recruiter Confirmed (Awaiting Candidate)';
      }
      if (cand === 'negative' || rec === 'negative') {
        if (cand === 'negative' && rec === 'negative') {
          return 'Attended: Negative / No-Show';
        }
        return 'Attendance Disputed';
      }
      return 'Interview Scheduled';
    }

    return 'Unscheduled';
  }

  /**
   * Create an Interview Invitation (Recruiter Action) - FR18
   */
  function createInvitation(state, params) {
    const { application_id, starts_at, format, timezone = 'IST', round_name = 'Technical Discussion', venue_or_link = 'https://meet.google.com/naukri-interview-demo', notes = '' } = params;
    
    const app = state.applications.find(a => a.id === application_id);
    if (!app) {
      return { success: false, error: 'Application not found' };
    }

    // Check if open invitation or scheduled interview already exists
    const existing = (state.interviews || []).find(i => i.application_id === application_id && !i.cancellation?.cancelled);
    if (existing) {
      return { success: false, error: 'Active interview or invitation already exists for this application' };
    }

    const interview_id = generateId('int');
    const newInterview = {
      id: interview_id,
      application_id: application_id,
      job_id: app.jobId,
      seeker_id: app.seekerId || 'seeker-01',
      round_name: round_name,
      format: format || 'Video Call (Google Meet)',
      timezone: timezone,
      starts_at: starts_at || '2026-12-05T14:30:00+05:30',
      venue_or_link: venue_or_link,
      response: 'Pending', // Pending, Accepted, Declined, Expired
      responded_at: null,
      decline_reason: null,
      schedule_state: 'Unscheduled', // Unscheduled, Confirmed, Reschedule Pending, Cancelled
      schedule_version: 1,
      proposed_slot: null,
      attendance_candidate: null, // { result: 'positive'|'negative'|'unknown', recorded_at, actor_id }
      attendance_recruiter: null, // { result: 'positive'|'negative'|'unknown', recorded_at, actor_id }
      cancellation: null,
      created_at: new Date().toISOString()
    };

    if (!state.interviews) state.interviews = [];
    state.interviews.push(newInterview);

    // Update application state if not already Shortlisted
    if (app.status !== 'Shortlisted') {
      app.status = 'Shortlisted';
    }
    app.lastUpdatedDate = 'Just now';
    app.inactivityDays = 0;

    // Append to timeline
    if (!app.timeline) app.timeline = [];
    app.timeline.unshift({
      date: 'Just now',
      title: 'Interview Invitation Received',
      description: `Invited for ${round_name} (${newInterview.format}). Please confirm or request reschedule.`,
      status: 'confirmed'
    });

    // Create Notification - FR07/FR21
    if (state.notifications) {
      state.notifications.unshift({
        id: generateId('notif'),
        appId: app.id,
        interviewId: newInterview.id,
        category: 'interview',
        title: 'Interview Invitation: ' + app.company,
        message: `You have been invited for a ${round_name} interview on ${formatDateDisplay(newInterview.starts_at)}.`,
        date: 'Just now',
        read: false,
        type: 'interview_invitation'
      });
    }

    // Log Analytics Event - FR28
    logEvent(state, 'interview_invited', {
      interview_id: newInterview.id,
      application_id: app.id,
      actor_role: 'recruiter',
      format: newInterview.format
    });

    return { success: true, interview: newInterview };
  }

  /**
   * Candidate Responds to Invitation (Accept or Decline) - FR19
   */
  function respondToInvitation(state, params) {
    const { interview_id, response, decline_reason } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    if (interview.cancellation?.cancelled) {
      return { success: false, error: 'Cannot respond to a cancelled interview' };
    }

    if (interview.response !== 'Pending') {
      return { success: false, error: `Invitation already ${interview.response}` };
    }

    const app = state.applications.find(a => a.id === interview.application_id);

    if (response === 'Accepted') {
      interview.response = 'Accepted';
      interview.responded_at = new Date().toISOString();
      interview.schedule_state = 'Confirmed';

      if (app) {
        app.lastUpdatedDate = 'Just now';
        app.inactivityDays = 0;
        app.timeline.unshift({
          date: 'Just now',
          title: 'Interview Invitation Accepted',
          description: `Confirmed for ${formatDateDisplay(interview.starts_at)} (${interview.format}).`,
          status: 'confirmed'
        });
      }

      logEvent(state, 'interview_accepted', {
        interview_id: interview.id,
        application_id: interview.application_id,
        actor_role: 'candidate'
      });
      logEvent(state, 'schedule_confirmed', {
        interview_id: interview.id,
        schedule_version: interview.schedule_version,
        starts_at: interview.starts_at
      });

      return { success: true, interview };
    } else if (response === 'Declined') {
      interview.response = 'Declined';
      interview.responded_at = new Date().toISOString();
      interview.decline_reason = decline_reason || 'Candidate unavailable / other commitments';
      interview.schedule_state = 'Cancelled';

      if (app) {
        app.lastUpdatedDate = 'Just now';
        app.timeline.unshift({
          date: 'Just now',
          title: 'Interview Invitation Declined',
          description: `Candidate declined invitation: ${interview.decline_reason}.`,
          status: 'confirmed'
        });
      }

      logEvent(state, 'interview_declined', {
        interview_id: interview.id,
        application_id: interview.application_id,
        actor_role: 'candidate',
        reason: interview.decline_reason
      });

      return { success: true, interview };
    }

    return { success: false, error: 'Invalid response action' };
  }

  /**
   * Propose Reschedule (Candidate or Recruiter) - FR20
   */
  function proposeReschedule(state, params) {
    const { interview_id, proposed_slot, reason, proposed_by = 'candidate' } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    if (interview.cancellation?.cancelled) {
      return { success: false, error: 'Cannot reschedule a cancelled interview' };
    }

    if (interview.response === 'Declined') {
      return { success: false, error: 'Cannot reschedule a declined interview' };
    }

    interview.schedule_state = 'Reschedule Pending';
    interview.proposed_slot = {
      slot: proposed_slot,
      reason: reason || 'Schedule clash',
      proposed_by: proposed_by,
      proposed_at: new Date().toISOString()
    };

    const app = state.applications.find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: 'Just now',
        title: 'Reschedule Requested',
        description: `Alternative time proposed: ${formatDateDisplay(proposed_slot)}. Awaiting mutual confirmation.`,
        status: 'pending'
      });
    }

    // Invalidate earlier attendance reminders for previous slot - FR21
    if (state.notifications) {
      state.notifications.unshift({
        id: generateId('notif'),
        appId: app ? app.id : null,
        interviewId: interview.id,
        category: 'interview',
        title: 'Interview Reschedule Requested',
        message: `Proposed alternative time: ${formatDateDisplay(proposed_slot)}. Pending recruiter confirmation.`,
        date: 'Just now',
        read: false,
        type: 'reschedule_request'
      });
    }

    logEvent(state, 'reschedule_requested', {
      interview_id: interview.id,
      application_id: interview.application_id,
      actor_role: proposed_by,
      proposed_slot: proposed_slot
    });

    return { success: true, interview };
  }

  /**
   * Confirm Rescheduled Slot (Recruiter Action) - FR20
   */
  function confirmReschedule(state, params) {
    const { interview_id, confirmed_slot } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    if (interview.schedule_state !== 'Reschedule Pending') {
      return { success: false, error: 'Interview has no pending reschedule request' };
    }

    const slotToConfirm = confirmed_slot || (interview.proposed_slot ? interview.proposed_slot.slot : null);
    if (!slotToConfirm) {
      return { success: false, error: 'No slot provided for confirmation' };
    }

    interview.starts_at = slotToConfirm;
    interview.schedule_state = 'Confirmed';
    interview.schedule_version = (interview.schedule_version || 1) + 1;
    interview.proposed_slot = null;

    const app = state.applications.find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: 'Just now',
        title: `Rescheduled Interview Confirmed (v${interview.schedule_version})`,
        description: `New interview time confirmed: ${formatDateDisplay(interview.starts_at)}.`,
        status: 'confirmed'
      });
    }

    // Notify candidate with new confirmed slot - FR21
    if (state.notifications) {
      state.notifications.unshift({
        id: generateId('notif'),
        appId: app ? app.id : null,
        interviewId: interview.id,
        category: 'interview',
        title: 'New Interview Time Confirmed',
        message: `Your interview for ${app ? app.company : 'the role'} is confirmed for ${formatDateDisplay(interview.starts_at)}.`,
        date: 'Just now',
        read: false,
        type: 'schedule_confirmed'
      });
    }

    logEvent(state, 'schedule_confirmed', {
      interview_id: interview.id,
      schedule_version: interview.schedule_version,
      starts_at: interview.starts_at
    });

    return { success: true, interview };
  }

  /**
   * Cancel Interview - FR27
   */
  function cancelInterview(state, params) {
    const { interview_id, reason, cancelled_by = 'recruiter' } = params;
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    interview.cancellation = {
      cancelled: true,
      cancelled_by: cancelled_by,
      reason: reason || 'Position paused / organizational schedule cancellation',
      cancelled_at: new Date().toISOString()
    };
    interview.schedule_state = 'Cancelled';

    const app = state.applications.find(a => a.id === interview.application_id);
    if (app) {
      app.lastUpdatedDate = 'Just now';
      app.timeline.unshift({
        date: 'Just now',
        title: 'Interview Cancelled',
        description: `Interview cancelled by ${cancelled_by}: ${interview.cancellation.reason}.`,
        status: 'confirmed'
      });
    }

    logEvent(state, 'interview_cancelled', {
      interview_id: interview.id,
      application_id: interview.application_id,
      cancelled_by: cancelled_by,
      reason: interview.cancellation.reason
    });

    return { success: true, interview };
  }

  /**
   * Record Attendance (Candidate or Recruiter) - FR23, FR24, FR25
   */
  function recordAttendance(state, params) {
    const { interview_id, actor_role, result, notes } = params; // actor_role: 'candidate' | 'recruiter', result: 'positive' | 'negative'
    const interview = (state.interviews || []).find(i => i.id === interview_id);
    if (!interview) {
      return { success: false, error: 'Interview record not found' };
    }

    if (interview.cancellation?.cancelled) {
      return { success: false, error: 'Cannot record attendance for a cancelled interview' };
    }

    if (interview.schedule_state !== 'Confirmed') {
      return { success: false, error: 'Interview schedule must be confirmed before recording attendance' };
    }

    const record = {
      result: result, // 'positive' (Attended/Interviewed) or 'negative' (Missed/No-Show)
      recorded_at: new Date().toISOString(),
      occurred_at: interview.starts_at,
      actor_role: actor_role,
      actor_id: actor_role === 'candidate' ? (interview.seeker_id || 'seeker-01') : 'recruiter-01',
      notes: notes || ''
    };

    const app = state.applications.find(a => a.id === interview.application_id);

    if (actor_role === 'candidate') {
      interview.attendance_candidate = record;
      if (app) {
        app.timeline.unshift({
          date: 'Just now',
          title: result === 'positive' ? 'Candidate Confirmed Attendance' : 'Candidate Reported Non-Attendance',
          description: result === 'positive' ? 'You confirmed attending this interview. Awaiting recruiter verification.' : 'You reported not attending this interview.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'candidate_attendance_confirmed', {
        interview_id: interview.id,
        result: result
      });
    } else if (actor_role === 'recruiter') {
      interview.attendance_recruiter = record;
      if (app) {
        app.timeline.unshift({
          date: 'Just now',
          title: result === 'positive' ? 'Recruiter Confirmed Interview Conducted' : 'Recruiter Reported Candidate No-Show',
          description: result === 'positive' ? 'Employer verified interview completion.' : 'Employer marked candidate did not attend.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'recruiter_interviewed_confirmed', {
        interview_id: interview.id,
        result: result
      });
    } else {
      return { success: false, error: 'Invalid actor role' };
    }

    // Evaluate Dual Confirmation (FR25)
    const outcome = deriveOutcome(interview);
    if (outcome.status === 'Confirmed' && !interview.dual_confirmed_logged) {
      interview.dual_confirmed_logged = true;
      if (app) {
        app.timeline.unshift({
          date: 'Just now',
          title: 'Interview Attendance Dual-Confirmed',
          description: 'Both candidate and recruiter have independently confirmed interview completion.',
          status: 'confirmed'
        });
      }
      logEvent(state, 'interview_dual_confirmed', {
        interview_id: interview.id,
        application_id: interview.application_id,
        occurred_at: interview.starts_at
      });
    }

    return { success: true, interview, outcome };
  }

  /**
   * Derive Attendance Outcome from Dual Records - FR25
   */
  function deriveOutcome(interview) {
    if (!interview) return { status: 'Unknown', qualified: false };
    const cand = interview.attendance_candidate?.result || 'unknown';
    const rec = interview.attendance_recruiter?.result || 'unknown';

    if (cand === 'positive' && rec === 'positive') {
      return { status: 'Confirmed', qualified: true, explanation: 'Dual-confirmed attended interview' };
    }
    if (cand === 'positive' && rec === 'unknown') {
      return { status: 'Pending Recruiter', qualified: false, explanation: 'Candidate confirmed; awaiting recruiter confirmation' };
    }
    if (cand === 'unknown' && rec === 'positive') {
      return { status: 'Pending Candidate', qualified: false, explanation: 'Recruiter confirmed; awaiting candidate confirmation' };
    }
    if (cand === 'negative' || rec === 'negative') {
      if (cand === 'negative' && rec === 'negative') {
        return { status: 'Not Attended', qualified: false, explanation: 'Both sides confirmed non-attendance / no-show' };
      }
      return { status: 'Disputed', qualified: false, explanation: 'Conflicting attendance reports; requires reconciliation' };
    }
    return { status: 'Pending', qualified: false, explanation: 'Awaiting post-interview attendance recording' };
  }

  /**
   * Explicit Application Withdrawal - FR26
   */
  function withdrawApplication(state, params) {
    const { application_id, reason } = params;
    const app = state.applications.find(a => a.id === application_id);
    if (!app) {
      return { success: false, error: 'Application not found' };
    }

    if (app.status === 'Withdrawn') {
      return { success: false, error: 'Application already withdrawn' };
    }

    app.status = 'Withdrawn';
    app.withdrawn_at = new Date().toISOString();
    app.withdrawal_reason = reason || 'Candidate opted to withdraw application';
    app.lastUpdatedDate = 'Just now';

    // Cancel any active interviews
    const activeInterview = (state.interviews || []).find(i => i.application_id === application_id && !i.cancellation?.cancelled);
    if (activeInterview) {
      activeInterview.cancellation = {
        cancelled: true,
        cancelled_by: 'candidate',
        reason: 'Application withdrawn by candidate',
        cancelled_at: new Date().toISOString()
      };
      activeInterview.schedule_state = 'Cancelled';
    }

    app.timeline.unshift({
      date: 'Just now',
      title: 'Application Withdrawn',
      description: `Candidate withdrew application: ${app.withdrawal_reason}. Prior attendance history preserved.`,
      status: 'confirmed'
    });

    logEvent(state, 'application_withdrawn', {
      application_id: app.id,
      reason: app.withdrawal_reason
    });

    return { success: true, application: app };
  }

  /**
   * Cohort Instrumentation & CAIR Measurement Engine - FR28
   * Definition:
   * CAIR = (Unique eligible seekers with >=1 valid dual-confirmed attended interview within 14 days of 3rd qualifying app)
   *        / (All mature eligible seekers) * 100
   * Eligibility: At least 3 distinct qualifying submissions within 7 days.
   */
  function calculateCAIR(state, referenceDate = new Date()) {
    const applications = state.applications || [];
    const interviews = state.interviews || [];

    // Group submissions by seeker
    const seekerApps = {};
    applications.forEach(a => {
      const sid = a.seekerId || 'seeker-01';
      if (!seekerApps[sid]) seekerApps[sid] = [];
      seekerApps[sid].push(a);
    });

    let totalEligibleSeekers = 0;
    let matureEligibleSeekers = 0;
    let qualifyingSeekersWithDualConfirmed = 0;
    const cohortDetails = [];

    Object.keys(seekerApps).forEach(sid => {
      const apps = seekerApps[sid].sort((a, b) => new Date(a.appliedDate || a.submitted_at || 0) - new Date(b.appliedDate || b.submitted_at || 0));
      
      // Check 3 applications within 7 days
      let anchorApp = null;
      let anchorDate = null;

      for (let i = 2; i < apps.length; i++) {
        const d1 = new Date(apps[i - 2].appliedDate || apps[i - 2].submitted_at || 0);
        const d3 = new Date(apps[i].appliedDate || apps[i].submitted_at || 0);
        const diffDays = (d3 - d1) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
          anchorApp = apps[i];
          anchorDate = d3;
          break; // First anchor
        }
      }

      if (anchorApp) {
        totalEligibleSeekers++;
        const maturityDate = new Date(anchorDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        const isMature = referenceDate >= maturityDate;

        if (isMature) {
          matureEligibleSeekers++;
        }

        // Check for dual confirmed interview within 14 days of anchor
        const validInterviews = interviews.filter(inv => {
          if (inv.seeker_id !== sid) return false;
          const outcome = deriveOutcome(inv);
          if (!outcome.qualified) return false;

          const invDate = new Date(inv.starts_at);
          const elapsedFromAnchor = (invDate - anchorDate) / (1000 * 60 * 60 * 24);
          // Must occur between anchor date (day 0) and day 14 (inclusive)
          return elapsedFromAnchor >= 0 && elapsedFromAnchor <= 14.5;
        });

        const hasQualifiedInterview = validInterviews.length > 0;
        if (hasQualifiedInterview && isMature) {
          qualifyingSeekersWithDualConfirmed++;
        }

        cohortDetails.push({
          seekerId: sid,
          anchorAppId: anchorApp.id,
          anchorDate: anchorDate.toISOString(),
          maturityDate: maturityDate.toISOString(),
          isMature: isMature,
          dualConfirmedInterviewsCount: validInterviews.length,
          hasQualifiedInterview: hasQualifiedInterview
        });
      }
    });

    const cairRate = matureEligibleSeekers > 0
      ? ((qualifyingSeekersWithDualConfirmed / matureEligibleSeekers) * 100).toFixed(1)
      : 'N/A';

    return {
      cairRate: cairRate !== 'N/A' ? `${cairRate}%` : 'N/A (Immature Cohort)',
      rawCair: cairRate !== 'N/A' ? parseFloat(cairRate) : null,
      targetCair: '36.0%',
      baselineAssumption: '21.0%',
      matureEligibleSeekers,
      totalEligibleSeekers,
      qualifyingSeekersWithDualConfirmed,
      cohortDetails
    };
  }

  /**
   * Generate Calendar .ics File for Confirmed Interview - FR22
   */
  function generateICS(interview, app) {
    if (!interview || interview.schedule_state !== 'Confirmed') {
      return null;
    }

    const startDate = new Date(interview.starts_at);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 min default

    function formatICSDate(d) {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    const company = app ? app.company : 'Hiring Team';
    const role = app ? app.role : 'Job Interview';

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Naukri Application Clarity//Interview Schedule V2.0//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${interview.id}@naukri-application-clarity.local`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Interview: ${role} at ${company}`,
      `DESCRIPTION:Interview round: ${interview.round_name || 'Interview'}\\nFormat: ${interview.format}\\nLink/Venue: ${interview.venue_or_link || 'Online'}\\nNote: Local changes in your calendar will not update your application status on Naukri.`,
      `LOCATION:${interview.venue_or_link || 'Remote Video'}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return icsLines.join('\r\n');
  }

  /**
   * Helper: Log Local Analytics Event - FR28
   */
  function logEvent(state, eventType, data) {
    if (!state.analytics_events) state.analytics_events = [];
    state.analytics_events.push({
      event_id: generateId('evt'),
      event_type: eventType,
      timestamp: new Date().toISOString(),
      data: data || {}
    });
  }

  /**
   * Date Display Formatter
   */
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

  return {
    deriveInterviewState,
    createInvitation,
    respondToInvitation,
    proposeReschedule,
    confirmReschedule,
    cancelInterview,
    recordAttendance,
    deriveOutcome,
    withdrawApplication,
    calculateCAIR,
    generateICS,
    logEvent,
    formatDateDisplay
  };
});
