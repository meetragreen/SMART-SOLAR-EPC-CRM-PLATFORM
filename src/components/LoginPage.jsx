import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage({ onLoginSuccess }) {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState(""); // email OR employeeId
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 FIXED ADMIN CREDENTIALS
  const ADMIN_EMAIL = "admin@meetragreen.com";
  const ADMIN_PASSWORD = "meetragreen";

  /* ================= AUTO REDIRECT IF ALREADY LOGGED IN ================= */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.role === "admin") {
        navigate("/admin-dashboard");
      } else if (storedUser.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your credentials.");
      return;
    }

    /* ================= ADMIN LOGIN ================= */
    if (role === "admin") {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminData = {
          role: "admin",
          email: ADMIN_EMAIL,
          fullName: "System Admin",
        };

        localStorage.setItem("user", JSON.stringify(adminData));
        onLoginSuccess?.(adminData);

        // ❌ NO replace:true → Back button works
        navigate("/admin-dashboard");
      } else {
        alert("Invalid admin credentials");
      }
      return;
    }

    /* ================= USER / EMPLOYEE LOGIN ================= */
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = { ...data.user };

        localStorage.setItem("user", JSON.stringify(userData));
        onLoginSuccess?.(userData);

        // 🔁 ROLE BASED REDIRECT (NO replace)
        if (userData.role === "employee") {
          navigate("/employee-dashboard");
        } else if (userData.role === "user") {
          navigate("/dashboard");
        } else {
          alert("Unknown role");
        }
      } else {
        alert(data.error || "User not found");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server not running or connection failed");
    }
  };

  /* ================= SIGNUP NAVIGATION ================= */
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="logo-small">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765776384/LOGO_qf0evm.png"
            alt="Meetra Logo"
          />
        </div>

        {/* Role Switch */}
        <div className="role-switch">
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={role === "admin" ? "active" : ""}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setRole("user")}
            className={role === "user" ? "active" : ""}
          >
            User
          </button>
        </div>

        {/* Email / Employee ID */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Email or Employee ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button type="button" className="login-btn" onClick={handleLogin}>
          Sign In as {role === "admin" ? "Admin" : "User"}
        </button>

        {/* Signup only for USER */}
        {role === "user" && (
          <p className="signup-text">
            New User?{" "}
            <button
              type="button"
              className="signup-link"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </p>
        )}

      </div>
    </div>
  );
}
