import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeDashboard.css";
// ✅ IMPORT THE NEW PROJECT WORKFLOW COMPONENT
import ProjectWorkflow from "./ProjectWorkflow"; 

export default function EmployeeDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inquiries, setInquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [projects, setProjects] = useState([]); 
  
  // State to track the open project
  const [selectedProject, setSelectedProject] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (activeTab === "inquiries") {
      axios.get(`${import.meta.env.VITE_API_URL}/api/survey`)
        .then((res) => setInquiries(res.data))
        .catch(() => console.error("Failed to fetch inquiries"));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "applications") {
      axios.get(`${import.meta.env.VITE_API_URL}/api/applications`)
        .then((res) => setApplications(res.data))
        .catch(() => console.error("Failed to fetch applications"));
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "projects") {
      axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
        .then((res) => setProjects(res.data))
        .catch(() => console.error("Failed to fetch projects"));
    }
  }, [activeTab]);

  /* ================= UPDATE STATUS HANDLERS ================= */
  const updateInquiryStatus = (id, newStatus) => {
    axios.patch(
      `${import.meta.env.VITE_API_URL}/api/survey/${id}`, { status: newStatus })
      .then((res) => {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
        );
      })
      .catch((err) => { console.error(err); alert("Failed to update status."); });
  };

  const updateApplicationStatus = (id, newStatus) => {
    axios.patch(
     `${import.meta.env.VITE_API_URL}/api/applications/${id}`, { status: newStatus })
      .then((res) => {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
        );
      })
      .catch((err) => { console.error(err); alert("Failed to update status."); });
  };

  /* ================= PROJECT UPDATE HANDLER ================= */
  // This function is passed to the child component (ProjectWorkflow) 
  // to update the main list when a stage is toggled inside the detail view.
  const handleProjectUpdate = (updatedProject) => {
    setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
    setSelectedProject(updatedProject); // Keep detail view in sync
  };

  /* ================= NAVIGATION HANDLER ================= */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProject(null); // Close project detail when switching tabs
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Meetra Staff</h2>
        <nav>
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => handleTabChange("dashboard")}>Dashboard</li>
            <li className={activeTab === "inquiries" ? "active" : ""} onClick={() => handleTabChange("inquiries")}>Inquiries</li>
            <li className={activeTab === "applications" ? "active" : ""} onClick={() => handleTabChange("applications")}>Job Applications</li>
            <li className={activeTab === "projects" ? "active" : ""} onClick={() => handleTabChange("projects")}>All Projects</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Employee Panel</h1>
          <span>Welcome, <strong>{user?.fullName || "Employee"}</strong></span>
        </div>

        {/* DASHBOARD STATS */}
        {activeTab === "dashboard" && !selectedProject && (
          <div className="stats-grid">
            <div className="stat-card"><h3>Staff ID</h3><p>{user?.employeeId}</p></div>
            <div className="stat-card"><h3>Role</h3><p>{user?.designation}</p></div>
          </div>
        )}

        {/* INQUIRIES LIST */}
        {activeTab === "inquiries" && !selectedProject && (
          <section className="inquiry-section">
            <h2>📩 Customer Inquiries</h2>
            <div className="inquiry-grid">
              {inquiries.length === 0 ? <p>No inquiries found.</p> : inquiries.map((inq) => (
                <div className="inquiry-card" key={inq._id}>
                  <h3>{inq.name}</h3>
                  <p>{inq.phone}</p>
                  <p>{inq.location}</p>
                  <div className="inquiry-actions">
                    {inq.status === "completed" ? (
                      <>
                        <button className="status-btn completed" disabled style={{ backgroundColor: "#28a745", color: "white", cursor: "default" }}>✅ Completed</button>
                        <button className="small-text-btn" onClick={() => updateInquiryStatus(inq._id, "pending")} style={{ marginLeft: "10px", fontSize: "12px", background: "none", color: "#555", border: "1px solid #ccc" }}>Undo</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => updateInquiryStatus(inq._id, "completed")}>Mark Complete</button>
                        <span style={{ marginLeft: "10px", color: "orange", fontWeight: "bold" }}>⏳ Pending</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* APPLICATIONS LIST */}
        {activeTab === "applications" && !selectedProject && (
          <section className="application-section">
            <h2>💼 Job Applications</h2>
            <div className="application-grid">
              {applications.map((app) => (
                <div className="application-card" key={app._id}>
                  <h3>{app.jobTitle}</h3>
                  <p>{app.name}</p>
                  <div className="application-actions">
                    {app.status === "reviewed" ? (
                      <>
                        <button className="status-btn reviewed" disabled style={{ backgroundColor: "#007bff", color: "white", cursor: "default" }}>✅ Reviewed</button>
                        <button className="small-text-btn" onClick={() => updateApplicationStatus(app._id, "pending")} style={{ marginLeft: "10px", fontSize: "12px", background: "none", color: "#555", border: "1px solid #ccc" }}>Undo</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => updateApplicationStatus(app._id, "reviewed")}>Mark Reviewed</button>
                        <span style={{ marginLeft: "10px", color: "orange", fontWeight: "bold" }}>⏳ Pending</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS LIST (Clickable) */}
        {activeTab === "projects" && !selectedProject && (
          <section className="projects-section">
            <h2>📁 All Projects</h2>
            <p>Click on a project to view details and update workflow.</p>
            <div className="inquiry-grid">
              {projects.length === 0 ? (
                <p>No projects found.</p>
              ) : (
                projects.map((proj) => (
                  <div 
                    className="inquiry-card" 
                    key={proj._id} 
                    onClick={() => setSelectedProject(proj)} // ✅ Open Workflow View
                    style={{ cursor: "pointer", border: "1px solid #ddd", transition: "0.2s" }}
                  >
                    <h3>{proj.clientName}</h3>
                    <p><strong>ID:</strong> {proj.clientRef}</p>
                    <p><strong>Location:</strong> {proj.siteLocation}</p>
                    <p><strong>System Size:</strong> {proj.systemSize}</p>
                    {proj.imgThumb && <img src={proj.imgThumb} alt="thumb" style={{ width: "100%", height: "120px", objectFit: "cover", marginTop: "10px", borderRadius: "4px" }} />}
                    <p style={{ color: "#007bff", fontWeight: "bold", marginTop: "10px" }}>Click to Manage →</p>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ✅ USE THE NEW PROJECT WORKFLOW COMPONENT */}
        {selectedProject && (
          <ProjectWorkflow 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
            onUpdate={handleProjectUpdate} 
          />
        )}
      </main>
    </div>
  );
}