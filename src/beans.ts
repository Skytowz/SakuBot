import AnswerCommandData from './data/AnswerCommand.data.js';
import ImplementableAnswerCommand from './commandes/implementable/ImplementableAnswerCommand.js';
import MangaCommandData from './data/MangaCommand.data.js';
import ImplementableMangaCommand from './commandes/implementable/ImplementableMangaCommand.js';
import DanroobuCommandData from './data/DanroobuCommand.data.js';
import ImplementableDanroobuCommand from './commandes/implementable/ImplementableDanroobuCommand.js';
import AbstractCommand, {
  COMMAND_BEAN_TYPE,
} from './commandes/AbstractCommand.js';
import AbstractMessageHandler, {
  MESSAGE_HANDLER_BEAN_TYPE,
} from './handlers/commandesMessageHandler/AbstractMessageHandler.js';
import injector from 'wire-dependency-injection';

// Services
import './services/CommandInteractionService.js';
import './services/CommandService.js';
import './services/DanroobuService.js';
import './services/GistService.js';
import './services/MangadexService.js';
import './services/MangaseeService.js';
import './services/MangaService.js';
import './services/ResourcesService.js';
import './services/SaucenaoService.js';

// Events
import './events/InteractionCreateEvent.js';
import './events/ReadyEvent.js';
import './events/messageCreateEvent.js';

// Commands
import './commandes/ChadCommand.js';
import './commandes/ChapterLinkCommand.js';
import './commandes/ClearCommand.js';
import './commandes/GetPPCommand.js';
import './commandes/GetSPCommand.js';
import './commandes/GogoleCommand.js';
import './commandes/HelpCommand.js';
import './commandes/MangaLinkCommand.js';
import './commandes/MangaSeeCommand.js';
import './commandes/PinCommand.js';
import './commandes/QuoteCommand.js';
import './commandes/TagVoc.js';
import './commandes/SauceCommand.js';
import './commandes/ShowMember.js';
import './commandes/VocalquitCommand.js';

// MessageHandlers
import './handlers/commandesMessageHandler/DiscordBotSpamHandler.js';
import './handlers/commandesMessageHandler/MangadexChapterLinkHandler.js';

([] as Array<AbstractCommand>)
  .concat(
    AnswerCommandData.map((details) => new ImplementableAnswerCommand(details))
  )
  .concat(
    MangaCommandData.map((details) => new ImplementableMangaCommand(details))
  )
  .concat(
    DanroobuCommandData.map(
      (details) => new ImplementableDanroobuCommand(details)
    )
  )
  .forEach((command) => {
    injector.declare(
      command.getDetails().id + 'ImplCommand',
      command,
      COMMAND_BEAN_TYPE
    );
  });

([] as Array<AbstractMessageHandler>).forEach((message) => {
  injector.declare(
    message.getDetails().id + 'ImplCommand',
    message,
    MESSAGE_HANDLER_BEAN_TYPE
  );
});
