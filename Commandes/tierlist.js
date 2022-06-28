const Discord = require("discord.js");
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send("https://tiermaker.com/create/seanr-tier-list-15178170")

};
module.exports.help = {
    name:"tierlist",
    cmd:"tierlist",
    help:"> Envoie le lien de la tierlist"
}
