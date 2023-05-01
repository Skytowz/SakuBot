/* eslint-disable @typescript-eslint/ban-ts-comment */
import Embed from './embed.js';
import { mod } from './number.js';

export default class embedList {
  public embeds: Array<Embed> = [];
  public index = 0;
  public length = 0;
  public files: Array<string>;

  public constructor(
    embeds: Array<Embed>,
    length: number,
    index: number,
    files: Array<string>
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
  turnPage(msg) {
    msg.update(this.getContent());
  }

  get() {
    return this.embeds[this.index];
  }

  getContent() {
    const message: { embeds: Array<Embed>; files?: Array<string> } = {
      embeds: [this.get()],
    };
    if (this.files) {
      message.files = [this.files[this.index]];
    }
    return message;
  }
}
