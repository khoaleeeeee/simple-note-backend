import { pool, query } from "@/pg";
import users from "./users";
import notes from "./notes";
import deltas from "./deltas";
import settings from "./settings";

export { query, notes, users, deltas, settings };
export default {
  pool,
  query,
  notes,
  users,
  deltas,
  settings,
};
