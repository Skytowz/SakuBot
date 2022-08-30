const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Chapitre = require("../entity/chapitre");

module.exports.getChapitre = async (manga,numero) => {
    let res;
    if(numero.includes(".")){
        numero = numero.replace(".","-");
    }
    await got(`https://mangas-origines.fr/catalogues/${manga}/chapitre-${numero}?style=list`).then(response => {
        const document = new JSDOM(response.body).window.document;
        const page = Array.from(document.querySelectorAll('.reading-content .page-break img')).map((element) => 1+Number.parseInt(element.id.substring("image-".length)))
        if(page.length == 0) res = "Numéro de chapitre invalide";
        else res = new Chapitre(page,numero,`Chapitre N°${numero}`,page.length,(num) => `https://scansmangas.ws/scans/${manga}/${numero}/${num}.jpg`,`https://mangas-origines.fr/catalogues/${manga}/chapitre-${numero}?style=list`);
    }).catch(err => {
        console.log(err);
        return "Il y a eu problème";
    });
    return res;
}