import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
 * @typedef {Object} notes
 * @typedef {Object} newNotes
 * @property {string} uuid - Optional UUID for the note
 * @property {string} user_uuid
 * @property {boolean} timeUpdate
 */

const logger = createLogger("db:notes:update");

const update = async (notes, newNotes, timeUpdate = true) => {
  assert(notes.user_uuid !== null, "user_uuid is required");
  assert(notes.uuid !== null, "uuid is required");

  try {
    // Initialize the parts of the query that dynamically change based on input
    let setClause = [];
    let values = [];
    let valueCount = 1;

    if (newNotes.user_uuid !== undefined) {
      setClause.push(`user_uuid = $${valueCount++}`);
      values.push(newNotes.user_uuid);
    }
    if (newNotes.title !== undefined) {
      setClause.push(`title = $${valueCount++}`);
      values.push(newNotes.title);
    }
    if (newNotes.content !== undefined) {
      setClause.push(`content = $${valueCount++}`);
      values.push(newNotes.content);
    }

    if (timeUpdate)
      setClause.push(`modified_at = NOW()`);

    // Build the final query string
    const queryText = `
      UPDATE notes
      SET ${setClause.join(', ')}
      WHERE uuid = $${valueCount}
    `;
    values.push(notes.uuid);

    const result = await db.query(queryText, values);
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (err) {
    logger.error("Error updating note:", err);
    throw err;
  }
};

export default update;
