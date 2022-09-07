module.exports.run = async(client, message, args) =>{        
     
    if(message.type == "REPLY"){
        const messageReference = await message.channel.messages.fetch(message.reference.messageId);
        console.log(messageReference.embeds);
    }
};
module.exports.help = {
    name:"chad",
    help:"> Envoie un photomontage de soit meme chad ou d'une personne tag en Chad",
    cmd:"chad [tag]",
    noHelp:true
}