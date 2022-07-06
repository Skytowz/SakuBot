const Discord = require("discord.js");
const { send } = require("../utils/messageUtils");
module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://docs.google.com/spreadsheets/d/1X1heIh9Y95uxEqVB7wHjSXnwGMJQfWattRuHAP26730/edit?usp=sharing")

};
module.exports.help = {
    name:["pause","pauses"],
    cmd:"pause/pauses",
    help:"> Envoie le lien du calendrier de pause"
}
