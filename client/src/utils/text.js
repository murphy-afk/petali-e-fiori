// Splits a long database text into paragraphs, the body column keeps the
// original blank lines between them.
export function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

// Anchor id of a section heading: lowercase, without accents, with the
// non letter characters collapsed into dashes. Ids stay stable between
// builds because they only depend on the heading text.
export function headingId(title, used) {
  const base =
    String(title)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "sezione";

  if (!used) return base;

  // Two headings with the same words must keep two different anchors.
  let id = base;
  let suffix = 2;
  while (used.has(id)) {
    id = base + "-" + suffix;
    suffix += 1;
  }
  used.add(id);
  return id;
}

// Reads a page body that may carry section headings written as a line
// starting with "## ", the convention used by db/seed.sql. The text before
// the first heading stays as the intro, every heading opens a section with
// the paragraphs that follow it.
export function splitSections(text) {
  const intro = [];
  const sections = [];
  const used = new Set();

  for (const block of splitParagraphs(text)) {
    if (block.startsWith("## ")) {
      const title = block.slice(3).trim();
      sections.push({ id: headingId(title, used), title, paragraphs: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].paragraphs.push(block);
    } else {
      intro.push(block);
    }
  }

  return { intro, sections };
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
