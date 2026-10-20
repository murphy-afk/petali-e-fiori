import { useCallback, useEffect, useRef } from "react";
import "./Lightbox.css";

// Image viewer used by the gallery pages. It closes on Escape, moves with the
// arrow keys, traps the Tab key inside the dialog and returns the focus to the
// thumbnail that opened it.
export default function Lightbox({ images, index, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const image = images[index];

  const goTo = useCallback(
    (nextIndex) => {
      if (nextIndex >= 0 && nextIndex < images.length) onNavigate(nextIndex);
    },
    [images.length, onNavigate]
  );

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    if (dialogRef.current) dialogRef.current.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      const target = previouslyFocused.current;
      if (target && typeof target.focus === "function") target.focus();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        goTo(index - 1);
        return;
      }
      if (event.key === "ArrowRight") {
        goTo(index + 1);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep the Tab key inside the dialog while it is open.
      const focusables = dialogRef.current.querySelectorAll("button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, goTo, onClose]);

  if (!image) return null;

  const caption = image.caption || image.alt;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      tabIndex={-1}
      ref={dialogRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div className="lightbox__panel">
        <button className="lightbox__close" type="button" onClick={onClose}>
          Chiudi
        </button>

        <figure className="lightbox__figure">
          <img className="lightbox__image" src={image.src} alt={image.alt} />
          <figcaption className="lightbox__caption">{caption}</figcaption>
        </figure>

        <div className="lightbox__controls">
          <button
            className="lightbox__arrow"
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}>
            Precedente
          </button>
          <span className="lightbox__counter">
            {index + 1} di {images.length}
          </span>
          <button
            className="lightbox__arrow"
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}>
            Successiva
          </button>
        </div>
      </div>
    </div>
  );
}
