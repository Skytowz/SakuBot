const { Colors, CommandInteraction, Client } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const { getDateFromTimeStamp } = require("../utils/dateUtils");
const Embed = require("../utils/embed");
const SlashOption = require("../utils/slashOption");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports.run = async(client, interaction) =>{
    let message;
    if(interaction.isMessageContextMenuCommand()){
        message = interaction.targetId;
    }else{
        message = interaction.options.getString("message");
    }
    const ids = [];
    if(message.startsWith("https://discord.com/channels")){
        const args = message.split("/");
        if(args.length != 7){
            return interaction.reply({content:"Erreur, le lien du message n'est pas valide",ephemeral:true});
        }else{
            const idMsg = args.pop();
            ids.push(args.pop(),idMsg);
        }
    }else{
        if(!message.includes("-")){
            message = interaction.channel.id+"-"+message;
        } else if (message.split(/-/).length > 2) return interaction.reply({content:"Erreur, veuillez donnez l'id sous la forme <message-channel>-<message-message> ou le lien du message",ephemeral:true});
        ids.push(...message.split(/-/));
    }


    const channel = await client.channels.fetch(ids[0]).catch((e) => {console.log(e);return"ERROR"});
    if(channel == "ERROR") return interaction.reply({content:"Channel innexistant",ephemeral:true})


    const messageFetch = await channel.messages.fetch(ids[1]).catch(() => "ERROR" );
    if(messageFetch == "ERROR") return interaction.reply({content:"Message innexistant",ephemeral:true})


    const embed = new Embed()
                    .setColor(Colors.Fuchsia)
                    .setDescription(messageFetch.content+`\n\n[Aller au message](${messageFetch.url})`)
                    .setAuthor(messageFetch.author)
                    .setFooter("#" + channel.name + " | " + getDateFromTimeStamp(messageFetch.createdTimestamp))


    const msg = {}
    // msg.embeds = [embed];
    // if(messageFetch.embeds && messageFetch.embeds.length > 0 && !(messageFetch.author.bot && messageFetch.embeds[0].title == null)){
    //     msg.embeds.push(...messageFetch.embeds);
    // }
    if(messageFetch.attachments.size != 0){
        msg.files = messageFetch.attachments.filter(e => e.contentType.match("(image|video)(\/.*)") && e.size < 8000000 ).map((v,k)=> {return {name:v.name,attachment:v.attachment}});
    }
    console.log(msg);
    interaction.reply(msg)
};

module.exports.help = {
    name:["quote"],
    help:"Renvoie le contenu d'un message",
    cmd:"q/quote ([<id-channel>-]<id-message> | <url-message>)",
    type:TypeHelp.Utils,
    args:[
        new SlashOption().setName("message").setDescription("ID ou lien du message à quote").setRequired(true),
    ],
    slash:true,
    message:true
}
