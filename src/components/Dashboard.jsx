import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Workflow steps configuration with Icons
  const workflowSteps = [
    { key: "leadSurvey", label: "Lead & Survey", icon: "📋" },
    { key: "systemDesign", label: "System Design", icon: "📐" },
    { key: "approval", label: "Govt. Approvals", icon: "🏛️" },
    { key: "procurement", label: "Material Procurement", icon: "📦" },
    { key: "installation", label: "System Installation", icon: "🛠️" },
    { key: "netMeter", label: "Net Metering", icon: "⚡" },
    { key: "handover", label: "Project Handover", icon: "🤝" },
  ];

  /* ================= FETCH CLIENT PROJECT ================= */
  useEffect(() => {
    if (!user?.systemId) return;

    axios
      .get(`http://localhost:5000/api/projects/client/${user.systemId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load project", err);
        setLoading(false);
      });
  }, [user]);

  // Helper to get initials
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ME';
  };

  return (
    <div className="dashboard-container">
      
      {/* ================= HEADER ================= */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">MG</div>
          <div>
            <h1>Meetra Green Energy</h1>
            <span>Powering a Sustainable Future</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="user-profile">
            <div className="avatar">{getInitials(user?.fullName)}</div>
            <div className="user-info">
              <span className="customer-name">{user?.fullName || "Valued Customer"}</span>
              <span className="customer-id">ID: {user?.systemId}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <span className="icon">↪</span> Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-content">
        
        {/* ================= WELCOME HERO ================= */}
        <section className="welcome-hero">
          <div className="hero-text">
            <h2>Welcome Back, {user?.fullName?.split(" ")[0] || "Friend"}! 👋</h2>
            <p>Here is the real-time status of your solar installation project.</p>
          </div>
          <div className="hero-stats">
             <div className="stat-pill">🌱 <span>12 Tons CO2 Saved (Est.)</span></div>
             <div className="stat-pill">☀️ <span>Green Energy Transition</span></div>
          </div>
        </section>

        {/* ================= PROJECT INFO CARDS ================= */}
        <section className="project-summary">
          {project ? (
            <div className="project-info-cards">
              <div className="info-card location-card">
                <div className="card-icon">📍</div>
                <div>
                  <span className="label">Site Location</span>
                  <strong>{project.siteLocation}</strong>
                </div>
              </div>
              
              <div className="info-card system-card">
                <div className="card-icon">⚡</div>
                <div>
                  <span className="label">System Capacity</span>
                  <strong>{project.systemSize}</strong>
                </div>
              </div>
              
              <div className="info-card ref-card">
                <div className="card-icon">🆔</div>
                <div>
                  <span className="label">Reference ID</span>
                  <strong>{project.clientRef}</strong>
                </div>
              </div>
            </div>
          ) : (
             !loading && (
              <div className="no-project-msg">
                <p>No active project found linked to this account.</p>
              </div>
             )
          )}
        </section>

        {/* ================= MAIN GRID ================= */}
        <section className="dashboard-grid">
          
          {/* ================= LIVE TIMELINE ================= */}
          <section className="project-status">
             <div className="section-header">
                <div>
                  <h3>🚀 Live Project Tracker</h3>
                  <p>Track every step of your installation journey.</p>
                </div>
                <div className="live-indicator">
                  <span className="dot"></span> Live Updates
                </div>
             </div>

             {loading ? (
                <div className="loading-state">Loading timeline...</div>
             ) : project ? (
               <div className="timeline-wrapper">
                  <div className="vertical-line"></div>
                  <ul className="status-timeline">
                    {workflowSteps.map((step, index) => {
                      const status = project.progressFlow?.[step.key] || "pending";
                      
                      return (
                        <li key={step.key} className={`timeline-step ${status}`} style={{animationDelay: `${index * 0.1}s`}}>
                          
                          {/* Status Icon Bubble */}
                          <div className="step-icon-wrapper">
                             <div className="step-icon">
                                {/* ✅ DISPLAY ICON ALWAYS (Even if completed) */}
                                {step.icon}
                             </div>
                          </div>

                          {/* Content */}
                          <div className="step-content">
                             <div className="step-header">
                               <div className="label-group">
                                 <span className="step-label">{step.label}</span>
                                 {/* ✅ CHECKMARK BADGE DISPLAYED HERE */}
                                 {status === "completed" && <span className="check-badge">✔</span>}
                               </div>

                               {status === "completed" && <span className="status-text success">Completed</span>}
                               {status === "in-progress" && <span className="status-text warning">In Progress...</span>}
                               {status === "pending" && <span className="status-text neutral">Upcoming</span>}
                             </div>
                             
                             {/* Progress Bar for In-Progress items */}
                             {status === "in-progress" && (
                               <div className="progress-bar-container">
                                 <div className="progress-bar-fill"></div>
                               </div>
                             )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
               </div>
             ) : (
               <p>No timeline data available.</p>
             )}
          </section>

          {/* ================= SIDEBAR ================= */}
          <aside className="dashboard-aside">
            
            {/* DOCUMENTS LIST */}
            <section className="widget-card documents-widget">
              <div className="widget-header">
                 <h3>📂 All Documents</h3>
                 <span className="badge">Updated</span>
              </div>
              <ul className="doc-list">
                 <li><span>📄 Quotation</span> <a href="#">Download</a></li>
                 <li><span>📝 Agreement Copy</span> <a href="#">Download</a></li>
                 <li><span>📐 System Layout</span> <a href="#">Download</a></li>
                 <li><span>⚡ Net Meter Approval</span> <a href="#">Download</a></li>
                 <li><span>📄 Subsidy Papers</span> <a href="#">Download</a></li>
                 <li><span>✅ Commissioning Cert.</span> <a href="#">Download</a></li>
              </ul>
            </section>

            {/* Support */}
            <section className="widget-card contact-widget">
              <h3>📞 Dedicated Support</h3>
              <p>Your Project Manager:</p>
              <div className="manager-info">
                 <div className="manager-avatar">RK</div>
                 <div>
                   <strong>Rajnikant Hirpara</strong>
                   <span>Project Head</span>
                 </div>
              </div>
              <a href="tel:+918200197199" className="contact-link phone">📞 +91 82001 97199</a>
              <a href="mailto:meetragreen@gmail.com" className="contact-link email">✉️ meetragreen@gmail.com</a>
            </section>

          </aside>
        </section>
      </main>
    </div>
  );
}