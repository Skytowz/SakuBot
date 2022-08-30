const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"a84264f6-a979-4573-89b3-09dd5c050c2b");
};
module.exports.help = {
    name:["dkaguchap","dkc","dkchap"],
    help:"> Affiche une page d'un chapitre de Kaguya-sama",
    cmd:"dkaguchap/dkc/dkchap <chap> [page]",
    type: TypeHelp.ViewManga,
    commandeReste : true,
}
