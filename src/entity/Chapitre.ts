import { AttachmentBuilder, Colors } from 'discord.js';
import Embed from '../utils/embed.js';
import PageChapitreList from '../utils/pageChapitreList.js';

export default class Chapitre {
  constructor(
    public pages: Array<string>,
    public numero: string,
    public titre: string,
    public nbPages: number,
    public baseImage: (num: string) => string,
    public url: string,
    public files: Array<Promise<AttachmentBuilder>>
  ) {}

  getPageChapitreList() {
    const embeds = this.pages.map((element, index) => {
      return new Embed()
        .setImage(this.baseImage(element))
        .setTitle(this.titre)
        .setDescription(
          `[Lien](${this.url}/${index + 1}) |${
            this.numero ? ` Ch: ${this.numero} |` : ''
          } ${index + 1}/${this.nbPages}`
        )
        .setColor(Colors.DarkButNotBlack);
    });
    return new PageChapitreList(embeds, embeds.length, 0, this.files);
  }
}
