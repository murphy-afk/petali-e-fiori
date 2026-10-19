import { query, queryOne } from "../db.js";
import { httpError } from "../middleware/httpError.js";

// The list stays light, the long body is only served on the single page.
export async function listPages(req, res) {
  const pages = await query(
    "SELECT slug, meta_title, meta_description, intro, hero_image, updated_at " +
      "FROM pages WHERE published = 1 ORDER BY id"
  );
  res.json({ pages });
}

export async function getPage(req, res) {
  const page = await queryOne(
    "SELECT * FROM pages WHERE slug = ? AND published = 1",
    [req.params.slug]
  );
  if (!page) throw httpError(404, "Pagina non trovata.");
  res.json({ page });
}
