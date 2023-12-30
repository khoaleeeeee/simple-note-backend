import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object} user
 * @property {string} username
 * @property {string} password
 * @property {string} [email]
 */

const add = async (user) => {
  assert(user.username, "username is required");
  assert(user.password, "password is required");
  assert(user.email, "email is required");

  const queryText =
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
  const values = [user.username, user.password, user.email];

  return await db.query(queryText, values);
};

export default add;
