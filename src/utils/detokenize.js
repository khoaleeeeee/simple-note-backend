import jwt from "jsonwebtoken";

/**
 * Verifies the provided session token.
 *
 * @param {string} token - The JWT to verify.
 * @returns {object|null} The decoded token if valid, or null if invalid or expired.
 */
const verifySessionToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw new Error("Invalid token");
  }
};

module.exports = verifySessionToken;
