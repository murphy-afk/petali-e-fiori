// Splits a long database text into paragraphs, the body column keeps the
// original blank lines between them.
export function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// Image paths inside the API payloads are relative to the images folder. The
// base prefix comes from Vite so the same code works at the root of a domain
// and inside a subfolder such as a GitHub Pages project site.
export function imageUrl(file) {
  if (!file) return "";
  if (/^(https?:)?\/\//.test(file)) return file;
  const base = import.meta.env.BASE_URL || "/";
  return base + "images/" + file.replace(/^\/+/, "");
}
