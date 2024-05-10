import db from "@/db";
import assert from "assert";
import { createLogger } from "@/logger";

/**
* @property {string} user
*/

const logger = createLogger("db.settings.get");

const get = async (user) => {
  assert(user.uuid !== null, "user uuid is required");

  let queryText;
  let values;

  queryText = `
      SELECT * FROM settings
      WHERE user_uuid = $1;
    `;

  values = [user.uuid];

  try {
    const result = await db.query(queryText, values);
    return result.rows;
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
};

export default get;
