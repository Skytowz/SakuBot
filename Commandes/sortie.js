const Discord = require("discord.js");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"Le prochain chapitre sortira entre vendredi et samedi")

};
module.exports.help = {
    name:"sortie",
    cmd:"sortie",
    help:"> Dis quand sort le prochain chapitre de Kaguya-sama"
}
