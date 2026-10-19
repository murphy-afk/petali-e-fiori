// Express 4 does not catch rejected promises, so every controller is wrapped
// with this helper and its errors reach the central error handler.
export function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
