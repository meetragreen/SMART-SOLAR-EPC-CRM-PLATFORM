import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProject.css";

export default function AddProject() {
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState({
    clientRef: "",
    clientName: "",
    siteLocation: "",
    systemSize: "",
    categoryType: "Industrial",
    details: "",
    imgThumb: "",
    imgLarge: "",
    date: "",
  });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/projects`,
      {
        clientRef: projectData.clientRef,
        clientName: projectData.clientName,
        siteLocation: projectData.siteLocation,
        systemSize: projectData.systemSize,
        category: projectData.categoryType, 
        details: projectData.details,
        imgThumb: projectData.imgThumb, // Direct Link 1
        imgLarge: projectData.imgLarge, // Direct Link 2
        date: projectData.date
      });

      alert("✅ Project added successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add project");
    }
  };

  return (
    <section className="add-project-section">
      <h2>Add New Project</h2>
      <form className="add-project-form" onSubmit={handleSubmit}>
        
        <label>Reference ID</label>
        <input name="clientRef" placeholder="SOL-001" value={projectData.clientRef} onChange={handleChange} required />

        <label>Client Name</label>
        <input name="clientName" placeholder="Client Name" value={projectData.clientName} onChange={handleChange} required />

        <label>Category</label>
        <select name="categoryType" value={projectData.categoryType} onChange={handleChange}>
          <option value="Industrial">Industrial</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        <label>Location</label>
        <input name="siteLocation" placeholder="City" value={projectData.siteLocation} onChange={handleChange} required />

        <label>System Size</label>
        <input name="systemSize" placeholder="e.g. 10kW" value={projectData.systemSize} onChange={handleChange} required />

        <label>Description (Details)</label>
        <textarea name="details" placeholder="Enter project details..." value={projectData.details} onChange={handleChange} required />

        {/* ✅ DIRECT CLOUD LINK INPUTS */}
        <label>Thumbnail Image Link (Direct URL)</label>
        <input name="imgThumb" placeholder="https://res.cloudinary.com/..." value={projectData.imgThumb} onChange={handleChange} required />

        <label>Large Image Link (Direct URL)</label>
        <input name="imgLarge" placeholder="https://res.cloudinary.com/..." value={projectData.imgLarge} onChange={handleChange} />

        <button type="submit" className="save-project-btn">Save Project</button>
      </form>
    </section>
  );
}