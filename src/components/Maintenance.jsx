import React from "react";
import "./Maintenance.css";

const services = [
  {
    title: "Professional Panel Cleaning",
    desc:
      "High-pressure, specialized cleaning to remove dust, bird droppings, and industrial pollutants without scratching the tempered glass.",
    icon: "🧼",
  },
  {
    title: "System Health Checkups",
    desc:
      "Detailed inspection of DC/AC wiring, junction boxes, and earthing systems to prevent electrical faults or fire hazards.",
    icon: "🩺",
  },
  {
    title: "Inverter Servicing",
    desc:
      "Diagnostic checks of your solar inverter to ensure optimal conversion efficiency and firmware updates.",
    icon: "⚡",
  },
  {
    title: "Performance Monitoring",
    desc:
      "Monthly or quarterly generation reports to compare your actual solar production against theoretical targets.",
    icon: "📈",
  },
  {
    title: "Structural Inspection",
    desc:
      "Checking mounting structures for rust, tension, and stability to ensure they withstand high winds and monsoon seasons.",
    icon: "🏗️",
  },
];

const tips = [
  {
    title: "The Early Bird Rule",
    desc:
      "Always clean your panels in the early morning or late evening. Cleaning hot panels with cold water can cause thermal shock and crack the glass.",
    icon: "🌅",
  },
  {
    title: "Monitor the Shade",
    desc:
      "Keep an eye on nearby trees. Even a small branch shading a single cell can significantly drop the performance of the entire string.",
    icon: "🌳",
  },
  {
    title: "Visual Check",
    desc:
      "Once a month, take a quick look at your inverter display. If you see a red Fault light, contact us immediately.",
    icon: "🔴",
  },
];

export default function Maintenance() {
  return (
    <section className="maintenance-section">
      <div className="maintenance-container">
        {/* Hero Section */}
        <div className="maintenance-hero">
          <h1>Solar Maintenance Services</h1>
          <p className="hero-tagline">
            "Harnessing the Sun is a one-time investment; keeping it shining is our commitment."
          </p>
          <p>
            At <strong>Meetra Green Energy</strong>, we don’t just install solar panels; we ensure they perform at their peak for their entire 25-year lifespan. Dust, debris, and environmental wear can reduce your energy output by up to 20%. Our professional maintenance team ensures you get every watt you paid for.
          </p>
        </div>

        {/* Offerings */}
        <div className="maintenance-offerings">
          <h2>🛠️ Our Maintenance Offerings</h2>
          <p>
            We provide comprehensive maintenance solutions for Residential, Commercial, and Industrial solar plants:
          </p>

          <div className="offerings-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="offer-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="offer-icon">{service.icon}</div>
                <div className="offer-text">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AMC Plans */}
        <div className="maintenance-amc">
          <h2>📋 Annual Maintenance Contract (AMC) Plans</h2>
          <p>
            Protect your investment with our hassle-free AMC packages. Choose a plan that fits your system size:
          </p>

          <div className="amc-card">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Standard AMC</th>
                  <th>Premium AMC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cleaning Visits</td>
                  <td>Quarterly (4 times/year)</td>
                  <td>Monthly (12 times/year)</td>
                </tr>
                <tr>
                  <td>Health Inspection</td>
                  <td>Bi-Annual</td>
                  <td>Quarterly</td>
                </tr>
                <tr>
                  <td>Emergency Support</td>
                  <td>Within 48 Hours</td>
                  <td>Within 24 Hours</td>
                </tr>
                <tr>
                  <td>Performance Reports</td>
                  <td>Yearly</td>
                  <td>Quarterly</td>
                </tr>
                <tr>
                  <td>Inverter Servicing</td>
                  <td>Included</td>
                  <td>Included + Monitoring</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="maintenance-tips">
          <h2>💡 Pro-Tips for Solar Owners</h2>

          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="tip-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="tip-icon">{tip.icon}</div>
                <div className="tip-text">
                  <h3>{tip.title}</h3>
                  <p>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="maintenance-contact">
          <h2>📞 Schedule a Maintenance Visit</h2>
          <p>Is your electricity bill creeping back up? It might be time for a service.</p>
          <p><strong>Email:</strong> meetragreen@gmail.com</p>
          <p><strong>Phone:</strong> +91 73592 27562</p>
          <p><strong>Service Hours:</strong> Monday – Saturday | 9:00 AM – 6:00 PM</p>
        </div>
      </div>
    </section>
  );
}
