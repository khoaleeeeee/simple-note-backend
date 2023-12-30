import { Router } from "express";
import { createLogger } from "@/logger.js";
import openai from "./openai";
import notes from "./notes";

const logger = createLogger("http:routes:api");

const api = () => {
  const route = Router();

  route.use("/notes", notes());
  route.use("/openai", openai());

  // catch all errors
  route.use((err, _req, res, _next) => {
    logger.error(err.stack || err.message);
    res.status(400).json({ error: { message: err.message, code: err.code } });
  });

  return route;
};

export default api;
