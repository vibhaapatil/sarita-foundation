import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // ← add this
import "../css/navbar.css";

const NAV_LINKS = [
  { label: "Home",            path: "/" },
  { label: "About Us",        path: "/about" },
  { label: "Campaigns",       path: "/campaigns" },
 { label: "Support Us", path: "/support" },
  { label: "Our Focus Areas", path: "/resources" },
  { label: "Contact Us",      path: "/contact" },
];

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
      <div className="navbar__logo">
        <div className="navbar__logo-icon">♥</div>
        <span className="navbar__logo-text">Sarita Foundation</span>
      </div>

      <ul className="navbar__links">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={label}>
            <Link to={path} className="navbar__link">{label}</Link>  {/* ← Link, not <a> */}
          </li>
        ))}
      </ul>

<div className="navbar__actions">
  <Link to="/donate" className="navbar__donate-btn">
    Donate Now →
  </Link>

  <button
  className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
>
  <span />
  <span />
  <span />
</button>
</div>

<div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
  {NAV_LINKS.map(({ label, path }) => (
    <Link
      key={label}
      to={path}
      className="navbar__mobile-link"
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  ))}
  <Link
    to="/donate"
    className="navbar__donate-btn navbar__donate-btn--mobile"
    onClick={() => setMenuOpen(false)}
  >
    Donate Now →
  </Link>
</div>
    </nav>
  );
}