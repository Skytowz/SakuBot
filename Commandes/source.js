const Discord = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://github.com/Skytowz/SakuBot");

};
module.exports.help = {
    name:["source","git"],
    cmd:"source/git",
    type: TypeHelp.Autre,
    help:"> Envoie le lien du github"
}
