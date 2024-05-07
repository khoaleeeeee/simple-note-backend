import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";
import utils from "@/utils";

const logger = createLogger("db.settings.update");

/**
 * @typedef {Object} Setting  
 * @property {string} [name]
 * @property {string} [value]
 */

/**
 * @property {Settings} setting 
 * @property {string} user_uuid 
 */

const update = async (req, res) => {
  const { user_uuid, setting } = req.body;

  try {
    assert(user_uuid, "user_uuid is required");
    assert(setting.name, "name is required");

    const encryptedValue = await utils.encrypt(setting.value);
    if (setting.value) setting.value = encryptedValue;

    const settings = await db.settings.get({ uuid: user_uuid });
    const matchedSetting = settings.find((s) => s.name === setting.name);

    if (!matchedSetting) {
      res.json(await db.settings.add({ setting, user_uuid }));
    } else {
      res.json(await db.settings.update({ setting, user_uuid }));
    }

  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ error: error.message });
  }
}

export default update;
