import PriceTag from "./PriceTag.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { api } from "../api/client.js";
import { useAsync } from "../utils/useAsync.js";
import "./PriceTable.css";

// Real preventivi taken from the old site: what was included and what it
// cost, on the preventivi page. The items column is a JSON list in MySQL and
// arrives as an array, each entry becomes a bullet of the row.
export default function PriceTable() {
  const { status, data } = useAsync(() => api.priceExamples(), []);
  const examples = data ? data.priceExamples : [];

  if (status === "ready" && examples.length === 0) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeading
          title="Esempi reali di preventivi"
          intro="Ogni voce è un allestimento che abbiamo realizzato, con quello che comprendeva e quanto è costato." />

        {status === "loading" ? (
          <p className="price-table__state">Caricamento in corso...</p>
        ) : null}

        {status === "error" ? (
          <p className="price-table__state">Gli esempi di preventivo non sono al momento disponibili.</p>
        ) : null}

        {examples.length > 0 ? (
          <table className="price-table">
            <caption className="visually-hidden">
              Esempi di preventivi con la descrizione di cosa comprendono e il prezzo pagato
            </caption>
            <thead className="price-table__head">
              <tr>
                <th scope="col">Allestimento</th>
                <th scope="col">Cosa comprende</th>
                <th scope="col">Prezzo</th>
              </tr>
            </thead>
            <tbody>
              {examples.map((example) => (
                <tr key={example.id} className="price-table__row">
                  <th scope="row" className="price-table__name">
                    {example.title}
                    {example.season ? (
                      <span className="price-table__season">{example.season}</span>
                    ) : null}
                    {example.description ? (
                      <span className="price-table__description">{example.description}</span>
                    ) : null}
                  </th>
                  <td className="price-table__cell" data-label="Cosa comprende">
                    <ul className="price-table__items">
                      {(example.items || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="price-table__cell price-table__cell--price" data-label="Prezzo">
                    <PriceTag from={example.price} note={example.price_note || undefined} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  );
}
