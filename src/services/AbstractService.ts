import { AppInstances } from '../types/AppInstances.js';

// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
export default abstract class AbstractService {
  private readonly appInstances: AppInstances;

  public constructor(appInstances: AppInstances) {
    this.appInstances = appInstances;
  }

  public getAppInstances() {
    return this.appInstances;
  }
}
