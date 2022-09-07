const { Colors } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const Embed = require("../utils/embed");

module.exports.run = async(client, interaction, args) =>{        
    const embed = new Embed().setImage("https://cdn.discordapp.com/attachments/695043638706700398/1016219698926460960/infokaguya.jpg").setColor(Colors.LuminousVividPink);
    await interaction.reply({embeds:[embed]})

};
module.exports.help = {
    name:["infokaguya","infokagu","info"],
    help:"Envoie un schéma sur le fonctionnement du scantrad Kaguya-sama",
    cmd:"infokaguya",
    type: TypeHelp.Autre,
    commandeReste: true
}
