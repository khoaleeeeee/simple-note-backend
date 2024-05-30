import db from "@/db";
import assert from "assert";
import get from "./get"
import { createLogger } from "@/logger";

const logger = createLogger("db.notes.add");
/**
 * @typedef {Object} notes
 * @property {string} [uuid] - Optional UUID for the note
 * @property {string} user_uuid
 * @property {string} title
 * @property {string} content
 */

const add = async (notes) => {
  assert(notes.user_uuid !== null, "user_uuid is required");
  assert(notes.content !== null, "content is required");

  let queryText;
  let values;

  if (notes.uuid) {
    queryText = `
      UPDATE notes
      SET user_uuid = $1, title = $2, modified_at = NOW()
      WHERE uuid = $3
      RETURNING *;
    `;
    values = [notes.user_uuid, notes.title, notes.uuid];
  } else {
    queryText = `
      INSERT INTO notes (user_uuid, title, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    values = [notes.user_uuid, notes.title, notes.content];
  }

  try {
    // update title and modified_at only
    // as content is stored as deltas
    const result = await db.query(queryText, values);

    if (notes.deltas)
      await db.deltas.add({
        note_uuid: result.rows[0].uuid,
        deltas: notes.deltas,
      });

    await get({ user_uuid: notes.user_uuid });

    return result.rows[0];
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
};

export default add;
