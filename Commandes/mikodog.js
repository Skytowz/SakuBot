const { send } = require("../utils/messageUtils");

module.exports.run = async(client, message, args) =>{        
     
    await send(message,{content:message.member.displayName,files:["https://media.discordapp.net/attachments/714214949341102111/991301131290546216/ChartGo.png"]});

};
module.exports.help = {
    name:["dog","mikodog"],
    noHelp:true
}