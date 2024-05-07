import db from '@/db';
import { createLogger } from '@/logger';

const logger = createLogger('secret.create');

const create = async () => {
  try {

    const queryText = `
      DELETE FROM settings
      WHERE user_uuid = $1;
    `;

    const values = [process.env.ADMIN_UUID];

    await db.query(queryText, values);
    // const secretKey = crypto.randomBytes(32).toString('hex');

    await db.settings.add({
      setting: {
        name: 'secretKey',
        value: process.env.SECRET_KEY
      },
      user_uuid: process.env.ADMIN_UUID
    });
  } catch (err) {
    logger.error(err.message);
  }
}

export default { create }

