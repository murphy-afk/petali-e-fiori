import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { headerLinks, pageRoutes } from "../routes.js";
import { useDocumentMeta } from "../utils/useDocumentMeta.js";
import "./NotFoundPage.css";

// Shown by the router for every unknown path.
export default function NotFoundPage() {
  useDocumentMeta({ title: "Pagina non trovata | Petali e Fiori" });

  const links = [...headerLinks, ...pageRoutes].filter(
    (item, index, list) => list.findIndex((other) => other.path === item.path) === index
  );

  return (
    <>
      <PageHeader
        title="Pagina non trovata"
        intro="La pagina che cercate non è più disponibile." />

      <section className="section">
        <div className="container not-found">
          <p>
            L'indirizzo potrebbe essere errato oppure la pagina è stata spostata. Queste sono le
            pagine più visitate del sito.
          </p>

          <ul className="not-found__links">
            {links.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <Button to="/" variant="primary">Torna alla pagina iniziale</Button>
        </div>
      </section>
    </>
  );
}
