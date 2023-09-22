import injector, { Bean, ClassType } from 'wire-dependency-injection';
import { Client } from 'discord.js';

export const clientBean = new Bean(Client as ClassType, 'client');
export const registerClientBean = (client: Client) => {
  clientBean.setInstance(client);
  injector.registerCookedBean(clientBean);
};
