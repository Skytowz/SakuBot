const htmlToJson = require("html-to-json");
const Chapitre = require("../entity/chapitre");

module.exports.getChapitre = async (manga,numero) => {
    let res;
    await htmlToJson.request(`https://mangascan.cc/manga/${manga}/${numero}`, {
        'pages': ['#page-list option', ($numero) => {
            return $numero.attr('value');
        }]
    }, (err,result) => {
        if(err){
            console.error(err);
            res =  "Il y a eu problème";
        }else if(result.pages.length == 0) res = "Numéro de chapitre invalide";
        else res = new Chapitre(result.pages,numero,`Chapitre N°${numero}`,result.pages.length,(num) => `https://scansmangas.ws/scans/${manga}/${numero}/${num}.jpg`,`https://mangascan.cc/manga/${manga}/manga/${numero}`);
    });
    return res;
}