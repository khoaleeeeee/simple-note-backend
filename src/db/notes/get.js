import db from "@/db";
import update from "./update";
import assert from "assert";

function applyDeltasToNote(note, deltas) {
  // Sort deltas by their index and by modification time in case of conflict at the same index
  deltas.sort((a, b) => {
    if (a.index === b.index) {
      return b.modified_at - a.modified_at;  // Ensure the latest modification takes precedence
    }
    return a.index - b.index;
  });

  // Apply each delta to the note content
  for (const delta of deltas) {
    if (delta.operation === "insert") {
      note = note.slice(0, delta.index) + delta.text + note.slice(delta.index);
    } else if (delta.operation === "delete") {
      // Ensure the deletion does not exceed the bounds of the current note content
      const endDeleteIndex = delta.index + delta.length;
      if (endDeleteIndex <= note.length) {
        note = note.slice(0, delta.index) + note.slice(endDeleteIndex);
      } else {
        // If the delete index is beyond the current length, just slice up to the delete index
        note = note.slice(0, delta.index);
      }
    }
  }

  return note;
}

const concatDeltas = (deltas) => {
  let content = ''
  deltas.forEach((delta) => {
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


const getContent = async (note) => {

  let deltas = await db.deltas.get({ note_uuid: note.uuid });

  await db.deltas.remove({ note_uuid: note.uuid });

  let content = "";

  if (note.content) {
    content = applyDeltasToNote(note.content, deltas);
  } else {
    content = concatDeltas(deltas);
  }

  await update(note, { content });

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
      const content = await getContent(note);
      return {
        ...note,
        content,
      };
    })
  );

  return notesWithContent;
};

export default get;
