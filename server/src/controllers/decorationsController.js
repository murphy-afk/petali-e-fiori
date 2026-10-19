import { query } from "../db.js";

export async function listDecorations(req, res) {
  const decorations = await query(
    "SELECT id, name, slug, description, best_for, image, sort_order " +
      "FROM decorations WHERE published = 1 ORDER BY sort_order, id"
  );
  res.json({ decorations });
}
