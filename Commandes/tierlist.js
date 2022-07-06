const Discord = require("discord.js");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://tiermaker.com/create/seanr-tier-list-15178170")

};
module.exports.help = {
    name:"tierlist",
    cmd:"tierlist",
    help:"> Envoie le lien de la tierlist"
}
