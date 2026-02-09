// src/components/Why.jsx
import "./why.css";

const features = [
  { 
    title: "End-to-End Service", 
    text: "We handle everything: Design, financing, installation, and maintenance.",
    icon: "⚡" 
  },
  { 
    title: "Local Support", 
    text: "Expert technicians nearby for fast response and on-site assistance.",
    icon: "📍" 
  },
  { 
    title: "Smart Monitoring", 
    text: "Track your energy production live 24/7 with mobile app.",
    icon: "📱" 
  },
  { 
    title: "30-Years Long Life", 
    text: "Guaranteed protection, quality assurance, and peace of mind.",
    icon: "🛡️" 
  }
];

export default function Why() {
  return (
    <section id="why" className="why-section">
      <div className="why-container">
        
        <div className="why-header">
          <h2 className="why-title">
            Why Choose <span>Us?</span>
          </h2>
          <p className="why-subtitle">
            Experience the difference with reliable, efficient, and customer-first solar solutions.
          </p>
        </div>

        <div className="why-grid">
          {features.map((f, index) => (
            <div key={index} className="why-card">
              <div className="why-icon-wrapper">
                <span className="why-icon">{f.icon}</span>
              </div>
              <h4 className="why-card-title">{f.title}</h4>
              <p className="why-card-text">{f.text}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}