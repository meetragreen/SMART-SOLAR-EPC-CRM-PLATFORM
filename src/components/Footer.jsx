import "./footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { IoMdCall, IoMdMail, IoMdPin } from "react-icons/io";

export default function Footer() {
  return (
    <footer
      className="footer-wrapper"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dbnfm5a06/image/upload/q_auto/footerbg_fakyvi.png)",
      }}
    >
      <div className="footer-overlay"></div>

      <div className="footer-container">

        {/* ✅ COL 1 — LOGO + SOCIAL */}
        <div className="footer-col">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765776384/LOGO_qf0evm.png"
            alt="Meetra Green Energy Logo"
            className="footer-logo"
          />
          <p className="footer-tagline">We create a clean future</p>

          <div className="footer-social">
            <a href="https://www.instagram.com/meetra_green_energy" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/share/1SRwFoEDNN" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.youtube.com/channel/UCXV5whRS4klgY4yROIXZiAw" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://www.linkedin.com/company/meetra-green-energy/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* ✅ COL 2 */}
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/about">About Us</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* ✅ COL 3 */}
        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/solutions">Residential Solar</Link>
          <Link to="/solutions">Commercial Solar</Link>
          <Link to="/solutions">Industrial Solar</Link>
        </div>

        {/* ✅ COL 4 */}
        <div className="footer-col">
          <h4>Contact Info</h4>

          <a href="tel:+918200197199" className="footer-link">
            <IoMdCall /> +91 82001 97199
          </a>

          <a href="tel:+917359227562" className="footer-link">
            <IoMdCall /> +91 73592 27562
          </a>

          <a href="mailto:meetragreen@gmail.com" className="footer-link">
            <IoMdMail /> meetragreen@gmail.com
          </a>

          <p className="footer-address">
            <IoMdPin />
            <span>
              7- Amar Nagar Rd, Opp Navrang Bunglow,<br />
              Jetpur, Gujarat 360370.
            </span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MEETRA GREEN ENERGY. All rights reserved.
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918200197199"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
        />
      </a>
    </footer>
  );
}

