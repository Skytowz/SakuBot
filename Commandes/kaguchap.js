const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"37f5cce0-8070-4ada-96e5-fa24b1bd4ff9");
};
module.exports.help = {
    name:["kaguchap","kc","kchap"],
    help:"> Affiche une page d'un chapitre de Kaguya-sama",
    cmd:"kaguchap/kc/kchap <chap> [page]",
    type: TypeHelp.ViewManga,
    commandeReste : true,
}
