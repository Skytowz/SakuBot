const TypeHelp = require("../entity/typeHelp");
const SlashOption = require("../utils/slashOption");
const { ApplicationCommandOptionType, CommandInteraction, Client, Integration } = require("discord.js");
const { send } = require("../utils/mangaUtils");
const language = [{
    name:"anglais",
    value:"en"
},{
    name:"français",
    value:"fr"
},{
    name:"espagnol",
    value:"es"
},{
    name:"bresilien",
    value:"pt-br"
},{
    name:"italien",
    value:"it"
},{
    name:"chinois",
    value:"cn"
},{
    name:"russe",
    value:"ru"
},{
    name:"japonais",
    value:"jp"
}]
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports.run = async(client, interaction) =>{      
    const url = interaction.options.getString("url");
    const id = url.match(/title\/([a-zA-Z0-9\-]+)(\/?.*)/i)?.at(1)
    const langue = interaction.options.getString("langue");
    let langues;
    if(langue){
        langues = [langue]
    }else{
        langues = language.map(e => e.value);
    }
    if(id && url.match(/mangadex.org\/title/)){
       send(interaction,interaction.options.getString("chapitre") ?? 1,interaction.options.getString("page"),{id:id,langue : langues })
    }else{
        return interaction.reply({content:"Lien invalide",ephemeral:true})
    }
};
module.exports.help = {
    name:["manga"],
    help:"Affiche n'importe quel manga de mangadex",
    type: TypeHelp.ViewManga,
    cmd:"manga",
    args:[
        new SlashOption("url","Lien mangadex",ApplicationCommandOptionType.String, true),
        new SlashOption("chapitre","Numéro du chapitre"),
        new SlashOption("page","Numéro de la page"),
        new SlashOption("langue","Langue",ApplicationCommandOptionType.String,false,language)
    ],
    slash:true
}