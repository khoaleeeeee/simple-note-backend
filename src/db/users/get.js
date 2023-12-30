import db from "@/db";
import assert from "assert";
/**
 * @typedef {Object} user
 * @property {string} username
 * @property {string} password
 * @property {string} [email]
 */
const get = async (user) => {
  assert(user.username, "username is required");
  assert(user.password, "password is required");

  const values = [user.username, user.password];
  const queryText = "SELECT * FROM users WHERE username = $1 AND password = $2";

  return await db.query(queryText, values);
};

export default get;
