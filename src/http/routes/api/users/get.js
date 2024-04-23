import db from "@/db";

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 */

const get = async (req, res) => {
  const { uuid } = req.query;

  if (!uuid) {
    return res.status(400).send({ error: "user's uuid is required" });
  }

  try {
    const user = await db.users.get({ uuid });

    res.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error.message });
  }
};

export default get;
