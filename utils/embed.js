module.exports = class Embed{

    type = "rich"
    title;
    color;
    description;
    fields=[];
    thumbnail;
    footer;

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

}