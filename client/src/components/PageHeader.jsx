import Breadcrumbs from "./Breadcrumbs.jsx";
import "./PageHeader.css";

// Heading band shared by every inner page: breadcrumbs, one H1 and the intro
// sentence coming from the database.
export default function PageHeader({ breadcrumbs = [], title, intro, children }) {
  return (
    <section className="page-header">
      <div className="container">
        {breadcrumbs.length > 0 ? <Breadcrumbs items={breadcrumbs} /> : null}
        <h1 className="page-header__title">{title}</h1>
        {intro ? <p className="page-header__intro display-line">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
