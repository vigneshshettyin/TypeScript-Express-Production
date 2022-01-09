const { createLogger, transports, format } = require("winston");

const customLogger = createLogger({
  transports: [
    new transports.File({
      filename: "./log/winston.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/winston-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default customLogger;
