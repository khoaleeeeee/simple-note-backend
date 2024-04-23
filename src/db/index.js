import { pool, query } from "@/pg";
import users from "./users";
import notes from "./notes";
import deltas from "./deltas";

export { query, notes, users, deltas };
export default {
  pool,
  query,
  notes,
  users,
  deltas,
};
