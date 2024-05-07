import db from "@/db";
import utils from "@/utils";
import { createLogger } from "@/logger";

const logger = createLogger("http:routes:api:users");

/**
 * @typedef {Object} notes
 * @property {string} user_uuid
 */

const get = async (req, res) => {
  const sessionToken = req.cookies.sessionToken;

  logger.info("GET /api/users", { sessionToken });

  if (!sessionToken) {
    return res.status(401).json({ error: 'No session token provided' });
  }

  try {
    const { data } = utils.detokenize(sessionToken);

    const { uuid, email } = data;

    if (!uuid && !email) {
      return res.status(400).send({ error: "user's uuid or email is required" });
    }

    const user = await db.users.get({ uuid, email });

    res.json(user);
  } catch (error) {

    logger.error("Error fetching users:", error);

    if (error.message === "Token expired") {
      return res.status(403).send({ error: error.message });
    }

    return res.status(500).send({ error: error.message });
  }
};

export default get;
