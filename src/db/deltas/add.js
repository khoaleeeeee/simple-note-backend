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

  // Get a client from the pool
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN'); // Start a transaction

    const results = [];
    for (const delta of noteDelta.deltas) {
      const queryText = `
        INSERT INTO note_deltas (note_uuid, delta)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [noteDelta.note_uuid, JSON.stringify(delta)];
      const result = await client.query(queryText, values);
      results.push(result.rows[0]); // Collect results
    }

    await client.query('COMMIT'); // Commit the transaction
    return results;
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback in case of error
    logger.error(err.message);
    throw err;
  } finally {
    client.release(); // Release the client back to the pool
  }
};
export default add;
