const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/messageUtils");

module.exports.run = async(client, message, args) =>{        
     
    await send(message,"https://docs.google.com/spreadsheets/d/1AmXILgVd1BFfOfxQn8OJrgMQCzWbBMBRQoD9o_OHTNw")

};
module.exports.help = {
    name:"adaptation",
    help:"> Envoie le fichier excel des chapitres adaptés en anime",
    cmd:"adaptation",
    type: TypeHelp.ScanR,
    commandeReste:true
}