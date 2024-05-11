import express from "express";
import { createLogger } from "@/logger.js";
import { EventEmitter } from "events";
import routes from "./routes";
import cors from "cors";
import cookieParser from 'cookie-parser'

let emitter = new EventEmitter();

let server = null;
let app = null;
const PORT = process.env.PORT || 8001

const logger = createLogger("src:http:index");

logger.info(`Starting server on port ${PORT}`);
app = express();
app.use(cors(
  {
    origin: ['http://localhost:8000',
      'https://mynotehub.netlify.app',
      'https://notehub.khoadev.com'
    ],
    credentials: true
  }
));
app.use(cookieParser());

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
