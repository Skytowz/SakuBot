const TypeHelp = require("../entity/typeHelp");
const SlashOption = require("../utils/slashOption");
const { ApplicationCommandOptionType, CommandInteraction, Client } = require("discord.js");
const { send } = require("../utils/mangaUtils");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports.run = async(client, interaction) =>{      
    const url = interaction.options.getString("url");
    const id = url.match(/chapter\/([a-zA-Z0-9\-]+)(\/?.*)/i)?.at(1)
    if(id && url.match(/mangadex.org\/chapter/)){
       send(interaction,null,interaction.options.getString("page"),{idChap : id})
    }else{
        return interaction.reply({content:"Lien invalide",ephemeral:true})
    }
};
module.exports.help = {
    name:["chapter"],
    help:"Affiche n'importe quel chapitre de mangadex",
    type: TypeHelp.ViewManga,
    cmd:"manga",
    args:[
        new SlashOption("url","Lien mangadex",ApplicationCommandOptionType.String, true),
        new SlashOption("page","Numéro de la page"),
    ],
    slash:true
}