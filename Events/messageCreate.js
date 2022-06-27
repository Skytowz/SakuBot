const { prefix } = require("../utils/properties");

module.exports = async(client, message) => {

    if(message.channel.type === "dm") return;

    if(!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/(\s|\n)+/g); // .slice = enleve prefix ; .trim = enleve espace ; .split args[] chaque espace nv mot args
    const commande = args.shift(); // mets nom commande dans commande et enleve première case args;
    const cmd = client.commands.get(commande);
    
    if(!cmd) return;

    if(!cmd.help.commandeReste) message.delete();
    cmd.run(client, message, args);
};




