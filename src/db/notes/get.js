import db from "@/db";
import assert from "assert";

const concatDeltas = async (uuid) => {
  const deltas = await db.deltas.get({ note_uuid: uuid });

  let content = "";

  deltas.forEach(({ delta }) => {
    if (delta.operation === "insert") {
      content =
        content.slice(0, delta.index) + delta.text + content.slice(delta.index);
    } else if (delta.operation === "delete") {
      content =
        content.slice(0, delta.index) +
        content.slice(delta.index + delta.length);
    }
  });

  return content;
};

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
      const content = await concatDeltas(note.uuid);
      return {
        ...note,
        content,
      };
    })
  );

  return notesWithContent;
};

export default get;
