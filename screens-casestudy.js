/* Naukri Application Clarity — Comprehensive PM Case Study & Overview Engine
   Source of Truth: Product Requirements Document Version 1.0 (27 November 2026)
   Transforms the prototype into an executive, research-backed PM Portfolio Case Study.
*/

window.NaukriCaseStudy = (function () {
  function esc(s) {
    return (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------------- SECTION 1: OVERVIEW & LANDING PAGE ---------------- */
  function renderOverview(state) {
    return `
      <div class="portfolio-landing-wrap">
        <!-- Hero Section -->
        <header class="portfolio-hero">
          <div class="portfolio-container">
            <div class="portfolio-badge-row">
              <span class="port-pill port-pill-blue">Product Management Portfolio Case Study</span>
              <span class="port-pill port-pill-ghost">Independent Initiative · Unofficial Concept</span>
              <span class="port-pill port-pill-amber">Status: Proposal Complete · Validation Pending</span>
            </div>

            <h1 class="portfolio-hero-title">
              Naukri Application Clarity
            </h1>
            <p class="portfolio-hero-headline">
              From Application Tracking to Application Understanding
            </p>
            <p class="portfolio-hero-desc">
              A research-driven product initiative to improve post-application transparency, candidate trust, and informed job search decisions while preserving Naukri's existing core navigation, design language, and monetization model.
            </p>

            <!-- Hero CTAs -->
            <div class="portfolio-cta-group" style="gap:10px;align-items:center;">
              <button class="port-btn-primary" data-action="switch-mode" data-mode="casestudy">
                Explore Case Study →
              </button>
              <button class="port-btn-secondary" data-action="switch-mode" data-mode="mobile">
                📱 Launch Interactive Prototype
              </button>
              <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" target="_blank" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#3b82f6;color:#60a5fa;">
                📘 View Master PRD V2.0 (PDF)
              </a>
              <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" download="Naukri_Master_PRD_V2.pdf" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;">
                📥 Download PRD V2.0
              </a>
              <a href="./assets/docs/Naukri_Research_Analysis_Workbook.xlsx" download="Naukri_Research_Analysis_Workbook.xlsx" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;">
                📊 Research Workbook (.xlsx)
              </a>
              <a href="./assets/docs/Naukri_Application_Clarity_PRD.pdf" target="_blank" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;color:#94a3b8;font-size:12px;">
                📜 Baseline PRD V1.0 (PDF)
              </a>
            </div>

            <!-- Evidence-Safe Project Statistics -->
            <div class="portfolio-stats-grid">
              <div class="port-stat-card">
                <div class="port-stat-num">6</div>
                <div class="port-stat-label">Eligible Candidate Respondents</div>
                <div class="port-stat-sub">Recent Naukri applicants surveyed (7 total respondents, 1 ineligible)</div>
              </div>
              <div class="port-stat-card">
                <div class="port-stat-num">7</div>
                <div class="port-stat-label">Reported Recruiter Respondents</div>
                <div class="port-stat-sub">In-house HR (6) & Hiring Managers (1) across Indian hiring teams</div>
              </div>
              <div class="port-stat-card">
                <div class="port-stat-num">14</div>
                <div class="port-stat-label">Prioritised Product Features</div>
                <div class="port-stat-sub">F01–F14 mapped to functional requirements and user stories</div>
              </div>
              <div class="port-stat-card">
                <div class="port-stat-num" style="color:#22c55e;">4</div>
                <div class="port-stat-label">Core P0 MVP Features</div>
                <div class="port-stat-sub">Track CTA, Enhanced Timeline, Last Confirmed Update, Inactivity Callout</div>
              </div>
            </div>

            <!-- Core Product Skills & Metadata Badges -->
            <div class="portfolio-metadata-section">
              <span class="port-meta-title">Product Competencies Demonstrated:</span>
              <div class="port-meta-chips">
                <span class="port-chip">Product Discovery</span>
                <span class="port-chip">User Research & Synthesis</span>
                <span class="port-chip">Product Strategy & North Star Design</span>
                <span class="port-chip">Feature Prioritisation (P0/P1/P2)</span>
                <span class="port-chip">Central Business Logic Definition</span>
                <span class="port-chip">High-Fidelity Interactive Prototyping</span>
                <span class="port-chip">Experimentation & Rollout Planning</span>
                <span class="port-chip">Usability Protocol & Research Lab</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Executive Narrative & Strategic Summary -->
        <main class="portfolio-container portfolio-landing-body">
          <!-- 5-7 Minute Hiring Manager Guided Roadmap -->
          <section class="portfolio-section-card">
            <div class="port-card-tag">Hiring Manager 5–7 Minute Walkthrough</div>
            <h2 class="port-card-heading">Executive Summary & Strategic Thesis</h2>
            
            <div class="port-thesis-box">
              <strong>Core Product Thesis:</strong>
              <p style="margin:6px 0 0;font-size:14.5px;color:#e2e8f0;line-height:1.6;">
                <em>“Improve the interpretation of existing application information rather than redesigning the recruitment marketplace. Show confirmed progress, explain uncertainty transparently, and support informed candidate next steps without imposing mandatory burdens on recruiters.”</em>
              </p>
            </div>

            <div class="port-grid-2col" style="margin-top:20px;">
              <div>
                <h4 style="font-size:14px;color:#38bdf8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">The Unaddressed Problem</h4>
                <p style="font-size:13.5px;color:#cbd5e1;line-height:1.6;">
                  Naukri is India's leading recruitment portal, but candidate post-application tracking remains an emotional black hole. Applications stall indefinitely at <em>“Application Viewed”</em> or <em>“Awaiting Recruiter Action”</em> with no recency updates, confusing profile match scores with rejection, and leaving candidates anxious about whether to keep waiting or move on.
                </p>
              </div>
              <div>
                <h4 style="font-size:14px;color:#22c55e;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">The Incremental Solution</h4>
                <p style="font-size:13.5px;color:#cbd5e1;line-height:1.6;">
                  Rather than forcing recruiters into tedious manual messaging or creating automated false rejections, this initiative introduces **4 core P0 MVP capabilities**: a direct post-apply tracking CTA, a chronological timeline with plain-language explanations, a verified last-confirmed-update timestamp, and non-punitive inactivity indicators (7d/14d/30d+).
                </p>
              </div>
            </div>

            <!-- Key Links & Interactive Portals -->
            <div class="port-nav-cards-grid" style="margin-top:24px;">
              <div class="port-nav-card" data-action="switch-mode" data-mode="casestudy">
                <span class="port-nav-icon">📖</span>
                <div class="port-nav-text">
                  <strong>Full PRD Case Study (15 Sections)</strong>
                  <span>Problem statement, target users, acceptance criteria, business impact, and experimentation roadmap.</span>
                </div>
                <span class="port-nav-arrow">→</span>
              </div>

              <div class="port-nav-card" data-action="switch-mode" data-mode="mobile">
                <span class="port-nav-icon">📱</span>
                <div class="port-nav-text">
                  <strong>Interactive Functional Prototype</strong>
                  <span>10 mobile scenarios, light desktop web tracker, and 2-way live synced recruiter workflow.</span>
                </div>
                <span class="port-nav-arrow">→</span>
              </div>

              <div class="port-nav-card" data-action="switch-mode" data-mode="comparisons">
                <span class="port-nav-icon">⚖️</span>
                <div class="port-nav-text">
                  <strong>Before vs. After Visual Gallery</strong>
                  <span>10 side-by-side comparisons highlighting UI enhancements against audited Naukri screens.</span>
                </div>
                <span class="port-nav-arrow">→</span>
              </div>

              <div class="port-nav-card" data-action="switch-mode" data-mode="documentation">
                <span class="port-nav-icon">📑</span>
                <div class="port-nav-text">
                  <strong>Product Documentation & QA</strong>
                  <span>Acceptance criteria traceability, central business rules, regression suite, and limitations.</span>
                </div>
                <span class="port-nav-arrow">→</span>
              </div>
            </div>
          </section>

          <!-- Status & Evidence Integrity Callout -->
          <div class="testing-callout callout-info" style="border-left:4px solid #3b82f6;">
            <strong>Portfolio Ethics & Research Integrity Notice:</strong>
            <p style="margin:6px 0 0;font-size:12.5px;color:#94a3b8;line-height:1.6;">
              This portfolio project clearly distinguishes **validated observations** (audited live screenshots, 6 candidate survey records, Play Store reviews) from **proposed solutions, business hypotheses, and architectural assumptions**. Zero synthetic feedback, fake test participants, or fabricated business revenue metrics are presented.
            </p>
          </div>
        </main>
      </div>
    `;
  }

  /* ---------------- SECTION 2: FULL PM CASE STUDY (PRD 01-15) ---------------- */
  function renderCaseStudy(state) {
    return `
      <div class="casestudy-layout">
        <!-- Sticky Case Study Sidebar Navigation -->
        <aside class="casestudy-sidebar">
          <div class="casestudy-toc-header">
            <span class="port-pill port-pill-blue">PRD Table of Contents</span>
            <div style="font-size:11px;color:#94a3b8;margin-top:4px;">PRD Version 1.0 (27 Nov 2026)</div>
          </div>
          <nav class="casestudy-toc-nav">
            <a href="#cs-01" class="toc-link">01 · Executive Summary</a>
            <a href="#cs-02" class="toc-link">02 · Product Context & Opportunity</a>
            <a href="#cs-03" class="toc-link">03 · Problem & Root Cause Hypothesis</a>
            <a href="#cs-04" class="toc-link">04 · Research Methodology & Insights</a>
            <a href="#cs-05" class="toc-link">05 · Target Users & Jobs to Be Done</a>
            <a href="#cs-06" class="toc-link">06 · Goals, Non-Goals & Principles</a>
            <a href="#cs-07" class="toc-link">07 · Current vs. Proposed Journey</a>
            <a href="#cs-08" class="toc-link">08 · MVP Scope & Prioritisation</a>
            <a href="#cs-09" class="toc-link">09 · Requirements & Acceptance Criteria</a>
            <a href="#cs-10" class="toc-link">10 · Success Metrics & North Star</a>
            <a href="#cs-11" class="toc-link">11 · Business Impact Hypotheses</a>
            <a href="#cs-12" class="toc-link">12 · Technical Dependencies & Feasibility</a>
            <a href="#cs-13" class="toc-link">13 · Risks & Mitigation Matrix</a>
            <a href="#cs-14" class="toc-link">14 · Rollout & Experimentation Plan</a>
            <a href="#cs-15" class="toc-link">15 · Future Roadmap & Recommendation</a>
          </nav>
          <div style="padding:14px 18px;border-top:1px solid #1e293b;display:flex;flex-direction:column;gap:8px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">PRD Documentation V2.0</div>
            <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" target="_blank" class="port-btn-secondary" style="width:100%;font-size:11px;padding:6px 10px;text-align:center;text-decoration:none;box-sizing:border-box;border-color:#3b82f6;color:#bfdbfe;">
              📘 View Master PRD V2.0 (PDF)
            </a>
            <div style="display:flex;gap:6px;">
              <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" download="Naukri_Master_PRD_V2.pdf" class="port-btn-ghost" style="flex:1;font-size:10px;padding:5px 6px;text-align:center;text-decoration:none;box-sizing:border-box;">
                📥 PRD V2.0
              </a>
              <a href="./assets/docs/Naukri_Research_Analysis_Workbook.xlsx" download="Naukri_Research_Analysis_Workbook.xlsx" class="port-btn-ghost" style="flex:1;font-size:10px;padding:5px 6px;text-align:center;text-decoration:none;box-sizing:border-box;">
                📊 Data xlsx
              </a>
            </div>
            <a href="./assets/docs/Naukri_Application_Clarity_PRD.pdf" target="_blank" class="port-btn-ghost" style="width:100%;font-size:10px;padding:5px 6px;text-align:center;text-decoration:none;box-sizing:border-box;color:#94a3b8;">
              📜 Baseline PRD V1.0 (PDF)
            </a>
            <button class="port-btn-ghost" style="width:100%;font-size:10px;padding:5px 6px;" data-action="download-prd-md">
              📋 Summary (.md)
            </button>
          </div>
        </aside>

        <!-- Main Case Study Content Stream -->
        <article class="casestudy-content">
          <!-- PRD Document Header -->
          <div class="prd-doc-header">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
              <div>
                <span class="port-pill port-pill-blue">PRODUCT REQUIREMENTS DOCUMENT</span>
                <h1 style="font-size:26px;font-weight:800;color:#f8fafc;margin:10px 0 4px;">Naukri Application Clarity</h1>
                <p style="font-size:14px;color:#94a3b8;margin:0;">Enhancing post-application transparency and candidate trust · Version 1.0 (27 Nov 2026)</p>
              </div>
              <div>
                <span class="port-pill port-pill-amber">Status: Consolidated Proposal — Validation Pending</span>
              </div>
            </div>

            <div class="port-stats-grid" style="margin-top:20px;">
              <div class="port-stat-card">
                <span class="port-stat-label">Research Signal</span>
                <div style="font-size:15px;font-weight:700;color:#f8fafc;margin-top:4px;">6 eligible candidates</div>
                <div style="font-size:12px;color:#94a3b8;">7 recruiters (reported)</div>
              </div>
              <div class="port-stat-card">
                <span class="port-stat-label">Core Scope</span>
                <div style="font-size:15px;font-weight:700;color:#38bdf8;margin-top:4px;">4 P0 Features (MVP)</div>
                <div style="font-size:12px;color:#94a3b8;">7 P1 / 3 P2 features</div>
              </div>
              <div class="port-stat-card">
                <span class="port-stat-label">Engineering Feasibility</span>
                <div style="font-size:15px;font-weight:700;color:#f59e0b;margin-top:4px;">Pending Discovery</div>
                <div style="font-size:12px;color:#94a3b8;">Client prototype validated</div>
              </div>
              <div class="port-stat-card">
                <span class="port-stat-label">Usability Validation</span>
                <div style="font-size:15px;font-weight:700;color:#a855f7;margin-top:4px;">Lab Testing Ready</div>
                <div style="font-size:12px;color:#94a3b8;">Zero synthetic responses</div>
              </div>
            </div>
          </div>

          <!-- 01 / Executive Summary -->
          <section id="cs-01" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">01</span> Executive Summary</h2>
            <p>
              Naukri already provides application tracking. The opportunity is to make existing status information easier to discover and interpret when no meaningful update is available. The proposed MVP adds a direct tracking CTA, clearer timeline, last confirmed update and contextual inactivity indicator.
            </p>
            <p>
              The initiative-level North Star is <strong>Application Clarity Rate (ACR)</strong>, measured through comprehension assessments rather than page views. Candidate trust, retention and support efficiency are potential outcomes, not demonstrated impact.
            </p>
            <div class="port-callout-box">
              <strong>Decision Requested:</strong> Approve further usability validation and technical discovery for P0. Defer P1 and P2 investment until dependencies and outcomes justify it.
            </div>
          </section>

          <!-- 02 / Product Context & Opportunity -->
          <section id="cs-02" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">02</span> Product Context & Opportunity</h2>
            <p>
              Candidates use Naukri to discover jobs, apply and monitor progress. Existing tracking, recruiter activity and paid-service placements provide a foundation for targeted improvements.
            </p>
            <p>
              <strong>Core Constraints:</strong> Preserve navigation, visual language and commercial functionality (e.g. Naukri Pro, FastForward, Neo); make essential tracking transparency free and non-punitive.
            </p>
          </section>

          <!-- 03 / Problem & Root Cause Hypothesis -->
          <section id="cs-03" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">03</span> Problem & Root Cause Hypothesis</h2>
            <p>
              Although Naukri provides application tracking, candidates can remain at <em>Application Viewed</em> or <em>Awaiting Recruiter Action</em> for extended periods without meaningful updates or closure. This can create a gap between recruiter activity and candidate understanding.
            </p>
            <div class="port-thesis-box">
              <strong>How Might We Statement:</strong>
              <div style="font-size:14.5px;color:#f8fafc;margin-top:6px;">
                How might we improve post-application transparency without increasing mandatory recruiter workload or disrupting existing hiring workflows?
              </div>
            </div>
            <p>
              <strong>Root Cause Hypothesis:</strong> Confirmed workflow events may not be translated into sufficiently meaningful candidate-facing information. Missing recruiter responses, hiring changes and profile mismatch may also contribute. No technical synchronisation failure has been established.
            </p>
          </section>

          <!-- 04 / Research Methodology & Insights -->
          <section id="cs-04" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">04</span> Research Methodology & Insights</h2>
            <p>
              Exploratory survey, selected negative app-store reviews, desktop/mobile product audit and recruiter training review. The candidate workbook was reopened for this consolidation: seven populated responses, six eligible (recent Naukri applicants), one ineligible. Earlier notes reported ten total; three additional responses are not supported by the available workbook.
            </p>

            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Candidate Finding (n = 6 eligible applicants)</th>
                    <th>Count</th>
                    <th>Directional Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>No response within 14 days</strong></td>
                    <td class="text-amber">3 / 6</td>
                    <td>Prolonged silence triggers anxiety and speculation</td>
                  </tr>
                  <tr>
                    <td><strong>Could not see application progress</strong></td>
                    <td class="text-amber">3 / 6</td>
                    <td>Candidates unsure if application reached human review</td>
                  </tr>
                  <tr>
                    <td><strong>Viewed but no reply</strong></td>
                    <td class="text-slate">2 / 6</td>
                    <td>Application opened without feedback or next step</td>
                  </tr>
                  <tr>
                    <td><strong>No status or update</strong></td>
                    <td class="text-slate">2 / 6</td>
                    <td>Stagnant status without recency timestamps</td>
                  </tr>
                  <tr>
                    <td><strong>Role filled / closed; reply without interview</strong></td>
                    <td class="text-slate">1 / 6 each</td>
                    <td>Stale job postings remaining open to applicants</td>
                  </tr>
                  <tr>
                    <td><strong>Unsure if job or recruiter is genuine</strong></td>
                    <td class="text-slate">2 / 6</td>
                    <td>Mean genuineness confidence: <strong>2.67 / 5.0</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Demographic distribution</strong></td>
                    <td class="text-slate">4 freshers · 2 experienced</td>
                    <td>All 6 also use LinkedIn; 5 use other portals</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style="font-size:12px;color:#94a3b8;margin-top:6px;">
              * Note: Mean genuineness confidence (2.67/5) measures perceived authenticity, not application clarity. Findings are directional from a small convenience sample.
            </p>

            <h4 style="font-size:14px;color:#38bdf8;text-transform:uppercase;margin:20px 0 8px;">Recruiter Research (Reported, raw responses unavailable)</h4>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Recruiter Reported Finding (n = 7)</th>
                    <th>Count</th>
                    <th>Operational Insight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Profile mismatch cited as primary barrier</strong></td>
                    <td class="text-blue">5 / 7</td>
                    <td>Recruiters triage high volumes with limited bandwidth</td>
                  </tr>
                  <tr>
                    <td><strong>Role filled / placed on hold during search</strong></td>
                    <td class="text-blue">3 / 7</td>
                    <td>Requisition changes not communicated down-funnel</td>
                  </tr>
                  <tr>
                    <td><strong>Overwhelming volume of applications</strong></td>
                    <td class="text-slate">1 / 7</td>
                    <td>Manual messaging creates friction; structured actions preferred</td>
                  </tr>
                  <tr>
                    <td><strong>Report replying to over 60% of applicants</strong></td>
                    <td class="text-slate">5 / 7</td>
                    <td>Disconnect between recruiter perception & candidate reality</td>
                  </tr>
                  <tr>
                    <td><strong>Composition</strong></td>
                    <td class="text-slate">6 In-house HR · 1 Founder</td>
                    <td>Recruiter survey is not necessarily Naukri-specific</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 05 / Target Users & Jobs to Be Done -->
          <section id="cs-05" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">05</span> Target Users & Jobs to Be Done</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Archetype</th>
                    <th>Core Need / Job to Be Done (JTBD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Early-Career Candidate (4/6)</strong></td>
                    <td><em>“When I apply, help me understand progress and whether I should continue searching or wait.”</em></td>
                  </tr>
                  <tr>
                    <td><strong>Experienced Candidate (2/6)</strong></td>
                    <td><em>“Help me manage active opportunities and make informed decisions without repeated checking.”</em></td>
                  </tr>
                  <tr>
                    <td><strong>In-House Recruiter (6/7 reported)</strong></td>
                    <td><em>“Communicate confirmed changes to applicants without duplicating routine administrative work.”</em></td>
                  </tr>
                  <tr>
                    <td><strong>Hiring Manager / Founder (1/7 reported)</strong></td>
                    <td><em>“Keep candidate expectations aligned with changing hiring needs and budget approvals.”</em></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style="font-size:12px;color:#94a3b8;margin-top:6px;">
              * Note: These are research-informed archetypes, not validated demographic segments or statistical personas.
            </p>
          </section>

          <!-- 06 / Goals, Non-Goals & Principles -->
          <section id="cs-06" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">06</span> Goals, Non-Goals & Principles</h2>
            <div class="port-grid-2col">
              <div class="port-callout-box" style="border-color:#22c55e;">
                <h4 style="color:#22c55e;margin:0 0 8px;">Product Goals</h4>
                <ul class="port-list">
                  <li>Improve tracking discoverability and navigation ease.</li>
                  <li>Increase candidate application status comprehension.</li>
                  <li>Provide clear recency signals (last confirmed update date).</li>
                  <li>Empower candidate next-step confidence and reduce repeated checking.</li>
                  <li>Preserve recruiter workflow efficiency and commercial viability.</li>
                </ul>
              </div>

              <div class="port-callout-box" style="border-color:#ef4444;">
                <h4 style="color:#ef4444;margin:0 0 8px;">Explicit Non-Goals</h4>
                <ul class="port-list">
                  <li>Complete website or app visual redesign.</li>
                  <li>Replacement of third-party enterprise ATS systems.</li>
                  <li>Guaranteed responses or employment outcomes.</li>
                  <li>Automatic rejection or algorithmic hiring predictions.</li>
                  <li>Unverified rejection reasons or mandatory recruiter deadlines.</li>
                  <li>Unsupported external applicant tracking.</li>
                </ul>
              </div>
            </div>

            <div style="margin-top:16px;background:#111422;border:1px solid #232b43;border-radius:10px;padding:16px;">
              <h4 style="color:#38bdf8;margin:0 0 8px;font-size:13px;text-transform:uppercase;">Guiding Principles:</h4>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.6;margin:0;">
                <strong>1. Confirmed information only:</strong> Never fabricate recruiter actions.<br />
                <strong>2. Uncertainty made explicit:</strong> Distinguish <em>“Awaiting Action”</em> from active consideration.<br />
                <strong>3. Independent application & role states:</strong> Role closure does not overwrite candidate decisions.<br />
                <strong>4. Preserve historical timeline:</strong> Confirmed milestones are never destroyed.<br />
                <strong>5. Free essential transparency:</strong> Basic tracking is never locked behind paywalls.
              </p>
            </div>
          </section>

          <!-- 07 / Current vs Proposed Journey -->
          <section id="cs-07" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">07</span> Current vs. Proposed Journey</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Journey Stage</th>
                    <th>Current Observed Friction</th>
                    <th>Proposed Enhanced Experience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>1. Apply</strong></td>
                    <td>Confirmation screen prioritises promotional upsells and generic job alerts</td>
                    <td>Prominent, primary <strong>Track Application CTA</strong> with submission timestamp</td>
                  </tr>
                  <tr>
                    <td><strong>2. Track</strong></td>
                    <td>Generic status timeline without recency or explanation</td>
                    <td>Clear stage explanations and <strong>Last confirmed update date</strong></td>
                  </tr>
                  <tr>
                    <td><strong>3. Wait</strong></td>
                    <td>Extended silence (11–12 weeks) with zero feedback</td>
                    <td>Neutral, non-punitive <strong>Inactivity Indicator (7d / 14d / 30d+)</strong></td>
                  </tr>
                  <tr>
                    <td><strong>4. Outcome</strong></td>
                    <td>Match criteria (e.g. 4/6 skills) easily confused with rejection reasons</td>
                    <td>Confirmed outcome; <strong>structured reason only if explicitly provided</strong></td>
                  </tr>
                  <tr>
                    <td><strong>5. Manage</strong></td>
                    <td>Cluttered list; promotional alerts drown application updates</td>
                    <td>P1 status filters, archive/restore, and outcome-categorised notifications</td>
                  </tr>
                  <tr>
                    <td><strong>6. Hiring Changes</strong></td>
                    <td>No visibility into whether a role was paused or filled</td>
                    <td>P2 independent hiring availability badge with resume alert opt-in</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 08 / MVP Scope & Prioritisation -->
          <section id="cs-08" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">08</span> MVP Scope & Prioritisation</h2>
            <p>
              Qualitative impact–effort assessment across 14 prioritised features (F01–F14). No RICE score is assigned because broad platform reach and engineering estimates require internal production analytics.
            </p>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Priority</th>
                    <th>Feature Description</th>
                    <th>Impact</th>
                    <th>Assumed Effort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row-p0">
                    <td><strong>F01</strong></td>
                    <td><span class="port-badge badge-p0">P0 (MVP)</span></td>
                    <td><strong>Track Application CTA</strong> on submission confirmation</td>
                    <td>High</td>
                    <td>Low</td>
                  </tr>
                  <tr class="row-p0">
                    <td><strong>F02</strong></td>
                    <td><span class="port-badge badge-p0">P0 (MVP)</span></td>
                    <td><strong>Enhanced Application Timeline</strong> with plain-language explanations</td>
                    <td>High</td>
                    <td>Medium</td>
                  </tr>
                  <tr class="row-p0">
                    <td><strong>F03</strong></td>
                    <td><span class="port-badge badge-p0">P0 (MVP)</span></td>
                    <td><strong>Last Confirmed Update Timestamp</strong></td>
                    <td>High</td>
                    <td>Low</td>
                  </tr>
                  <tr class="row-p0">
                    <td><strong>F04</strong></td>
                    <td><span class="port-badge badge-p0">P0 (MVP)</span></td>
                    <td><strong>Contextual Inactivity Indicator</strong> (7d/14d/30d+ thresholds)</td>
                    <td>High</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F05</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Homepage My Applications Overview Summary</td>
                    <td>Medium</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F06</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Application List Status Filters (Awaiting, Viewed, Closed, etc.)</td>
                    <td>Medium</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F07</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Application-Specific Notifications Deep-linking to Trackers</td>
                    <td>High</td>
                    <td>Medium–High</td>
                  </tr>
                  <tr>
                    <td><strong>F08</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Granular Notification Preferences</td>
                    <td>Medium</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F09</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Archive and Restore Functionality</td>
                    <td>Medium</td>
                    <td>Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F10</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Contextual Not Shortlisted Experience (Separated from Match)</td>
                    <td>Medium</td>
                    <td>Low</td>
                  </tr>
                  <tr>
                    <td><strong>F11</strong></td>
                    <td><span class="port-badge badge-p1">P1</span></td>
                    <td>Contextual Commercial Promotions (Placed after Essential Info)</td>
                    <td>Medium</td>
                    <td>Low–Medium</td>
                  </tr>
                  <tr>
                    <td><strong>F12</strong></td>
                    <td><span class="port-badge badge-p2">P2</span></td>
                    <td>Independent Hiring Availability (Active, On Hold, Closed)</td>
                    <td>High</td>
                    <td>High</td>
                  </tr>
                  <tr>
                    <td><strong>F13</strong></td>
                    <td><span class="port-badge badge-p2">P2</span></td>
                    <td>Optional Structured Rejection Reasons</td>
                    <td>Medium</td>
                    <td>High</td>
                  </tr>
                  <tr>
                    <td><strong>F14</strong></td>
                    <td><span class="port-badge badge-p2">P2</span></td>
                    <td>Recruiter Status Automation & Live Sync</td>
                    <td>Potentially High</td>
                    <td>High</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="port-callout-box" style="margin-top:16px;">
              <strong>MVP Release Gate Criteria:</strong>
              All 4 P0 acceptance criteria satisfied; reliable data and authorization verified; no critical usability or data integrity defects; analytics instrumentation and rollback flags ready; zero mandatory extra recruiter steps.
            </div>

            <!-- Four Core MVP Features Showcase -->
            <div style="margin-top:32px;">
              <h3 style="font-size:18px;font-weight:700;color:#f8fafc;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
                <span>🎯</span> Four Core MVP Features (P0 Deep-Dive)
              </h3>
              <p style="font-size:14px;color:#94a3b8;margin-bottom:16px;">
                Addressing the root cause of candidate drop-off and uncertainty without altering recruiter operational workflows or introducing speculative AI scoring.
              </p>

              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
                <div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:12px;padding:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span class="port-badge badge-p0">F01 · P0</span>
                    <span style="font-size:11px;color:#64748b;">Screen 03 &rarr; 07</span>
                  </div>
                  <strong style="color:#f8fafc;font-size:15px;display:block;margin-bottom:6px;">Track Application CTA</strong>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0;">
                    Replaces promotional distraction on the submission confirmation screen with an explicit, high-contrast action routing directly to the candidate's live application tracker.
                  </p>
                </div>

                <div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:12px;padding:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span class="port-badge badge-p0">F02 · P0</span>
                    <span style="font-size:11px;color:#64748b;">Screen 07 Details</span>
                  </div>
                  <strong style="color:#f8fafc;font-size:15px;display:block;margin-bottom:6px;">Enhanced Application Timeline</strong>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0;">
                    Chronological audit of confirmed hiring milestones with plain-language explanations (e.g., <em>Application Sent</em> &rarr; <em>Application Viewed</em>), avoiding speculative intermediate stages.
                  </p>
                </div>

                <div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:12px;padding:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span class="port-badge badge-p0">F03 · P0</span>
                    <span style="font-size:11px;color:#64748b;">Screen 06 & 07</span>
                  </div>
                  <strong style="color:#f8fafc;font-size:15px;display:block;margin-bottom:6px;">Last Confirmed Update Timestamp</strong>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0;">
                    Displays verified recency of employer action. Preserves data integrity: routine candidate logins and portal views never falsify this milestone.
                  </p>
                </div>

                <div style="background:rgba(30,41,59,0.7);border:1px solid #334155;border-radius:12px;padding:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span class="port-badge badge-p0">F04 · P0</span>
                    <span style="font-size:11px;color:#64748b;">Screen 07 Details</span>
                  </div>
                  <strong style="color:#f8fafc;font-size:15px;display:block;margin-bottom:6px;">Contextual Inactivity Indicator</strong>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0;">
                    Calculates elapsed days without confirmed activity (7d/14d/30d+ thresholds) paired with clear non-rejection reassurance and next-step actions.
                  </p>
                </div>
              </div>
            </div>

            <!-- Before vs After Interactive Showcase Preview -->
            <div style="margin-top:28px;background:linear-gradient(135deg, rgba(37,99,235,0.1), rgba(15,23,42,0.8));border:1px solid #2563eb;border-radius:12px;padding:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div>
                  <span class="port-pill port-pill-blue" style="font-size:11px;">Design Validation</span>
                  <h4 style="font-size:16px;font-weight:700;color:#f8fafc;margin:6px 0 4px;">10 Side-by-Side Before vs. After Screen Comparisons</h4>
                  <p style="font-size:13px;color:#94a3b8;margin:0;">
                    Explore exact UI diffs between current production Naukri workflows and the proposed clarity improvements.
                  </p>
                </div>
                <button class="port-btn-primary" data-action="switch-mode" data-mode="comparisons" style="padding:10px 18px;font-size:13px;">
                  Launch Comparison Gallery &rarr;
                </button>
              </div>
            </div>
          </section>

          <!-- 09 / Requirements & Central Business Rules -->
          <section id="cs-09" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">09</span> Requirements & Central Business Rules</h2>
            <p>
              Traceability: F01–F14 map to functional requirements FR01–FR14 and user stories US01–US14 respectively. Acceptance criteria are proposed design specifications.
            </p>

            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Central Business Rule & Invariant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Candidate Status</strong></td>
                    <td>Confirmed candidate-specific state only. <em>Awaiting Recruiter Action</em> means no further confirmed event exists, never active consideration.</td>
                  </tr>
                  <tr>
                    <td><strong>Hiring Availability</strong></td>
                    <td>Independent role-level state. Listing existence or job expiry does not prove active hiring or that a role was filled.</td>
                  </tr>
                  <tr>
                    <td><strong>Last Update Date</strong></td>
                    <td>Latest reliable candidate-specific milestone. Role changes, candidate logins, archives, or page views do not reset it.</td>
                  </tr>
                  <tr>
                    <td><strong>Inactivity Duration</strong></td>
                    <td>0–6d standard; 7–13d no new update; 14–29d no recent update; 30d+ extended inactivity. Explicitly non-punitive.</td>
                  </tr>
                  <tr>
                    <td><strong>History Preservation</strong></td>
                    <td>Preserve confirmed historical timeline events. Older events or job pauses must never overwrite a valid newer candidate state.</td>
                  </tr>
                  <tr>
                    <td><strong>Notification Delivery</strong></td>
                    <td>Stable event ID + recipient + channel. Distinct recurring transitions (On Hold → Active → On Hold) notify; identical repeated clicks are suppressed.</td>
                  </tr>
                  <tr>
                    <td><strong>External Applications</strong></td>
                    <td>Disclose third-party ATS limited tracking transparency explicitly.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 10 / Success Metrics & KPIs -->
          <section id="cs-10" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">10</span> Success Metrics & KPIs</h2>
            <div class="port-thesis-box">
              <strong>Primary North Star Metric: Application Clarity Rate (ACR)</strong>
              <div style="font-size:13px;color:#cbd5e1;margin-top:6px;line-height:1.6;">
                <code>ACR = (Candidates meeting all applicable clarity criteria / Candidates with valid assessments) × 100</code><br />
                Assesses correct current status identification, last update understanding, absence of false rejection assumptions, and appropriate next-step selection.
              </div>
            </div>

            <div class="port-table-wrap" style="margin-top:14px;">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Definition & Measurement</th>
                    <th>Proposed Validation Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Application Clarity Rate (ACR)</strong></td>
                    <td>Comprehension assessment across core status criteria</td>
                    <td>≥ 80% initial usability target</td>
                  </tr>
                  <tr>
                    <td><strong>Independent Task Completion</strong></td>
                    <td>Unassisted task success / valid attempts</td>
                    <td>≥ 80% unassisted completion</td>
                  </tr>
                  <tr>
                    <td><strong>Status / Inactivity Comprehension</strong></td>
                    <td>Correct interpretation of timeline & inactivity alerts</td>
                    <td>≥ 80% correct interpretation</td>
                  </tr>
                  <tr>
                    <td><strong>Next-Step Confidence</strong></td>
                    <td>Mean rating on 1–5 post-test scale</td>
                    <td>≥ 4.0 / 5.0 mean score</td>
                  </tr>
                  <tr>
                    <td><strong>Track CTA Click-Through Rate</strong></td>
                    <td>Unique clickers / eligible exposed candidates</td>
                    <td>Tracked in A/B experiment</td>
                  </tr>
                  <tr>
                    <td><strong>Support Inquiry Efficiency</strong></td>
                    <td>Status-related support tickets / 1,000 active applicants</td>
                    <td>Hypothesised reduction</td>
                  </tr>
                  <tr>
                    <td><strong>Critical Guardrails</strong></td>
                    <td>Zero false rejection from inactivity; zero new mandatory P0 recruiter workload; zero data leaks</td>
                    <td><strong>0 Guardrail Violations</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 11 / Business Impact Hypotheses -->
          <section id="cs-11" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">11</span> Business Impact Hypotheses</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Value Hypothesis</th>
                    <th>Proposed Measurement Mechanism</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Clearer information strengthens platform trust</strong></td>
                    <td>Application Clarity Rate (ACR), candidate trust & clarity ratings</td>
                  </tr>
                  <tr>
                    <td><strong>Easier tracking improves meaningful engagement</strong></td>
                    <td>Task completion, relevant job search actions, D7/D30 cohort retention</td>
                  </tr>
                  <tr>
                    <td><strong>Self-service reduces repetitive customer support enquiries</strong></td>
                    <td>Status inquiries per 1,000 active applicants</td>
                  </tr>
                  <tr>
                    <td><strong>Existing recruiter events improve communication efficiency</strong></td>
                    <td>Recruiter administrative time and action-to-sync ratios</td>
                  </tr>
                  <tr>
                    <td><strong>Contextual promotions preserve commercial value</strong></td>
                    <td>Naukri Pro & FastForward conversion and net contribution</td>
                  </tr>
                  <tr>
                    <td><strong>Superior post-application UX drives candidate platform preference</strong></td>
                    <td>Qualitative competitive feedback against LinkedIn and Indeed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style="font-size:12px;color:#94a3b8;margin-top:6px;">
              * Note: No actual revenue uplift, support cost savings, or ROI is established at this stage. Candidates naturally churn when hired; competitive preference requires dedicated longitudinal tracking.
            </p>
          </section>

          <!-- 12 / Technical Dependencies & Feasibility -->
          <section id="cs-12" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">12</span> Technical Dependencies & Feasibility</h2>
            <p>
              Conceptual Architecture: Authorised application/recruiter events → Validation, deduplication and ordering → Independent application & hiring state → Timeline/inactivity evaluation → Candidate interface and eligible notifications.
            </p>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Technical Dependency</th>
                    <th>Required Validation Gate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Application IDs & Navigation</strong></td>
                    <td>Stable unique identifiers and authorised retrieval across sessions</td>
                  </tr>
                  <tr>
                    <td><strong>Event Streams & Timestamps</strong></td>
                    <td>Event completeness, source reliability, and strict chronological ordering</td>
                  </tr>
                  <tr>
                    <td><strong>Status Mapping Layer</strong></td>
                    <td>Agreed candidate-facing definitions mapped to backend ATS states</td>
                  </tr>
                  <tr>
                    <td><strong>Role-Level Hiring Events</strong></td>
                    <td>Reliable requisition source (P2 conditional on enterprise feed)</td>
                  </tr>
                  <tr>
                    <td><strong>Notification Infrastructure</strong></td>
                    <td>Event-level deduplication, preference respect, and high-deliverability push/inbox</td>
                  </tr>
                  <tr>
                    <td><strong>Cross-Platform Security & Access</strong></td>
                    <td>Shared state, strict candidate-recruiter authorization, and WCAG AA accessibility</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 13 / Risks & Assumptions Matrix -->
          <section id="cs-13" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">13</span> Risks & Assumptions Matrix</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Identified Product Risk</th>
                    <th>Severity</th>
                    <th>Proposed Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>R01</strong></td>
                    <td>Inactivity duration misinterpreted as candidate rejection</td>
                    <td><span class="issue-badge badge-critical">Critical</span></td>
                    <td>Explicit non-rejection wording; prominent next-step exploration</td>
                  </tr>
                  <tr>
                    <td><strong>R02</strong></td>
                    <td>Unreliable backend event timestamps</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Validate timestamp sources; suppress duration if timestamp missing</td>
                  </tr>
                  <tr>
                    <td><strong>R03</strong></td>
                    <td>Unreliable hiring availability data from employers</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Fallback to <em>“Hiring status not confirmed”</em>; defer P2 role feeds</td>
                  </tr>
                  <tr>
                    <td><strong>R04</strong></td>
                    <td>Increased mandatory recruiter workload</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Zero mandatory P0 actions; reuse existing recruiter review clicks</td>
                  </tr>
                  <tr>
                    <td><strong>R05</strong></td>
                    <td>Notification fatigue and alert spam</td>
                    <td><span class="issue-badge badge-minor">Medium</span></td>
                    <td>Granular category preferences; suppress marketing from tracking tabs</td>
                  </tr>
                  <tr>
                    <td><strong>R06</strong></td>
                    <td>Duplicate notifications emitted for identical recruiter actions</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Event-level deduplication checking latest notification per application</td>
                  </tr>
                  <tr>
                    <td><strong>R07</strong></td>
                    <td>Job closure overwriting candidate shortlist decision</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Decoupled data fields; regression test suite (QA12)</td>
                  </tr>
                  <tr>
                    <td><strong>R08</strong></td>
                    <td>Profile match criteria confused with rejection reasons</td>
                    <td><span class="issue-badge badge-major">High</span></td>
                    <td>Separate match analysis from confirmed recruiter rejection notes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 14 / Rollout & Experimentation Plan -->
          <section id="cs-14" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">14</span> Rollout & Experimentation Plan</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Rollout Stage</th>
                    <th>Scope & Gate Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Stage 0 · Discovery</strong></td>
                    <td>Validate usability with 3–5 users, event sources, timestamps, and feasibility</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 1 · Internal QA</strong></td>
                    <td>P0 acceptance criteria, regression scenarios QA01–QA18, privacy audit</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 2 · Limited Pilot</strong></td>
                    <td>Illustrative 1–5% eligible exposure; backend telemetry reliability review</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 3 · A/B Experiment</strong></td>
                    <td>Candidate-level randomisation (50:50) within authenticated eligible population</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 4 · Progressive Rollout</strong></td>
                    <td>Illustrative 10% → 25% → 50% → 100% rollout review gates</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 5 · P1 Enhancements</strong></td>
                    <td>Separate feature experiments for Filters, Notifications, and Archive</td>
                  </tr>
                  <tr>
                    <td><strong>Stage 6 · P2 Integration</strong></td>
                    <td>Independent recruiter data validation and enterprise ATS partnerships</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="port-callout-box" style="margin-top:16px;">
              <strong>A/B Experimentation Design:</strong><br />
              - <strong>Control:</strong> Existing Naukri confirmation & tracking experience.<br />
              - <strong>Treatment:</strong> Four P0 capabilities (Track CTA, Enhanced Timeline, Last Update, Inactivity Callout).<br />
              - <strong>Primary Metric:</strong> Application Clarity Rate (ACR).<br />
              - <strong>Guardrails:</strong> Submission success rate, page load latency, error rate, recruiter effort, paid conversion.<br />
              - <strong>Decision Rule:</strong> Ship if ACR shows statistically significant improvement with neutral/positive guardrails. Rollback if privacy, data integrity, or commercial conversion degrades.
            </div>
          </section>

          <!-- 15 / Future Roadmap & Final Recommendation -->
          <section id="cs-15" class="cs-section">
            <h2 class="cs-title"><span class="cs-num">15</span> Future Roadmap & Recommendation</h2>
            <div class="port-table-wrap">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>Horizon</th>
                    <th>Scope</th>
                    <th>Strategic Milestone Gate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>NOW (P0)</strong></td>
                    <td>F01–F04: Core Application Transparency</td>
                    <td>Usability validation and data source verification</td>
                  </tr>
                  <tr>
                    <td><strong>NEXT (P1)</strong></td>
                    <td>F05–F11: Organisation, Communication, Context</td>
                    <td>Core outcome validation and notification feasibility</td>
                  </tr>
                  <tr>
                    <td><strong>LATER (P2)</strong></td>
                    <td>F12–F14: Hiring Availability, Reasons, Automation</td>
                    <td>Reliable recruiter requisition feeds and permissions</td>
                  </tr>
                  <tr>
                    <td><strong>EXPLORE</strong></td>
                    <td>Personalised Interview Journeys, Recruiter Response Insights</td>
                    <td>New discovery, user interviews, and RICE prioritisation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="port-thesis-box" style="margin-top:20px;">
              <strong>Final Product Management Recommendation:</strong>
              <p style="font-size:14px;color:#f8fafc;margin:6px 0 0;line-height:1.6;">
                <em>“Invest first in improving the discoverability and interpretation of existing application data. Validate candidate comprehension before building complex automation. Communicate uncertainty honestly where information is unavailable, and never misrepresent an unconfirmed outcome.”</em>
              </p>
            </div>
          </section>
        </article>
      </div>
    `;
  }

  /* ---------------- SECTION 5: PRODUCT DOCUMENTATION & QA ---------------- */
  function renderDocumentation(state) {
    return `
      <div class="portfolio-container" style="padding:32px 20px 60px;">
        <div class="testing-card-header" style="margin-bottom:24px;">
          <span class="port-pill port-pill-blue">PRODUCT DOCUMENTATION & SPECIFICATIONS</span>
          <h1 style="font-size:26px;font-weight:800;color:#f8fafc;margin:10px 0 6px;">
            Engineering & QA Documentation
          </h1>
          <p style="font-size:14px;color:#94a3b8;margin:0 0 16px 0;">
            Official project specifications, research synthesis workbooks, acceptance criteria traceability, central business logic invariants, regression test suite (QA01–QA18), and known limitations.
          </p>
        </div>

        <!-- Official Project Specifications & Downloads -->
        <div class="testing-card" style="margin-bottom:24px;border:1px solid #3b82f6;background:linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
          <div class="testing-card-header">
            <span class="desk-pill dpill-blue">Official Deliverables</span>
            <h3 style="font-size:18px;font-weight:700;color:#f8fafc;margin:6px 0;">Primary Specifications & Research Artifacts</h3>
            <p style="font-size:13.5px;color:#cbd5e1;margin:4px 0 16px 0;line-height:1.5;">
              Download or view the master product requirements documentation and underlying quantitative/qualitative user research analysis workbook:
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;">
              <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" target="_blank" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#3b82f6;color:#60a5fa;font-weight:600;padding:8px 14px;border-radius:6px;background:rgba(59,130,246,0.1);">
                📘 View Master PRD V2.0 (PDF)
              </a>
              <a href="./assets/docs/Naukri_Master_PRD_V2.pdf" download="Naukri_Master_PRD_V2.pdf" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#475569;color:#f8fafc;font-weight:500;padding:8px 14px;border-radius:6px;background:rgba(255,255,255,0.05);">
                📥 Download PRD V2.0 (PDF)
              </a>
              <a href="./assets/docs/Naukri_Research_Analysis_Workbook.xlsx" download="Naukri_Research_Analysis_Workbook.xlsx" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#10b981;color:#34d399;font-weight:600;padding:8px 14px;border-radius:6px;background:rgba(16,185,129,0.1);">
                📊 Research Workbook (.xlsx)
              </a>
              <a href="./assets/docs/Naukri_Application_Clarity_PRD.pdf" target="_blank" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#475569;color:#94a3b8;font-size:12.5px;padding:8px 12px;border-radius:6px;">
                📜 Baseline PRD V1.0 (PDF)
              </a>
              <a href="./assets/docs/Naukri_Application_Clarity_PRD.docx" download="Naukri_Application_Clarity_PRD.docx" class="port-btn-ghost" style="display:inline-flex;align-items:center;text-decoration:none;border-color:#475569;color:#94a3b8;font-size:12.5px;padding:8px 12px;border-radius:6px;">
                📄 Baseline PRD V1.0 (Editable Word)
              </a>
            </div>
          </div>
        </div>

        <!-- Acceptance Criteria Traceability (FR01–FR14) -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-blue">Feature Traceability</span>
            <h3 style="font-size:18px;font-weight:700;color:#f8fafc;margin:6px 0;">Acceptance Criteria Matrix (FR01–FR14)</h3>
          </div>

          <div class="port-table-wrap">
            <table class="port-table">
              <thead>
                <tr>
                  <th>Req ID</th>
                  <th>Feature</th>
                  <th>User Story & Proposed Acceptance Criteria</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>FR01</strong></td>
                  <td>Track Application CTA</td>
                  <td>After confirmed submission, display primary Track Application CTA leading to specific application; on failure show retry; never claim success prematurely.</td>
                </tr>
                <tr>
                  <td><strong>FR02</strong></td>
                  <td>Enhanced Timeline</td>
                  <td>Show chronological confirmed events with plain-language explanations; omit unsupported intermediate stages; preserve full history.</td>
                </tr>
                <tr>
                  <td><strong>FR03</strong></td>
                  <td>Last Confirmed Update</td>
                  <td>Display timestamp of latest valid candidate-specific event; fall back to submission date; do not reset on candidate views or logins.</td>
                </tr>
                <tr>
                  <td><strong>FR04</strong></td>
                  <td>Inactivity Indicator</td>
                  <td>For unresolved applications exceeding threshold, display elapsed days and explicit non-rejection guidance; suppress if Not Shortlisted.</td>
                </tr>
                <tr>
                  <td><strong>FR05</strong></td>
                  <td>Homepage Summary</td>
                  <td>Accurate counts (Total, Recent, Awaiting, Needs Attention); direct one-tap navigation; loading, empty, and error states.</td>
                </tr>
                <tr>
                  <td><strong>FR06</strong></td>
                  <td>Application Filters</td>
                  <td>Fast filtering by state (Awaiting Action, Viewed, Shortlisted, Not Shortlisted, Closed, Archived); distinguish external applications.</td>
                </tr>
                <tr>
                  <td><strong>FR07</strong></td>
                  <td>Application Notifications</td>
                  <td>Confirmed updates generate relevant alerts; deep-link to correct application; unread badges; event-level deduplication.</td>
                </tr>
                <tr>
                  <td><strong>FR08</strong></td>
                  <td>Notification Preferences</td>
                  <td>Persist communication controls across sessions; allow separating application alerts from marketing; preserve delivery history.</td>
                </tr>
                <tr>
                  <td><strong>FR09</strong></td>
                  <td>Archive and Restore</td>
                  <td>Hides application from default view; restore reverses state; does not withdraw application; background updates continue.</td>
                </tr>
                <tr>
                  <td><strong>FR10</strong></td>
                  <td>Contextual Not Shortlisted</td>
                  <td>Display confirmed Not Shortlisted state; do not infer reasons from match scores; clearing decision resets current fields cleanly.</td>
                </tr>
                <tr>
                  <td><strong>FR11</strong></td>
                  <td>Contextual Promotions</td>
                  <td>Present essential application status first; preserve relevant commercial services (Naukri Pro) below core information.</td>
                </tr>
                <tr>
                  <td><strong>FR12</strong></td>
                  <td>Hiring Availability</td>
                  <td>Show Active / On Hold / Closed only from reliable requisition events; never overwrite individual candidate status.</td>
                </tr>
                <tr>
                  <td><strong>FR13</strong></td>
                  <td>Structured Rejection Reasons</td>
                  <td>Display only approved, recruiter-selected reasons; protect internal recruiter notes and candidate privacy.</td>
                </tr>
                <tr>
                  <td><strong>FR14</strong></td>
                  <td>Recruiter Automation</td>
                  <td>Reuse validated review events; no additional mandatory P0 steps; respect permissions and candidate notification preferences.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

                <!-- QA Individual Traceability Report (QA01–QA18) -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-green">Individual QA Traceability</span>
            <h3 style="font-size:18px;font-weight:700;color:#f8fafc;margin:6px 0;">Individual QA Traceability Report (QA01–QA18)</h3>
            <p style="font-size:13px;color:#94a3b8;margin:4px 0 12px;">
              Rigorous scenario-level test execution matrix. Every invariant distinguishes between prototype client simulation and requirements that strictly require production backend infrastructure.
            </p>
          </div>

          <div class="port-table-wrap">
            <table class="port-table">
              <thead>
                <tr>
                  <th style="width:100px;">QA Scenario ID</th>
                  <th style="width:140px;">Test Environment</th>
                  <th style="width:220px;">Preconditions &amp; Steps</th>
                  <th style="width:240px;">Expected vs. Actual Result</th>
                  <th style="width:130px;">Execution Status</th>
                  <th style="width:150px;">Supporting Evidence</th>
                  <th style="width:160px;">Known Limitations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA01</strong><br><small style="color:#94a3b8;">Submission Navigation</small></td>
                  <td><small style="color:#cbd5e1;">Client Browser (Chrome / Headless Playwright) against GitHub Pages &amp; Local Server</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate is on a job posting with active hiring status (e.g., <code>job-101</code> ZenithPay India). Application has not yet been submitted.<br><br><strong>Steps:</strong> 1. Click <code>Apply</code> button on job details view. 2. Verify navigation to <code>Applied Successfully</code> (Screen 03). 3. Click <code>Track Application</code> primary CTA.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Directly navigates to the detailed application tracker for <code>job-101</code> (<code>app-01</code> equivalent) showing status <code>Application Sent</code> and submission timestamp.<br><br><strong>Actual:</strong> Navigates directly to the specific application detail view without intermediate drop-off.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Automated browser step assertion: <code>#comp-apply-cta</code> routes cleanly; URL query params reflect <code>screen=details</code>.</small></td>
                  <td><small style="color:#fca5a5;">In a production multi-tenant backend, routing depends on asynchronous distributed queue ingestion and authorized JWT token exchange.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA02</strong><br><small style="color:#94a3b8;">Failed Submission / Recovery</small></td>
                  <td><small style="color:#cbd5e1;">Client Prototype Engine (<code>app.js</code>)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Job is marked <code>Closed</code> or simulated network failure is triggered.<br><br><strong>Steps:</strong> 1. Attempt to apply to <code>job-103</code> (Closed position) or trigger submission failure. 2. Inspect system feedback and error messaging.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> System prevents submission; displays toast/callout explaining the position is no longer accepting applications; never shows false <code>&quot;Applied Successfully&quot;</code> state.<br><br><strong>Actual:</strong> <code>applyToJob()</code> validates job availability, displays toast <code>&quot;This position is closed and no longer accepting applications&quot;</code>, and halts submission.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;"><code>app.js</code> line 80–84 guard check.</small></td>
                  <td><small style="color:#fca5a5;">Production requires offline sync, idempotency keys, and retry queues for intermittent mobile packet loss.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA03</strong><br><small style="color:#94a3b8;">Inactivity Does Not Imply Rejection</small></td>
                  <td><small style="color:#cbd5e1;">Client Browser UI &amp; Component Inspection</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate views an application where <code>inactivityDays &gt;= 14</code> (e.g., <code>app-03</code> at 14 days or <code>app-04</code> at 37 days).<br><br><strong>Steps:</strong> 1. Open <code>app-03</code> (HealthTech Analytics) or <code>app-04</code> (BizCorp Analytics). 2. Inspect the inactivity banner, timeline, and status explanation.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Banner states <code>No confirmed update for 14/37 days</code>; timeline remains at <code>Awaiting Recruiter Action</code>; candidate is explicitly advised to continue exploring other roles without claiming the application was rejected.<br><br><strong>Actual:</strong> Neutral callout rendered; status remains <code>Awaiting Action</code>; next-step CTA points to <code>Explore Similar Active Jobs</code>.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Screenshot evidence in <code>06_screenshots_before_after/after-inactive-mobile.jpg</code> and <code>screens-mobile.js</code> inactivity rendering block.</small></td>
                  <td><small style="color:#fca5a5;">Long-term candidate psychological reassurance requires validation through real-world longitudinal cohort testing.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA04</strong><br><small style="color:#94a3b8;">Missing Timestamp Suppresses Duration Calculation</small></td>
                  <td><small style="color:#cbd5e1;">Client State Store (<code>app.js</code>, <code>data.js</code>)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Application record has <code>lastUpdatedDate = null</code> or corrupt timestamp.<br><br><strong>Steps:</strong> 1. Load an unconfirmed consultancy listing or application with no verified event date. 2. Check status card and inactivity duration.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Duration calculation (<code>X days ago</code>) is suppressed; status displays <code>&quot;Hiring status not confirmed&quot;</code> or <code>&quot;Submission date unavailable&quot;</code> rather than calculating bogus durations or defaulting to 1970.<br><br><strong>Actual:</strong> Inactivity counter is hidden when timestamps are unverified; fallback label displays cleanly.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;"><code>app.js</code> and <code>screens-mobile.js</code> ternary checks for <code>lastUpdatedDate</code>.</small></td>
                  <td><small style="color:#fca5a5;">In production, legacy database records may require data cleaning and migration scripts for null timestamps.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA05</strong><br><small style="color:#94a3b8;">New Confirmed Event Updates Recency</small></td>
                  <td><small style="color:#cbd5e1;">Client State Sync Engine (<code>app.js</code>)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate application is at <code>lastUpdatedDate = &quot;10 Nov 2026&quot;</code>.<br><br><strong>Steps:</strong> 1. Recruiter updates candidate status to <code>Shortlisted</code> or <code>Application Viewed</code>. 2. Inspect <code>lastUpdatedDate</code> in candidate view.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Timestamp immediately updates to current confirmed date (<code>27 Nov 2026 (Just now)</code>), resetting <code>inactivityDays</code> to <code>0</code>.<br><br><strong>Actual:</strong> <code>syncRecruiterCandidateStatus()</code> updates <code>app.lastUpdatedDate</code> to current date and sets <code>app.inactivityDays = 0</code>.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Test assertion verified in automated regression run.</small></td>
                  <td><small style="color:#fca5a5;">Production requires WebSocket or push notification sync to update background candidate sessions in real time.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA06</strong><br><small style="color:#94a3b8;">Unrelated Recruiter Login Does Not Reset Recency</small></td>
                  <td><small style="color:#cbd5e1;">Client State Store (<code>app.js</code>)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Job has candidate <code>app-03</code> waiting 14 days. Recruiter logs into portal to review other jobs.<br><br><strong>Steps:</strong> 1. Trigger recruiter dashboard load or login event. 2. Inspect candidate <code>app-03</code> timestamp and inactivity days.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Recruiter's general platform presence does NOT reset candidate's specific application clock. <code>lastUpdatedDate</code> remains unchanged unless candidate's specific profile is acted upon.<br><br><strong>Actual:</strong> Only candidate-specific status mutations trigger <code>app.lastUpdatedDate</code> updates. General portal navigation does not alter candidate records.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Code inspection of <code>syncRecruiterCandidateStatus()</code> vs. <code>syncRecruiterJobStatus()</code>.</small></td>
                  <td><small style="color:#fca5a5;">Production event streams must filter out noisy telemetry (e.g., recruiter page views on candidate lists) from candidate-facing milestones.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA07</strong><br><small style="color:#94a3b8;">Duplicate Events Produce No Duplicate History or Notifications</small></td>
                  <td><small style="color:#cbd5e1;">Recruiter Panel &amp; Notification Store</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate <code>cand-04</code> (<code>app-01</code>) is already marked <code>Shortlisted</code>.<br><br><strong>Steps:</strong> 1. Recruiter clicks <code>✓ Shortlist</code> on <code>cand-04</code> again. 2. Check notification count and candidate timeline.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Toast notifies recruiter <code>&quot;Status is already Shortlisted — no duplicate notification sent&quot;</code>; notification list length is unchanged; timeline contains exactly one <code>Shortlisted</code> milestone.<br><br><strong>Actual:</strong> Action is suppressed; zero duplicate notifications added to <code>state.notifications</code>.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Automated test run <code>Test 1: Notification deduplication &amp; legitimate recurring transitions</code> PASSED.</small></td>
                  <td><small style="color:#fca5a5;">Distributed architectures require database-level unique constraints and Redis deduplication locks.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA08</strong><br><small style="color:#94a3b8;">Out-of-Order Event Does Not Overwrite Newer Confirmed State</small></td>
                  <td><small style="color:#cbd5e1;">Prototype State Store (<code>appendConfirmedTimelineEvent</code>)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Application timeline has confirmed <code>Shortlisted</code> event on 25 Nov 2026.<br><br><strong>Steps:</strong> 1. Simulate delayed arrival of older event (e.g., <code>Application Viewed</code> dated 21 Nov 2026). 2. Inspect active status and timeline order.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Active status remains <code>Shortlisted</code>; historical event is inserted chronologically without downgrading current state.<br><br><strong>Actual:</strong> <code>appendConfirmedTimelineEvent()</code> filters non-confirmed states and prevents downgrading valid terminal states.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Code verification in <code>app.js</code> lines 195–206.</small></td>
                  <td><small style="color:#fca5a5;">Distributed event sourcing (e.g. Apache Kafka) requires monotonic event sequence numbers and vector clocks.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA09</strong><br><small style="color:#94a3b8;">Disabled Notification Category Respected</small></td>
                  <td><small style="color:#cbd5e1;">Client UI &amp; Notification Delivery Engine</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate opens Notification Preferences and toggles <code>Application status updates</code> to OFF.<br><br><strong>Steps:</strong> 1. Uncheck <code>Application status updates</code> and save preferences. 2. Recruiter marks candidate as <code>Not Shortlisted</code> or <code>Shortlisted</code>. 3. Inspect Notification center unread badge and list.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Status on application tracker updates visually, but simulated notification is suppressed.<br><br><strong>Actual:</strong> <code>pushNotification()</code> checks <code>state.notificationPrefs.applicationUpdates</code>, returns <code>false</code>, and does not unshift notification.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Verified in automated preferences suite.</small></td>
                  <td><small style="color:#fca5a5;">In production, user preferences must be enforced at the push gateway (FCM / APNs) to prevent device battery drain.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA10</strong><br><small style="color:#94a3b8;">Archived Application Continues Receiving Confirmed Updates</small></td>
                  <td><small style="color:#cbd5e1;">Client State Store &amp; My Applications View</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate archives <code>app-01</code> (<code>archived = true</code>).<br><br><strong>Steps:</strong> 1. Archive <code>app-01</code>. Verify it disappears from active <code>Applies on Naukri</code> tab. 2. Recruiter marks <code>app-01</code> candidate as <code>Shortlisted</code>. 3. Inspect <code>Archived</code> filter and notification tray.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Candidate receives notification; <code>app-01</code> in Archived list updates to <code>Shortlisted</code>; restoring brings it back to active list with updated state intact.<br><br><strong>Actual:</strong> State updates apply to application object regardless of <code>archived</code> boolean flag.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Interactive test in Screen 04 My Applications.</small></td>
                  <td><small style="color:#fca5a5;">None on client; production needs index optimization for queries filtering <code>archived = false</code>.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA11</strong><br><small style="color:#94a3b8;">Reconsideration Clears Stale Current Decision Fields</small></td>
                  <td><small style="color:#cbd5e1;">Client Recruiter Sync Engine</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate was previously marked <code>Not Shortlisted</code> with reason <code>&quot;Location mismatch&quot;</code>.<br><br><strong>Steps:</strong> 1. Recruiter re-evaluates and moves candidate to <code>Viewed</code> or <code>Maybe</code>. 2. Inspect candidate decision fields in <code>app.js</code>.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> <code>individualDecisionAvailable</code> resets to <code>false</code>; <code>recruiterDecisionReason</code> and <code>recruiterDecisionDate</code> reset to <code>null</code>; historical confirmed milestones (<code>Applied</code>, <code>Application Sent</code>) remain untouched.<br><br><strong>Actual:</strong> Decision fields cleanly cleared; timeline transitions to <code>Awaiting Recruiter Action (Under review)</code>.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Automated Node/Python test script PASSED.</small></td>
                  <td><small style="color:#fca5a5;">Production enterprise ATS audits must retain an internal audit trail of status changes even if candidate view is cleared.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA12</strong><br><small style="color:#94a3b8;">Role Closure Preserves Shortlist Outcome</small></td>
                  <td><small style="color:#cbd5e1;">Client Multi-Job Sync</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate <code>cand-04</code> is <code>Shortlisted</code> for <code>rec-job-02</code>.<br><br><strong>Steps:</strong> 1. Recruiter changes job hiring status dropdown from <code>Active</code> to <code>Closed</code>. 2. Inspect candidate's application details screen.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Job availability displays <code>Closed</code>; candidate status REMAINS <code>Shortlisted</code> (never overwritten to Closed or Rejected).<br><br><strong>Actual:</strong> Candidate view renders dual badges: <code>Shortlisted</code> (candidate outcome) + <code>Closed</code> (job availability).</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Live screenshot <code>status_07_role_closed.png</code> and <code>app.js</code> line 310–350.</small></td>
                  <td><small style="color:#fca5a5;">In real-world recruiting, candidate must be informed if a closed requisition cancels an interview cycle.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA13</strong><br><small style="color:#94a3b8;">Pause → Resume → Pause Cycle Yields Distinct Eligible Events</small></td>
                  <td><small style="color:#cbd5e1;">Prototype Notification Store</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate is subscribed to hiring status alerts (<code>notifyOnResume = true</code>).<br><br><strong>Steps:</strong> 1. Recruiter sets Job Availability to <code>On Hold</code> (Alert 1 sent). 2. Recruiter sets Job Availability to <code>Active</code> (Alert 2 sent). 3. Recruiter sets Job Availability to <code>On Hold</code> again (Alert 3).</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Because a legitimate state cycle occurred (<code>On Hold</code> → <code>Active</code> → <code>On Hold</code>), Alert 3 is emitted rather than blocked by the deduplicator.<br><br><strong>Actual:</strong> System compares against latest recorded event for that app; since intermediate event was <code>Hiring resumed</code>, new <code>Hiring paused</code> alert delivers cleanly.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Test 1 script output: <code>Assert len(notifications) == 3 PASSED</code>.</small></td>
                  <td><small style="color:#fca5a5;">Flapping detection (e.g. recruiter toggling status 5 times in 1 minute) should be throttled in production.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA14</strong><br><small style="color:#94a3b8;">Second Pause Eligible Even When Resume Notification Was Disabled</small></td>
                  <td><small style="color:#cbd5e1;">Client Prototype Engine</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate did NOT opt into resume alerts (<code>notifyOnResume = false</code>).<br><br><strong>Steps:</strong> 1. Job moves <code>Active</code> → <code>On Hold</code> (Notification sent). 2. Job moves <code>On Hold</code> → <code>Active</code> (Notification suppressed because candidate opted out). 3. Job moves <code>Active</code> → <code>On Hold</code> again.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> The second <code>On Hold</code> transition emits a notification because the role was genuinely reactivated in the interim.<br><br><strong>Actual:</strong> Correctly evaluated based on state transition history.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Automated edge-case script logic.</small></td>
                  <td><small style="color:#fca5a5;">Requires backend state transition machine (FSM) in production.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA15</strong><br><small style="color:#94a3b8;">Unauthorised Application Access Denied</small></td>
                  <td><small style="color:#cbd5e1;">Production Authorization Architecture (Conceptual)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> User B attempts to access Application A belonging to User A via URL tampering (<code>?app=app-01</code>).<br><br><strong>Steps:</strong> 1. Attempt direct GET request to unauthorized application ID.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Server verifies JWT/session ownership; rejects with HTTP 403 Forbidden; never exposes candidate PII or recruiter internal notes.<br><br><strong>Actual:</strong> Client-side prototype uses static simulated mock state (<code>state.applications</code>). In-memory isolation prevents cross-browser leaks, but backend OAuth/JWT enforcement is not implemented in static prototype.</small></td>
                  <td><span class="status-badge-validation" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid #ef4444;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Requires Production Validation</span></td>
                  <td><small style="color:#94a3b8;">PRD Section 12 &amp; 13 (Risk R12). Documented as non-goal for client prototype.</small></td>
                  <td><small style="color:#fca5a5;">Full verification requires live production API gateway with RBAC / OAuth2 tokens.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA16</strong><br><small style="color:#94a3b8;">Profile Mismatch Not Presented as Confirmed Reason</small></td>
                  <td><small style="color:#cbd5e1;">Application Details View (Screen 05 / 07)</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate has an algorithmic profile match score of 71% (e.g., <code>app-06</code> missing 1 key skill).<br><br><strong>Steps:</strong> 1. Inspect <code>app-06</code> (Not Shortlisted). 2. Verify distinction between <code>Profile Match Insights</code> and <code>Recruiter Decision</code>.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Algorithmic match score is displayed under <code>Profile Match Insights</code> with an explicit disclaimer; it is NEVER presented as the recruiter's official rejection reason unless the recruiter explicitly selected it.<br><br><strong>Actual:</strong> Clear visual divider; candidate is informed: *&quot;The recruiter has not shared a specific reason for this decision.&quot;*</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Component inspection in <code>screens-mobile.js</code> lines 610–660.</small></td>
                  <td><small style="color:#fca5a5;">Candidates may still intuitively associate low match scores with rejection; UX copy must remain vigilant.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA17</strong><br><small style="color:#94a3b8;">External ATS Tracking Limitations Displayed</small></td>
                  <td><small style="color:#cbd5e1;">Screen 04 My Applications &amp; Screen 05 Details</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate inspects an application marked <code>isExternal: true</code> (<code>app-09</code> FinCorp Global).<br><br><strong>Steps:</strong> 1. Open <code>app-09</code> external application. 2. Inspect tracking status card and information banner.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> Card displays <code>External Application</code> badge and informs candidate that detailed stage tracking depends on the third-party company portal.<br><br><strong>Actual:</strong> Explanatory banner displayed; external application limitations disclosed transparently.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Data record <code>app-09</code> in <code>data.js</code> and rendering in <code>screens-mobile.js</code>.</small></td>
                  <td><small style="color:#fca5a5;">Deep webhook integration with Workday/Taleo/Greenhouse is required for automated two-way synchronization.</small></td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;"><strong>QA18</strong><br><small style="color:#94a3b8;">Essential Transparency Remains 100% Free</small></td>
                  <td><small style="color:#cbd5e1;">Client Prototype UI &amp; Commercial Placement Review</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Pre:</strong> Candidate reviews application status, timeline, inactivity indicators, and rejection notes across all 10 screens.<br><br><strong>Steps:</strong> 1. Navigate through all candidate screens without purchasing Naukri Pro or FastForward. 2. Inspect whether any essential tracking feature is blocked behind a paywall.</small></td>
                  <td><small style="color:#cbd5e1;"><strong>Expected:</strong> All essential tracking information is 100% accessible for free. Contextual promotions (Naukri Pro / Resume Score) appear as non-blocking supportive cards below core status.<br><br><strong>Actual:</strong> Zero paywalls on tracking data; promotional upsells are placed contextually below functional status timelines.</small></td>
                  <td><span class="status-badge-passed" style="background:rgba(34,197,94,0.15);color:#86efac;border:1px solid #22c55e;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;display:inline-block;">Passed (Prototype Simulation)</span></td>
                  <td><small style="color:#94a3b8;">Visual audit across Screens 01–10.</small></td>
                  <td><small style="color:#fca5a5;">Business commercial non-inferiority must be monitored in production A/B experiments.</small></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Technical & Financial Planning (Appendix D) -->
        <div class="testing-card">
          <div class="testing-card-header">
            <span class="desk-pill dpill-purple">Appendix D Architecture</span>
            <h3 style="font-size:18px;font-weight:700;color:#f8fafc;margin:6px 0;">Logical Entities & Financial Modeling</h3>
          </div>

          <div class="port-grid-2col">
            <div>
              <h4 style="color:#38bdf8;font-size:13px;text-transform:uppercase;">Core Data Entities</h4>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.6;">
                - <strong>Application:</strong> <code>(application_id, candidate_id, job_id, source, applied_at, current_status, last_application_update_at, archived_at)</code><br />
                - <strong>Event:</strong> <code>(event_id, application_id, type, occurred_at, received_at, source, version, candidate_visible)</code><br />
                - <strong>Hiring Availability:</strong> <code>(job_id, state, updated_at, source_event_id)</code><br />
                - <strong>Notification:</strong> <code>(recipient, application, source_event, category, delivery_state)</code>
              </p>
            </div>
            <div>
              <h4 style="color:#a855f7;font-size:13px;text-transform:uppercase;">Financial & Support Modeling Framework</h4>
              <p style="font-size:13px;color:#cbd5e1;line-height:1.6;">
                - <strong>Support Savings:</strong> <code>Annual relevant contacts × relative reduction × avoidable cost/contact</code><br />
                - <strong>Incremental Contribution:</strong> <code>Eligible candidates × incremental conversion × contribution/conversion</code><br />
                - <strong>Net ROI:</strong> <code>(Quantified benefits − Total engineering costs) / Total costs × 100</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------- PRD EXPORT (MARKDOWN) ---------------- */
  function downloadPRD() {
    const md = `# NAUKRI APPLICATION CLARITY — PRODUCT REQUIREMENTS DOCUMENT
Version 1.0 | 27 November 2026
Independent Product Management Portfolio Case Study
Status: Consolidated Proposal — Validation Pending

## Product Thesis
Improve the interpretation of existing application information rather than redesigning the recruitment marketplace. Show confirmed progress, explain uncertainty and support informed next steps.

---

## 01 / Executive Summary
Naukri already provides application tracking. The opportunity is to make existing status information easier to discover and interpret when no meaningful update is available. The proposed MVP adds a direct tracking CTA, clearer timeline, last confirmed update and contextual inactivity indicator.
The initiative-level North Star is Application Clarity Rate (ACR), measured through comprehension assessments rather than page views. Candidate trust, retention and support efficiency are potential outcomes, not demonstrated impact.

## 02 / Product Context & Opportunity
Candidates use Naukri to discover jobs, apply and monitor progress. Existing tracking, recruiter activity and paid-service placements provide a foundation for targeted improvements. Preserve navigation, visual language and commercial functionality; make essential information free.

## 03 / Problem & Root Cause Hypothesis
Although Naukri provides application tracking, candidates can remain at Application Viewed or Awaiting Recruiter Action for extended periods without meaningful updates or closure. This can create a gap between recruiter activity and candidate understanding.
How might we improve post-application transparency without increasing mandatory recruiter workload or disrupting existing hiring workflows?
Hypothesis: confirmed workflow events may not be translated into sufficiently meaningful candidate-facing information. Missing recruiter responses, hiring changes and profile mismatch may also contribute. No technical synchronisation failure has been established.

## 04 / Research Methodology & Insights
Exploratory survey, selected negative app-store reviews, desktop/mobile product audit and recruiter training review.
- 6 eligible candidates (recent Naukri applicants) surveyed out of 7 populated rows (1 ineligible).
- 3/6 reported no response within 14 days.
- 3/6 could not see application progress.
- 2/6 reported applications viewed with no reply.
- Mean genuineness confidence: 2.67 / 5.0 (perceived job/recruiter authenticity).
- 7 recruiter responses reported (6 in-house HR, 1 hiring manager); profile mismatch cited by 5/7; role on hold/filled cited by 3/7.

## 05 / Target Users & Jobs to Be Done
- Early-career candidate (4/6): Help me understand progress and whether I should continue searching.
- Experienced candidate (2/6): Help me manage opportunities and make informed decisions without repeated checking.
- In-house recruiter (6/7 reported): Communicate confirmed changes without duplicating routine work.
- Hiring manager/founder (1/7 reported): Keep candidate expectations aligned with changing hiring needs.

## 06 / Goals, Non-Goals & Principles
- Goals: Tracking discoverability, status comprehension, update recency, next-step confidence.
- Non-Goals: Complete redesign, ATS replacement, guaranteed responses/jobs, automatic rejections, unverified reasons.
- Principles: Confirmed information only; uncertainty made explicit; independent application & role states; preserve history; free essential transparency.

## 07 / Current vs Proposed Journey
1. Apply: Confirmation prioritises ads -> Direct Track Application CTA.
2. Track: Stagnant timeline -> Chronological events with plain-language explanations and last confirmed update.
3. Wait: Extended silence (11-12w) -> Neutral inactivity indicator (7d/14d/30d+).
4. Outcome: Matching scores confused with rejection -> Confirmed outcome; reasons only if explicitly provided.
5. Manage: Mixed alerts -> P1 status filters, archive/restore, and outcome-categorised notifications.
6. Hiring Changes: Invisible -> P2 independent hiring availability with resume alert opt-in.

## 08 / MVP Scope & Prioritisation
- P0 (MVP): F01 Track CTA, F02 Enhanced timeline, F03 Last confirmed update, F04 Inactivity indicator.
- P1: F05 Homepage summary, F06 Application filters, F07 Application notifications, F08 Notification preferences, F09 Archive & restore, F10 Contextual Not Shortlisted, F11 Contextual promotions.
- P2: F12 Hiring availability, F13 Structured rejection reasons, F14 Recruiter automation.

## 09 / Requirements & Central Business Rules
- Candidate status: Confirmed candidate-specific state only.
- Hiring availability: Independent role state; does not overwrite candidate decisions.
- Last update: Latest reliable candidate-specific milestone; candidate logins/views do not reset it.
- Inactivity: 0-6d standard; 7-13d no update; 14-29d no recent update; 30d+ extended inactivity.
- History: Preserve confirmed events; older events must not overwrite newer states.
- Notification: Event-level deduplication; distinct recurring transitions notify.

## 10 / Success Metrics & KPIs
- North Star: Application Clarity Rate (ACR) >= 80% initial usability target.
- Independent Task Completion: >= 80%.
- Status/Inactivity Comprehension: >= 80%.
- Clarity/Next-step Confidence: >= 4/5.
- Guardrails: Zero false rejection from inactivity; zero new mandatory P0 recruiter workload; zero data leaks.

## 11 / Business Impact Hypotheses
Clearer tracking strengthens trust (ACR), reduces repetitive support enquiries, improves communication efficiency, and preserves commercial value from contextual services.

## 12 / Technical Dependencies
Stable application IDs, chronological event ordering, status mapping layer, notification deduplication, and accessibility.

## 13 / Risks & Assumptions
R01 Inactivity interpreted as rejection (Critical) -> Explicit non-rejection wording.
R06 Duplicate notifications (High) -> Event-level deduplication.
R07 Role event overwrites candidate decision (High) -> Independent state fields.

## 14 / Rollout & Experimentation
Stage 0 Discovery -> Stage 1 Internal QA -> Stage 2 Pilot (1-5%) -> Stage 3 A/B Experiment (50:50 ACR) -> Stage 4 Progressive Rollout (10%->100%).

## 15 / Future Roadmap & Final Recommendation
Invest first in improving the discoverability and interpretation of existing application data. Validate candidate comprehension before building complex automation. Communicate uncertainty honestly where information is unavailable, and never misrepresent an unconfirmed outcome.
`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Naukri_Application_Clarity_PRD_v1.0.md";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }

  return {
    renderOverview,
    renderCaseStudy,
    renderDocumentation,
    downloadPRD,
    esc
  };
})();
