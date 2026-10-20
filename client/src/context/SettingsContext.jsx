import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

// Shop facts as they live in ROADMAP.md section 3, they keep the shell usable
// while the API is loading and when it cannot be reached. The database always
// wins as soon as it answers.
const FALLBACK_SETTINGS = {
  brand_name: "Petali e Fiori",
  tagline: "Per il vostro Sogno d'Amore, scegliete chi possa realizzare i Vostri sogni.",
  claim: "Insomma il nostro obiettivo è realizzare i Vostri Sogni!",
  flower_designer: "Valeria Sciandra",
  flower_designer_role: "Flower Designer diplomata",
  address_street: "Via Arzaga 24",
  address_city: "Milano",
  address_zip: "20146",
  metro: "MM1 fermata Primaticcio",
  phone_landline: "02 23167849",
  phone_mobile: "331 8603337",
  email: "info@petaliefiori.it",
  vat_number: "07036590961",
  copyright: "Copyright Petaliefiori 2011",
  partner_name: "Autonoleggio Bellani",
  partner_url: "http://www.autonoleggiobellani.com",
  contact_hint:
    "Potete darci qualche indicazione di cosa preferite: la tipologia di fiori, il tipo di addobbo, se desiderate la camminata o meno e soprattutto se desiderate il nostro Progetto Virtuale Gratuito!",
  quote_title: "Preventivo gratuito e Progetto Virtuale gratuito",
  quote_text:
    "Contattateci per avere il Vostro preventivo gratuito. Insieme ad esso avrete il Vostro Progetto Virtuale, anch'esso completamente gratuito e sviluppato su un'immagine del luogo ove si svolgerà l'Evento.",
  cta_quote: "Richiedi il preventivo gratuito",
  cta_gallery: "Guarda la gallery",
  cta_contact: "Contattaci",
  footer_note: "Allestimenti floreali per matrimoni, eventi e meeting a Milano.",
};

const SettingsContext = createContext({
  settings: FALLBACK_SETTINGS,
  status: "loading",
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(FALLBACK_SETTINGS);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    api
      .settings()
      .then((payload) => {
        if (!active) return;
        setSettings({ ...FALLBACK_SETTINGS, ...payload.settings });
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ settings, status }), [settings, status]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSetting(key) {
  const { settings } = useContext(SettingsContext);
  return settings[key] || "";
}
