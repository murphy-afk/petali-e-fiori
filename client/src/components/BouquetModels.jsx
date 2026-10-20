import Card from "./Card.jsx";
import PriceTag from "./PriceTag.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { api } from "../api/client.js";
import { useAsync } from "../utils/useAsync.js";
import { imageUrl } from "../utils/text.js";
import "./BouquetModels.css";

// The eight bouquet models of the shop with their real price range, shown on
// the bouquet page. The style of each model comes from the bouquets table.
export default function BouquetModels() {
  const { status, data } = useAsync(() => api.bouquets(), []);
  const bouquets = data ? data.bouquets : [];

  if (status === "ready" && bouquets.length === 0) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeading
          title="I nostri Bouquet"
          intro="Ogni modello è studiato insieme alla Sposa: lo stesso disegno può essere realizzato con i fiori che preferite." />

        {status === "loading" ? (
          <p className="bouquet-models__state">Caricamento in corso...</p>
        ) : null}

        {status === "error" ? (
          <p className="bouquet-models__state">I modelli di Bouquet non sono al momento disponibili.</p>
        ) : null}

        {bouquets.length > 0 ? (
          <div className="grid grid--cards">
            {bouquets.map((bouquet) => (
              <Card
                key={bouquet.slug}
                image={bouquet.image ? imageUrl(bouquet.image) : undefined}
                alt={bouquet.name}
                title={bouquet.name}
                titleAs="h3"
                text={bouquet.description}
                price={
                  <PriceTag from={bouquet.price_min} to={bouquet.price_max} label={bouquet.style} />
                } />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
