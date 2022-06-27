const fs = require("fs");
const Embed = require("../utils/embed");
const { prefix } = require("../utils/properties");
module.exports.run = async(client, message, args) =>{        
    const help = new Embed()
        .setColor('#8e238e')
        .setTitle('Help')
        .setThumbnail("https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png");
    fs.readdir("./Commandes/",(error,f) => {
        if(error) console.log(error);
        const fun = f.filter(f => f.split(".").pop() === "js"); 
        fun.forEach(v => {
            const commande = require(`./${v}`);
            if(!commande.help.noHelp && (!commande.help.server || commande.help.server == message.guildId)  ){
                help.addField(prefix+commande.help.cmd,commande.help.help);
            }
        })
        message.channel.send({embeds:[help]});
    });

};
module.exports.help = {
    name:"help",
    cmd:'help',
    help:"> Appelle l'aide"
}
