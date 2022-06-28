const quote = [
    "https://media.discordapp.net/attachments/695034616351817828/991292586222432296/aaa.jpg",
    "https://media.discordapp.net/attachments/714214949341102111/991297078414282752/gogo.jpg",
    "https://media.discordapp.net/attachments/714214949341102111/991297314352267304/2605686.jpg",
    "https://media.discordapp.net/attachments/714214949341102111/991298526208335952/Gogo_NH.png",
]
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send(quote.sample());

};
module.exports.help = {
    name:"gogo",
    noHelp: true
}
