import {
  Client,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import SlashOption from '../utils/slashOption.ts';
import TypeHelp from '../entity/typeHelp.ts';
import { ChapterFetchOptions } from '../services/MangaService.js';

export interface LangOption {
  name: string;
  value: string;
}

export interface CommandDeclarationOptions {
  banteam?: [
    {
      id: string;
      from?: number;
    }
  ];
  research?: string;
  chapterId?: string;
  send?: Array<InteractionReplyOptions>;
  cubari?: string;
}

export interface CommandDetails {
  id: string;
  name?: Array<string>;
  description?: string;
  helpDescription?: string;
  type?: TypeHelp;
  args?: Array<SlashOption>;
  slashInteraction?: boolean;
  userInteraction?: boolean;
  messageInteraction?: boolean;
  parentId?: string;
  nohelp?: boolean;
  options?: object;
}

export interface ImplementableMangaCommandDetails extends CommandDetails {
  options?: ChapterFetchOptions;
}

export interface ImplementableDanroobuCommandDetails extends CommandDetails {
  options?: { research?: string; allResult?: boolean };
}

export interface ImplementableAnswerCommandDetails extends CommandDetails {
  options?: {
    messages: Array<string | InteractionReplyOptions | MessagePayload>;
  };
}

export type CommandRun = (
  client: Client,
  interaction: CommandInteraction
) => Promise<unknown>;

interface Command {
  run: CommandRun;
  help: CommandDetails;
}

export default Command;
