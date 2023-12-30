import "./alias";
import httpServer from "./http/server";
import { createLogger } from "./logger";

const logger = createLogger("src:index");

httpServer.emitter.on("ready", () => {
  logger.info("Http server is ready");
});

httpServer.start().then(() => {
  logger.info("Http server is started");
});
