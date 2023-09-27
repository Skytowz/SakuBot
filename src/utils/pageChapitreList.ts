/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AttachmentBuilder } from 'discord.js';
import Embed from './embed.js';
import { mod } from './numberUtils.js';

export default class PageChapitreList {
  public embeds: Array<Embed> = [];
  public index = 0;
  public length = 0;
  public files: Array<Promise<AttachmentBuilder>>;

  public constructor(
    embeds: Array<Embed>,
    length: number,
    index: number,
    files: Array<Promise<AttachmentBuilder>>
  ) {
    this.embeds = embeds;
    this.length = length;
    this.index = index;
    this.files = files;
  }

  setEmbedList(embeds: Array<Embed>) {
    this.embeds = embeds;
  }

  right(msg: string) {
    this.index = mod(this.index + 1, this.length);
    this.turnPage(msg);
  }

  left(msg: string) {
    this.index = mod(this.index - 1, this.length);
    this.turnPage(msg);
  }

  //@ts-ignore
  async turnPage(msg) {
    msg.update(await this.getContent());
  }

  get() {
    return this.embeds[this.index];
  }

  async getContent() {
    const message: {
      embeds: Array<Embed>;
      files?: Array<AttachmentBuilder>;
    } = {
      embeds: [this.get()],
    };
    if (this.files) {
      message.files =
        this.files.length > 0 ? [await this.files[this.index]] : [];
    }
    return message;
  }
}
