const { CommandInteraction, channelLink, ApplicationCommandOptionType } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const SlashOption = require("../utils/slashOption");

/**
 * 
 * @param {*} client 
 * @param {CommandInteraction} interaction 
 */
module.exports.run = async(client, interaction) =>{      
    if (!["452186417334976532", "273756946308530176"].includes(interaction.member.id)) return interaction.reply({ content: 'Tu ne peux pas utiliser cette commande', ephemeral: true });  
    const nombre = interaction.options.getInteger("nombre");
    interaction.channel.bulkDelete(nombre)
    .then(() => interaction.reply({content:"Les messages ont bien été supprimé",ephemeral:true}))
    .catch(() => interaction.reply({content:"Une erreur est survenu",ephemeral:true}))
    
};
module.exports.help = {
    name:["clear"],
    help:"Clear un certain nombre de message",
    type: TypeHelp.Utils,
    cmd:"clear <nb-msg>",
    args:[
        new SlashOption("nombre","Nombre de message à supprimer",ApplicationCommandOptionType.Integer,true),
    ],
    slash:true,
}