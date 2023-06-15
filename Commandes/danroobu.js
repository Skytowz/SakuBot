const danbooru = require("./danroobu.json");
const { getGeneralImageByTag } = require("../services/danroobuService");
const superagent = require("superagent");
const { ApplicationCommandOptionType } = require("discord.js");
const SlashOption = require("../utils/slashOption");


module.exports.run = async(client, interaction) =>{      
    const name = Object.values(danbooru).find(cmd =>cmd.name.includes(interaction.commandName));
    const sensitive = interaction.options.getBoolean("sensitive");
    const url = await getGeneralImageByTag(name.research,interaction.options.getBoolean("solo"),sensitive);
    if(url && sensitive) {
        await interaction.deferReply();
        interaction.editReply({files: [ {attachment: url, name: "SPOILER_image.jpg",spoiler:true}]});
    }else if(url){
        interaction.reply({content:url});
    }else{
        interaction.reply({content:"Aucune image trouvé",ephemeral:true})
    }

};
module.exports.help = {
    noHelp:true,
    slash:true,
    args:[
        new SlashOption("solo","Solo",ApplicationCommandOptionType.Boolean),
        new SlashOption("sensitive","Sensitive",ApplicationCommandOptionType.Boolean),
    ]
}