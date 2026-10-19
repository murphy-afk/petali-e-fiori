import { query } from "../db.js";

// Shop facts as a key/value object, ready to spread into the UI.
export async function listSettings(req, res) {
  const rows = await query(
    "SELECT setting_key, setting_value FROM settings ORDER BY setting_key"
  );
  const settings = {};
  for (const row of rows) settings[row.setting_key] = row.setting_value;
  res.json({ settings });
}
