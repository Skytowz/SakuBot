module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send("https://docs.google.com/spreadsheets/d/1AmXILgVd1BFfOfxQn8OJrgMQCzWbBMBRQoD9o_OHTNw")

};
module.exports.help = {
    name:"adaptation",
    help:"> Envoie le fichier excel des chapitres adaptés en anime",
    cmd:"adaptation",
    commandeReste:true
}