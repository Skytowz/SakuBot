import ImplementableAnswerCommand from '../Commandes/implementable/ImplementableAnswerCommand.js';
import ImplementableMangaCommand from '../Commandes/implementable/ImplementableMangaCommand.js';
import { CommandDeclaration } from '../types/Command.js';
import AnswerCommandData from './AnswerCommand.data.js';
import MangaCommandData from './MangaCommand.data.js';
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
import OnkWhenCommand from '../Commandes/OnkWhenCommand.js';

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
  { command: OnkWhenCommand },
  ...AnswerCommandData.map((details) => ({
    command: ImplementableAnswerCommand,
    details: details,
  })),
  ...MangaCommandData.map((details) => ({
    command: ImplementableMangaCommand,
    details: details,
  })),
] as Array<{
  command: typeof AbstractCommand;
  details?: CommandDeclaration;
}>;
