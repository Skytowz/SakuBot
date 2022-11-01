const { ApplicationCommandOptionType } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { request } = require("undici");
const SlashOption = require("../utils/slashOption");

module.exports.run = async(client, interaction) =>{        

    let user;
    if(interaction.isUserContextMenuCommand()){
        user = interaction.targetUser;
    }else if(interaction.isChatInputCommand() && interaction.options.getMentionable("mention")){
        user = interaction.options.getMentionable("mention");
    }else{
        user = interaction.user;
    }
    const url = user.avatarURL() ?? user.user.avatarURL();
    await interaction.reply(url+"?size=2048")

};
module.exports.help = {
    name:["pp"],
    help:"> Recupère la photo d'un profil de sois même ou d'un utilisateur",
    type: TypeHelp.Autre,
    cmd:"pp [mentions]",
    args:[
        new SlashOption().setName("mention").setDescription("La personne").setType(ApplicationCommandOptionType.Mentionable)
    ],
    slash:true,
    user:true
}