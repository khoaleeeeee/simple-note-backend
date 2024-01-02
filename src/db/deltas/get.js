import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object} Note
 * @property {string} note_uuid - The UUID of the note
 */

const get = async (note) => {
  assert(note && note.note_uuid, "note_uuid is required");

  const queryText = `
    SELECT * FROM note_deltas 
    WHERE note_uuid = $1 
    ORDER BY modified_at ASC;
  `;
  const values = [note.note_uuid];

  try {
    const res = await db.query(queryText, values);
    return res.rows;
  } catch (error) {
    console.error("Error fetching note deltas:", error);
    throw error;
  }
};

export default get;
