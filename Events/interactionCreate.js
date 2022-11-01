const { CommandInteraction } = require("discord.js");

/**
 * 
 * @param {*} client 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports = async(client, interaction) => {
    if(interaction.isChatInputCommand() || interaction.isContextMenuCommand){
    
        const commande = interaction.commandName;
        const cmd = client.commands.get(commande);
        if(!cmd) return;

        cmd.run(client, interaction);
    }
};




