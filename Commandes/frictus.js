const TypeHelp = require("../entity/typeHelp");
const { send } = require("../utils/messageUtils");

module.exports.run = async (client, message, args) => {

	await send(message, "Réel, au dessus de ça il y a la douceur, l'amabilité, la forme, la gentillesse et la bonté et tant d'autre. Ce que je veux dire c'est qu'il y a pas besoin que ce soir énorme pour passer un merveilleux moment d'ailleurs je trouve ça plus minion quand c'est petit mais aussi plus pratique, ça va peut être plus vite mais c'est une force en soit non ???")

};
module.exports.help = {
	name: "frictus",
	noHelp: true,
	commandeReste: true,
}