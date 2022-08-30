const TypeHelp = require("../entity/typeHelp");
const { getChapitre } = require("../services/mangascanService");
const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"6b27cbd8-4cc6-40ca-b010-928da4540be8");
};
module.exports.help = {
    name:["tc","tawawachap","tchap"],
    help:"> Affiche une page d'un chapitre de Tawawa",
    cmd:"tc/tawawachap/tchap <chap> [page]",
    type: TypeHelp.ViewManga,
    commandeReste : true,
}
