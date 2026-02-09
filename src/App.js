import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

/* ================= COMPONENTS ================= */
import Header from "./components/Header";
import Hero from "./components/Hero";
import HomeInfo from "./components/HomeInfo";
import Solutions from "./components/Solutions";
import CoreStrengths from "./components/CoreStrengths";
import Why from "./components/Why";
import Process from "./components/Process";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

/* ================= PAGES ================= */
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddEmployee from "./components/AddEmployee";
import AddProject from "./components/AddProject";
import ProtectedRoute from "./components/ProtectedRoute";

/* ================= SOLUTIONS ================= */
import SolarEPC from "./components/SolarEPC";
import Installation from "./components/Installation";
import Maintenance from "./components/Maintenance";
import FreeSiteSurvey from "./components/FreeSiteSurvey";

/* ================= CAREERS ================= */
import OpenJobs from "./components/careers/OpenJobs";
import Internships from "./components/careers/Internships";

/* ================= LAYOUTS ================= */
function MainLayout({ children }) {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function AuthLayout({ children }) {
  return <div className="min-h-screen">{children}</div>;
}

/* ================= APP ================= */
export default function App() {
  /* Persist login on refresh */
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : user.role === "employee" ? (
                <Navigate to="/employee-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <AuthLayout>
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              </AuthLayout>
            )
          }
        />

        {/* ================= SIGNUP ================= */}
        <Route
          path="/signup"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : user.role === "employee" ? (
                <Navigate to="/employee-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <AuthLayout>
                <SignupPage />
              </AuthLayout>
            )
          }
        />

        {/* ================= USER DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            user && user.role === "user" ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADD EMPLOYEE ================= */}
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        {/* ================= ADD PROJECT ================= */}
        <Route
          path="/add-project"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <AddProject />
            </ProtectedRoute>
          }
        />

        {/* ================= EMPLOYEE DASHBOARD ================= */}
        <Route
          path="/employee-dashboard"
          element={
            user && user.role === "employee" ? (
              <EmployeeDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ================= MAIN WEBSITE ================= */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Hero />
              <HomeInfo />
              <Solutions />
              <CoreStrengths />
              <Why />
              <Process />
            </MainLayout>
          }
        />

        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

        {/* ================= SOLUTIONS ================= */}
        <Route path="/solutions/solar-epc" element={<MainLayout><SolarEPC /></MainLayout>} />
        <Route path="/solutions/installation" element={<MainLayout><Installation /></MainLayout>} />
        <Route path="/solutions/maintenance" element={<MainLayout><Maintenance /></MainLayout>} />

        {/* ================= FREE SITE SURVEY ================= */}
        <Route
          path="/free-site-survey"
          element={
            <MainLayout>
              <FreeSiteSurvey />
            </MainLayout>
          }
        />

        {/* ================= CAREERS ================= */}
        <Route
          path="/careers/jobs"
          element={
            <MainLayout>
              <OpenJobs />
            </MainLayout>
          }
        />

        <Route
          path="/careers/internships"
          element={
            <MainLayout>
              <Internships />
            </MainLayout>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
