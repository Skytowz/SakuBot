const quote = [
    "https://media.discordapp.net/attachments/991333308988395670/991337977705922610/20210708_141901.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991337978096001114/20210622_143846.jpg",
]
module.exports.run = async(client, message, args) =>{     
    if(!["713837802638278749","273756946308530176"].includes(message.author.id)) return;
    await message.channel.send({content:message.member.displayName,files:[quote.sample()]});
    message.delete();
};
module.exports.help = {
    name:"gogole",
    noHelp: true,
    commandeReste: true,
}
