import { useCallback, useEffect, useState } from "react";
import "./Slideshow.css";

// Slideshow of photos that advances on its own. It stops while the pointer
// or the keyboard focus is over it, it never starts for a visitor who asked
// the system for reduced motion, and it always offers a pause button, which
// is what WCAG 2.2.2 asks of moving content. The arrows and the dots are
// real buttons, so the whole thing works from the keyboard.
export default function Slideshow({
  images,
  label = "Foto in evidenza",
  intervalMs = 5000,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // The preference can change while the page is open, so it is read on
  // mount and kept in sync by the listener below.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    function onChange(event) {
      setReducedMotion(event.matches);
    }

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const autoPlaying = !paused && !hovering && !focused && !reducedMotion && images.length > 1;

  useEffect(() => {
    if (!autoPlaying) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoPlaying, images.length, intervalMs]);

  const goTo = useCallback(
    (nextIndex) => {
      if (images.length === 0) return;
      setIndex(((nextIndex % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  // Touch and pointer visitors cannot hover, the arrows and the pause button
  // are their way to control the movement.
  function onKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  if (images.length === 0) return null;

  const image = images[index];

  return (
    <div
      className={"slideshow " + className}
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={onKeyDown}>
      <figure className="slideshow__figure">
        <img
          className="slideshow__image"
          src={image.src}
          alt={image.alt}
          // Only the first photo is worth loading before the visitor asks
          // for it, the rest arrive with their own slide.
          loading={index === 0 ? "eager" : "lazy"} />
        {image.caption ? <figcaption className="slideshow__caption">{image.caption}</figcaption> : null}
      </figure>

      <div className="slideshow__controls">
        <button
          className="slideshow__arrow"
          type="button"
          onClick={() => goTo(index - 1)}>
          Precedente
        </button>

        <div className="slideshow__dots" role="group" aria-label="Scegli una foto">
          {images.map((item, position) => (
            <button
              key={item.src}
              className={"slideshow__dot" + (position === index ? " slideshow__dot--active" : "")}
              type="button"
              aria-label={"Foto " + (position + 1) + " di " + images.length}
              aria-current={position === index ? "true" : undefined}
              onClick={() => goTo(position)} />
          ))}
        </div>

        <button
          className="slideshow__arrow"
          type="button"
          onClick={() => goTo(index + 1)}>
          Successiva
        </button>

        <button
          className="slideshow__toggle"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}>
          {paused ? "Riprendi" : "Pausa"}
        </button>
      </div>

      <p className="slideshow__status" role="status">
        {index + 1} di {images.length}
      </p>
    </div>
  );
}
