import { Router } from "express";
import { createLogger } from "@/logger.js";
import openai from "./openai";
import notes from "./notes";
import auth from "./auth";
import users from "./users";
import settings from "./settings";
import signout from "./signout";

const logger = createLogger("http:routes:api");

const api = () => {
  const route = Router();

  route.use("/notes", notes());
  route.use("/openai", openai());
  route.use("/auth", auth());
  route.use("/users", users());
  route.use("/settings", settings());
  route.use("/signout", signout());

  // catch all errors
  route.use((err, _req, res, _next) => {
    logger.error(err.stack || err.message);
    res.status(400).json({ error: { message: err.message, code: err.code } });
  });

  return route;
};

export default api;
