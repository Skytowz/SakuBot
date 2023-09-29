import injector from 'wire-dependency-injection';
import QuoteService from '../services/supabase/QuoteService.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import {
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  Embed,
  Message,
  ModalSubmitInteraction,
} from 'discord.js';
import EventError from '../errors/EventError.js';
import Quote from '../entity/Quote.js';

export default class SaveQuoteCommand extends AbstractCommand {
  private quoteService: QuoteService = injector.autoWire(
    QuoteService,
    (b) => (this.quoteService = b)
  );

  public constructor() {
    super({
      id: 'savequote',
      name: ['savequote'],
      description: 'Ajoute un quote au favori',
      type: TypeHelp.Utils,
      modalSubmitInteraction: true,
      slashInteraction: false,
    });
  }

  public async run(commandInteraction: ModalSubmitInteraction) {
    if (!commandInteraction.isModalSubmit()) {
      throw new EventError("Ceci n'est pas une modal");
    }
    const modalInteraction = commandInteraction as ModalSubmitInteraction;
    const message: Message = modalInteraction.message as Message;
    const name: string = modalInteraction.fields.getTextInputValue('name');

    const embed: Embed = message.embeds[0];

    if (!embed) {
      throw new EventError("Ceci n'est pas une quote");
    }

    const quote: Quote = new Quote()
      .setColor(embed.color ? embed.color : Colors.Fuchsia)
      .setAuthor(embed.author?.name)
      .setIconUrl(embed.author?.iconURL)
      .setDescription(embed.description)
      .setFooter(embed.footer?.text)
      .setImage(embed.image?.proxyURL)
      .setName(name)
      .setUser(modalInteraction.user.id);

    try {
      await this.quoteService.insertQuote(quote);
    } catch (error) {
      await modalInteraction.reply({
        ephemeral: true,
        content: (error as EventError).message,
      });
      return;
    }

    modalInteraction.reply({
      ephemeral: true,
      content: `Le quote ${name} a bien été ajouté à vos favoris`,
    });
  }
}

injector.registerBean(SaveQuoteCommand, { type: COMMAND_BEAN_TYPE });
