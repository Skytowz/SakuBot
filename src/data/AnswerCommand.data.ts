import TypeHelp from '../entity/typeHelp.js';
import { ImplementableAnswerCommandDetails } from '../types/Command.js';

const details: Array<ImplementableAnswerCommandDetails> = [
  {
    id: 'adaptation',
    name: ['adaptation'],
    description: 'Envoie le fichier excel des chapitres adaptés en anime',
    type: TypeHelp.ScanR,
    options: {
      messages: [
        'https://docs.google.com/spreadsheets/d/1AmXILgVd1BFfOfxQn8OJrgMQCzWbBMBRQoD9o_OHTNw',
      ],
    },
  },
  {
    id: 'aka',
    name: ['aka'],
    description: 'Envoie une photo du maitre',
    options: {
      messages: [
        {
          embeds: [
            {
              color: 15277667,
              fields: [],
              image: {
                url:
                  'https://media.discordapp.net/attachments/991007027067232257/991007040791007262/shit_edit-1.jpg?width=1202&height=676',
                height: 100,
                width: 100,
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'fatigue',
    name: ['fatigue'],
    description: 'Envoie un banger musical',
    type: TypeHelp.ScanR,
    options: {
      messages: ['https://music.youtube.com/watch?v=E34mR2hB8_o&feature=share'],
    },
  },
  {
    id: 'frictus',
    name: ['frictus'],
    description: 'Commande speciale pour Frictus',
    options: {
      messages: [
        "Réel, au dessus de ça il y a la douceur, l'amabilité, la forme, la gentillesse et la bonté et tant d'autre. Ce que je veux dire c'est qu'il y a pas besoin que ce soir énorme pour passer un merveilleux moment d'ailleurs je trouve ça plus minion quand c'est petit mais aussi plus pratique, ça va peut être plus vite mais c'est une force en soit non ???",
      ],
    },
  },
  {
    id: 'gogo',
    name: ['gogo'],
    description: 'Commande speciale pour Gogo',
    options: {
      messages: [
        'https://media.discordapp.net/attachments/695034616351817828/991292586222432296/aaa.jpg',
        'https://media.discordapp.net/attachments/991333308988395670/1026931368606830652/Page_1_copie.jpg',
        'https://media.discordapp.net/attachments/991007027067232257/1036029732212457542/Merci_Gogo_V2.jpg',
        'https://media.discordapp.net/attachments/991387297767510167/1044617571833487430/unknown.png',
      ],
    },
  },
  {
    id: 'kanasimp',
    name: ['kanasimp'],
    description: 'Louange à Kana',
    options: {
      messages: [
        "Marche-moi dessus, crache-moi dessus, fais de moi ton paillasson, je donnerai mon âme pour toi. Pour toi Kana, je braverai les tempêtes, je monterai aux sommets les plus élevés, je parcourrai les déserts arides, je plongerai dans les abysses les plus profonds, je me battrai contre vents et marées, je traverserai les océans infinis, je foulerai les terres lointaines, je serai ton bouclier et ton épée, je supporterai les épreuves les plus dures, je défierai les ennemis les plus redoutables, je chercherai les trésors les plus précieux, je gravirai les montagnes les plus escarpées, je ferai face à l'obscurité la plus totale, je déplacerai les montagnes pour toi, je briserai les chaînes qui nous retiennent, je vaincrai les obstacles les plus insurmontables, je surmonterai les peurs les plus terrifiantes, je t'offrirai les étoiles et la lune, je serai ton guide dans la nuit la plus sombre, je franchirai les frontières les plus infranchissables, je bâtirai des ponts entre les mondes, je trouverai les mots pour te consoler, je guérirai les blessures les plus profondes, je détruirai les barrières qui nous séparent, je serai la lumière qui éclaire ta voie, je serai l'épaule sur laquelle tu pourras t'appuyer, je te protégerai de tous les dangers, je serai le roc sur lequel tu pourras te reposer, je serai la force qui te soutient, je serai la flamme qui réchauffe ton cœur, je serai l'amour inébranlable, je serai l'étoile qui guide ton chemin, je serai le vent qui porte tes rêves, je serai le feu qui consume tes peines, je serai l'amour qui te fait vivre, je serai l'éternité qui t'appartient, je serai tout ce que tu désires, je serai tout ce dont tu as besoin, je serai tout ce qui fait de toi ce que tu es, je serai toujours là pour toi, je serai toujours à tes côtés, je donnerai tout pour toi, Kana.",
      ],
    },
  },
  {
    id: 'leumas',
    name: ['leumas'],
    description: 'Montre la vérité sur Leumas',
    options: {
      messages: [
        'puceau moi ? serieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps :) demande a mes potes si je suis puceau tu vas voir les reponses que tu vas te prendre XD rien que la semaine passee j ai niquer donc chuuuuut ferme la puceau de merde car oui toi tu m as tout l air d un bon puceau de merde car souvent vous etes frustrer de ne pas BAISER :) ses agreable de se faire un missionnaire ou un amazone avec une meuf hein? tu peux pas repondre car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche "missionnaire sexe" ou "amazone sexe" pour comprendre ce que c etait mdddrrr !! c est grave quoiquil en soit.... pour revenir a moi, je pense que je suis le mec le moins puceau de ma bande de 11 meilleurs amis pas psk j ai eu le plus de rapport intime mais psk j ai eu les plus jolie femme que mes amis :D ses pas moi qui le dit, ses eux qui commente sous mes photos insta "trop belle la fille que tu as coucher avec hier en boite notamment!" donc apres si tu veux que sa parte plus loi sa peut partir vraiment loi j habite dans la banlieue de niort sa te parle steven sanchez ? ses juste un cousin donc OKLM hahaha on verra si tu parles encore le puceau de merde mdddrrr pk insulter qd on est soi meme puceau tu me feras toujour marrer!!',
      ],
    },
  },
  {
    id: 'loggedoff',
    name: ['loggedoff'],
    description: 'Montre la vérité',
    options: {
      messages: [
        'https://cdn.discordapp.com/attachments/992534223397335113/1079552602838155384/ezgif.com-optimize.gif',
      ],
    },
  },
  {
    id: 'marwane',
    name: ['marwane'],
    description: 'Commande speciale pour Marwane',
    options: {
      messages: [
        {
          content:
            'Le meilleur coloriste de la ScanR en fait:\n https://twitter.com/Mahrwane',
          files: [
            'https://media.discordapp.net/attachments/991387297767510167/1017068716007108618/1HQFxl4h.jpg',
          ],
        },
      ],
    },
  },
  {
    id: 'dog',
    name: ['dog'],
    description: 'La conjecture des mikodogs',
    options: {
      messages: [
        'https://media.discordapp.net/attachments/714214949341102111/991301131290546216/ChartGo.png',
      ],
    },
  },
  {
    id: 'nijikasimp',
    name: ['nijikasimp'],
    description: 'Ôde à Nijika',
    options: {
      messages: [
        "Qui est Nijika ? Pour les aveugles, elle est la vue. Pour les affamés, elle est le chef. Pour les assoiffés, elle est de l'eau. Si Nijika pense, je suis d'accord. Si Nijika parle, j'écoute. Si Nijika a un million de fans, je suis l'un d'entre eux. Si Nijika a dix fans, je suis l'un d'entre eux. Si Nijika n'a qu'un fan, c'est moi. Si Nijika n'a pas de fans, je n'existe plus. Si le monde entier est contre Nijika, je suis contre le monde entier. Je vais aimer Nijika jusqu'à mon dernier souffle.",
      ],
    },
  },
  {
    id: 'oiseau',
    name: ['oiseau'],
    description: 'Envoie un banger autre musical',
    type: TypeHelp.ScanR,
    options: {
      messages: ['https://music.youtube.com/watch?v=XgkHohYTWzY'],
    },
  },
  {
    id: 'sakushi',
    name: ['sakushi'],
    description: 'Commande speciale pour Saku',
    options: {
      messages: [
        'https://media.discordapp.net/attachments/714214949341102111/991297071938273300/qq.jpg',
      ],
    },
  },
  {
    id: 'seanr',
    name: ['seanr'],
    description: 'Commande speciale pour SeanR',
    options: {
      messages: [
        'Comment ça harcélement ? Moi t\'harceler ? Alors que littéralement tu viens de revenir à la charge avec 4 insultes en mon égart dans ton message ? je peux aussi ajouter le "con" un peu plus bas mais je ne le ferais point',
      ],
    },
  },
  {
    id: 'scanr',
    name: ['scanr'],
    description: 'Envoi le lien du serveur ScanR',
    type: TypeHelp.ScanR,
    options: {
      messages: ['https://discord.gg/Dw9VVZFaR6'],
    },
  },
  {
    id: 'source',
    name: ['source'],
    description: 'Envoie le lien du github',
    options: {
      messages: ['https://github.com/Skytowz/SakuBot'],
    },
  },
  {
    id: 'tierlist',
    name: ['tierlist'],
    description: 'Envoie le lien de la tierlist',
    options: {
      messages: ['https://tiermaker.com/create/seanr-tier-list-15178170'],
    },
  },
  {
    id: 'umasortie',
    name: ['umasortie'],
    description: 'Envoie un rappel',
    type: TypeHelp.ScanR,
    options: {
      messages: [
        "Oubliez pas, on est jeudi et y'a quoi le jeudi, un chapitre de Uma à sortir, je le rapelle parceque même quand vous vous en souvenez, vous oubliez quand même donc oubliez pas de sortir un ou deux chapitres de ce banger intersidéral qu'est Uma Musume là!!!",
      ],
    },
  },
  {
    id: 'wiki',
    name: ['wiki'],
    description: 'Envoie le wiki de Kaguya-sama',
    type: TypeHelp.ScanR,
    options: {
      messages: [
        'https://kaguyasama-wa-kokurasetai.fandom.com/wiki/Kaguya-sama_wa_Kokurasetai_Wikia',
      ],
    },
  },
];

export default details;
