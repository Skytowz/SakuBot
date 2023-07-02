/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Client,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import SlashOption from '../utils/slashOption.ts';
import TypeHelp from '../entity/typeHelp.ts';

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
  options?: CommandDeclarationOptions;
  // [key: string]: any;
}

export type CommandRun = (
  client: Client,
  interaction: CommandInteraction
) => Promise<unknown>;

interface Command {
  run: CommandRun;
  help: CommandDetails;
}

export interface CommandsData {
  [key: string]: CommandDetails;
}

export default Command;
