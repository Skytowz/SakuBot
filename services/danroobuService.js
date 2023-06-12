const superagent = require("superagent");

module.exports.getGeneralImageByTag = async (name,solo) => await superagent.get(`https://gelbooru.com/index.php?tags=${ name }${solo ? "+solo" : ""}+sort:random+rating:general&page=dapi&json=1&s=post&q=index&limit=1`).set("User-Agent","Discord Bot Hayasaku").then(res => res?.body?.post?.pop()?.file_url);