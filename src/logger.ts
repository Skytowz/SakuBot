/* eslint-disable @typescript-eslint/ban-ts-comment */
import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

const logLevel = process.env.LOG_LEVEL || 'info';

// @ts-ignore
const logger = pino({
  level: 'trace',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: logLevel,
        options: {
          translateTime: 'SYS:dd-mm-yyyy, HH:MM:ss',
          ignore: 'pid,hostname',
          levelFirst: true,
          minimumLevel: 'trace',
        },
      },
    ],
  },
}) as pino.Logger;

export default logger;
