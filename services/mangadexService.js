const Chapitre = require("../entity/chapitre");
const superagent = require("superagent");

module.exports.getChapitre = async (manga,numero,blueSoloEd,langue) => {
    let offset = 0;
    let data;
    let result;
    if(!langue || langue.includes("fr")){
        langue = langue?.filter(e => e != "fr");
        do{
            result = await superagent.get(`https://api.mangadex.org/manga/${manga}/feed?translatedLanguage[]=fr${blueSoloEd && numero > 94 ? "&excludedGroups[]=4bd5fd9a-ee2f-40ae-8551-28e49be30cd2" : ""}&includeExternalUrl=0&limit=500&offset=${offset*500}`)
            data = result.body.data.find(element =>   element.attributes.chapter == numero);
            offset++;
        }while(result.body.total > offset*500 && typeof data == "undefined")
    }else
    if(langue && typeof data == "undefined"){
        offset = 0;
        do{
            result = await superagent.get(`https://api.mangadex.org/manga/${manga}/feed?${langue.map(e=>`translatedLanguage[]=${e}&`).join("")}includeExternalUrl=0&limit=500&offset=${offset*500}`)
                .catch(e => console.error(e));
            data = result.body.data.find(element =>   element.attributes.chapter == numero || numero == 1 && element.attributes.chapter == null);
            offset++;
        }while(result.body.total > offset*500 && typeof data == "undefined")
    }
    if(typeof data == "undefined") return "Numéro de chapitre invalide";
    return await this.getChapitreById(data);
}

module.exports.getChapitreById = async (chapitre) => {
    const data = await superagent.get(`https://api.mangadex.org/at-home/server/${chapitre.id}?forcePort443=false`).then(res => res.body.chapter);
    return new Chapitre(data.dataSaver,chapitre.attributes.chapter,chapitre.attributes.title,chapitre.attributes.pages,(num)=>`https://uploads.mangadex.org/data-saver/${data.hash}/${num}`,`https://mangadex.org/chapter/${chapitre.id}`);
}

module.exports.getChapitreInfoById = async (id) => {
    return await superagent.get(`https://api.mangadex.org/chapter/${id}`).then(res => res.body.data);
}