import db from "@/db";
import assert from "assert";
/**
 * @typedef {Object} user
 * @property {string} email
 */
const get = async (user) => {
  assert(user.email, "email is required");

  const values = [user.email];
  const queryText = "SELECT * FROM users WHERE email = $1";

  const result = await db.query(queryText, values);
  return result.rows[0];
};

export default get;
