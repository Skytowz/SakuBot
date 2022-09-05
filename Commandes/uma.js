const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"a9dd451c-3c45-4d66-a818-4e1b78855838");
};
module.exports.help = {
    name:["umachap","uc"],
    help:"> Affiche une page d'un chapitre de Uma Musume",
    cmd:"umachap/uc <chap> [page]",
    type: TypeHelp.ViewManga,
    commandeReste : true,
}
