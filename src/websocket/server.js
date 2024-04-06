import { WebSocketServer } from "ws";
import connection from "./connection";
import { createLogger } from "@/logger.js";

const logger = createLogger("src:ws:server");

const devices = [];

const init = async (httpServer) => {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws) => {
    logger.info("New connection coming in...");
    const con = connection.create(ws);
    devices.push(con);
  });

  wss.on("close", (ws) => {
    logger.info("Connection closing...");
    const con = devices.find((c) => c.ws === ws);
    devices.splice(devices.indexOf(con), 1);
  });
};

export default { init };
