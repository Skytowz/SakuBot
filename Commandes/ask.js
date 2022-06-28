const quote = [
    "Je réponds pas à un Mikodog",
    "Quand Maki aura un copain",
    "Et puis quoi encore ??",
    "Papagane avait tout prévu ",
    "Réfléchis au-delà des 1000 cerveaux de Kaguya",
    "Putain",
    "Travaille aussi dur que Shirogane, on en parlera après ",
    "Viens ici, maman Fujiwara va t'expliquer",
]
module.exports.run = async(client, message, args) =>{        
     
    await message.channel.send(quote.sample());

};
module.exports.help = {
    name:"ask",
    cmd:'ask [question]',
    help:"> Répond à une question"
}
