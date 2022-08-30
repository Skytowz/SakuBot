const { Colors } = require("discord.js");
const Embed = require("../utils/embed");
const embedList = require("../utils/embedList");

module.exports = class Chapitre{
    pages;
    numero;
    titre;
    nbPages;
    baseImage;
    url;
    mangaUrl;
    constructor(page,numero,titre,nbPages,baseImage,url,mangaUrl){
        this.pages = page;
        this.numero = numero;
        this.titre = titre;
        this.nbPages = nbPages;
        this.baseImage = baseImage;
        this.url = url;
        this.mangaUrl = mangaUrl
    }

    getEmbedList(blueSoloEd){
        const embeds = this.pages.map((element,index) => {
            return new Embed()
                .setImage(this.baseImage(element))
                .setTitle(this.titre)
                .setDescription(`${!blueSoloEd ? `[Lien](${this.url}/${index+1}) | ` : ""}Ch: ${this.numero} | ${index+1}/${this.nbPages}`)
                .setColor(Colors.DarkButNotBlack);
        });
        return new embedList(embeds,embeds.length,0);
    }
}