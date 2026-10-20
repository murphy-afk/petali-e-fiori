import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import ContactForm from "../components/ContactForm.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import PriceTable from "../components/PriceTable.jsx";
import RelatedLinks from "../components/RelatedLinks.jsx";
import ContentPage from "./ContentPage.jsx";
import { api } from "../api/client.js";
import { useSettings } from "../context/SettingsContext.jsx";
import { pageBySlug, relatedLinks } from "../routes.js";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";
import "./StaticPage.css";

function telHref(phone) {
  return "tel:" + phone.replace(/[^0-9+]/g, "");
}

// Static page: chi siamo, dove siamo, preventivi, progetti virtuali and
// contatti. The text comes from the pages table, preventivi also lists the
// real price examples, dove siamo shows the map of the shop and contatti gets
// the form wired to POST /api/contact.
export default function StaticPage({ slug }) {
  const route = pageBySlug(slug) || { path: "/" + slug, label: slug };
  const { settings } = useSettings();
  const { status, data } = useAsync(() => api.page(slug), [slug]);
  const page = data ? data.page : null;
  const isContact = slug === "contatti";

  useDocumentMeta({
    title: page && page.meta_title ? page.meta_title : route.label + " | Petali e Fiori",
    description: page && page.meta_description ? page.meta_description : undefined,
  });

  return (
    <>
      <PageHeader
        breadcrumbs={[{ path: route.path, label: route.label }]}
        title={route.label}
        intro={page ? page.intro : ""} />

      {status === "loading" ? <p className="page-state container">Caricamento in corso...</p> : null}

      {status === "error" ? (
        <p className="page-state container">
          Questo contenuto non è al momento disponibile.{" "}
          <Link to="/">Torna alla pagina iniziale</Link>.
        </p>
      ) : null}

      {page && isContact ? (
        <section className="section">
          <div className="container static-page__contact">
            <ContactForm />
            <aside className="static-page__contacts" aria-label="Recapiti del negozio">
              <h2 className="static-page__contacts-title">Dove trovarci</h2>
              <address className="static-page__address">
                {settings.address_street}
                <br />
                {settings.address_zip} {settings.address_city}
                <br />
                {settings.metro}
              </address>
              <p>
                <a href={telHref(settings.phone_landline)}>Tel. {settings.phone_landline}</a>
                <br />
                <a href={telHref(settings.phone_mobile)}>Cell. {settings.phone_mobile}</a>
                <br />
                <a href={"mailto:" + settings.email}>{settings.email}</a>
              </p>
              <p className="static-page__contacts-note">{settings.price_note}</p>
            </aside>
          </div>
        </section>
      ) : null}

      {/* The old site showed a static map of the block as the page photo, the
          interactive map below replaces it. The photo stays in the gallery. */}
      {page && !isContact ? (
        <ContentPage
          title={route.label}
          body={page.body}
          heroImage={slug === "dove-siamo" ? null : page.hero_image} />
      ) : null}

      {slug === "preventivi" ? <PriceTable /> : null}

      {slug === "dove-siamo" ? (
        <section className="section section--tight">
          <div className="container">
            <h2 className="static-page__map-title">La nostra posizione</h2>
            <MapEmbed />
          </div>
        </section>
      ) : null}

      <RelatedLinks title="Continua a esplorare" links={relatedLinks(slug)} />
    </>
  );
}
