const { MessageActionRow, MessageButton, Message } = require("discord.js");
const { getChapitre } = require("../services/mangadexService");
const { getChapitre:getChapitreMangaScan } = require("../services/mangascanService");

/**
 * 
 * @param {Message} message 
 * @param {Array} args 
 * @param {string} id 
 * @param {string} [slug] 
 * @returns 
 */
module.exports.send = async (message,args,research,slug) => {
    const [chap,numero] = [args[1],args[3]];
    if(!chap || chap == "" || Number.isNaN(chap)) return message.channel.send("Veuillez rentrer un numéro de chapitre valide");
    let chapitre = await getChapitre(research,chap);
    if(typeof chapitre == "string"){
        if(slug){
            chapitre = await getChapitreMangaScan(slug,chap);
            if(typeof chapitre == "string") return message.channel.send(chapitre);
        }else return message.channel.send(chapitre);
    } 
    const embedList = chapitre.getEmbedList();
    if(numero && numero!="" && !Number.isNaN(numero) && numero <= chapitre.nbPages && numero>0) embedList.index = numero-1;
    const content = {embeds:[embedList.get()]};
    if(chapitre.nbPages > 1){
        const row =new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('before')
                .setLabel("<")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("next")
                .setLabel(">")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("lock")
                .setLabel("🔒")
                .setStyle("SECONDARY"),
        );
        content.components = [row];
    }
    const msg = await message.channel.send(content);
    if(chapitre.nbPages > 1){
        const interact = msg.createMessageComponentCollector({time:180000});

        interact.on("collect",async i =>{
            if(i.customId === "before"){
                embedList.left(i);
            }else if(i.customId === "next"){
                embedList.right(i);
            }else if(i.customId === "lock"){
                interact.stop();
            }
        })

        interact.on("end",async i => {
            msg.edit({components:[]});
        })
    }
}