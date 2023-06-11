const danbooru = require("./danroobu.json");
const { getGeneralImageByTag } = require("../services/danroobuService");
const superagent = require("superagent");


module.exports.run = async(client, interaction) =>{      
    const name = Object.values(danbooru).find(cmd =>cmd.name.includes(interaction.commandName));

    const url = await getGeneralImageByTag(name.research); 
    interaction.reply(url);

};
module.exports.help = {
    noHelp:true,
    slash:true
}