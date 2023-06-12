const Chapitre = require("../entity/chapitre");
const superagent = require("superagent");
const jsdom = require("jsdom");
const { unscramble } = require("../utils/scramble");
const { JSDOM } = jsdom;



module.exports.getChapitre = async (manga,numero,cubari) => {
    const chapitre  = await superagent.get(manga).set('accept', 'json').then(res => JSON.parse(res.text).chapters[numero]);
    if(!chapitre) return "Numéro de chapitre invalide";
    return await this.getChapitreById(chapitre,numero,cubari)
}

module.exports.getChapitreById = async (chapitre,numero,cubari) => {
    const pages = Object.values(chapitre.groups).pop();
    console.log(pages);
    return new Chapitre(pages,numero,chapitre.title,pages.length,(page)=>page,`https://cubari.moe/read/gist/${cubari}/${numero}`);
}





