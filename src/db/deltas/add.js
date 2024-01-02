import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
 * @typedef {Object} Delta - The delta object
 * @property {string} operation - The operation to perform, either 'insert' or 'delete'
 * @property {number} index - The index to insert or delete
 * @property {string} [text] - The text to insert
 * @property {number} [length] - The length to delete
 */

/**
 * @typedef {Object} NoteDelta - The note delta object
 * @property {string} note_uuid - The UUID of the note
 * @property {Delta[]} deltas - The array of deltas
 */

const logger = createLogger("NoteDeltaAdd");

const add = async (noteDelta) => {
  assert(noteDelta.note_uuid, "note_uuid is required");
  assert(noteDelta.deltas, "deltas are required");

  try {
    const insertPromises = noteDelta.deltas.map((delta) => {
      const queryText = `
        INSERT INTO note_deltas (note_uuid, delta)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [noteDelta.note_uuid, JSON.stringify(delta)];
      return db.query(queryText, values);
    });

    const results = await Promise.all(insertPromises);
    return results.map((result) => result.rows[0]);
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
};

export default add;
