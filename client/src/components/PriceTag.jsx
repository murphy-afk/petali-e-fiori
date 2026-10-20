import { formatEuro } from "../utils/format.js";
import "./PriceTag.css";

// Price chip used on bouquet cards, price examples and preventivi. It accepts
// a range, a minimum or a single price, always in euro.
export default function PriceTag({ from, to, note, label }) {
  let value = "";

  if (typeof from === "number" && typeof to === "number" && from !== to) {
    value = "da " + formatEuro(from) + " a " + formatEuro(to);
  } else if (typeof from === "number") {
    value = "da " + formatEuro(from);
  } else if (typeof to === "number") {
    value = "fino a " + formatEuro(to);
  } else {
    return null;
  }

  return (
    <p className="price-tag">
      {label ? <span className="price-tag__label">{label}</span> : null}
      <span className="price-tag__value">{value}</span>
      {note ? <span className="price-tag__note">{note}</span> : null}
    </p>
  );
}
