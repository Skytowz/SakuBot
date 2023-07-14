import injector, { ClassType } from 'wire-dependency-injection';
import Bean from 'wire-dependency-injection/dist/Bean.js';
import { Client } from 'discord.js';

export const clientBean = new Bean('client', Client as ClassType);
export const registerClientBean = (client: Client) => {
  clientBean.setInstance(client);
  injector.registerCookedBean(clientBean);
};
