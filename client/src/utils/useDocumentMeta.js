import { useEffect } from "react";

// Sets the document title and meta description while the site is rendered by
// the client. Session 6 moves the same values into server side rendering, the
// hook then only fills the gaps on route changes.
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
