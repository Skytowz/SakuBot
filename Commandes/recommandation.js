const { ApplicationCommandOptionType } = require("discord.js");
const TypeHelp = require("../entity/typeHelp");
const SlashOption = require("../utils/slashOption");
module.exports.run = async(client, interaction, args) =>{    
    interaction.reply("Cette commande n'est plus disponible pour le moment du à un changement de version de plugin")
};


module.exports.help = {
    name:"reco",
    help:"Recommande un manga/anime",
    type: TypeHelp.Utils,
    cmd:"reco <link-nautiljon>",
    args:[
        new SlashOption().setName("lien").setDescription("Lien de la page nautiljon").setRequired(true)
    ]
}
