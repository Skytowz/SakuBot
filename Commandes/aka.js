const { Colors } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const Embed = require("../utils/embed");
const { send } = require("../utils/messageUtils");

module.exports.run = async(client, message, args) =>{        
    const embed = new Embed().setImage("https://media.discordapp.net/attachments/991007027067232257/991007040791007262/shit_edit-1.jpg?width=1202&height=676").setColor(Colors.LuminousVividPink);
    await send(message,{embeds:[embed]})

};
module.exports.help = {
    name:"aka",
    help:"> Envoie une photo du maitre",
    cmd:"aka",
    type: TypeHelp.Autre,
    commandeReste: true
}
