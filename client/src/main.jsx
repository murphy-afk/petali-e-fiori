import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";

// A static host such as GitHub Pages answers unknown paths with 404.html,
// which carries the visitor back here with the wanted path inside the query
// string. It is rewritten into a real URL before the router reads the location.
const shimMatch = window.location.search.match(/^\?\/(.*)$/);
if (shimMatch) {
  window.history.replaceState(null, "", import.meta.env.BASE_URL + shimMatch[1]);
}

const container = document.getElementById("root");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
