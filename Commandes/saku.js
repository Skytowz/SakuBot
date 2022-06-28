const quote = [
    "https://media.discordapp.net/attachments/714214949341102111/991297071938273300/qq.jpg",
]
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send({content:message.member.displayName,files:[quote.sample()]});

};
module.exports.help = {
    name:"saku",
    noHelp: true
}
