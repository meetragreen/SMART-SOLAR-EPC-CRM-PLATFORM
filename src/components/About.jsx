import React from "react";
import "./About.css";

const About = () => {

  const handleQuoteClick = () => {
    window.open("https://meetra-pricing-tool.vercel.app/", "_blank");
  };

  return (
    <section className="about-page">

      {/* ===== HERO SECTION ===== */}
      <div className="about-hero">
        <div className="hero-bg">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/w_1600,q_auto/about-hero_n6qrqo.png"
            alt="Solar panels installation background"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="about-hero-text">
          <h1>Empowering A Sustainable Future</h1>
          <div className="green-divider"></div>
          <p>
            <strong>Meetra Green Energy</strong> is Saurashtra’s leading EPC solar company.
            We don’t just install solar systems; we build long-term energy
            partnerships through <strong>Design, Supply, Installation, and Maintenance </strong>
            for residential, commercial, and industrial projects.
          </p>
        </div>
      </div>

      {/* ===== OUR VISION SECTION ===== */}
      <div className="about-section vision-mission">
        <div className="section-image-wrapper">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765770033/vision-min_cmfuyc.png"
            alt="Our Vision - Clean Energy Future"
            className="section-img"
          />
        </div>

        <div className="section-content">
          <h2>Our Vision</h2>
          <p>
            To illuminate the future of <strong>Saurashtra</strong> by making clean,
            affordable, and reliable solar energy accessible to every community —
            from remote villages to bustling industrial hubs.
          </p>
        </div>
      </div>

      {/* ===== OUR MISSION SECTION ===== */}
      <div className="about-section mission">
        <div className="section-image-wrapper">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765775901/mission_vdesrd.png"
            alt="Our Mission - Sustainable Solar Solutions"
            className="section-img"
          />
        </div>

        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            To provide affordable, efficient, and reliable solar energy solutions
            that empower communities, reduce carbon footprints, and promote energy
            independence in Saurashtra.
          </p>
        </div>
      </div>

      {/* ===== VALUES SECTION ===== */}
      <div className="about-section values">
        <div className="section-content">
          <h2>Our Core Values</h2>
          <ul className="values-list">
            <li>
              <strong>Innovation</strong>
              Leveraging cutting-edge technology to deliver high-efficiency solar systems.
            </li>
            <li>
              <strong>Quality Assurance</strong>
              Using premium components, certified installers, and industry-best practices.
            </li>
            <li>
              <strong>Customer-Focused</strong>
              Providing customized solar solutions based on real energy needs.
            </li>
            <li>
              <strong>Sustainability</strong>
              Contributing to a greener planet for future generations.
            </li>
          </ul>
        </div>

        <div className="section-image-wrapper">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1769577795/mk123_uldssf.png"
            alt="Our Core Values"
            className="section-img"
          />
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="about-cta">
        <div className="cta-content">
          <h2>Ready to Switch to Solar?</h2>
          <p>
            Make your rooftop work for you. Save money, increase energy efficiency,
            and contribute to a cleaner planet. Our team is ready to assist you.
          </p>
          <button className="btn-primary" onClick={handleQuoteClick}>
            Get a Free Quote
          </button>
        </div>
      </div>

    </section>
  );
};

export default About;
