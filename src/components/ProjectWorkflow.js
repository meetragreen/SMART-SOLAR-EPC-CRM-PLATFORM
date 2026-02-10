import React from "react";
import axios from "axios";
import "./ProjectWorkflow.css";

export default function ProjectWorkflow({ project, onBack, onUpdate }) {

  // Define the workflow steps
  const workflowSteps = [
    { key: "leadSurvey", label: "Lead & Survey", icon: "📋" },
    { key: "systemDesign", label: "System Design", icon: "📐" },
    { key: "approval", label: "Approval", icon: "✅" },
    { key: "procurement", label: "Procurement", icon: "📦" },
    { key: "installation", label: "Installation", icon: "🛠️" },
    { key: "netMeter", label: "Net Meter", icon: "🔌" },
    { key: "handover", label: "Handover", icon: "🤝" },
  ];

  /* ================= UPDATE PROJECT STATUS ================= */
  const changeStatus = async (stageKey, newStatus) => {
    try {
      // ✅ Send the String value ('pending', 'in-progress', 'completed')
     const res = await axios.patch(
  `${process.env.REACT_APP_API_URL}/api/projects/staff/update-progress/${project._id}`, {
        stage: stageKey,
        value: newStatus 
      });

      // Update Parent Component
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="project-detail-view" style={{ padding: "30px", background: "white", borderRadius: "12px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", maxWidth: "800px", margin: "auto" }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={{ marginBottom: "20px", background: "transparent", color: "#666", padding: "5px 0", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
      >
        ← Back to Projects
      </button>

      {/* Header Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
        <div>
          <h1 style={{ margin: "0 0 10px 0", color: "#222" }}>{project.clientName}</h1>
          <p style={{ margin: 0, color: "#666" }}>📍 {project.siteLocation} | ⚡ {project.systemSize}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ background: "#eee", padding: "5px 10px", borderRadius: "5px", fontSize: "12px", fontWeight: "bold" }}>{project.clientRef}</span>
        </div>
      </div>

      <h3 style={{ marginBottom: "20px", color: "#333" }}>Project Status</h3>
      
      <div className="timeline-container">
        {/* The Vertical Grey Line */}
        <div className="timeline-line"></div>

        {workflowSteps.map((step) => {
          // Get current status (default to 'pending' if missing)
          // Note: Handle legacy boolean data (true -> 'completed', false -> 'pending')
          let currentStatus = project.progressFlow ? project.progressFlow[step.key] : 'pending';
          if (currentStatus === true) currentStatus = 'completed';
          if (currentStatus === false) currentStatus = 'pending';

          return (
            <div key={step.key} className={`timeline-item ${currentStatus}`}>
              
              {/* Icon Bubble */}
              <div className="timeline-icon">
                {currentStatus === 'completed' ? "✔" : step.icon}
              </div>

              {/* Text Content */}
              <div className="timeline-content">
                <span className="timeline-title">{step.label}</span>
                
                {/* ✅ DROPDOWN SELECTOR */}
                <select 
                  className={`status-select ${currentStatus}`} 
                  value={currentStatus}
                  onChange={(e) => changeStatus(step.key, e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent bubbling
                >
                  <option value="pending">⚪ Pending</option>
                  <option value="in-progress">🔨 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}