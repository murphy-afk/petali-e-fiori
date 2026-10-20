import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";

const container = document.getElementById("root");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
