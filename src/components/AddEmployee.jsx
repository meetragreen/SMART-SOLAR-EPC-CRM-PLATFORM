import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

export default function AddEmployee() {
  const navigate = useNavigate();
  
  // State to manage form inputs including ID and Password
  const [formData, setFormData] = useState({
    employeeId: "", // Will be 2 digits
    name: "",
    email: "",
    password: "", // Added password
    role: "Solar Technician",
  });

  // Auto-generate 2-digit ID when the component mounts
  useEffect(() => {
    // Generates a random number between 10 and 99
    const randomId = Math.floor(10 + Math.random() * 90).toString(); 
    setFormData((prev) => ({ ...prev, employeeId: randomId }));
  }, []);

  // Universal change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Employee ${formData.employeeId} Added Successfully!`);
        navigate("/admin-dashboard"); // Redirect back to admin panel
      } else {
        alert(data.error || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Could not connect to the server. Please ensure your backend is running.");
    }
  };

  return (
    <div className="add-employee-container">
      {/* Header Area */}
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Add New Employee</h2>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">
        {/* Read-only Employee ID */}
        <div className="form-group">
          <label>Generated Employee ID</label>
          <input 
            type="text" 
            name="employeeId" 
            value={formData.employeeId} 
            readOnly 
            className="readonly-input" 
          />
          <small>This ID is auto-generated for the new staff member.</small>
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter full name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>
        
        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            placeholder="name@meetragreen.com" 
            required 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        {/* Default Password */}
        <div className="form-group">
          <label>Default Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Create login password" 
            required 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        {/* Designation Selection */}
        <div className="form-group">
          <label>Designation / Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="Solar Technician">Solar Technician</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Electrician">Electrician</option>
            <option value="Site Supervisor">Site Supervisor</option>
            <option value="Sales Associate">Sales Associate</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Employee to Database
          </button>
        </div>
      </form>
    </div>
  );
}