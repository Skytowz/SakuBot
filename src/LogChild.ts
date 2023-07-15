import Logger from './logger.js';
import injector from 'wire-dependency-injection';

export default abstract class LogChild {
  private mainLogger?: typeof Logger = injector.autoWire(
    'logger',
    (b) => (this.mainLogger = b)
  );
  private logger?: typeof Logger;
  protected constructor(private readonly prefix: string) {}

  public getLogger() {
    if (this.logger === undefined) {
      this.logger = (this.mainLogger as typeof Logger).child(
        {},
        { msgPrefix: this.prefix }
      );
    }
    return this.logger;
  }
}
