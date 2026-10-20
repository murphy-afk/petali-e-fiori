import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { headerNav } from "../routes.js";
import "./Nav.css";

// Main navigation. It is a single row of text links on a desktop screen and a
// disclosure menu under 1024px, opened by the Menu button.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);

  // Every navigation closes the menu, also when the visitor uses a link
  // inside the open panel.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="nav" aria-label="Navigazione principale">
      <button
        ref={toggleRef}
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav-list"
        onClick={() => setOpen((value) => !value)}>
        <span className="nav__toggle-bars" aria-hidden="true" />
        <span>Menu</span>
      </button>

      <ul id="nav-list" className={open ? "nav__list is-open" : "nav__list"}>
        {headerNav.map((item) => (
          <li key={item.path} className="nav__item">
            <NavLink
              className={({ isActive }) => (isActive ? "nav__link is-active" : "nav__link")}
              to={item.path}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
