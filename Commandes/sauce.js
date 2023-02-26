const { CommandInteraction, Collection, ButtonStyle, ButtonBuilder, ActionRow, ActionRowBuilder } = require("discord.js");
const { request, fetch } = require("undici");
const TypeHelp = require("../entity/typeHelp");
const Embed = require("../utils/embed");
/**
 * 
 * @param {*} client 
 * @param {CommandInteraction} interaction 
 */
module.exports.run = async(client, interaction) =>{        
    if(!interaction.isMessageContextMenuCommand()) return interaction.reply({content:"Ceci n'est pas un message",ephemeral:true})
    let image;
    if(img = interaction.targetMessage.attachments.find(value => value.contentType.includes("image"))){
        image = img.url;
    }else if(isImgUrl(interaction.targetMessage.content)){
        image = interaction.targetMessage.content;
    }else{
       return interaction.reply({content:"Ceci n'est pas une image",ephemeral:true})
    };
    image = image.split("?")[0];
    if(!isImgUrl(image)) return interaction.reply({content:"Image ou lien incompatible",ephemeral:true});
    const {results} =  await fetch(`https://saucenao.com/search.php?db=999&output_type=2&numres=50&api_key=4f94dcf41458ba2601b9d09fe7d4107a7afd9071&url=${image}`).then(async response => await response.json()).catch(() => false);
    if(!results){
      return interaction.reply({content:"Image ou lien incompatible",ephemeral:true});
    }
    results.sort((a,b) => b.header.similarity - a.header.similarity)
    const res = results[0];
    const embed = new Embed().setTitle(res.data.title ?? res.data.source ?? res.header.index_name).setUrl(res.data.ext_urls ? res.data.ext_urls[0] : res.header.thumbnail).setImage(res.header.thumbnail).addField('Similitude',`${res.header.similarity}%`);
    if(res.data.author_name){
        embed.setAuthorNameUrl(res.data.author_name,res.data.author_url);
    }else if(res.data.twitter_user_handle){
        embed.setAuthorNameUrl(res.data.twitter_user_handle,`https://twitter.com/${res.data.twitter_user_handle}`);
    }else if(res.data.eng_name){
        embed.setAuthorNameUrl(res.data.eng_name,res.header.thumbnail);
    }else if(res.data.danbooru_id){
      embed.setAuthorNameUrl(res.data.creator,res.data.ext_urls[0]).setTitle(res.data.characters);
    }
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Voir')
        .setURL(res.data.ext_urls ? res.data.ext_urls[0] : res.header.thumbnail)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
          .setCustomId('show')
          .setEmoji("👁")
          .setLabel("Afficher")
          .setStyle(ButtonStyle.Secondary)
    )
    interaction.reply({embeds:[embed], ephemeral:true, components:[row]});
    const msg = await interaction.fetchReply();
    const interact = msg.createMessageComponentCollector({time:180000});

    interact.on("collect",async i =>{
        if(i.customId === "show"){
          row.components.pop()
          i.update({content:"-",embeds:[],components:[]});
          interaction.targetMessage.reply({embeds:[embed],components:[row],allowedMentions:{repliedUser:false}});
        }
    })

};
module.exports.help = {
    name:["sauce"],
    help:"> Donne la source d'une image",
    type: TypeHelp.Utils,
    cmd:"sauce",
    message: true
}
const isImgUrl = (url) => {
    if(!validURL(url)) return false;
    return request(url).then(({headers}) => {
      return headers["content-type"].includes('image');
    })
  }

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }