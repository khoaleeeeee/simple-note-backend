import db from "@/db";
import assert from "assert";
/**
 * @typedef {Object} User
 * @property {string} user_uuid
 */
const get = async (user) => {
  assert(user.user_uuid, "user_uuid is required");

  const queryText =
    "SELECT * FROM notes WHERE user_uuid = $1 ORDER BY modified_at DESC";
  const values = [user.user_uuid];

  const res = await db.query(queryText, values);
  const notes = res.rows;

  if (notes.length === 0) return [];


  const notesWithContent = await Promise.all(
    notes.map(async (note) => {
      const deltas = await db.deltas.get({ note_uuid: note.uuid });
      return {
        ...note,
        deltas
      };
    })
  );

  return notesWithContent;
};

export default get;
