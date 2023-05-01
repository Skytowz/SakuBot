import SlashOption from './slashOption.js';

export default class SlashCommand {
  name?: string;
  description?: string;
  options: Array<SlashOption>;

  constructor() {
    this.options = [];
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setOption(options: Array<SlashOption>) {
    this.options = options;
    return this;
  }

  // addOption(option) {
  //   this.options.push(option);
  // }

  addOption(
    name: string,
    description: string,
    type: number,
    required: boolean
  ) {
    this.options.push(
      new SlashOption()
        .setName(name)
        .setDescription(description)
        .setType(type)
        .setRequired(required)
    );
  }
}
