import { ApplicationCommandOptionType } from 'discord.js';

export default class SlashOption {
  //FIXME
  public choices?: any;

  constructor(
    public name?: string,
    public description?: string,
    public type = ApplicationCommandOptionType.String,
    public required = false,
    choices?: any
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
