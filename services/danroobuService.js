const superagent = require("superagent");

module.exports.getGeneralImageByTag = async (name) => {
    return await superagent.get(`https://danbooru.donmai.us/posts.json?tags=${ name }+rating%3Ag+random%3A20`).set("User-Agent","Discord Bot Hayasaku").then(res => res.body.pop().file_url);
}