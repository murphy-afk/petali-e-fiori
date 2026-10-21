import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Lightbox from "../components/Lightbox.jsx";
import RelatedLinks from "../components/RelatedLinks.jsx";
import { api } from "../api/client.js";
import { galleryRoute, relatedLinks } from "../routes.js";
import { imageUrl } from "../utils/text.js";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";
import "./GalleryPage.css";

// Italian label of every gallery category, the raw value is the slug used
// in the database. A category without a label here still renders with its
// name capitalized, so a new seed row can never break the filter.
const CATEGORY_LABELS = {
  chiesa: "Chiesa",
  comune: "Comune",
  bouquet: "Bouquet",
  decorazioni: "Decorazioni",
  centrotavola: "Centrotavola",
  retromacchina: "Retromacchina",
  meeting: "Meeting",
  home: "In primo piano",
  "chi-siamo": "Chi siamo",
  "dove-siamo": "Dove siamo",
  contatti: "Contatti",
  preventivi: "Preventivi",
};

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Gallery: every published photo, filterable by category. The filter works
// on the list already in memory, so it never waits for the network, and the
// lightbox always opens on the photos the visitor is actually seeing.
export default function GalleryPage() {
  const { status, data } = useAsync(() => api.gallery(), []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useDocumentMeta({
    title: "Gallery | Petali e Fiori, allestimenti floreali a Milano",
    description:
      "Le foto dei matrimoni, delle cerimonie e degli eventi allestiti da Petali e Fiori: chiesa, comune, bouquet, decorazioni e centrotavola.",
  });

  const images = useMemo(
    () =>
      (data ? data.images : []).map((image) => ({
        src: imageUrl(image.file),
        alt: image.alt,
        caption: image.caption,
        category: image.category,
      })),
    [data]
  );

  const categories = data ? data.categories : [];
  const visibleImages = activeCategory
    ? images.filter((image) => image.category === activeCategory)
    : images;

  // Changing the filter while the lightbox is open would leave it pointing
  // at a photo that is no longer on screen, so it always closes.
  function selectCategory(category) {
    setActiveCategory(category);
    setLightboxIndex(null);
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ path: galleryRoute.path, label: galleryRoute.label }]}
        title={galleryRoute.label}
        intro="Le foto dei matrimoni, delle cerimonie e degli eventi che abbiamo allestito." />

      <section className="section">
        <div className="container">
          {status === "loading" ? (
            <p className="page-state">Caricamento in corso...</p>
          ) : null}

          {status === "error" ? <p className="page-state">Gallery non disponibile.</p> : null}

          {categories.length > 0 ? (
            <div className="gallery__filters" role="group" aria-label="Filtra le foto per categoria">
              <button
                className={"gallery__filter" + (activeCategory === null ? " gallery__filter--active" : "")}
                type="button"
                aria-pressed={activeCategory === null}
                onClick={() => selectCategory(null)}>
                <span className="gallery__filter-name">Tutte</span>
                <span className="gallery__filter-count">{images.length} foto</span>
              </button>

              {categories.map((item) => (
                <button
                  key={item.category}
                  className={
                    "gallery__filter" +
                    (activeCategory === item.category ? " gallery__filter--active" : "")
                  }
                  type="button"
                  aria-pressed={activeCategory === item.category}
                  onClick={() => selectCategory(item.category)}>
                  <span className="gallery__filter-name">{categoryLabel(item.category)}</span>
                  <span className="gallery__filter-count">{item.count} foto</span>
                </button>
              ))}
            </div>
          ) : null}

          {status === "ready" && visibleImages.length === 0 ? (
            <p className="page-state">Nessuna foto in questa categoria.</p>
          ) : null}

          <div className="gallery__grid">
            {visibleImages.map((image, index) => (
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
          images={visibleImages}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)} />
      ) : null}

      <RelatedLinks title="Continua a esplorare" links={relatedLinks(galleryRoute.slug)} />
    </>
  );
}
