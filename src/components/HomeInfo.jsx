import React from "react";
import { Link } from "react-router-dom";
import "./HomeInfo.css";

const HomeInfo = () => {
  return (
    <section className="home-info">
      <div className="home-info-container">
        
        {/* Left Image */}
        <div className="home-info-image">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765775163/homeinfo_cel1oi.png"
            alt="Solar Energy Bulb"
            loading="lazy"
          />
        </div>

        {/* Right Text */}
        <div className="home-info-content">
          <div className="subtitle-wrapper">
            <h3 className="home-info-subtitle">
              Solar Innovation. Smarter Savings. Greener Tomorrow.
            </h3>
          </div>
          
          <h1 className="home-info-title">Choose Meetra Green Energy</h1>
          
          <h2 className="home-info-heading">
            Powering a Brighter Future with Clean Energy
          </h2>
          
          <p className="home-info-text">
            At <strong>Meetra Green Energy</strong>, we are dedicated to transforming
            the way the world consumes power through reliable and sustainable
            solar energy solutions. Established in <strong>2023</strong> and based in
            <strong> Jetpur - Rajkot</strong>, we provide innovative solar installations for
            homes, businesses, and industries.
          </p>
          
          <p className="home-info-text">
            Our skilled team offers complete <strong>EPC services</strong> (Engineering,
            Procurement, and Construction), ensuring a seamless transition to
            clean energy with trusted quality, performance, and long-term
            savings.
          </p>

          <Link to="/about">
            <button className="home-info-btn">Discover Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeInfo;
