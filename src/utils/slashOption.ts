import { ApplicationCommandOptionType } from 'discord.js';
import { LangOption } from '../types/Command.js';

export default class SlashOption {
  public choices?: Array<LangOption>;

  constructor(
    public name?: string,
    public description?: string,
    public type = ApplicationCommandOptionType.String,
    public required = false,
    choices?: Array<LangOption>
  ) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.required = required;
    if (choices) this.choices = choices;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setType(type: number) {
    this.type = type ?? ApplicationCommandOptionType.String;
    return this;
  }

  setRequired(required: boolean) {
    this.required = required ?? false;
    return this;
  }
}
