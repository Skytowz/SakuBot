const { getChapitre } = require("../services/mangascanService");
const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"296cbc31-af1a-4b5b-a34b-fee2b4cad542","oshi-no-ko");
};
module.exports.help = {
    name:["onkchap","oc","oshichap"],
    help:"> Affiche une page d'un chapitre d'Oshi no Ko",
    cmd:"onkchap/oc/oshichap <chap> [page]",
    commandeReste : true,
}
