
module.exports = async(client, interaction) => {
    if(interaction.isChatInputCommand() || interaction.isMessageContextMenuCommand()){
    
        const commande = interaction.commandName;
        const cmd = client.commands.get(commande);
        if(!cmd) return;

        cmd.run(client, interaction);
    }
};




