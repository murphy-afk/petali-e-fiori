import { useState } from "react";
import { api } from "../api/client.js";
import { useAsync } from "../utils/useAsync.js";
import { imageUrl } from "../utils/text.js";
import Lightbox from "./Lightbox.jsx";
import "./PhotoStrip.css";

// Photo strip at the bottom of a service page: every published photo of one
// gallery category, clickable and opened in the same keyboard accessible
// lightbox used by the home page and the gallery. Services without photos for
// their own category simply do not render it.
export default function PhotoStrip({ category, title, intro }) {
  const { status, data } = useAsync(() => api.gallery(category), [category]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = (data ? data.images : [])
    .filter((image) => image.category === category)
    .map((image) => ({
      src: imageUrl(image.file),
      alt: image.alt,
      caption: image.caption,
    }));

  if (status === "ready" && images.length === 0) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="photo-strip__head">
          <h2 className="photo-strip__title">{title}</h2>
          {intro ? <p className="photo-strip__intro">{intro}</p> : null}
        </div>

        {status === "loading" ? (
          <p className="photo-strip__state">Caricamento in corso...</p>
        ) : null}

        {status === "error" ? <p className="photo-strip__state">Foto non disponibili.</p> : null}

        {images.length > 0 ? (
          <ul className="photo-strip__list">
            {images.map((image, index) => (
              <li key={image.src} className="photo-strip__item">
                <button
                  className="photo-strip__thumb"
                  type="button"
                  onClick={() => setLightboxIndex(index)}>
                  <img className="photo-strip__image" src={image.src} alt={image.alt} loading="lazy" />
                  <span className="visually-hidden">Ingrandisci: {image.alt}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)} />
      ) : null}
    </section>
  );
}
