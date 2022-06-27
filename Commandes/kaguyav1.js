module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send("les chapitres de Kaguya-sama en version V1 sont une version qui sort le mercredi avant la version anglaise. La version finale peut obtenir quelques changements légers de traduction.")

};
module.exports.help = {
    name:"kaguyav1",
    help:"> Explique ce qu'est la v1 des chapitres de Kaguya",
    cmd:"kaguyav1"
}
