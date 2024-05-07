import db from "@/db";
import utils from "@/utils";

/**
 * @typedef {Object} user
 * @property {string} user_uuid
 */

const get = async (req, res) => {
  const { user_uuid } = req.query;

  if (!user_uuid) {
    return res.status(400).send({ error: "user_uuid is required" });
  }

  try {
    let settings = await db.settings.get({ uuid: user_uuid });

    const resolvedSettings = await Promise.all(settings.map(async (setting) => {
      if (setting.value) {
        setting.value = await utils.decrypt(setting.value);
      }
      return setting;
    }));

    res.json(resolvedSettings || []);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).send({ error: error.message });
  }
};

export default get;
