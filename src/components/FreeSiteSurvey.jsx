import React, { useState } from "react";
import "./FreeSiteSurvey.css";
import axios from "axios";

const FreeSiteSurvey = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    propertyType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/survey`, formData);
      alert("📩 Survey Submitted Successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        propertyType: "",
      });
    } catch (err) {
      alert("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <section className="survey">
      <div className="survey-container">
        <div className="survey-left">
          <h1>🌞 Get a Free Solar Site Survey</h1>
          <p>
            Switch to clean energy with confidence. Our solar experts from
            <strong> Meetra Green Energy</strong> will inspect your site and
            recommend the best solar solution — absolutely free.
          </p>

          <ul className="survey-benefits">
            <li>✔ Free site inspection</li>
            <li>✔ Customized solar system design</li>
            <li>✔ Accurate cost & savings estimate</li>
            <li>✔ No obligation, no hidden charges</li>
          </ul>
        </div>

        <div className="survey-right">
          <h2>Request a Call Back</h2>

          <form className="survey-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Mobile Number"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="City / Location"
              required
              onChange={handleChange}
            />

            <select
              name="propertyType"
              value={formData.propertyType}
              required
              onChange={handleChange}
            >
              <option value="">Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>

            <button type="submit">📞 Book Free Site Survey</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FreeSiteSurvey;
