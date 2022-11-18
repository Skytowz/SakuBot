const TypeHelp = require("../entity/typeHelp");
const { getTimeLeft } = require("../utils/dateUtils");

module.exports.run = async(client, interaction) =>{        
    const finDuNNN = new Date("2022-12-01");
    const now = new Date()
    
    const res = getTimeLeft(now,finDuNNN);
    console.log(res);
    await interaction.reply((!res?"Il ne reste plus de temps":"Il reste"+res)+" avant la fin du NNN")

};
module.exports.help = {
    name:["nnn"],
    help:"Dis combien de temps il reste avant la fin du nnn",
    type: TypeHelp.Autre,
    cmd:"nnn",
    slash:true,
}