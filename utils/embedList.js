const { mod } = require("./number");
module.exports = class embedList{
    embeds = [];
    index = 0;
    length = 0;
    files;
    constructor(list,length,index,files){
        this.embeds = list;
        this.length = length;
        this.index = index;
        this.files = files
    }

    setEmbedList(embeds){
        this.embeds = embeds
    }

    right(msg){
        this.index = mod(this.index+1,this.length);
        this.turnPage(msg);
    }
    left(msg){
        this.index = mod(this.index-1,this.length);
        this.turnPage(msg);
    }
    
    turnPage(msg){
        msg.update(this.getContent())
    }
    
    get(){
        return this.embeds[this.index];
    }

    getContent(){
        const message = {embeds:[this.get()]};
        if(this.files){
            message.files = [this.files[this.index]];
        }
        return message;
    }
}