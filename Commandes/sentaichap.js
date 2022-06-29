const { send } = require("../utils/mangaUtils");
module.exports.run = async(client, message, args) =>{        
    send(message,args,"7878c129-a33d-4bf9-b5d2-ff98cbe85bd6");
};
module.exports.help = {
    name:["sentaichap","stchap","stc"],
    help:"> Affiche une page d'un chapitre de Sentai Daishikkaku",
    cmd:"sentaichap/stchap/stc <chap> [page]",
    commandeReste : true,
}
