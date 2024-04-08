import db from "@/db";

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 */

const remove = async (req, res) => {
  const { user_uuid, uuid } = req.body;

  if (!user_uuid) {
    return res.status(500).send({ error: "user_uuid is required" });
  }

  try {
    const notes = await db.notes.remove({ user_uuid, uuid });

    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default remove;
