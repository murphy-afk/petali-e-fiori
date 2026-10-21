import { useEffect, useRef, useState } from "react";
import "./TableOfContents.css";

// Sticky list of the section headings of a long page. It watches which
// section is currently under the header and marks its link as the current
// one. Pages with a single section do not render it, there is nothing to
// jump between.
export default function TableOfContents({ sections, title = "In questa pagina" }) {
  const [activeId, setActiveId] = useState(sections.length > 0 ? sections[0].id : null);
  const visible = useRef(new Map());
  // The sections array is rebuilt on every render of the parent, the ids are
  // stable and are what the effect actually needs.
  const idsKey = sections.map((section) => section.id).join(",");

  useEffect(() => {
    if (sections.length < 2) return undefined;

    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    if (headings.length === 0) return undefined;

    // The heading closest to the top of the viewport is the current one. The
    // observer only reports the headings that change, so every visible one is
    // remembered here and the closest is recalculated on each change. The
    // band starts under the sticky header, a section becomes current once its
    // heading is really on screen.
    const headerOffset = 120;

    function recalculate() {
      let closest = null;
      let closestDistance = Infinity;
      for (const [id, rect] of visible.current) {
        const distance = Math.abs(rect.top - headerOffset);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = id;
        }
      }
      if (closest) setActiveId(closest);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.set(entry.target.id, entry.boundingClientRect);
          else visible.current.delete(entry.target.id);
        }
        recalculate();
      },
      { rootMargin: "-" + headerOffset + "px 0px -60% 0px", threshold: 0 }
    );

    for (const heading of headings) observer.observe(heading);
    return () => {
      visible.current.clear();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  if (sections.length < 2) return null;

  return (
    <nav className="toc" aria-label={title}>
      <p className="toc__title">{title}</p>
      <ul className="toc__list">
        {sections.map((section) => (
          <li key={section.id} className="toc__item">
            <a
              className="toc__link"
              href={"#" + section.id}
              aria-current={activeId === section.id ? "true" : undefined}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
