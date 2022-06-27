const Embed = require("../utils/embed");
const embedList = require("../utils/embedList");

module.exports = class Chapitre{
    pages;
    numero;
    titre;
    nbPages;
    hash;
    url;

    constructor(page,numero,titre,nbPages,hash,idChap){
        this.pages = page;
        this.numero = numero;
        this.titre = titre;
        this.nbPages = nbPages;
        this.hash = hash;
        this.url = "https://mangadex.org/chapter/"+idChap;
    }

    getEmbedList(){
        const embeds = this.pages.map((element,index) => {
            return new Embed()
                .setImage(`https://uploads.mangadex.org/data/${this.hash}/${element}`)
                .setTitle(this.titre)
                .setDescription(`[Lien](${this.url}) | Ch: ${this.numero} | ${index+1}/${this.nbPages}`)
                .setColor("RED");
        });
        return new embedList(embeds,embeds.length,0);
    }
}