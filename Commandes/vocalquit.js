const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");
const TypeHelp = require("../entity/typeHelp");
let enCours = false;

module.exports.run = async(client, interaction) =>{     
    if(enCours) return interaction.reply({content:"Une déco est déjà en cours",ephemeral:true});

    const channelId = interaction.member.voice.channelId;
    if(!channelId){
        return interaction.reply({content:"Vous n'êtes pas dans un channel vocal",ephemeral:true});
    }

    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: interaction.member.voice.guild.id,
        adapterCreator: interaction.member.guild.voiceAdapterCreator,
    });

    const player =  createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    const ressource =  createAudioResource("./Ressources/outro.mp3")

    player.play(ressource);

    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
    })
    
    enCours = true
    setTimeout(() => {
        interaction.member.voice.disconnect()
        enCours = false;
    },15500)
    interaction.reply({content:"Disconnected",ephemeral:true});

};
module.exports.help = {
    name:["quit"],
    help:"Quitter le vocal de manière stylé",
    type: TypeHelp.Autre,
    cmd:"quit",
}