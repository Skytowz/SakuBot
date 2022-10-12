const answers = require("./answer.json");

module.exports.run = async(client, interaction) =>{       
    const answer = Object.values(answers).find(answer=>answer.name.includes(interaction.commandName));
    interaction.reply(answer.send.sample());
};
module.exports.help = {
    noHelp:true,
}