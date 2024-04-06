import express from "express";
import { createLogger } from "@/logger.js";
import { EventEmitter } from "events";
import routes from "./routes";
import cors from "cors";

let emitter = new EventEmitter();

let server = null;
let app = null;
const PORT = 8001;

const logger = createLogger("src:http:index");

logger.info(`Starting server on port ${PORT}`);
app = express();
app.use(cors());

app.use(express.json());
app.use("/", routes());

const start = () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
      emitter.emit("ready");
      resolve(server);
    });
  });
};
export default { start, emitter, server };
