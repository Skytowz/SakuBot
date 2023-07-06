import AbstractService from './services/AbstractService.js';
import { AppInstances } from './types/AppInstances.js';

export class ServiceManager {
  private appInstances!: AppInstances;
  private readonly services;

  public constructor(
    appInstances?: AppInstances,
    services: Array<AbstractService> = []
  ) {
    this.appInstances = appInstances as AppInstances;
    this.services = services;
  }

  public getAppInstances() {
    return this.appInstances;
  }

  public setAppInstances(appInstances: AppInstances) {
    this.appInstances = appInstances;
  }

  public getAll() {
    return this.services;
  }

  private getServiceInstanceIndex(service: AbstractService) {
    return this.services.indexOf(service);
  }

  public getServiceIndex(serviceClass: typeof AbstractService) {
    if (serviceClass === AbstractService) {
      return -1;
    }
    return this.services.findIndex(
      (service) => (service as unknown) instanceof serviceClass
    );
  }

  private haveServiceInstance(service: AbstractService) {
    return this.getServiceInstanceIndex(service) !== -1;
  }

  public haveService(serviceClass: typeof AbstractService) {
    return this.getServiceIndex(serviceClass) !== -1;
  }

  public addService(service: AbstractService) {
    if (this.haveServiceInstance(service)) return false;
    return !!this.services.push(service);
  }

  public removeService(service: AbstractService) {
    if (!this.haveServiceInstance(service)) return false;
    return !!this.services.splice(this.getServiceInstanceIndex(service), 1);
  }

  public getService<T extends AbstractServiceClassType>(
    serviceClass: T
  ): InstanceType<T> {
    const service = this.services.find(
      (service) => service instanceof serviceClass
    );
    if (!service || serviceClass === AbstractService) {
      throw new Error(
        'instance of service ' + serviceClass.name + ' not found'
      );
    }
    return service as InstanceType<T>;
  }
}

export type AbstractServiceClassType = new (
  ...args: ConstructorParameters<typeof AbstractService>
) => AbstractService;
