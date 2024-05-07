import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
* @typedef {Object} settings
* @property {string} name 
* @property {string} value 
* @property {string} user_uuid
*/

const logger = createLogger("db.settings.update");

const update = async ({ setting, user_uuid }) => {
  assert(user_uuid !== null, "user_uuid is required");
  assert(setting.name !== null, "name is required");
  assert(setting.value !== null, "values is required");

  let queryText;
  let values;

  queryText = `
      UPDATE settings
      SET value = $2
      WHERE name = $1 AND user_uuid = $3
      RETURNING *;
    `;

  values = [setting.name, setting.value, user_uuid];

  try {
    const result = await db.query(queryText, values);
    return result.rows[0];
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
};

export default update;
