import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { headerNav } from "../routes.js";
import "./Nav.css";

// Main navigation. On a desktop screen it is one row of text links and the
// wedding services live behind the Matrimonio dropdown; under 1024px the whole
// row collapses into the disclosure menu opened by the Menu button, where the
// wedding services stay visible under their own heading.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  const groupRef = useRef(null);
  const groupToggleRef = useRef(null);

  // Every navigation closes both menus, also when the visitor follows a link
  // inside the open panel or inside the dropdown.
  useEffect(() => {
    setOpen(false);
    setGroupOpen(false);
  }, [location.pathname]);

  // Escape closes the open menu and returns the focus to the button that
  // opened it. The dropdown wins over the panel, it is the innermost one.
  useEffect(() => {
    if (!open && !groupOpen) return undefined;

    function onKeyDown(event) {
      if (event.key !== "Escape") return;

      if (groupOpen) {
        setGroupOpen(false);
        if (groupToggleRef.current) groupToggleRef.current.focus();
      } else {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, groupOpen]);

  // A pointer down outside the dropdown closes it, so the visitor does not
  // have to open the menu again after clicking the page behind it.
  useEffect(() => {
    if (!groupOpen) return undefined;

    function onPointerDown(event) {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setGroupOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [groupOpen]);

  return (
    <nav className="nav" aria-label="Navigazione principale">
      <button
        ref={toggleRef}
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav-list"
        aria-label={open ? "Chiudi il menu" : "Apri il menu"}
        onClick={() => setOpen((value) => !value)}>
        <span className="nav__toggle-bars" aria-hidden="true" />
      </button>

      <ul id="nav-list" className={open ? "nav__list is-open" : "nav__list"}>
        {headerNav.map((item) => {
          if (!item.children) {
            return (
              <li key={item.path} className="nav__item">
                <NavLink
                  className={({ isActive }) => (isActive ? "nav__link is-active" : "nav__link")}
                  to={item.path}>
                  {item.label}
                </NavLink>
              </li>
            );
          }

          const groupId = "nav-" + item.label.toLowerCase();
          const groupActive = item.children.some((child) => child.path === location.pathname);

          return (
            <li
              key={groupId}
              ref={groupRef}
              className="nav__item nav__item--group"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setGroupOpen(false);
              }}>
              <span id={groupId + "-title"} className="nav__group-title">
                {item.label}
              </span>
              <button
                ref={groupToggleRef}
                type="button"
                className={groupActive ? "nav__group-toggle is-active" : "nav__group-toggle"}
                aria-expanded={groupOpen}
                aria-controls={groupId}
                onClick={() => setGroupOpen((value) => !value)}>
                {item.label}
                <span className="nav__group-caret" aria-hidden="true" />
              </button>
              <ul
                id={groupId}
                aria-labelledby={groupId + "-title"}
                className={groupOpen ? "nav__submenu is-open" : "nav__submenu"}>
                {item.children.map((child) => (
                  <li key={child.path} className="nav__submenu-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? "nav__link is-active" : "nav__link")}
                      to={child.path}>
                      {child.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
