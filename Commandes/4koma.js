const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"de4b3c43-5243-4399-9fc3-68a3c0747138");
};
module.exports.help = {
    name:["4komachap","4kc","4kchap"],
    help:"> Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    cmd:"4komachap/4kc/4kchap <chap> [page]",
    commandeReste : true,
}
