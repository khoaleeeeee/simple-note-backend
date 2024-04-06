import pg from "pg";

const pool = new pg.Pool({
  // connectionString: process.env.DATABASE_URL,
  password: "9781331",
  user: "postgres",
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
