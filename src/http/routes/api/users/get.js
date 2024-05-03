import db from "@/db";

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 */

const get = async (req, res) => {
  const { uuid, email } = req.query;

  if (!uuid && !email) {
    return res.status(400).send({ error: "user's uuid or email is required" });
  }

  try {
    const user = await db.users.get({ uuid, email });

    res.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error.message });
  }
};

export default get;
