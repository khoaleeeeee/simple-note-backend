import db from "@/db";

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 */

const get = async (req, res) => {
  const { user_uuid } = req.query;

  if (!user_uuid) {
    return res.status(400).send({ error: "user_uuid is required" });
  }

  try {
    const notes = await db.notes.get({ user_uuid });

    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default get;
