const { RIGHT } = require("./properties");
const { mod } = require("./number");
module.exports = class embedList{
    embeds = [];
    index = 0;
    length = 0;
    constructor(list){
        if(list!=null){
            this.setEmbedListByModele(list);
        }
    }

    setEmbedList(embeds){
        this.embeds = embeds
    }

    setEmbedListByModele(list){
        if(list!=null){
            console.log("test");
            list.forEach((element,index) =>{ 
                const issueEmbed = element.getEmbed();
                issueEmbed.setFooter(index+1+"/"+list.length);
                this.length=list.length;
                return this.embeds.push(issueEmbed)
            });
        }
    }

    leftOrRight(msg,emoji){
        if(emoji === RIGHT) this.index = mod(this.index+1,this.length);
        else this.index = mod(this.index-1,this.length);
        this.turnPage(msg);
    }
    
    turnPage(msg){
        msg.edit({embeds:[this.get()]})
    }
    
    get(){
        return this.embeds[this.index];
    }
}