const Discord = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"Le prochain chapitre sortira entre vendredi et samedi")

};
module.exports.help = {
    name:"sortie",
    cmd:"sortie",
    type: TypeHelp.ScanR,
    help:"> Dis quand sort le prochain chapitre de Kaguya-sama"
}
