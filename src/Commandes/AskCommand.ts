/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommandInteraction, CacheType, Client } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import { sample } from '../utils/arrayUtils.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

const QUOTE = [
  'Je réponds pas à un Mikodog', //Negatif
  'Quand Maki aura un copain', //Negatif
  'Et puis quoi encore ??', //Negatif
  'Papagane avait tout prévu ', //Tkt
  'Réfléchis au-delà des 1000 cerveaux de Kaguya', //Tkt
  'Putain', //Tkt
  'Travaille aussi dur que Shirogane, on en parlera après ', //Tkt
  "Viens ici, maman Fujiwara va t'expliquer", //Tkt
  "Ça m'étonnerait.", //Negatif
  "Hier ça aurait été un oui, aujourd'hui c'est mouais.", //Positif
  "J'aimerais tellement pouvoir te répondre...", //Tkt
  "Jamais de la vie. Tu devrais reconsidérer ta façon d'aborder tes questions d'ailleurs.", //Negatif
  "Mes sources me disent que c'est non.", //Negatif
  'Bien sûr que... non.', //Negatif
  'Ca dépend de Sakushi.', //Tkt
  'Menfou, palu + ratio', //Negatif
  "C'est vraiment une question de dingue ça", //Tkt
  `La réponse est la même que pour la quetion "Sakushi est-il le meilleur ?"`, //Positif
  'Aussi vrai que Aka est un crack', //Positif
  'Je sais pas, mais sinon, elle est où Jeanne ?', //Tkt
  'Vas-y pose une question encore plus conne pour voir ?', //Tkt
];

export default class AskCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, {
      name: ['ask'],
      cmd: 'ask [question]',
      help: 'Répond à une question',
      type: TypeHelp.Autre,
      commandeReste: true,
      args: [new SlashOption('question', 'Question a posé')],
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    //@ts-ignore
    const question = commandInteraction.options.getString('question');
    const content =
      (question ? `> **${question}** \n` : '') + `*${sample(QUOTE)}*`;
    await commandInteraction.reply({ content: content });
  }
}
