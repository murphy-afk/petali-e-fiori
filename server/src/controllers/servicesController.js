import { query, queryOne } from "../db.js";
import { httpError } from "../middleware/httpError.js";

export async function listServices(req, res) {
  const services = await query(
    "SELECT id, slug, name, summary, hero_image, hero_images, menu_group, sort_order, updated_at " +
      "FROM services WHERE published = 1 ORDER BY menu_group, sort_order, id"
  );
  res.json({ services });
}

export async function getService(req, res) {
  const service = await queryOne(
    "SELECT * FROM services WHERE slug = ? AND published = 1",
    [req.params.slug]
  );
  if (!service) throw httpError(404, "Servizio non trovato.");
  res.json({ service });
}
