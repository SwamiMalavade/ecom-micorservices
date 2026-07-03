import winston from "winston";
import path from "path";

// Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const timestamp = winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss:ms",
});
// Define log formats
const logFormat = winston.format.combine(
  timestamp,
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`,
  ),
);

const consoleFormat = winston.format.combine(
  timestamp,
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
  ),
);

// Create the logger instance
const logger = winston.createLogger({
  level: "http",
  levels,
  transports: [
    // Write all logs with level 'error' and below to error.log
    // new winston.transports.File({
    //   filename: path.join("logs", "error.log"),
    //   level: "error",
    //   format: logFormat,
    // }),
    // Write all logs with level 'debug' and below to combined.log
    // new winston.transports.File({
    //   filename: path.join("logs", "combined.log"),
    //   format: logFormat,
    // }),
    // Write logs to console with colors
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

export default logger;
