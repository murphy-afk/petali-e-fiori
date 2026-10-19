// Builds an Error that carries an HTTP status for the central error handler.
export function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
