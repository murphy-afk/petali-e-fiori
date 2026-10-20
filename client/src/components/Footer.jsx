import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";
import { footerNav, serviceRoutes } from "../routes.js";
import { formatItalianDate } from "../utils/format.js";
import "./Footer.css";

function telHref(phone) {
  return "tel:" + phone.replace(/[^0-9+]/g, "");
}

// Site footer: brand and tagline, the two link columns, the shop contacts and
// the legal line. Every fact comes from the settings table.
export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__column">
          <p className="site-footer__brand">{settings.brand_name}</p>
          <p className="site-footer__tagline display-line">{settings.tagline}</p>
          <p className="site-footer__note">{settings.footer_note}</p>
        </div>

        <nav className="site-footer__column" aria-label="Servizi di flor design">
          <h2 className="site-footer__heading">Servizi</h2>
          <ul className="site-footer__list">
            {serviceRoutes.map((item) => (
              <li key={item.path}>
                <Link className="site-footer__link" to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__column" aria-label="Pagine del sito">
          <h2 className="site-footer__heading">Il negozio</h2>
          <ul className="site-footer__list">
            {footerNav.map((item) => (
              <li key={item.path}>
                <Link className="site-footer__link" to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Contatti</h2>
          <address className="site-footer__address">
            {settings.address_street}
            <br />
            {settings.address_zip} {settings.address_city}
            <br />
            {settings.metro}
          </address>
          <ul className="site-footer__list">
            <li>
              <a className="site-footer__link" href={telHref(settings.phone_landline)}>
                Tel. {settings.phone_landline}
              </a>
            </li>
            <li>
              <a className="site-footer__link" href={telHref(settings.phone_mobile)}>
                Cell. {settings.phone_mobile}
              </a>
            </li>
            <li>
              <a className="site-footer__link" href={"mailto:" + settings.email}>
                {settings.email}
              </a>
            </li>
          </ul>
          <p className="site-footer__date">Milano, {formatItalianDate()}</p>
        </div>
      </div>

      <div className="site-footer__legal">
        <div className="container site-footer__legal-inner">
          <p>
            {settings.copyright} · P.iva {settings.vat_number}
          </p>
          <p>
            Con {settings.partner_name}:{" "}
            <a
              className="site-footer__link"
              href={settings.partner_url}
              target="_blank"
              rel="noopener noreferrer">
              {settings.partner_url.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <p>© {year} Petali e Fiori</p>
        </div>
      </div>
    </footer>
  );
}
