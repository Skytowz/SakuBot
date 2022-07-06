module.exports.send = async (message,response) => {
    if(typeof response == "string") response = {content:response};
    if(message.type == "REPLY"){
        const msg = await message.channel.messages.fetch(message.reference.messageId).catch("ERROR");
        if(msg == "ERROR") return message.channel.send(response);
        response.allowedMentions = {repliedUser:false};
        reply = msg.reply(response);
    }else{
        return message.channel.send(response);
    }
}