import Button from "../components/Button.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { imageUrl, splitParagraphs } from "../utils/text.js";
import "./ContentPage.css";

// Body of a content page: optional hero photo, the long text split into
// paragraphs and a sticky quote card on wide screens. ServicePage and
// StaticPage both render it under their own PageHeader.
export default function ContentPage({ title, body, heroImage, children }) {
  const { settings } = useSettings();
  const paragraphs = splitParagraphs(body);

  return (
    <>
      {heroImage ? (
        <div className="container content-page__hero">
          <img className="content-page__hero-image" src={imageUrl(heroImage)} alt={title} />
        </div>
      ) : null}

      <section className="section">
        <div className="container content-page__layout">
          <div className="prose content-page__body">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {children}
          </div>

          <aside className="content-page__aside" aria-label={settings.quote_title}>
            <h2 className="content-page__aside-title">{settings.quote_title}</h2>
            <p className="content-page__aside-text">{settings.quote_text}</p>
            <Button to="/contatti" variant="accent">{settings.cta_quote}</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
