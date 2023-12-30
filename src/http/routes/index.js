import { Router } from "express";
import api from "./api";
import { createLogger } from "@/logger";

const logger = createLogger("http:routes");

const routes = () => {
  const router = Router();

  router.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
    next();
  });

  router.use("/api", api());

  return router;
};

export { routes as default };
