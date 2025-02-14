import pool from "../database";

export async function getUserById(id: string) {
  const query = "SELECT id, username FROM Users WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}
