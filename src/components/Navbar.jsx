import { useState, useEffect } from "react";
import "../css/navbar.css";

const NAV_LINKS = ["Home", "About Us", "Campaigns", "Our Work", "Resource Center", "Contact Us"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      {/* Logo */}
      <div className="navbar__logo">
        <div className="navbar__logo-icon">♥</div>
        <span className="navbar__logo-text">Sarita Foundation</span>
      </div>

      {/* Desktop Links */}
      <ul className="navbar__links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="navbar__link">{link}</a>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="navbar__actions">
        <button className="navbar__donate-btn">Donate Now →</button>
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="navbar__mobile-link">{link}</a>
          ))}
          <button className="navbar__donate-btn navbar__donate-btn--mobile">Donate Now →</button>
        </div>
      )}
    </nav>
  );
}
