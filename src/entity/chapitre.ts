import { Colors } from 'discord.js';
import Embed from '../utils/embed.js';
import embedList from '../utils/embedList.js';

export default class Chapitre {
  constructor(
    public pages: Array<number | string>,
    public numero: number | string,
    public titre: string,
    public nbPages: number,
    public baseImage: (element: number | string) => number | string,
    public url: string,
    public files: Array<string>
  ) {}

  getEmbedList() {
    const embeds = this.pages.map((element, index) => {
      return new Embed()
        .setImage(this.baseImage(element) as string)
        .setTitle(this.titre)
        .setDescription(
          `[Lien](${this.url}/) |${
            this.numero ? ` Ch: ${this.numero} |` : ''
          } ${index + 1}/${this.nbPages}`
        )
        .setColor(Colors.DarkButNotBlack);
    });
    return new embedList(embeds, embeds.length, 0, this.files);
  }
}
