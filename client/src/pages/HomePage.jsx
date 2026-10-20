import { useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Lightbox from "../components/Lightbox.jsx";
import PriceTag from "../components/PriceTag.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { api } from "../api/client.js";
import { useSettings } from "../context/SettingsContext.jsx";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";
import { imageUrl } from "../utils/text.js";
import "./HomePage.css";

const SITE_TITLE = " | Allestimenti Floreali per Eventi, Fiori e Bouquet da Sposa";
const SITE_DESCRIPTION =
  "Addobbi Floreali per Eventi: Matrimoni, cerimonie e feste private. Ci occupiamo di qualsiasi tipologia di allestimento. Preventivi gratuiti; nei prezzi è incluso montaggio e consegna Bouquet a casa della Sposa.";

// Home page of the site: hero with the tagline, the service grid, a taste of
// the real price examples, a strip of photos and the free quote call.
export default function HomePage() {
  const { settings } = useSettings();
  const services = useAsync(() => api.services(), []);
  const priceExamples = useAsync(() => api.priceExamples(), []);
  const gallery = useAsync(() => api.gallery("home"), []);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useDocumentMeta({ title: settings.brand_name + SITE_TITLE, description: SITE_DESCRIPTION });

  const galleryImages = (gallery.data ? gallery.data.images : []).slice(0, 7).map((image) => ({
    src: imageUrl(image.file),
    alt: image.alt,
    caption: image.caption,
  }));

  const teaserImages = (priceExamples.data ? priceExamples.data.priceExamples : []).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow">{settings.flower_designer_role}</p>
            <h1 className="hero__title">{settings.tagline}</h1>
            <p className="hero__text">{settings.home_intro_1}</p>
            <div className="hero__actions">
              <Button to="/contatti" variant="accent">{settings.cta_quote}</Button>
              <Button to="/gallery" variant="ghost">{settings.cta_gallery}</Button>
            </div>
          </div>
          <figure className="hero__media">
            <img
              src="/images/home/bouquet-manet.jpg"
              alt="Bouquet Manet, modello decorativo di Petali e Fiori" />
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="I nostri servizi"
            title="Dal bouquet all'allestimento completo"
            intro={settings.home_intro_2} />
          <div className="grid grid--cards">
            {(services.data ? services.data.services : []).map((service) => (
              <Card
                key={service.slug}
                image={service.hero_image ? imageUrl(service.hero_image) : undefined}
                alt={service.name}
                title={service.name}
                titleAs="h3"
                text={service.summary}
                footer={
                  <Button
                    to={"/" + service.slug}
                    variant="ghost"
                    aria-label={"Scopri di più su " + service.name}>
                    Scopri di più
                  </Button>
                } />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="container">
          <SectionHeading
            eyebrow="Preventivi"
            title="Esempi reali di allestimenti"
            intro={settings.price_note} />
          <div className="grid grid--cards">
            {teaserImages.map((example) => (
              <Card
                key={example.id}
                image={example.image ? imageUrl(example.image) : undefined}
                alt={example.title}
                title={example.title}
                titleAs="h3"
                text={example.description}
                price={<PriceTag from={example.price} note={example.season || undefined} />} />
            ))}
          </div>
          <p className="home__more">
            <Button to="/preventivi" variant="primary">Vedi tutti i preventivi</Button>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Gallery"
            title="Matrimoni ed eventi che abbiamo allestito" />
          <ul className="home__gallery">
            {galleryImages.map((image, index) => (
              <li key={image.src}>
                <button
                  className="home__thumb"
                  type="button"
                  onClick={() => setLightboxIndex(index)}>
                  <img className="home__thumb-image" src={image.src} alt={image.alt} loading="lazy" />
                  <span className="visually-hidden">Ingrandisci: {image.alt}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="home__more">
            <Button to="/gallery" variant="ghost">{settings.cta_gallery}</Button>
          </p>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container container--narrow home__quote">
          <h2 className="home__quote-title">{settings.quote_title}</h2>
          <p className="home__quote-text">{settings.quote_text}</p>
          <p className="home__quote-claim display-line">{settings.claim}</p>
          <Button to="/contatti" variant="primary">{settings.cta_contact}</Button>
        </div>
      </section>

      {lightboxIndex !== null ? (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onNavigate={setLightboxIndex}
          onClose={() => setLightboxIndex(null)} />
      ) : null}
    </>
  );
}
