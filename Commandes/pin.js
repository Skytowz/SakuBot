const { Client, CommandInteraction } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports.run = async(client, interaction) =>{        
    if(!interaction.member.roles.cache.find(e => e.id == "780835397008621600"||"685583592084340740")) return interaction.reply({content:"Tu ne peux pas utiliser cette commande",ephemeral:true})
    if(!interaction.isMessageContextMenuCommand()) return interaction.reply({content:"Ceci n'est pas un message",ephemeral:true})
    if(interaction.targetMessage.pinned) return interaction.reply({content:"Le message est déjà pin",ephemeral:true})

    interaction.targetMessage.pin(`<@${interaction.member.id}> a pin le message.`);
    await interaction.reply({content:`<@${interaction.member.id}> a pin un message.`});

};
module.exports.help = {
    name:["pin"],
    help:"> pin le message",
    type: TypeHelp.Utils,
    cmd:"pin",
    message: true
}