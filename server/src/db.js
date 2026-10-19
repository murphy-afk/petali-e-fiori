// Shared mysql2 connection pool. Every database access in the project goes
// through query() or queryOne(), which log and rethrow any failure so no
// promise rejection can stay unhandled.
import mysql from "mysql2/promise";
import { config } from "./config.js";

export const pool = mysql.createPool(config.db);

export async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(
      "[db] " + error.message + " | sql: " + sql.replace(/\s+/g, " ").trim()
    );
    throw error;
  }
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function closePool() {
  await pool.end();
}
