import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import BouquetModels from "../components/BouquetModels.jsx";
import DecorationTypes from "../components/DecorationTypes.jsx";
import PhotoStrip from "../components/PhotoStrip.jsx";
import RelatedLinks from "../components/RelatedLinks.jsx";
import ContentPage from "./ContentPage.jsx";
import { api } from "../api/client.js";
import { relatedLinks, serviceBySlug } from "../routes.js";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";

// Which extra section a service page builds under its text: the bouquet
// models and the decoration types come from their own tables, the rest of the
// services illustrate themselves with the photos of their gallery category.
const EXTRA_SECTIONS = {
  bouquet: <BouquetModels />,
  "decorazioni-varie": <DecorationTypes />,
};

// Service page: chiesa, comune, bouquet and the rest. The content comes from
// the services table, the photo strip from the gallery and the cross links
// from routes.js.
export default function ServicePage({ slug }) {
  const route = serviceBySlug(slug) || { path: "/" + slug, label: slug };
  const { status, data } = useAsync(() => api.service(slug), [slug]);
  const service = data ? data.service : null;

  const title = service ? service.name : route.label;
  const intro = service ? service.summary : "";

  useDocumentMeta({
    title: service ? service.name + " | Petali e Fiori, Flower Designer a Milano" : title,
    description: intro || undefined,
  });

  const extra = EXTRA_SECTIONS[slug] || null;
  const category = route.galleryCategory || null;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ path: route.path, label: title }]}
        title={title}
        intro={intro} />

      {status === "loading" ? <p className="page-state container">Caricamento in corso...</p> : null}

      {status === "error" ? (
        <p className="page-state container">
          Questo contenuto non è al momento disponibile.{" "}
          <Link to="/">Torna alla pagina iniziale</Link>.
        </p>
      ) : null}

      {service ? <ContentPage title={service.name} body={service.body} heroImage={service.hero_image} /> : null}

      {extra}

      {category ? (
        <PhotoStrip
          category={category}
          title={"Foto di " + title}
          intro="Cliccate su una foto per ingrandirla." />
      ) : null}

      <RelatedLinks title="Continua a esplorare" links={relatedLinks(slug)} />
    </>
  );
}
