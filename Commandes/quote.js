const { getDateFromTimeStamp } = require("../utils/dateUtils");
const Embed = require("../utils/embed");

module.exports.run = async(client, message, args) =>{
    if(args.length != 2) return message.channel.send("Erreur, veuillez donnez l'id sous la forme <id-channel>-<id-message>");
    if(!args[1].includes("-")){
        args[1] = message.channel.id+"-"+args[1];
    } else if (args[1].split(/-/).length > 2) return message.channel.send("Erreur, veuillez donnez l'id sous la forme <id-channel>-<id-message>");
    const ids =  args[1].split(/-/);
    const channel = await client.channels.fetch(ids[0]).catch(() => "ERROR");
    if(channel == "ERROR") return message.channel.send("Channel innexistant")
    const messageFetch = await channel.messages.fetch(ids[1]).catch(() => "ERROR" );
    if(messageFetch == "ERROR") return message.channel.send("Message innexistant")
    const embed = new Embed()
                    .setColor("FUCHSIA")
                    .setDescription(messageFetch.content+`\n\n[Aller au message](${messageFetch.url})`)
                    .setAuthor(messageFetch.author)
                    .setFooter("#" + channel.name + " | " + getDateFromTimeStamp(messageFetch.createdTimestamp))
    if(messageFetch.attachments.size != 0){
        if(messageFetch.attachments.first().contentType.startsWith("image")) embed.setImage(messageFetch.attachments.first().proxyURL);
    }
    await message.channel.send({embeds:[embed]})

};
module.exports.help = {
    name:"q",
    help:"> Renvoie le contenu d'un message",
    cmd:"q [<id-channel>-]<id-message>",
    commandeReste: true,
}
