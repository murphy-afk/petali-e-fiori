import { query } from "../db.js";

// Image paths are relative to the /images prefix served by the client, so a
// path such as "bouquet/bouquet-degas.jpg" becomes /images/bouquet/bouquet-degas.jpg.
// Optional filter: /api/gallery?category=chiesa
export async function listGalleryImages(req, res) {
  const category =
    typeof req.query.category === "string" ? req.query.category.trim() : "";
  let sql =
    "SELECT id, category, file, alt, caption, sort_order " +
    "FROM gallery_images WHERE published = 1";
  const params = [];
  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }
  sql += " ORDER BY category, sort_order, id";
  const images = await query(sql, params);

  const rows = await query(
    "SELECT category, COUNT(*) AS count FROM gallery_images " +
      "WHERE published = 1 GROUP BY category ORDER BY category"
  );
  const categories = rows.map((row) => ({
    category: row.category,
    count: Number(row.count),
  }));

  res.json({ images, categories });
}
