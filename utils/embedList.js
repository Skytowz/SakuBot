const { RIGHT } = require("./properties");
const { mod } = require("./number");
module.exports = class embedList{
    embeds = [];
    index = 0;
    length = 0;
    constructor(list,length,index){
        this.embeds = list;
        this.length = length;
        this.index = index;
    }

    setEmbedList(embeds){
        this.embeds = embeds
    }

    leftOrRight(msg,emoji){
        if(emoji === RIGHT) this.index = mod(this.index+1,this.length);
        else this.index = mod(this.index-1,this.length);
        this.turnPage(msg);
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
        msg.update({embeds:[this.get()]})
    }
    
    get(){
        return this.embeds[this.index];
    }
}