import React from "react";
import "./Installation.css";
import { Link } from "react-router-dom";

const Installation = () => {
  return (
    <section className="installation">
      <div className="installation-container">
        <h2 className="installation-title">
          ⚡ Our Solar Installation Process
        </h2>
        <p className="installation-subtitle">
          Powering Your Future with Clean Energy
        </p>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-icon">🌞</span>
            <h3>Site Survey</h3>
            <p>
              We analyze your roof, sunlight exposure, and power needs to design
              the perfect solar solution.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">🧠</span>
            <h3>Custom System Design</h3>
            <p>
              Our experts create a high-efficiency solar plan tailored for
              maximum savings.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">💰</span>
            <h3>Transparent Pricing</h3>
            <p>
              Clear quotations, honest pricing, and great ROI with no hidden
              costs.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">📄</span>
            <h3>Approvals & Net Metering</h3>
            <p>
              We manage all government approvals and net metering paperwork for
              you.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">🔧</span>
            <h3>Professional Installation</h3>
            <p>
              Certified technicians install premium solar panels safely and
              efficiently.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">✅</span>
            <h3>Testing & Activation</h3>
            <p>
              Complete system testing is done before switching ON your solar
              plant.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">🎓</span>
            <h3>Easy Handover</h3>
            <p>
              We train you to monitor and maintain your solar system easily.
            </p>
          </div>

          <div className="step-card">
            <span className="step-icon">🔄</span>
            <h3>After-Sales Support</h3>
            <p>
              Reliable service and maintenance to ensure long-term performance.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h3>🔋 Go Solar. Save Money. Protect the Planet.</h3>

          {/* ✅ Correct Link Wrap */}
          <Link to="/free-site-survey">
            <button className="cta-btn">Get Free Site Survey</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Installation;
