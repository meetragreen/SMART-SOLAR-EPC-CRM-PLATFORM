import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "solutions" | "careers"

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="header">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765776384/LOGO_qf0evm.png"
            alt="Meetra Logo"
            className="logo py-2"
          />
        </Link>

        {/* Overlay */}
        <div
          className={`nav-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={closeMenu}
        />

        {/* Navigation */}
        <nav className={`nav ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="nav-close" onClick={closeMenu}>×</div>

          <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-item" onClick={closeMenu}>About</Link>

          {/* SOLUTIONS */}
          <div className={`dropdown ${openDropdown === "solutions" ? "open" : ""}`}>
            <div
              className="nav-item dropdown-btn"
              onClick={() => toggleDropdown("solutions")}
            >
              Solutions <span className="arrow">▾</span>
            </div>
            <div className="dropdown-menu">
              <Link to="/solutions/solar-epc" className="dropdown-item" onClick={closeMenu}>
                Solar EPC
              </Link>
              <Link to="/solutions/installation" className="dropdown-item" onClick={closeMenu}>
                Installation
              </Link>
              <Link to="/solutions/maintenance" className="dropdown-item" onClick={closeMenu}>
                Maintenance
              </Link>
            </div>
          </div>

          <Link to="/projects" className="nav-item" onClick={closeMenu}>
            Our Projects
          </Link>

          {/* CAREERS */}
          <div className={`dropdown ${openDropdown === "careers" ? "open" : ""}`}>
            <div
              className="nav-item dropdown-btn"
              onClick={() => toggleDropdown("careers")}
            >
              Careers <span className="arrow">▾</span>
            </div>
            <div className="dropdown-menu">
              <Link to="/careers/jobs" className="dropdown-item" onClick={closeMenu}>
                Open Jobs
              </Link>
              <Link to="/careers/internships" className="dropdown-item" onClick={closeMenu}>
                Internships
              </Link>
            </div>
          </div>

          <Link to="/contact" className="nav-item" onClick={closeMenu}>
            Contact
          </Link>

          {/* Get Started */}
          <Link to="/login" onClick={closeMenu}>
            <button className="get-started-btn">Get Started</button>
          </Link>
        </nav>

        {/* Hamburger */}
        <div
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </div>

      </div>
    </header>
  );
}
