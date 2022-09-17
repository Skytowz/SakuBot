const TypeHelp = require("../entity/typeHelp");
require('dotenv').config();

const idMsg = process.env.ENV == "DEV" ? "1019290546088460289" : "1019293176516841472";
module.exports.run = async(client, interaction) =>{        
	if (!["904895756073336873", "273756946308530176","1020030218154557611"].includes(interaction.member.id)) return interaction.reply({ content: 'Tu peux pas, CHEH', ephemeral: true });
    const ayahito = await client.users.fetch("904895756073336873");
    const dm = await ayahito.createDM();
    const msg = await dm.messages.fetch(idMsg);
    const chiffre = parseInt(msg.content)+1;
    await interaction.reply("o".repeat(chiffre))
    msg.edit(""+chiffre);

};
module.exports.help = {
    name:["ayahitoo","aya"],
    help:"Commande speciale pour Ayahitoo",
    type: TypeHelp.Autre,
    cmd:"cmd",
}