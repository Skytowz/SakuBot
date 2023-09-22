import injector, { Bean, ClassType } from 'wire-dependency-injection';
import Logger from '../logger.js';

export const loggerBean = new Bean(
  (typeof Logger as unknown) as ClassType,
  'logger'
);
export const registerLoggerBean = (logger: typeof Logger) => {
  loggerBean.setInstance(logger);
  injector.registerCookedBean(loggerBean);
};
