import React from "react";
import "./SolarEPC.css";

export default function SolarEPC() {
  return (
    <div className="solar-epc">

      {/* ================= HERO SECTION ================= */}
      <section className="epc-hero fade-in">
        <div className="hero-content">
          <h1>☀️ Solar EPC Services</h1>
          <p className="hero-tagline">
            🌍 Empowering Saurashtra with Clean, Reliable, and Affordable Solar Energy
          </p>
          {/* ================= INTRO ================= */}
        <p>
          <strong>Meetra Green Energy</strong> ⚡ is a leading{" "}
          <strong>Solar EPC (Engineering, Procurement & Construction)</strong>{" "}
          company based in <strong>Jetpur, Gujarat</strong>.  
          We deliver end-to-end solar solutions—from design to grid connection—
          making your journey to solar simple and stress-free 🌱.
        </p>
    
        </div>

        <img
          src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1769225446/Gemini_Generated_Image_vr1flcvr1flcvr1f_jycbyl.png"
          alt="Solar Plant"
          className="hero-image"
        />
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="epc-why">
        <h2>🌟 Why Choose Meetra Green Energy?</h2>

        <div className="why-grid">
          <div className="why-card hover-rise">
            <h3>📍 Local Expertise</h3>
            <p>Deep knowledge of Gujarat solar policy & Saurashtra climate.</p>
          </div>

          <div className="why-card hover-rise">
            <h3>🔁 End-to-End EPC</h3>
            <p>Survey, design, approvals, installation & commissioning.</p>
          </div>

          <div className="why-card hover-rise">
            <h3>💰 Cost Efficiency</h3>
            <p>High-ROI systems that recover cost through energy savings.</p>
          </div>

          <div className="why-card hover-rise">
            <h3>🌱 Sustainability</h3>
            <p>Reduce CO₂ emissions and protect the planet.</p>
          </div>
        </div>
      </section>

      {/* ================= EPC SERVICES ================= */}
      <section className="epc-services">
        <h2>⚙️ Our Solar EPC Solutions</h2>

        <div className="services-grid">
          <div className="service-card hover-rise">
            <h3>🧠 Engineering & Design</h3>
            <ul>
              <li>📐 Customized layouts</li>
              <li>🌤️ Shading & yield analysis</li>
              <li>🏗️ Strong structural design</li>
            </ul>
          </div>

          <div className="service-card hover-rise">
            <h3>📦 Procurement</h3>
            <ul>
              <li>🔋 Tier-1 solar modules</li>
              <li>⚡ High-efficiency inverters</li>
              <li>💸 Best price-performance ratio</li>
            </ul>
          </div>

          <div className="service-card hover-rise">
            <h3>🔧 Construction & Commissioning</h3>
            <ul>
              <li>👷 Safe & professional installation</li>
              <li>📝 Net-metering assistance</li>
              <li>✅ Complete project management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= IMAGE + CLIENT VALUE ================= */}
      <section className="epc-visual">
        <img
          src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765648243/mk_wlejfs.png"
          alt="Solar Energy"
          className="visual-image slide-left"
        />

        <div className="visual-text slide-right">
          <h2>🏠 Residential & 🏭 Industrial Solar</h2>
          <p>✅ Reduce electricity bills up to <strong>90%</strong></p>
          <p>✅ PM-Surya Ghar subsidy support</p>
          <p>✅ Accelerated depreciation & GST benefits</p>
          <p>✅ Strong eco-friendly brand image</p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="epc-about fade-in">
        <h2>🌞 About Meetra Green Energy</h2>
        <p>
          We believe the sun is the most powerful tool for progress.  
          Meetra Green Energy is committed to building a cleaner, greener,
          and energy-independent future across Saurashtra.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="epc-contact fade-in">
        <h2>📞 Get Started Today</h2>
        <p><strong>Meetra Green Energy</strong></p>
        <p>📍 Jetpur, Gujarat – 360370</p>
        <p>📧 meetragreen@gmail.com</p>
        <p>📱 +91 73592 27562</p>
      </section>

    </div>
  );
}
