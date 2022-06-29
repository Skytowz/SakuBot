const { Client, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: ["GUILDS","DIRECT_MESSAGES","GUILD_MESSAGES","GUILD_EMOJIS_AND_STICKERS","GUILD_MESSAGE_REACTIONS"]});

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

if(process.env.ENV == "DEV"){
    client.login(process.env.TOKEN_DEV);
}else if(process.env.ENV == "PROD"){
    client.login(process.env.TOKEN);
}

client.on("rateLimit", data => {
    if (data.timeout > 1000) process.kill(1)
  })

client.commands = new Collection();

fs.readdir("./Commandes/",(error,f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvé");

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commandes chargée`);
        
        if(typeof commande.help.name == "object") commande.help.name.forEach((name) => client.commands.set(name,commande));
        else client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) =>{
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    })
})

var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8000);