import injector, { Bean, ClassType } from 'wire-dependency-injection';
import { REST } from 'discord.js';

export const discordRestBean = new Bean(REST as ClassType, 'discordRest');
export const registerDiscordRestBean = (rest: REST) => {
  discordRestBean.setInstance(rest);
  injector.registerCookedBean(discordRestBean);
};
