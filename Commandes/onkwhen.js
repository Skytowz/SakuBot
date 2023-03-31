const TypeHelp = require("../entity/typeHelp");
const { getTimeLeft } = require("../utils/dateUtils");

module.exports.run = async(client, interaction) =>{        
    const sortieOnk = new Date("2023-04-12T17:00:00");
    const now = new Date()
    
    const res = getTimeLeft(now,sortieOnk);
    console.log(res);
    await interaction.reply((!res?"L'épisode 1 est déjà sorti !":"Il reste"+res+" avant la sortie de l'épisode!"))

};
module.exports.help = {
    name:["onkwhen"],
    help:"Dis combien de temps il reste avant le début du 1er episode de Oshi no Ko",
    type: TypeHelp.Autre,
    cmd:"onkwhen",
    slash:true,
}