import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("Industrial");
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Industrial", "Residential", "Commercial"];

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/projects`
);
        setAllProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const filteredProjects = allProjects.filter((proj) => {
    // Fallback if category is missing
    const projectCategory = proj.category || "Industrial";
    return projectCategory === activeTab;
  });

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2>Crafting Clean Energy Solutions</h2>
        <p>Explore our work delivering reliable solar energy solutions.</p>
      </div>

      <div className="project-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {loading ? (
          <p>Loading Projects...</p>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <div key={proj._id} className="project-card">
              {/* ✅ IMAGE FETCH: Using Direct Link from DB */}
              <img 
                src={proj.imgThumb || "https://via.placeholder.com/400x300?text=No+Image"} 
                alt={proj.clientName} 
                className="project-thumb" 
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Error+Loading"; }} // Fallback if link is broken
              />
              <div className="project-content">
                <h3 className="project-title">{proj.clientName}</h3>
                <div className="green-line"></div>
                <p className="project-category">{proj.systemSize}</p>
                <button className="learn-more-btn" onClick={() => setSelectedProject(proj)}>
                  Learn More →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No {activeTab} projects found.</p>
        )}
      </div>

      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
            
            {/* ✅ LARGE IMAGE FETCH */}
            <img 
              src={selectedProject.imgLarge || selectedProject.imgThumb} 
              className="project-large" 
              alt={selectedProject.clientName} 
            />
            
            <div className="modal-details">
              <h2>{selectedProject.clientName}</h2>
              <p><strong>Ref ID:</strong> {selectedProject.clientRef}</p>
              <p><strong>Location:</strong> {selectedProject.siteLocation}</p>
              <p><strong>System Size:</strong> {selectedProject.systemSize}</p>
              <p><strong>Date:</strong> {new Date(selectedProject.date || selectedProject.createdAt).toLocaleDateString()}</p>
              
              {/* ✅ DESCRIPTION FETCH */}
              <p className="modal-desc">{selectedProject.details || "No details provided."}</p>
              
              <button className="modal-back-btn" onClick={() => setSelectedProject(null)}>
                ← Back to Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}