import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const time = new Date().toLocaleString();

    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "time";
    hiddenField.value = time;
    form.current.appendChild(hiddenField);

    emailjs
      .sendForm(
        "service_63u1n7l",
        "template_ayi90i9",
        form.current,
        "0r8uLBShKR51X5vwC"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        () => {
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="contact-page">

      {/* ===== HEADER SECTION ===== */}
      <div className="contact-header">
        <h2>Start Your Solar Journey with Us.</h2>

        <div className="contact-top">

          {/* Left: Globe Image */}
          <div className="contact-globe">
            <img
              src="https://res.cloudinary.com/dbnfm5a06/image/upload/w_500,q_auto/globe-solar_dmmqjt.png"
              alt="Global Solar Reach"
            />
          </div>

          {/* Right: Contact Details Cards */}
          <div className="contact-details">

            <div className="contact-box call">
              <h4>Call Us</h4>
              <p>+91 82001 97199</p>
              <p>+91 73592 27562</p>
            </div>

            <div className="contact-box mail">
              <h4>Mail Us</h4>
              <p>
                <a href="mailto:meetragreen@gmail.com">meetragreen@gmail.com</a>
              </p>
            </div>

            <div className="contact-box address">
              <h4>Our Address</h4>
              <p>
                7–Amar Nagar Rd, Opp Navrang Bunglow,<br />
                Vekariya Nagar, Jetpur, Gujarat 360370.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ===== SUBTITLE ===== */}
      <div className="contact-subtitle">
        <h3>Got some questions?</h3>
        <p>We're here to assist you — reach out today!</p>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="contact-form-section">

        <div className="contact-form-card">
          <h3>Get in touch</h3>

          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="text" name="phone" placeholder="Contact Number" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea
              name="message"
              placeholder="How can we help?"
              rows="5"
              required
            ></textarea>

            <button type="submit">Submit Request</button>
          </form>
        </div>

        {/* Right Image */}
        <div className="contact-img">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/w_800,q_auto/solar-workers_sys5hi.png"
            alt="Solar Installation Team"
            loading="lazy"
          />
        </div>
      </div>

      {/* ===== GOOGLE MAP ===== */}
      <div className="map-container">
        <iframe
          title="office-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3708.572393222373!2d70.6256!3d21.7516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39581970676a6e6d%3A0x4441584285802528!2sJetpur%2C%20Gujarat%20360370!5e0!3m2!1sen!2sin!4v1709623456789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </section>
  );
}
