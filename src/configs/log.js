import { createLogger, transports, format } from 'winston';

const { combine, timestamp, json } = format;

const errorFilter = format((info) => (info.level === 'error' ? info : false));

const infoFilter = format((info) => (info.level === 'info' ? info : false));

/**
 * Winston logger
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({
      filename: './logs/combined.log',
    }),
    new transports.File({
      filename: './logs/app-error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new transports.File({
      filename: './logs/app-info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp(), json()),
    }),
    // new transports.Console({
    //   name: 'console',
    //   colorize: true,
    //   showLevel: true,
    //   formatter: combine(infoFilter(), timestamp(), json()),
    // }),
  ],
});

export default logger;
