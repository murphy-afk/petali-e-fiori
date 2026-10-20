import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import ContentPage from "./ContentPage.jsx";
import { api } from "../api/client.js";
import { serviceBySlug } from "../routes.js";
import { useAsync } from "../utils/useAsync.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";

// Service page: chiesa, comune, bouquet and the rest. The content comes from
// the services table, Session 4 adds the photo strip and the related services.
export default function ServicePage({ slug }) {
  const route = serviceBySlug(slug) || { path: "/" + slug, label: slug };
  const { status, data, error } = useAsync(() => api.service(slug), [slug]);
  const service = data ? data.service : null;

  const title = service ? service.name : route.label;
  const intro = service ? service.summary : "";

  useDocumentMeta({
    title: service ? service.name + " | Petali e Fiori, Flower Designer a Milano" : title,
    description: intro || undefined,
  });

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
    </>
  );
}
