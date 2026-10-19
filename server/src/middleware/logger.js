// One line per finished request: method, path, status and duration.
export function requestLogger() {
  return (req, res, next) => {
    const start = process.hrtime.bigint();
    res.on("finish", () => {
      const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
      console.log(
        req.method +
          " " +
          req.originalUrl +
          " " +
          res.statusCode +
          " " +
          durationMs.toFixed(1) +
          "ms"
      );
    });
    next();
  };
}
