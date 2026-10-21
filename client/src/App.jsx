import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { pageRoutes, serviceRoutes } from "./routes.js";

// Base path of the site, "/" at the root of a domain and "/repo/" inside a
// subfolder such as a GitHub Pages project site. The router needs it without
// the trailing slash, and an empty string at the root.
const BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, "");

// The browser keeps the scroll position between two routes, every navigation
// here starts again from the top of the new page.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter basename={BASENAME}>
        <ScrollToTop />
        <div className="site">
          <a className="skip-link" href="#contenuto">Vai al contenuto</a>
          <Header />
          <main id="contenuto" className="site-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {serviceRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ServicePage slug={route.slug} />} />
              ))}
              {pageRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<StaticPage slug={route.slug} />} />
              ))}
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}
