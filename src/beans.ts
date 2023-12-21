import AnswerCommandData from './data/AnswerCommand.data.js';
import ImplementableAnswerCommand from './Commandes/implementable/ImplementableAnswerCommand.js';
import MangaCommandData from './data/MangaCommand.data.js';
import ImplementableMangaCommand from './Commandes/implementable/ImplementableMangaCommand.js';
import DanroobuCommandData from './data/DanroobuCommand.data.js';
import ImplementableDanroobuCommand from './Commandes/implementable/ImplementableDanroobuCommand.js';
import AbstractCommand, {
  COMMAND_BEAN_TYPE,
} from './Commandes/AbstractCommand.js';
import injector from 'wire-dependency-injection';

// Services
import './services/CommandInteractionService.js';
import './services/CommandService.js';
import './services/DanroobuService.js';
import './services/GistService.js';
import './services/MangadexService.js';
import './services/MangaService.js';
import './services/ResourcesService.js';
import './services/SaucenaoService.js';

// Events
import './events/InteractionCreateEvent.js';
import './events/ReadyEvent.js';

// Commands
import './Commandes/ChadCommand.js';
import './Commandes/ChapterLinkCommand.js';
import './Commandes/ClearCommand.js';
import './Commandes/GetPPCommand.js';
import './Commandes/GogoleCommand.js';
import './Commandes/HelpCommand.js';
import './Commandes/MangaLinkCommand.js';
import './Commandes/PinCommand.js';
import './Commandes/QuoteCommand.js';
import './Commandes/SauceCommand.js';
import './Commandes/showMember.js';
import './Commandes/VocalquitCommand.js';

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
