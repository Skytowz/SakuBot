const Discord = require("discord.js");
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send("Le prochain chapitre sortira entre vendredi et samedi")

};
module.exports.help = {
    name:"sortie",
    cmd:"sortie",
    help:"> Dis quand sort le prochain chapitre de Kaguya"
}
