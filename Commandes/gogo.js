const quote = [
    "https://media.discordapp.net/attachments/695034616351817828/991292586222432296/aaa.jpg",
]
module.exports.run = async(client, message, args) =>{     

    await message.channel.send({content:message.member.displayName,files:[quote.sample()]});

};
module.exports.help = {
    name:"gogo",
    noHelp: true
}
