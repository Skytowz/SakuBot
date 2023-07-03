import { AppInstances } from '../types/AppInstances.js';

export default abstract class AbstractService {
  private appInstances: AppInstances;

  protected constructor(appInstances: AppInstances) {
    this.appInstances = appInstances;
  }

  public getAppInstances() {
    return this.appInstances;
  }
}
