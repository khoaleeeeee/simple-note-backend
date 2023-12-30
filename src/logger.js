import winston from "winston";

const getFormat = (label) => {
  return winston.format.combine(
    winston.format.label({ label }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.level.toUpperCase()}] (${info.label}) ${
        info.message
      }`;
    })
  );
};

const getTransports = (label) => [
  new winston.transports.Console({
    format: winston.format.combine(
      getFormat(label),
      winston.format.colorize({ all: true })
    ),
  }),
  // TODO: use database to store the logs instead.
  new winston.transports.File({ filename: "logs/combined.log" }),
];

const createLogger = (label) => {
  const transports = getTransports(label);
  return winston.createLogger({
    level: "info",
    format: getFormat(label),
    transports,
  });
};

const index = { createLogger };
export { createLogger, index as default };
