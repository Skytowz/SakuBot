const quote = [
    "https://media.discordapp.net/attachments/991333308988395670/991448778395631726/IMG_20220402_184149.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991448778789888090/IMG_20220311_214535.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991449285809942628/20210629_225506.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991449449677209701/20211229_181714.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991449286212599949/20201111_211421.jpg",
    "https://media.discordapp.net/attachments/991333308988395670/991449449073217726/IMG_0398.jpg",
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
