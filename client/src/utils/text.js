// Splits a long database text into paragraphs, the body column keeps the
// original blank lines between them.
export function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// Image paths inside the API payloads are relative to /images.
export function imageUrl(file) {
  if (!file) return "";
  if (/^(https?:)?\/\//.test(file) || file.startsWith("/")) return file;
  return "/images/" + file.replace(/^\/+/, "");
}
