import Button from "../components/Button.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { imageUrl, splitSections } from "../utils/text.js";
import "./ContentPage.css";

// Body of a content page: optional hero photo, the long text split into
// sections with their headings, a table of contents and a sticky quote card
// on wide screens. ServicePage and StaticPage both render it under their own
// PageHeader.
export default function ContentPage({ title, body, heroImage, children }) {
  const { settings } = useSettings();
  const { intro, sections } = splitSections(body);

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
            <TableOfContents sections={sections} />

            {intro.map((paragraph, index) => (
              <p key={"intro-" + index}>{paragraph}</p>
            ))}

            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={section.id + "-" + index}>{paragraph}</p>
                ))}
              </section>
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
