const Chapitre = require("../entity/chapitre");
const superagent = require("superagent");
const jsdom = require("jsdom");
const { unscramble } = require("../utils/scramble");
const { JSDOM } = jsdom;


module.exports.getChapitre = async (manga,numero,interaction) => {
    const result  = await superagent.get(`https://mangareader.to/ajax/manga/reading-list/${manga}`);
    const DOM = new JSDOM(JSON.parse(result.res.text).html);
    const chapitre = DOM.window.document.querySelector(`#en-chapters li[data-number='${numero}']`);
    if(!chapitre){
        return "Numéro de chapitre invalide"
    }
    return await this.getChapitreById(chapitre,interaction)
}

module.exports.getChapitreById = async (chapitre,interaction) => {
    const DOM = await superagent.get(`https://mangareader.to/ajax/image/list/chap/${chapitre.dataset.id}?mode=vertical&quality=medium`).then(({res}) => new JSDOM(JSON.parse(res.text).html));
    let shuffled = false;
    const images = await Promise.all(Array.from(DOM.window.document.querySelectorAll(".iv-card")).map(async e =>{
        if(e.classList.contains('shuffled')){
            shuffled = true;
            return await unscramble(e.dataset.url,interaction);
        }else return e.dataset.url;
    }))
    if(shuffled){
        const test = interaction.user.send({files:[images]});
        console.log(test)
    }
    console.log(images);
    const number = chapitre.dataset.number;
    const title = chapitre.querySelector(".name").textContent.match(/:(.*)/)[1].trim()
    const href = chapitre.querySelector("a").href;
    return new Chapitre(images,number,title,images.length,(page)=>page,`https://mangareader.to${href}`);
}

