import crypto from 'crypto';
import db from '@/db';

// Function to encrypt text using AES-256-CBC
const encrypt = async (text) => {
  // Retrieve the secret key from the database
  const settings = await db.settings.get({ uuid: process.env.ADMIN_UUID, name: 'secretKey' });
  const secretKey = settings.find((s) => s.name === 'secretKey')?.value;

  // Convert hex string back to bytes to use as the AES key
  const keyBytes = Buffer.from(secretKey, 'hex');

  // Generate a random IV (Initialization Vector)
  const iv = crypto.randomBytes(16); // AES block size in bytes

  // Create cipher instance specifying algorithm, key, and iv
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBytes, iv);

  // Encrypt the data
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Return the IV and the encrypted data in hex format, joined by ':'
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export default encrypt;
