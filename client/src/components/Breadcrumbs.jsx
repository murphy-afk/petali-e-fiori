import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

// Breadcrumb trail, the current page is the last item and it is not a link.
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Percorso di navigazione">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={item.path || item.label}>
              <li className="breadcrumbs__separator" aria-hidden="true">/</li>
              <li className="breadcrumbs__item">
                {isLast ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
