import "dotenv/config";
import "./alias";
import httpServer from "./http/server";
import websocketServer from "./websocket/server";
import { createLogger } from "./logger";

const logger = createLogger("src:index");

(async () => {
  let servers = {
    http: null,
    websocket: null,
  };

  httpServer.emitter.on("ready", () => {
    logger.info("Http server is ready");
  });

  logger.info("Starting http server");
  servers.http = await httpServer.start();
  logger.info("Http server is started");

  logger.info("Starting websocket server");
  await websocketServer.init(servers.http);
  logger.info("Websocket server is started");
})();
