import Card from "./Card.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { api } from "../api/client.js";
import { useAsync } from "../utils/useAsync.js";
import { imageUrl } from "../utils/text.js";
import "./DecorationTypes.css";

// The decoration types the shop builds, shown on the decorazioni page. Each
// one carries the places it suits best; the shop has not written a
// description for every type, so the card renders what exists.
export default function DecorationTypes() {
  const { status, data } = useAsync(() => api.decorations(), []);
  const decorations = data ? data.decorations : [];

  if (status === "ready" && decorations.length === 0) return null;

  return (
    <section className="section section--tight">
      <div className="container">
        <SectionHeading
          title="Le tipologie di Decorazione"
          intro="Dalla più classica alla più moderna, per Chiesa, Comune, ristorante e casa degli Sposi." />

        {status === "loading" ? (
          <p className="decoration-types__state">Caricamento in corso...</p>
        ) : null}

        {status === "error" ? (
          <p className="decoration-types__state">Le tipologie di Decorazione non sono al momento disponibili.</p>
        ) : null}

        {decorations.length > 0 ? (
          <div className="grid grid--cards">
            {decorations.map((decoration) => (
              <Card
                key={decoration.slug}
                image={decoration.image ? imageUrl(decoration.image) : undefined}
                alt={decoration.name}
                title={decoration.name}
                titleAs="h3"
                text={decoration.description}
                footer={
                  decoration.best_for ? (
                    <p className="decoration-types__best">
                      <span className="decoration-types__best-label">Ideale per</span>
                      {decoration.best_for}
                    </p>
                  ) : null
                } />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
