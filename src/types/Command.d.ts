/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, CommandInteraction } from 'discord.js';
import SlashOption from '../utils/slashOption.ts';
import TypeHelp from '../entity/typeHelp.ts';

export interface LangOption {
  name: string;
  value: string;
}

export interface CommandDeclarationOptions {
  banteam: [
    {
      id: string;
      from?: number;
    }
  ];
}

export interface CommandDeclaration {
  name?: Array<string>;
  cmd?: string;
  help?: string;
  type?: TypeHelp;
  commandeReste?: boolean;
  args?: Array<SlashOption>;
  slash?: boolean;
  send?: Array<string>;
  nohelp?: boolean;
  user?: boolean;
  message?: boolean;
  options?: CommandDeclarationOptions;
  [key: string]: any;
}

export type CommandRun = (
  client: Client,
  interaction: CommandInteraction
) => Promise<unknown>;

interface Command {
  run: CommandRun;
  help: CommandDeclaration;
}

export interface CommandsData {
  [key: string]: CommandDeclaration;
}

export default Command;
