import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
 * @typedef {Object} notes
 * @property {string} [uuid] - Optional UUID for the note
 * @property {string} user_uuid
 * @property {string} title
 * @property {string} content
 */

const add = async (notes) => {
  assert(notes.user_uuid !== null, "user_uuid is required");
  assert(notes.title !== null, "title is required");
  assert(notes.content !== null, "content is required");

  let queryText;
  let values;

  if (notes.uuid) {
    queryText = `
      UPDATE notes
      SET user_uuid = $1, title = $2, content = $3, modified_at = NOW()
      WHERE uuid = $4
      RETURNING *;
    `;
    values = [notes.user_uuid, notes.title, notes.content, notes.uuid];
  } else {
    queryText = `
      INSERT INTO notes (user_uuid, title, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    values = [notes.user_uuid, notes.title, notes.content];
  }

  try {
    const result = await db.query(queryText, values);

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default add;
