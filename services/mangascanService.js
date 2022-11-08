const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Chapitre = require("../entity/chapitre");

module.exports.getChapitre = async (manga,numero) => {
    let res;
    if(numero.includes(".")){
        numero = numero.replace(".","-");
    }
    await got(`https://www.mangafr.net/manga/${manga}/chapitre-${numero}/`).then(response => {
        const document = new JSDOM(response.body).window.document;
        const img0 = document.querySelector("#image-0")
        if(img0 == null) {
            res = "Chapitre invalide"
            return;
        }
        const url = img0.src.slice(0,-"1.jpg".length)
        const page = Array.from(Array(document.querySelectorAll(".page-break").length).keys()).map(i=>i+1);
        if(page.length == 0) res = "Numéro de chapitre invalide";
        else res = new Chapitre(page,numero,`Chapitre N°${numero}`,page.length,(num) => `${url}/${num}.png`,`https://bentomanga.com/manga/${manga}/chapter/${numero}`);
    }).catch(err => {
        console.error(err);
        res =  "Il y a eu problème";
    });
    return res;
}