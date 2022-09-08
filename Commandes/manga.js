const { ApplicationCommandOptionType } = require("discord.js");
const { send } = require("../utils/mangaUtils");
const SlashOption = require("../utils/slashOption");
const mangas = require("./manga.json");

module.exports.run = async(client, interaction) =>{       
    const manga = Object.values(mangas).find(manga =>manga.name.includes(interaction.commandName));
    send(interaction,[interaction.options.getString("chapitre"),interaction.options.getString("page")],manga.id);

};
module.exports.help = {
    noHelp:true,
    args:[
        new SlashOption("chapitre","Numéro du chapitre",ApplicationCommandOptionType.String,true),
        new SlashOption("page","Numéro de la page"),
    ]
}