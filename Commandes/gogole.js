const TypeHelp = require("../entity/typeHelp");

const quote = [
	"https://media.discordapp.net/attachments/991333308988395670/991448778395631726/IMG_20220402_184149.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/991448778789888090/IMG_20220311_214535.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/991449285809942628/20210629_225506.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/991449449677209701/20211229_181714.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/991449286212599949/20201111_211421.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/991449449073217726/IMG_0398.jpg",
	"https://media.discordapp.net/attachments/991333308988395670/992525237407191102/IMG_20220421_002513.jpg",
]
module.exports.run = async (client, interaction, args) => {
	if (!["713837802638278749", "273756946308530176"].includes(interaction.member.id)) return interaction.reply({ content: 'Tu peux pas, CHEH', ephemeral: true });
	await interaction.reply({files: [quote.sample()] });
};
module.exports.help = {
	name: "gogole",
	help:'Commande gogole',
    cmd:"gogole",
    type: TypeHelp.Autre,
}
