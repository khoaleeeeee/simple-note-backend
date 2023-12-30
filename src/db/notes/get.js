import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object}  user
 * @property {string} user_uuid
 */

const get = async (user) => {
  assert(user.user_uuid, "user_uuid is required");

  const values = [user.user_uuid];

  const queryText =
    "SELECT * FROM notes WHERE user_uuid = $1 ORDER BY modified_at DESC";

  const res = await db.query(queryText, values);
  const notes = res.rows;

  return notes || [];
};

export default get;
