import { useCallback, useEffect, useState } from "react";

// Runs an async loader and returns the three states every content page needs:
// loading, ready with the data, error with the message to show the visitor.
export function useAsync(loader, deps = []) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  const run = useCallback(() => {
    let active = true;
    setState({ status: "loading", data: null, error: null });
    loader()
      .then((data) => {
        if (active) setState({ status: "ready", data, error: null });
      })
      .catch((error) => {
        if (active) setState({ status: "error", data: null, error });
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => run(), [run]);

  return state;
}
