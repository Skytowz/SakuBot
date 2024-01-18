import injector from 'wire-dependency-injection';
import Logger from '../logger.js';

export const registerLoggerBean = (logger: typeof Logger) => {
  injector.declare('logger', logger);
};
