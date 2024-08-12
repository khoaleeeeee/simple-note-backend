import db from "@/db";
import assert from "assert";
import crypto from "crypto";

async function generateKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

/**
 * @typedef {Object} user
 * @property {string} name
 * @property {string} email
 * @property {string} picture
 * @property {string} service
 */

const add = async (user) => {
  assert(user.name, "name is required");
  assert(user.service, "service is required");
  assert(user.email, "email is required");

  const key = await generateKey();

  const queryText =
    "INSERT INTO users (name, service, email, picture, key) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [user.name, user.service, user.email, user.picture, key];

  const result = await db.query(queryText, values);

  return result.rows[0];
};

export default add;
