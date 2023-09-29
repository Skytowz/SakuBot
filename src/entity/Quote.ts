import { ColorResolvable, EmbedBuilder } from 'discord.js';

export default class Quote {
  private color: number | undefined;
  private description: string | undefined | null;
  private author: string | undefined;
  private iconUrl: string | undefined;
  private footer: string | undefined;
  private image: string | undefined;

  private name: string | undefined;
  private user: string | undefined;

  constructor(
    $color?: number,
    $description?: string | null,
    $author?: string,
    $iconUrl?: string,
    $footer?: string,
    $image?: string
  ) {
    this.color = $color;
    this.description = $description;
    this.author = $author;
    this.iconUrl = $iconUrl;
    this.footer = $footer;
    this.image = $image;
  }

  public getEmbed() {
    const mainEmbed = new EmbedBuilder()
      .setColor(this.color as ColorResolvable)
      .setDescription(this.description as string)
      .setAuthor({
        name: this.author as string,
        ...(this.iconUrl ? { iconURL: this.iconUrl } : {}),
      })
      .setFooter({ text: this.footer as string });

    if (this.image) {
      mainEmbed.setImage(this.image);
    }
  }

  public getJson() {
    return {
      name: this.name,
      user: this.user,
      color: this.color,
      description: this.description,
      author: this.author,
      iconUrl: this.iconUrl,
      footer: this.footer,
      image: this.image,
    };
  }

  public setColor($color: number) {
    this.color = $color;
    return this;
  }

  public setAuthor($author: string | undefined) {
    this.author = $author;
    return this;
  }

  public setIconUrl($iconUrl: string | undefined) {
    this.iconUrl = $iconUrl;
    return this;
  }

  public setFooter($footer: string | undefined) {
    this.footer = $footer;
    return this;
  }

  public setDescription($description: string | null) {
    this.description = $description;
    return this;
  }

  public setImage($image: string | undefined) {
    this.image = $image;
    return this;
  }

  public setName($name: string) {
    this.name = $name;
    return this;
  }

  public setUser($user: string) {
    this.user = $user;
    return this;
  }
}
