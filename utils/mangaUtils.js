const { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } = require("discord.js");
const { getChapitre, getChapitreById, getChapitreInfoById } = require("../services/mangadexService");
const { getChapitre:getChapitreMangaScan } = require("../services/mangascanService");
const { getChapitre:getChapitreMangaReader } = require("../services/mangareaderService");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Array} args 
 * @param {string} id 
 * @param {string} [slug] 
 * @returns 
 */
module.exports.send = async (interaction,chap,numero,{id:research,blueSoloEd = false,slug,langue,idChap,mangaReader}) => {
    let chapitre;
    let defer = false;
    if(idChap){
        let data = await getChapitreInfoById(idChap);
        chapitre = await getChapitreById(data);
        if(typeof chapitre == "string") return interaction.reply({content:chapitre,ephemeral:true});
    }else{
        if(!chap || chap == "" || Number.isNaN(chap)) return interaction.reply({content:"Veuillez rentrer un numéro de chapitre valide",ephemeral:true});
        if(mangaReader){
            interaction.deferReply();
            defer = true;
            chapitre = await getChapitreMangaReader(research,chap);
        }else{
            chapitre = await getChapitre(research,chap,blueSoloEd,langue);
        }
        if(typeof chapitre == "string"){
            if(slug){
                chapitre = await getChapitreMangaScan(slug,chap);
                if(typeof chapitre == "string"){
                    if(defer){
                        return interaction.channel.send({content:chapitre,ephemeral:true})
                    }
                    return interaction.reply({content:chapitre,ephemeral:true});
                }
            }else {
                if(defer){
                    return interaction.channel.send({content:chapitre,ephemeral:true})
                }
                return interaction.reply({content:chapitre,ephemeral:true});
            }
        }
        
    }
    const embedList = chapitre.getEmbedList();

    if(numero && numero!="" && !Number.isNaN(numero) && numero <= chapitre.nbPages && numero>0) embedList.index = numero-1;
    
    const content = embedList.getContent();

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
    if(defer){
        interaction.followUp(content);
    }else{
        interaction.reply(content);
    }
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