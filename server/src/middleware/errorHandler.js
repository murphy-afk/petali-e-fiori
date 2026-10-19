// 404 for unknown paths: JSON under /api, plain text anywhere else. The
// server side rendering catch all arrives in Session 6.
export function notFound(req, res) {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "Risorsa non trovata." });
    return;
  }
  res.status(404).type("text/plain; charset=utf-8").send("404 Not Found");
}

// Central error handler. Answers below 500 keep their own message, anything
// higher is reported as a generic Italian message so internals never leak.
export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }
  let status = Number.isInteger(error.status) ? error.status : 500;
  let message = "Errore interno del server.";

  if (error.type === "entity.parse.failed") {
    status = 400;
    message = "Il corpo della richiesta non è JSON valido.";
  } else if (status >= 400 && status < 500) {
    message = error.message;
  }

  if (status >= 500) {
    console.error("[error] " + req.method + " " + req.originalUrl, error);
  }
  res.status(status).json({ error: message });
}
