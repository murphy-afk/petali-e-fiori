import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { api } from "../api/client.js";
import { imageUrl } from "../utils/text.js";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";
import "./GalleryPage.css";

// Gallery: every published photo with its category count. Session 5 adds the
// category filter on top of this grid.
export default function GalleryPage() {
  const { status, data } = useAsync(() => api.gallery(), []);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useDocumentMeta({
    title: "Gallery | Petali e Fiori, allestimenti floreali a Milano",
    description:
      "Le foto dei matrimoni, delle cerimonie e degli eventi allestiti da Petali e Fiori: chiesa, comune, bouquet, decorazioni e centrotavola.",
  });

  const images = (data ? data.images : []).map((image) => ({
    src: imageUrl(image.file),
    alt: image.alt,
    caption: image.caption,
    category: image.category,
  }));

  const categories = data ? data.categories : [];

  return (
    <>
      <PageHeader
        breadcrumbs={[{ path: "/gallery", label: "Gallery" }]}
        title="Gallery"
        intro="Le foto dei matrimoni, delle cerimonie e degli eventi che abbiamo allestito." />

      <section className="section">
        <div className="container">
          {status === "loading" ? (
            <p className="page-state">Caricamento in corso...</p>
          ) : null}

          {status === "error" ? <p className="page-state">Gallery non disponibile.</p> : null}

          {categories.length > 0 ? (
            <ul className="gallery__counts">
              {categories.map((item) => (
                <li key={item.category} className="gallery__count">
                  <span className="gallery__count-name">{item.category}</span>
                  <span className="gallery__count-value">{item.count} foto</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="gallery__grid">
            {images.map((image, index) => (
              <button
                key={image.src}
                className="gallery__item"
                type="button"
                onClick={() => setLightboxIndex(index)}>
                <img className="gallery__image" src={image.src} alt={image.alt} loading="lazy" />
                <span className="visually-hidden">Ingrandisci: {image.alt}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null ? (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)} />
      ) : null}
    </>
  );
}
