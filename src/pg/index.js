import pg from "pg";

const config = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL, ssl: {
    rejectUnauthorized: false
  }
} : {
  password: process.env.PG_PASSWORD,
  user: "postgres",
  password: '9781331',
  host: "localhost",
  database: "noteapp",
  port: 5432,
}

const pool = new pg.Pool(config);

/**
 * Send query to database.
 * @param {string} query
 * @param {Array} params
 * @returns {Promise<pg.QueryResult>}
 */
const query = async (query, params) => await pool.query(query, params);

export { pool, query };
