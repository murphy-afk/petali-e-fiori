import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";
import { useSetting } from "../context/SettingsContext.jsx";
import { formatItalianDate } from "../utils/format.js";
import "./Header.css";


export default function Header() {
  const brandName = useSetting("brand_name");

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" to="/">
          <span className="brand__name">{brandName}</span>
          <span className="brand__tag">
            Flower Designer a Milano
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
