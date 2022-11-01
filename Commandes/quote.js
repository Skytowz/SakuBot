const { Colors, CommandInteraction } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { getDateFromTimeStamp } = require("../utils/dateUtils");
const Embed = require("../utils/embed");
const SlashOption = require("../utils/slashOption");

/**
 * 
 * @param {*} client 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports.run = async(client, interaction) =>{
    let id;
    if(interaction.isMessageContextMenuCommand()){
        id = interaction.targetId;
    }else{
        id = interaction.options.getString("id");
    }
    if(!id.includes("-")){
        id = interaction.channel.id+"-"+id;
    } else if (id.split(/-/).length > 2) return interaction.reply({content:"Erreur, veuillez donnez l'id sous la forme <id-channel>-<id-message>",ephemeral:true});
    const ids =  id.split(/-/);


    const channel = await client.channels.fetch(ids[0]).catch(() => "ERROR");
    if(channel == "ERROR") return interaction.reply({content:"Channel innexistant",ephemeral:true})


    const messageFetch = await channel.messages.fetch(ids[1]).catch(() => "ERROR" );
    if(messageFetch == "ERROR") return interaction.reply({content:"Message innexistant",ephemeral:true})


    const embed = new Embed()
                    .setColor(Colors.Fuchsia)
                    .setDescription(messageFetch.content+`\n\n[Aller au message](${messageFetch.url})`)
                    .setAuthor(messageFetch.author)
                    .setFooter("#" + channel.name + " | " + getDateFromTimeStamp(messageFetch.createdTimestamp))


    if(messageFetch.attachments.size != 0){
        if(messageFetch.attachments.first().contentType.startsWith("image")) embed.setImage(messageFetch.attachments.first().proxyURL);
    }


    const embeds = [embed];

    if(messageFetch.embeds && messageFetch.embeds.length > 0 && !(messageFetch.author.bot && messageFetch.embeds[0].title == null)){
        embeds.push(...messageFetch.embeds);
    }
    interaction.reply({embeds:embeds})
};

module.exports.help = {
    name:["quote"],
    help:"Renvoie le contenu d'un message",
    cmd:"q/quote [<id-channel>-]<id-message>",
    type:TypeHelp.Utils,
    args:[
        new SlashOption().setName("id").setDescription("ID du message à quote").setRequired(true),
    ],
    slash:true,
    message:true
}
