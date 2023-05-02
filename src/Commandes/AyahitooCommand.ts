/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommandInteraction, CacheType, Client } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';

import { config } from 'dotenv';
config();

const ID_MSG =
  process.env.ENV == 'DEV' ? '1019290546088460289' : '1019293176516841472';

export default class AyahitooCommand extends AbstractCommand {
  public constructor(client: Client) {
    super(client, {
      name: ['ayahitoo', 'aya'],
      help: 'Commande speciale pour Ayahitoo',
      type: TypeHelp.Autre,
      cmd: 'cmd',
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    if (
      ![
        '904895756073336873',
        '273756946308530176',
        '1020030218154557611',
        '1022927961613148190',
        //@ts-ignore
      ].includes(commandInteraction.member?.id)
    )
      return commandInteraction.reply({
        content: 'Tu peux pas, CHEH',
        ephemeral: true,
      });
    const ayahito = await this.getClient().users.fetch('904895756073336873');
    const dm = await ayahito.createDM();
    const msg = await dm.messages.fetch(ID_MSG);
    const chiffre = parseInt(msg.content) + 1;
    await commandInteraction.reply('o'.repeat(chiffre));
    msg.edit('' + chiffre);
  }
}
