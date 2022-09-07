const { ApplicationCommandOptionType } = require("discord.js");

module.exports = class SlashOption{

    name;
    description;
    type;
    required;

    constructor(name,description,type = ApplicationCommandOptionType.String,required = false){
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
    }

    setName(name){
        this.name = name;
        return this;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    setType(type){
        this.type = type ?? ApplicationCommandOptionType.String;
        return this;
    }

    setRequired(required){
        this.required = required ?? falses;
        return this;
    }
}