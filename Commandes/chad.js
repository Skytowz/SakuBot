const Canvas= require("@napi-rs/canvas");
const { ApplicationCommandOptionType, CommandInteraction, AttachmentBuilder } = require("discord.js");
const { request } = require("undici");
const TypeHelp = require("../entity/typeHelp");
const SlashOption = require("../utils/slashOption");

module.exports.run = async(client, interaction) =>{  
    const canvas = Canvas.createCanvas(678,761);
    const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage("https://media.discordapp.net/attachments/991387297767510167/1017410101574914088/unknown.png?width=498&height=559");
    context.drawImage(background,0,0,canvas.width,canvas.height);
    
    const user = interaction.options.getMentionable("mention") ?? interaction.user;
    const url = user.avatarURL() ?? user.user.avatarURL();
    const avatar = await Canvas.loadImage(url+"?size=2048");
    context.drawImage(avatar,150,60,390,390);
    
    const buffer = await canvas.encode('png');
    interaction.reply({files:[buffer]});
};
module.exports.help = {
    name:"chad",
    help:"Envoie un photomontage de soit meme chad ou d'une personne tag en Chad",
    cmd:"chad [tag]",
    type:TypeHelp.Autre,
    args:[
        new SlashOption().setName("mention").setDescription("Le chad").setType(ApplicationCommandOptionType.Mentionable)
    ]
}