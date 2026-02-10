import React from "react";
import axios from "axios";

export default function ProjectDetailView({ project, onBack, onUpdate }) {

  /* ================= UPDATE PROJECT PROGRESS ================= */
  const toggleProjectStage = async (stage, currentValue) => {
    try {
      const newValue = !currentValue; // Toggle true/false
      
      const res = await axios.patch(
       `${import.meta.env.VITE_API_URL}/api/projects/staff/update-progress/${project._id}`, {
        stage,
        value: newValue
      });

      // Notify parent component to update the main list
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update project progress.");
    }
  };

  return (
    <div className="project-detail-view" style={{ padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={{ marginBottom: "20px", background: "#666", color: "white", padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}
      >
        ← Back to List
      </button>

      {/* Header */}
      <h2 style={{ borderBottom: "2px solid #4CAF50", paddingBottom: "10px", color: "#333" }}>
        {project.clientName}
      </h2>
      
      {/* Project Info Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px", marginTop: "20px" }}>
        <div>
          <p><strong>Reference ID:</strong> {project.clientRef}</p>
          <p><strong>Location:</strong> {project.siteLocation}</p>
          <p><strong>System Size:</strong> {project.systemSize}</p>
          <p><strong>Category:</strong> {project.category || "Industrial"}</p>
        </div>
        <div>
          <p><strong>Date Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {project.details || "No details provided."}</p>
          
          {/* Show Thumbnail if available */}
          {project.imgThumb && (
            <div style={{ marginTop: "10px" }}>
              <strong>Preview:</strong><br/>
              <img src={project.imgThumb} alt="Preview" style={{ width: "100px", height: "70px", objectFit: "cover", borderRadius: "4px", marginTop: "5px" }} />
            </div>
          )}
        </div>
      </div>

      {/* Workflow Section */}
      <h3 style={{ color: "#4CAF50" }}>📊 Project Workflow Progress</h3>
      <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginTop: "15px" }}>
        {["siteVisit", "design", "quotation", "installation", "commissioning"].map((stage) => {
           // Safely access nested property
           const isComplete = project.progressFlow ? project.progressFlow[stage] : false;

           return (
            <div 
              key={stage} 
              className={`stage-card ${isComplete ? "done" : ""}`}
              style={{ 
                padding: "15px", 
                borderRadius: "8px", 
                textAlign: "center", 
                border: isComplete ? "2px solid #4CAF50" : "2px solid #eee",
                background: isComplete ? "#e8f5e9" : "#fff",
                transition: "0.3s"
              }}
            >
              <p style={{ textTransform: "capitalize", fontWeight: "bold", marginBottom: "10px" }}>
                {stage.replace(/([A-Z])/g, ' $1')}
              </p>
              
              <button 
                onClick={() => toggleProjectStage(stage, isComplete)}
                style={{
                  padding: "6px 12px",
                  background: isComplete ? "#4CAF50" : "#ddd",
                  color: isComplete ? "white" : "black",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {isComplete ? "✅ Completed" : "Mark Done"}
              </button>
            </div>
           );
        })}
      </div>
    </div>
  );
}