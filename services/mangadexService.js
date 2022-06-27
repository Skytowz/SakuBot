const { default: axios } = require("axios");
const Chapitre = require("../entity/chapitre");

module.exports.getChapitre = async (manga,numero) => {
    const data = await axios.get(`https://api.mangadex.org/manga/${manga}/feed?translatedLanguage[]=fr&limit=300`)
        .then(res => res.data.data.find(element => element.attributes.chapter == numero));
    if(typeof data == "undefined") return "Numéro de chapitre invalide";
    return await this.getChapitreById(data);
}

module.exports.getChapitreById = async (chapitre) => {
    const data = await axios.get(`https://api.mangadex.org/at-home/server/${chapitre.id}/`).then(res => res.data.chapter);
    return new Chapitre(data.dataSaver,chapitre.attributes.chapter,chapitre.attributes.title,chapitre.attributes.pages,data.hash);
}