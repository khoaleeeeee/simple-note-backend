import db from "@/db";
import assert from "assert";

/**
 * Retrieves a user by email or UUID.
 * @typedef {Object} user
 * @property {string} [email] - The user's email, optional.
 * @property {string} [uuid] - The user's UUID, optional.
 * @returns The user object if found.
 */
const get = async (user) => {
  assert(user.email || user.uuid, "Either email or uuid is required");

  let queryField, queryValue;
  if (user.email) {
    queryField = "email";
    queryValue = user.email;
  } else if (user.uuid) {
    queryField = "uuid";
    queryValue = user.uuid;
  }

  const queryText = `SELECT * FROM users WHERE ${queryField} = $1`;

  const result = await db.query(queryText, [queryValue]);
  return result.rows[0];
};

export default get;
