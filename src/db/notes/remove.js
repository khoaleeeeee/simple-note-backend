import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
 * @typedef {Object} notes
 * @property {string} uuid - Optional UUID for the note
 * @property {string} user_uuid
 */

const logger = createLogger("db:notes:remove");

const remove = async (notes) => {
  assert(notes.user_uuid !== null, "user_uuid is required");
  assert(notes.uuid !== null, "title is required");
  logger.info("deleting notes: ", notes.uuid);

  try {
    const queryText = `
      DELETE FROM notes
      WHERE uuid = $1 AND user_uuid = $2
      RETURNING *;
    `;
    const values = [notes.uuid, notes.user_uuid];

    const result = await db.query(queryText, values);

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default remove;
