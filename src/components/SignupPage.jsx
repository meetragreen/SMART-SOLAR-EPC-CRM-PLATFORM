import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
  `${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Account created successfully!\nYour System ID is: ${data.systemId}`);
        navigate("/login"); // redirect to login page
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Could not connect to the server.");
    }
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

        <h2 className="signup-title">Create Account</h2>

        {/* Full Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signup Button */}
        <button type="button" className="login-btn" onClick={handleSignup}>
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="signup-text">
          Already have an account?{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
