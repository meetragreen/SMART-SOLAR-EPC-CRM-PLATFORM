import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    companyName: "Meetra Green Energy",
    contactEmail: "admin@meetragreen.com",
    profitMargin: 15,
  });

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/", { replace: true });
  }, [navigate]);

  /* ================= BACK BUTTON LOGOUT ================= */
  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);

  /* ================= INITIAL LOAD ================= */
useEffect(() => {
  const loadData = async () => {
    try {
      const [empRes, projRes] = await Promise.all([
        axios.get(`${API_URL}/api/employees`),
        axios.get(`${API_URL}/api/projects`),
      ]);
      setEmployees(empRes.data);
      setProjects(projRes.data);
    } catch (err) {
      console.error(err);
    }
  };
  loadData();
}, []);

/* ================= FETCH EMPLOYEES ================= */
const fetchEmployees = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${API_URL}/api/employees`);
    setEmployees(res.data);
    setActiveTab("employees");
  } catch {
    alert("Failed to load employees");
  } finally {
    setLoading(false);
  }
};

/* ================= FETCH PROJECTS ================= */
const fetchProjects = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${API_URL}/api/projects`);
    setProjects(res.data);
    setActiveTab("projects");
  } catch {
    alert("Failed to load projects");
  } finally {
    setLoading(false);
  }
};

/* ================= DELETE ================= */
const deleteEmployee = async (id) => {
  if (!window.confirm("Delete this employee?")) return;
  try {
    await axios.delete(`${API_URL}/api/employees/${id}`);
    setEmployees(employees.filter((e) => e._id !== id));
  } catch (err) {
    alert("Failed to delete employee");
  }
};

const deleteProject = async (id) => {
  if (!window.confirm("Delete this project?")) return;
  try {
    await axios.delete(`${API_URL}/api/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  } catch (err) {
    alert("Failed to delete project");
  }
};

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Meetra Admin</h2>
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li className={activeTab === "employees" ? "active" : ""} onClick={fetchEmployees}>Employees</li>
          <li className={activeTab === "projects" ? "active" : ""} onClick={fetchProjects}>Projects</li>
          <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>Settings</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Admin Dashboard</h1>
          <span>Welcome, Admin</span>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="dashboard-view">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Employees</h3>
                <p>{employees.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Projects</h3>
                <p>{projects.length}</p>
              </div>
            </div>

            <div className="action-grid">
              <button onClick={() => navigate("/add-employee")}>Add Employee</button>
              <button onClick={() => navigate("/add-project")}>Add Project</button>
            </div>
            
            <div className="tools-section">
                <h2>Quick Tools</h2>
                 <div className="tools-grid">
                   <a href="https://meetra-residential-quote.vercel.app/" target="_blank" rel="noopener noreferrer" className="tool-card residential">
                     <h3>Residential Quote</h3>
                     <p>Solar quotation for home customers</p>
                   </a>
                   <a href="https://meetra-industrial-quote.vercel.app" target="_blank" rel="noopener noreferrer" className="tool-card industrial">
                     <h3>Industrial Quote</h3>
                     <p>Large-scale industrial solar estimation</p>
                   </a>
                   <a href="https://meetra-billing-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="tool-card billing">
                     <h3>Billing App</h3>
                     <p>Invoice creation & billing management</p>
                   </a>
                 </div>
            </div>
          </div>
        )}

        {/* EMPLOYEES */}
        {activeTab === "employees" && (
          <div className="employees-view">
            <div className="view-header">
              <h2>Employees</h2>
              <button onClick={() => navigate("/add-employee")}>+ Add</button>
            </div>

            {loading ? <p>Loading...</p> : (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp._id}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td><span className="role-badge">{emp.role}</span></td>
                      <td>
                        <button className="delete-row-btn" onClick={() => deleteEmployee(emp._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* PROJECTS - UPDATED SECTION */}
        {activeTab === "projects" && (
          <div className="projects-view">
            <div className="view-header">
              <h2>Projects</h2>
              <button onClick={() => navigate("/add-project")}>+ Add</button>
            </div>

            {loading ? <p>Loading...</p> : (
              <table className="employee-table">
                <thead>
                  <tr>
                    {/* ✅ UPDATED HEADERS */}
                    <th>Ref ID</th>
                    <th>Client Name</th>
                    <th>Location</th>
                    <th>System Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id}>
                      {/* ✅ UPDATED DATA KEYS to match Database */}
                      <td>{p.clientRef}</td>
                      <td>{p.clientName}</td>
                      <td>{p.siteLocation}</td>
                      <td>{p.systemSize}</td>
                      <td>
                        <button className="delete-row-btn" onClick={() => deleteProject(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="settings-view">
            <h2>System Settings</h2>
            <label>Company Name</label>
            <input value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
            <label>Contact Email</label>
            <input value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
            <label>Profit Margin (%)</label>
            <input type="number" value={settings.profitMargin} onChange={(e) => setSettings({ ...settings, profitMargin: e.target.value })} />
            <button className="save-btn">Save Settings</button>
          </div>
        )}
      </main>
    </div>
  );
}