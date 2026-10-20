import { Link } from "react-router-dom";
import "./RelatedLinks.css";

// "Continua a esplorare" block: the pages that belong next to the one being
// read. The list comes from routes.js so the header, footer and these cross
// links always agree on where a service lives.
export default function RelatedLinks({ title, links }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="section section--tight">
      <div className="container related-links">
        <h2 className="related-links__title">{title}</h2>
        <ul className="related-links__list">
          {links.map((link) => (
            <li key={link.path} className="related-links__item">
              <Link className="related-links__link" to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
