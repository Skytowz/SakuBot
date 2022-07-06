const { Client, Collection } = require('discord.js');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const  transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skytowz359@gmail.com',
    pass: process.env.PASSWORD
  }
});

const client = new Client({ intents: ["GUILDS","DIRECT_MESSAGES","GUILD_MESSAGES","GUILD_EMOJIS_AND_STICKERS","GUILD_MESSAGE_REACTIONS"]});

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

client.on("rateLimit", data => {
    if (data.timeout > 10000){
			const  mailOptions = {
			  from: 'skytowz359@gmail.com',
			  to: 'lucashottin359@gmail.com',
			  subject: 'Rate Limite Atteinte',
			  text: 'ATTENTION LA RATE LIMITE EST ATTEINTE'
			};
			transporter.sendMail(mailOptions, (error, info) => {
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
			  }
			});
			process.kill(1)
		}
  })


if(process.env.ENV == "DEV"){
    client.login(process.env.TOKEN_DEV);
}else if(process.env.ENV == "PROD"){
    client.login(process.env.TOKEN);
}


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