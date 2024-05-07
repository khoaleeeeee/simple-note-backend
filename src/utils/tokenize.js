import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user object.
 *
 * @param {Object} user - The user object to tokenize, typically containing user-specific details.
 * @param {number} expiresIn - Duration in seconds or a string describing a time span for the token to expire. Eg: 60, "2 days", "10h", "7d".
 * @returns {string} A JWT string representing the claims about the user.
 */
const tokenize = (user, expiresIn = '1h') => {
  const token = jwt.sign(
    { data: user },
    process.env.SECRET_KEY,
    { expiresIn }
  );
  return token;
}

export default tokenize;

