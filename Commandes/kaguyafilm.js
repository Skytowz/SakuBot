const TypeHelp = require("../entity/typeHelp");
const { getTimeLeft } = require("../utils/dateUtils");

module.exports.run = async(client, interaction) =>{        
    const debutKaguyaFilm = new Date("2023-02-11T18:00:00");
    const now = new Date()
    
    const res = getTimeLeft(now,debutKaguyaFilm);
    console.log(res);
    await interaction.reply((!res?"Le film a déjà commencé, voir est terminé":"Il reste"+res+" avant le début du film Kaguya!"))

};
module.exports.help = {
    name:["kaguyafilm","kagufilm","film"],
    help:"Dis combien de temps il reste avant le début du film Kaguya",
    type: TypeHelp.Autre,
    cmd:"kaguyafilm/kagufilm/film",
    slash:true,
}