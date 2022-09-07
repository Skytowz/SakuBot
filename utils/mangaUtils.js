const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } = require("discord.js");
const { getChapitre } = require("../services/mangadexService");
const { getChapitre:getChapitreMangaScan } = require("../services/mangascanService");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Array} args 
 * @param {string} id 
 * @param {string} [slug] 
 * @returns 
 */
module.exports.send = async (interaction,args,research,slug,blueSoloEd) => {
    const [chap,numero] = [args[0],args[1]];
    if(!chap || chap == "" || Number.isNaN(chap)) return interaction.reply({content:"Veuillez rentrer un numéro de chapitre valide",ephemeral:true});
    let chapitre = await getChapitre(research,chap);
    if(typeof chapitre == "string"){
        if(slug){
            chapitre = await getChapitreMangaScan(slug,chap);
            if(typeof chapitre == "string") return interaction.reply({content:chapitre,ephemeral:true});
        }else return interaction.reply({content:chapitre,ephemeral:true});
    }else blueSoloEd = false; 
    const embedList = chapitre.getEmbedList(blueSoloEd);
    if(numero && numero!="" && !Number.isNaN(numero) && numero <= chapitre.nbPages && numero>0) embedList.index = numero-1;
    const content = {embeds:[embedList.get()]};
    if(chapitre.nbPages > 1){
        const row =new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('before')
                .setLabel("<")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("next")
                .setLabel(">")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("lock")
                .setLabel("🔒")
                .setStyle(ButtonStyle.Secondary),
        );
        content.components = [row];
    }
    interaction.reply(content);
    const msg = await interaction.fetchReply()
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