import crypto from 'crypto';

const decrypt = async (encryptedText) => {

  // Convert the hex string back to bytes
  const keyBytes = Buffer.from(process.env.SECRET_KEY, 'hex');  // Convert hex string to a byte buffer

  // Split the input into the IV and the encrypted data
  const textParts = encryptedText.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encrypted = Buffer.from(textParts.join(':'), 'hex');

  // Create a decipher with the correct key bytes
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBytes, iv);

  // Decrypt the data
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Return the plaintext
  return decrypted.toString();
};

export default decrypt;
