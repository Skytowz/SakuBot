const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"3395f559-5f90-4049-9dae-75b8918cadb9");
};

module.exports.help = {
    name:["crocochap","cc"],
    help:"> Affiche une page d'un chapitre de Croco",
    cmd:"crocochap/cc <chap> [page]",
    commandeReste : true,
}
