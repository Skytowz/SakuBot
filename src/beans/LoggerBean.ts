import injector, { ClassType } from 'wire-dependency-injection';
import Bean from 'wire-dependency-injection/dist/Bean.js';
import Logger from '../logger.js';

export const loggerBean = new Bean(
  'logger',
  (typeof Logger as unknown) as ClassType
);
export const registerLoggerBean = (logger: typeof Logger) => {
  loggerBean.setInstance(logger);
  injector.registerCookedBean(loggerBean);
};
