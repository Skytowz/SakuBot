const { cp } = require("fs");

module.exports = class Embed{

    type = "rich"
    title;
    color;
    description;
    fields=[];
    thumbnail;
    footer;
    image;
    author;

    setTitle(title){
        this.title=title;
        return this;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    setColor(color){
        this.color=color;
        return this;
    }
    
    addField(title,description){
        this.fields.push({name:title,value:description,inline:false});
        return this;
    }
    
    setThumbnail(image){
        this.thumbnail = {url:image};
        return this;
    }

    setFooter(text){
        this.footer = {text:text};
        return this;
    }

    setImage(url,height = 100,width = 100){
        this.image = {
            url:url,
            height:height,
            width:width
        };
        return this;
    }
    setVideo(url,height = 100,width = 100){
        this.video = {
            url:url,
            height:height,
            width:width
        };
        return this;
    }

    setAuthor(user){
        this.author = {
            name: user.username,
            iconURL: user.avatarURL(),
        }
        return this;
    }


    static getNautiljonEmbed(username,props,link){
        const getDescription = (description) =>{
            if(description.length > 500) return description.substr(0,500).trim()+`..........([see more](${link}))`;
            else return description;
        }
        const otherData = [];
        const datas = props.data.reduce((json, item) => {
            if(item.includes("·")){
                const elements = item.split("·");
                if(elements){
                    elements.forEach(element=>{
                        if(element.includes(":")){
                            const data = element.split(":");
                            json[data.shift().trim()] = data.join(":").trim(); 
                        }else{
                            otherData.push(element);
                        }
                    })
                }
            }else{
                if(item.includes(":")){
                    const data = item.split(":");
                    json[data.shift().trim()] = data.join(":").trim(); 
                }
            }
            return json;
        },{});
        const embed =  new Embed()
        .setTitle(props.infos[1])
        .setThumbnail('https://www.nautiljon.com'+props.cover[1])
        .addField("Nom",`[${props.infos[2]}](${link})`);
        if(datas.Auteur) embed.addField("Auteur",datas.Auteur);
        if(datas.Origine && props.infos == "Mangas") embed.addField("Origine",datas.Origine);
        if(otherData[0]){
            embed.addField("Type",otherData[0]);
            if(otherData[1]){
                embed.addField("Pays d'origine",otherData[1])
                if(otherData[2]){
                    embed.addField("Durée",otherData[2]);
                }
            }
        }
        if(datas.Saison) embed.addField("Saison",datas.Saison);
        if(datas.Type) embed.addField("Type",datas.Type);
        if(datas.Genres) embed.addField("Genre",datas.Genres);
        if(datas.Plateforme) embed.addField("Plateforme",datas.Plateforme);
        if(datas.Prix) embed.addField("Prix",datas.Prix);
        if(datas["Thème"]) embed.addField("Thème",datas["Thème"]);
        if(datas["Thèmes"]) embed.addField("Thèmes",datas["Thèmes"]);
        if(datas['Simulcast / streaming']) embed.addField("Disponible sur",datas['Simulcast / streaming']);
        embed.addField(props.titre[0],getDescription(props.description[0]));
        embed.setFooter("Recommandation par "+username);
        switch(props.infos[1]){
            case "Mangas": 
                embed.setColor("BLACK");
                break;
            case "Animes":
                embed.setColor("ORANGE");
                break;
            case "Light novels":
                embed.setColor("BLUE");
                break;
            case "Jeux vidéo":
                embed.setColor("RED");
                break;
            case "Personnalités":
                embed.setColor("GREEN");
                break;
            default:
                embed.setColor('DEFAULT');
                break;
        }
        return embed;
    }
}