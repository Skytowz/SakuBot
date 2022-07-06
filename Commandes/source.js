const Discord = require("discord.js");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://github.com/Skytowz/SakuBot");

};
module.exports.help = {
    name:["source","git"],
    cmd:"source/git",
    help:"> Envoie le lien du github"
}
