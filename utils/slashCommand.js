const SlashOption = require("./slashOption");

module.exports = class SlashCommand{
    
    name;
    description;
    options;

    constructor(){
        this.options = []
    }

    setName(name){
        this.name = name;
        return this;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    setOption(options){
        this.options = options;
        return this;
    }

    addOption(option){
        this.options.push(option);
    }

    addOption(name,description,type,required){
        this.options.push(new SlashOption().setName(name).setDescription(description).setType(type).setRequired(required))
    }
}