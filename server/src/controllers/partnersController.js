import { query } from "../db.js";

export async function listPartners(req, res) {
  const partners = await query(
    "SELECT id, name, url, logo, description, sort_order " +
      "FROM partners WHERE published = 1 ORDER BY sort_order, id"
  );
  res.json({ partners });
}
