const Discord = require("discord.js");
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send("https://github.com/Skytowz/SakuBot")

};
module.exports.help = {
    name:["source","git"],
    cmd:"source/git",
    help:"> Envoie le lien du github"
}
