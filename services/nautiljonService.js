const htmlToJson = require("html-to-json");
const Embed = require("../utils/embed");

module.exports.getNautiljonPageEmbed = async (username,link) => {
    let embed;
    await htmlToJson.request(link, {
        'cover': ['.image_fiche a', ($img) => {
            return $img.attr('href');
        }],
        'infos':['#crumbs li a', ($res) => {
            return $res.attr("title");
        }],
        'description':['.description',($description) =>{
            return $description.text();
        }],
        'titre':['.description',($description) => {
            return $description.parent().prev().text();
        }],
        'data':['#onglets_1_information .infosFicheTop .mb10 li',($info)=>{
            return $info.text();
        }]
    }, (err,result) => {
        if(err){
            console.error(err);
        }else{
            if(result.infos[0] != 'Nautiljon.com'){
                embed =  "La recommandation doit venir du site Nautiljon";
            }else if(result.infos.length <= 1 || !result.description.length){
                embed = "La page est inconnu"
            }else{
                embed = Embed.getNautiljonEmbed(username,result,link);
            }
        }
    });
    return embed;

}