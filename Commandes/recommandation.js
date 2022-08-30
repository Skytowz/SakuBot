const TypeHelp = require("../entity/typeHelp");
const { getNautiljonPageEmbed } = require("../services/nautiljonService");
module.exports.run = async(client, message, args) =>{  
    var urlR = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    if(!args[1] || !args[1].match(urlR)) return message.channel.send("Il faut rentrer une URL Nautiljon");
    const embed = await getNautiljonPageEmbed(message.author.username,args[1]);
    if(typeof embed == "string") message.channel.send(embed);
    else message.channel.send({embeds : [embed]});    
};


module.exports.help = {
    name:"reco",
    help:"> Recommande un manga/anime",
    type: TypeHelp.Utils,
    cmd:"reco <link-nautiljon>"
}
