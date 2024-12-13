import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object} Note
 * @property {string} note_uuid - The UUID of the note
 */

const remove = async (note) => {
  assert(note && note.note_uuid, "note_uuid is required");

  const queryText = `
    DELETE FROM note_deltas 
    WHERE note_uuid = $1 
  `;
  const values = [note.note_uuid];

  try {
    const res = await db.query(queryText, values);
    return res.rows;
  } catch (error) {
    console.error("Error deleting note deltas:", error);
    throw error;
  }
};

export default remove;
