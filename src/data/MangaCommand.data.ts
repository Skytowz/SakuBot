import TeamBan from '../entity/TeamBan.js';
import { ImplementableMangaCommandDetails } from '../types/Command.js';

const details: Array<ImplementableMangaCommandDetails> = [
  {
    id: '4komachap',
    name: ['4kc'],
    description: "Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    options: {
      research: 'de4b3c43-5243-4399-9fc3-68a3c0747138',
    },
  },
  {
    id: 'amagamichap',
    name: ['asc'],
    description:
      "Affiche une page d'un chapitre de How I Married an Amagami Sister",
    options: {
      research: '0f6003ca-e7f3-43ce-bfd2-0694146994be',
    },
  },
  {
    id: 'bocchichap',
    name: ['brc'],
    description: "Affiche une page d'un chapitre de Bocchi the Rock!",
    options: {
      research: '2e0fdb3b-632c-4f8f-a311-5b56952db647',
    },
  },
  {
    id: 'cgc',
    name: ['cgc'],
    description:
      "Affiche une page d'un chapitre de Uma Musume: Cinderella Gray",
    options: {
      research: 'a9dd451c-3c45-4d66-a818-4e1b78855838',
    },
  },
  {
    id: 'chimerachap',
    name: ['chc'],
    description: "Affiche une page d'un chapitre de Kyokutou Chimeratica",
    options: {
      research: '5786e730-541b-4e35-9c2f-9932784fc1c3',
    },
  },
  {
    id: 'crocochap',
    name: ['crc'],
    description: "Affiche une page d'un chapitre de Croco",
    options: {
      bannedTeams: [new TeamBan('31a074d2-dc0e-4983-b646-0f6a1a8104a9')],
      research: '3395f559-5f90-4049-9dae-75b8918cadb9',
    },
  },
  {
    id: 'dkaguchap',
    name: ['dkc'],
    description: "Affiche une page d'un chapitre du Doujin Kaguya-sama",
    options: {
      research: 'a84264f6-a979-4573-89b3-09dd5c050c2b',
    },
  },
  {
    id: 'girlishnumberchap',
    name: ['gnc'],
    description: "Affiche une page d'un chapitre de Girlish Number",
    options: {
      research:
        'https://raw.githubusercontent.com/SeanR-ScanR/GN/master/GirlishNumber.json',
      cubariId: 'cmF3L1NlYW5SLVNjYW5SL0dOL21hc3Rlci9HaXJsaXNoTnVtYmVyLmpzb24',
    },
  },
  {
    id: 'kaguchap',
    name: ['kc'],
    description: "Affiche une page d'un chapitre de Kaguya-sama",
    options: {
      research: '37f5cce0-8070-4ada-96e5-fa24b1bd4ff9',
    },
  },
  {
    id: 'kikurichap',
    name: ['krc'],
    description: "Affiche une page d'un chapitre de Kikuri the Rock",
    options: {
      research: '56901ae8-aece-4983-96c3-94751c96a8bb',
    },
  },
  {
    id: 'materchap',
    name: ['mtc'],
    description: "Affiche une page d'un chapitre de Maternelle WARS",
    options: {
      research: 'f8f3f045-01b5-4216-8f41-d947d8b448b0',
    },
  },
  {
    id: 'onkchap',
    name: ['onkc'],
    description: "Affiche une page d'un chapitre d'Oshi no Ko",
    options: {
      research:
        'https://raw.githubusercontent.com/ImSakushi/OshiNoKoFR/master/OshiNoKo.json',
      cubariId: 'cmF3L0ltU2FrdXNoaS9Pc2hpTm9Lb0ZSL21hc3Rlci9Pc2hpTm9Lby5qc29u',
    },
  },
  {
    id: 'princesschap',
    name: ['pc'],
    description:
      "Affiche une page d'un chapitre de Les Sept Princesses Endormies",
    options: {
      research: '912dd3eb-80f2-4659-8986-badb32c847c0',
    },
  },
  {
    id: 'renaichap',
    name: ['rc'],
    description: "Affiche une page d'un chapitre de Renai Daikou",
    options: {
      bannedTeams: [new TeamBan('fca36086-ea94-4d1b-803d-cc22dab6a570')],
      research: 'ea3fc681-51fd-44d9-a83d-297c4c28e11b',
    },
  },
  {
    id: 'rurichap',
    name: ['rdc'],
    description: "Affiche une page d'un chapitre de Ruri Dragon",
    options: {
      bannedTeams: [new TeamBan('7881a4b8-2433-4159-9eb4-c3e29cddc680', 7)],
      research: '141609b6-cf86-4266-904c-6648f389cdc9',
    },
  },
  {
    id: 'sentaichap',
    name: ['stc'],
    description: "Affiche une page d'un chapitre de Sentai Daishikkaku",
    options: {
      research: '7878c129-a33d-4bf9-b5d2-ff98cbe85bd6',
    },
  },
  {
    id: 'stablo',
    name: ['sbc'],
    description:
      "Affiche une page d'un chapitre de Uma Musume Pretty Derby: Star Blossom",
    options: {
      research: '778b8438-af3a-4534-841c-adf923b55ee1',
    },
  },
  {
    id: 'tc',
    name: ['tc'],
    description: "Affiche une page d'un chapitre de Tawawa",
    options: {
      research: '6b27cbd8-4cc6-40ca-b010-928da4540be8',
    },
  },
  {
    id: 'yamadac',
    name: ['yc'],
    description:
      "Affiche une page d'un chapitre de Yamada-kun to Lv999 no Koi wo Suru",
    options: {
      research: '643561e6-5c27-4382-95d3-8e84894a3fb6',
    },
  },
  {
    id: 'medakac',
    name: ['mc'],
    description:
      "Affiche une page d'un chapitre de Medaka Machin Truc (anglais)",
    options: {
      research: '87ffa375-bd2c-49ba-ba0c-6d78ea07c342',
      languages: ['en'],
    },
  },
];

export default details;
