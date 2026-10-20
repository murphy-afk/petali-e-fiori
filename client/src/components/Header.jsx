import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";
import { useSetting } from "../context/SettingsContext.jsx";
import { formatItalianDate } from "../utils/format.js";
import "./Header.css";

// Sticky header: wordmark on the left, text navigation on the right. The live
// Italian date line of the old site header lives under the wordmark.
export default function Header() {
  const brandName = useSetting("brand_name");

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__name">{brandName}</span>
          <span className="brand__tag">
            Flower Designer a Milano
            <span className="brand__date" aria-hidden="true"> · {formatItalianDate()}</span>
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
