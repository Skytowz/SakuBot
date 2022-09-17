const { ApplicationCommandOptionType } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { request } = require("undici");
const SlashOption = require("../utils/slashOption");

module.exports.run = async(client, interaction) =>{        

    const user = interaction.options.getMentionable("mention") ?? interaction.user;
    await interaction.reply(user.avatarURL()+"?size=2048")

};
module.exports.help = {
    name:["pp","getpp"],
    help:"> Recupère la photo d'un profil de sois même ou d'un utilisateur",
    type: TypeHelp.Autre,
    cmd:"pp [mentions]",
    args:[
        new SlashOption().setName("mention").setDescription("La personne").setType(ApplicationCommandOptionType.Mentionable)
    ]
}