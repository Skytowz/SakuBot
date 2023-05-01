/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Colors } from 'discord.js';

export default class Embed {
  public type = 'rich';
  public title?: string;
  public color?: number;
  public description?: string;
  public fields: Array<{
    name: string;
    value: string;
    inline: boolean;
  }> = [];
  public thumbnail?: { url: string };
  public footer?: { text: string };
  public image?: {
    url: string;
    height: number;
    width: number;
  };
  public video?: {
    url: string;
    height: number;
    width: number;
  };
  public author?: {
    name: string;
    iconURL?: string;
    url?: string;
  };
  public url?: string;

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setColor(color: number) {
    this.color = color;
    return this;
  }

  addField(title: string, description: string) {
    this.fields.push({ name: title, value: description, inline: false });
    return this;
  }

  addFields(
    values: Array<{
      name: string;
      value: string;
      inline: boolean;
    }>
  ) {
    this.fields.push(...values);
    return this;
  }

  setThumbnail(image: string) {
    this.thumbnail = { url: image };
    return this;
  }

  setFooter(text: string) {
    this.footer = { text: text };
    return this;
  }

  setImage(url: string, height = 100, width = 100) {
    this.image = {
      url: url,
      height: height,
      width: width,
    };
    return this;
  }
  setVideo(url: string, height = 100, width = 100) {
    this.video = {
      url: url,
      height: height,
      width: width,
    };
    return this;
  }

  setAuthor(user: { username: string; avatarURL: () => string }) {
    this.author = {
      name: user.username,
      iconURL: user.avatarURL(),
    };
    return this;
  }

  setAuthorNameUrl(name: string, url: string) {
    this.author = {
      name: name,
      url: url,
    };
    return this;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  static getNautiljonEmbed(username: string, props: any, link: string) {
    const getDescription = (description: string) => {
      if (description.length > 500)
        return (
          description.substr(0, 500).trim() + `..........([see more](${link}))`
        );
      else return description;
    };
    const otherData: Array<string> = [];
    const datas = props.data.reduce((json: any, item: string) => {
      if (item.includes('·')) {
        const elements = item.split('·');
        if (elements) {
          elements.forEach((element: string) => {
            if (element.includes(':')) {
              const data = element.split(':');
              //@ts-ignore
              json[data.shift()?.trim()] = data.join(':').trim();
            } else {
              otherData.push(element);
            }
          });
        }
      } else {
        if (item.includes(':')) {
          const data = item.split(':');
          //@ts-ignore
          json[data.shift()?.trim()] = data.join(':').trim();
        }
      }
      return json;
    }, {});
    const embed = new Embed()
      .setTitle(props.infos[1])
      .setThumbnail('https://www.nautiljon.com' + props.cover[1])
      .addField('Nom', `[${props.infos[2]}](${link})`);
    if (datas.Auteur) embed.addField('Auteur', datas.Auteur);
    if (datas.Origine && props.infos == 'Mangas')
      embed.addField('Origine', datas.Origine);
    if (otherData[0]) {
      embed.addField('Type', otherData[0]);
      if (otherData[1]) {
        embed.addField("Pays d'origine", otherData[1]);
        if (otherData[2]) {
          embed.addField('Durée', otherData[2]);
        }
      }
    }
    if (datas.Saison) embed.addField('Saison', datas.Saison);
    if (datas.Type) embed.addField('Type', datas.Type);
    if (datas.Genres) embed.addField('Genre', datas.Genres);
    if (datas.Plateforme) embed.addField('Plateforme', datas.Plateforme);
    if (datas.Prix) embed.addField('Prix', datas.Prix);
    if (datas['Thème']) embed.addField('Thème', datas['Thème']);
    if (datas['Thèmes']) embed.addField('Thèmes', datas['Thèmes']);
    if (datas['Simulcast / streaming'])
      embed.addField('Disponible sur', datas['Simulcast / streaming']);
    embed.addField(props.titre[0], getDescription(props.description[0]));
    embed.setFooter('Recommandation par ' + username);
    switch (props.infos[1]) {
      case 'Mangas':
        embed.setColor(Colors.DarkButNotBlack);
        break;
      case 'Animes':
        embed.setColor(Colors.Orange);
        break;
      case 'Light novels':
        embed.setColor(Colors.Blue);
        break;
      case 'Jeux vidéo':
        embed.setColor(Colors.Red);
        break;
      case 'Personnalités':
        embed.setColor(Colors.Green);
        break;
      default:
        embed.setColor(Colors.Default);
        break;
    }
    return embed;
  }
}
