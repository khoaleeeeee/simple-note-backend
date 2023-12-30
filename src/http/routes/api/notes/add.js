import db from "@/db";
import assert from "assert";

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 * @property {string} title
 * @property {string} content
 */

const add = async (req, res) => {
  const notes = req.body;

  assert(notes, "notes is required");
  assert(notes.user_uuid, "user_uuid is required");

  try {
    const addedNotes = await db.notes.add(notes);

    res.json(addedNotes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default add;
