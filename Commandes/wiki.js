const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/messageUtils");

module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://kaguyasama-wa-kokurasetai.fandom.com/wiki/Kaguya-sama_wa_Kokurasetai_Wikia")

};
module.exports.help = {
    name:"wiki",
    help:"> Envoie le wiki de Kaguya-sama",
    cmd:"wiki",
    type: TypeHelp.ScanR,
    commandeReste:true
}