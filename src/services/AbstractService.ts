import LogChild from '../LogChild.js';

export default abstract class AbstractService extends LogChild {
  protected constructor(name: string) {
    super(name);
  }
}

export const SERVICE_BEAN_TYPE = 'service';
