import ImplementableAnswerCommand from '../Commandes/implementable/ImplementableAnswerCommand.js';
import ImplementableMangaCommand from '../Commandes/implementable/ImplementableMangaCommand.js';
import { CommandDetails } from '../types/Command.js';
import AnswerCommandData from './AnswerCommand.data.js';
import MangaCommandData from './MangaCommand.data.js';
import DanroobuCommandData from './DanroobuCommand.data.js';
import AbstractCommand from '../Commandes/AbstractCommand.js';
import AskCommand from '../Commandes/AskCommand.js';
import AyahitooCommand from '../Commandes/AyahitooCommand.js';
import ChadCommand from '../Commandes/ChadCommand.js';
import ChapterLinkCommand from '../Commandes/ChapterLinkCommand.js';
import ClearCommand from '../Commandes/ClearCommand.js';
import GetPPCommand from '../Commandes/GetPPCommand.js';
import GogoleCommand from '../Commandes/GogoleCommand.js';
import HelpCommand from '../Commandes/HelpCommand.js';
import MangaLinkCommand from '../Commandes/MangaLinkCommand.js';
import QuoteCommand from '../Commandes/QuoteCommand.js';
import SauceCommand from '../Commandes/SauceCommand.js';
import VocalquitCommand from '../Commandes/VocalquitCommand.js';
import PinCommand from '../Commandes/PinCommand.js';
import ImplementableDanroobuCommand from '../Commandes/implementable/ImplementableDanroobuCommand.js';

export default [
  { command: AskCommand },
  { command: AyahitooCommand },
  { command: ChadCommand },
  { command: ChapterLinkCommand },
  { command: ClearCommand },
  { command: GetPPCommand },
  { command: GogoleCommand },
  { command: HelpCommand },
  { command: MangaLinkCommand },
  { command: QuoteCommand },
  { command: SauceCommand },
  { command: VocalquitCommand },
  { command: PinCommand },
  ...AnswerCommandData.map((details) => ({
    command: ImplementableAnswerCommand,
    details: details,
  })),
  ...MangaCommandData.map((details) => ({
    command: ImplementableMangaCommand,
    details: details,
  })),
  ...DanroobuCommandData.map((details) => ({
    command: ImplementableDanroobuCommand,
    details: details,
  })),
] as Array<{
  command: typeof AbstractCommand;
  details?: CommandDetails;
}>;
