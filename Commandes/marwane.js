const quote = [
    "https://media.discordapp.net/attachments/749750526354260058/994366405115920465/unknown_1.png",
]
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send({content:"Le meilleur coloriste de la ScanR en fait:\n https://twitter.com/Mahrwane",files:[quote.sample()]});

};
module.exports.help = {
    name:"marwane",
    noHelp: true
}
