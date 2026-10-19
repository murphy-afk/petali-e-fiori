import { query } from "../db.js";

// The items column is JSON in MySQL and comes back as a real array.
export async function listPriceExamples(req, res) {
  const priceExamples = await query(
    "SELECT id, title, season, description, items, price, price_note, image, sort_order " +
      "FROM price_examples WHERE published = 1 ORDER BY sort_order, id"
  );
  res.json({ priceExamples });
}
