const { default: axios } = require("axios");
const Chapitre = require("../entity/chapitre");

module.exports.getChapitre = async (manga,numero,blueSoloEd) => {
    const data = await axios.get(`https://api.mangadex.org/manga/${manga}/feed?translatedLanguage[]=fr&limit=300${blueSoloEd && numero > 94 ? "&excludedGroups[]=4bd5fd9a-ee2f-40ae-8551-28e49be30cd2" : ""}`)
        .then(res => res.data.data.find(element =>   element.attributes.chapter == numero));
    if(typeof data == "undefined") return "Numéro de chapitre invalide";
    return await this.getChapitreById(data);
}

module.exports.getChapitreById = async (chapitre) => {
    const data = await axios.get(`https://api.mangadex.org/at-home/server/${chapitre.id}?forcePort443=false`).then(res => res.data.chapter);
    return new Chapitre(data.dataSaver,chapitre.attributes.chapter,chapitre.attributes.title,chapitre.attributes.pages,(num)=>`https://uploads.mangadex.org/data-saver/${data.hash}/${num}`,`https://mangadex.org/chapter/${chapitre.id}`);
}