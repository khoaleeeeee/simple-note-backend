import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "9781331",
  host: "localhost",
  database: "noteapp",
  port: 5432,
});

/**
 * Send query to database.
 * @param {string} query
 * @param {Array} params
 * @returns {Promise<pg.QueryResult>}
 */
const query = async (query, params) => await pool.query(query, params);

export { query as default };
