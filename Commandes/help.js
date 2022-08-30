const { Colors, SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const fs = require("fs");
const TypeHelp = require("../entity/typeHelp");
const Embed = require("../utils/embed");
const { prefix } = require("../utils/properties");
module.exports.run = async(client, message, args) =>{        
    const help = new Embed()
        .setColor(Colors.DarkPurple)
        .setTitle('Help')
        .setThumbnail("https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png")
        .setDescription("Choose your help page below");
    fs.readdir("./Commandes/", async (error,f) =>  {
        if(error) console.log(error);

        const values = f.filter(f => f.split(".").pop() === "js").map(v => require(`./${v}`).help).filter(v => !v.noHelp && v.type);
        
        const embeds = TypeHelp.getValues().map(([key,value,description]) => {
            return new Embed()
                .setColor(Colors.DarkPurple)
                .setTitle('Help')
                .setThumbnail("https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png")
                .setDescription(`**${value}**\n------------------------------\n${description}\n------------------------------`)
                .addFields(values.filter(v => v.type.name == value).map(v => {return {name:prefix+v.cmd,value:v.help+".",inline:false}}))
    })
        const content = {embeds:[help]}
        const row =new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId("SelectHelp")
                .setOptions(TypeHelp.getValues().map(([key,value,description])  => {
                    return {
                        "label" : value,
                        "value" : value
                    }
                }))
        )
        content.components = [row];
        const msg = await message.channel.send(content);
        const interact = msg.createMessageComponentCollector({time:180000});
        interact.on("collect",  i => {
            if(i.customId === "SelectHelp"){
                i.update({embeds:[embeds.find(v => v.description.startsWith("**"+i.values))]});
            }
        })  
        interact.on("end", i => {
            msg.edit({components:[]});
        })
    });

};
module.exports.help = {
    name:"help",
    cmd:'help',
    type: TypeHelp.Utils,
    help:"> Appelle l'aide"
}