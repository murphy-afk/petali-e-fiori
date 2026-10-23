import Button from "../components/Button.jsx";
import TableOfContents from "../components/TableOfContents.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import { imageUrl, splitSections } from "../utils/text.js";
import "./ContentPage.css";

// Body of a content page: optional hero photo or four photo collage, the long
// text split into sections with their headings, the table of contents and a
// sticky quote card. From 1024px up the contents list gets a rail of its own
// on the left and the quote card stays on the right, so neither of them ever
// sits on top of the text. ServicePage and StaticPage both render it under
// their own PageHeader.
export default function ContentPage({ title, body, heroImage, heroImages, children }) {
  const { settings } = useSettings();
  const { intro, sections } = splitSections(body);

  // hero_images is the JSON list of {"src", "alt"} objects stored on the
  // service, used when one photo is not enough; the single hero_image stays
  // the fallback and also carries the alt text of a one photo hero.
  const images =
    Array.isArray(heroImages) && heroImages.length > 0
      ? heroImages.filter((image) => image && image.src)
      : heroImage
        ? [{ src: heroImage, alt: title }]
        : [];
  const isCollage = images.length > 1;
  // The contents list renders itself only with at least two sections, the
  // layout needs to know the same thing to decide whether the side rail
  // exists, otherwise the text would keep an empty column next to it.
  const hasToc = sections.length > 1;

  return (
    <>
      {images.length > 0 ? (
        <div
          className={
            isCollage
              ? "container content-page__hero content-page__hero--collage"
              : "container content-page__hero"
          }>
          {images.map((image, index) => (
            <img
              key={image.src}
              className="content-page__hero-image"
              src={imageUrl(image.src)}
              alt={image.alt || title}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      ) : null}

      <section className="section">
        <div
          className={
            hasToc
              ? "container content-page__layout content-page__layout--rail"
              : "container content-page__layout"
          }>
          {/* The list leads the text on small screens and moves into its own
              rail on the left from 1024px up, see ContentPage.css. */}
          <TableOfContents sections={sections} />

          <div className="prose content-page__body">
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
