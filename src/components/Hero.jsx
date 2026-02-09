import React from "react";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source
          src="https://res.cloudinary.com/dbnfm5a06/video/upload/v1765660813/hero-video_ju5oxk.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Foreground Content */}
      <div className="hero-inner">
        <h1>
          Power your building with <br />
          <span>Smart Solar Energy</span>
        </h1>

        <p>
          Design, supply, and install solar systems for homes, businesses, and industries —
          ensuring maximum performance & long-term savings.
        </p>

        <div className="hero-buttons">
  <a
    href="https://meetra-pricing-tool.vercel.app/"
    className="btn-primary"
    target="_blank"
    rel="noopener noreferrer"
  >
    Get Your Quotation
  </a>
</div>


        <div className="hero-features">
          <div className="feature-item">✅ Government Approved</div>
          <div className="feature-item">✅ 30-Year Warranty</div>
          <div className="feature-item">✅ Smart Monitoring</div>
        </div>
      </div>

      {/* Wave Shape at Bottom */}
      <div className="hero-wave"></div>

    </section>
  );
}
