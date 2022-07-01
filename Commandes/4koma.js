const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"4c5ad89f-b936-4df9-80b8-cfd10d990859");
};
module.exports.help = {
    name:["4komachap","4kc","4kchap"],
    help:"> Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    cmd:"4komachap/4kc/4kchap <chap> [page]",
    commandeReste : true,
}
