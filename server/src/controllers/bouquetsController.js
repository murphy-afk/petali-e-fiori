import { query } from "../db.js";

// Optional filter: /api/bouquets?style=decorativo
export async function listBouquets(req, res) {
  const style =
    typeof req.query.style === "string" ? req.query.style.trim() : "";
  let sql =
    "SELECT id, name, slug, style, description, price_min, price_max, image, sort_order " +
    "FROM bouquets WHERE published = 1";
  const params = [];
  if (style) {
    sql += " AND style = ?";
    params.push(style);
  }
  sql += " ORDER BY sort_order, id";
  const bouquets = await query(sql, params);
  res.json({ bouquets });
}
