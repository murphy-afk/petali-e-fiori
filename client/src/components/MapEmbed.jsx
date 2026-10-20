import { useSettings } from "../context/SettingsContext.jsx";
import "./MapEmbed.css";

// Coordinates of the shop, geocoded from the address with the Nominatim
// service of OpenStreetMap: Via Arzaga 24, 20146 Milano. The bbox frames the
// block around the shop the same way the old static map did.
const LAT = 45.4559739;
const LON = 9.1345654;
const BBOX = { west: 9.1295, south: 45.4535, east: 9.1397, north: 45.4585 };

const EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html" +
  "?bbox=" +
  BBOX.west +
  "%2C" +
  BBOX.south +
  "%2C" +
  BBOX.east +
  "%2C" +
  BBOX.north +
  "&layer=mapnik&marker=" +
  LAT +
  "%2C" +
  LON;

const DETAIL_URL =
  "https://www.openstreetmap.org/?mlat=" +
  LAT +
  "&mlon=" +
  LON +
  "#map=18/" +
  LAT +
  "/" +
  LON;

// Interactive map of where the shop is. The iframe loads only when it scrolls
// into view, so it never blocks the first paint of the page.
export default function MapEmbed() {
  const { settings } = useSettings();
  const cityLine = settings.address_zip + " " + settings.address_city;

  return (
    <div className="map-embed">
      <iframe
        className="map-embed__frame"
        title={"Mappa di " + settings.address_street + ", " + cityLine}
        src={EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer"></iframe>
      <p className="map-embed__link">
        <a href={DETAIL_URL} target="_blank" rel="noopener noreferrer">
          Apri la mappa in OpenStreetMap
        </a>
        <span className="map-embed__credit">
          Dati cartografici di OpenStreetMap, licenza ODbL
        </span>
      </p>
    </div>
  );
}
