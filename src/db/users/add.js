import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object} user
 * @property {string} name
 * @property {string} email
 * @property {string} picture
 * @property {string} service
 */

const add = async (user) => {
  assert(user.name, "name is required");
  assert(user.service, "service is required");
  assert(user.email, "email is required");

  const queryText =
    "INSERT INTO users (name, service, email, picture) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user.name, user.service, user.email, user.picture];

  const result = await db.query(queryText, values);

  return result.rows[0];
};

export default add;
