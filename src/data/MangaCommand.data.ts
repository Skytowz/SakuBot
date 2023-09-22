import { ImplementableMangaCommandDetails } from '../types/Command.js';

const details: Array<ImplementableMangaCommandDetails> = [
  {
    id: '4komachap',
    name: ['4komachap'],
    description: "Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    options: {
      research: 'de4b3c43-5243-4399-9fc3-68a3c0747138',
    },
  },
  {
    id: 'bocchichap',
    name: ['bocchichap'],
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
    id: 'crocochap',
    name: ['crocochap'],
    description: "Affiche une page d'un chapitre de Croco",
    options: {
      bannedTeams: ['31a074d2-dc0e-4983-b646-0f6a1a8104a9'],
      research: '3395f559-5f90-4049-9dae-75b8918cadb9',
    },
  },
  {
    id: 'dkaguchap',
    name: ['dkaguchap'],
    description: "Affiche une page d'un chapitre de Kaguya-sama",
    options: {
      research: 'a84264f6-a979-4573-89b3-09dd5c050c2b',
    },
  },
  {
    id: 'kaguchap',
    name: ['kaguchap'],
    description: "Affiche une page d'un chapitre de Kaguya-sama",
    options: {
      research: '37f5cce0-8070-4ada-96e5-fa24b1bd4ff9',
    },
  },
  {
    id: 'onkchap',
    name: ['onkchap'],
    description: "Affiche une page d'un chapitre d'Oshi no Ko",
    options: {
      research:
        'https://raw.githubusercontent.com/ImSakushi/OshiNoKoFR/master/OshiNoKo.json',
      cubariId: 'cmF3L0ltU2FrdXNoaS9Pc2hpTm9Lb0ZSL21hc3Rlci9Pc2hpTm9Lby5qc29u',
    },
  },
  {
    id: 'renaichap',
    name: ['renaichap'],
    description: "Affiche une page d'un chapitre de Renai Daikou",
    options: {
      bannedTeams: ['fca36086-ea94-4d1b-803d-cc22dab6a570'],
      research: 'ea3fc681-51fd-44d9-a83d-297c4c28e11b',
    },
  },
  {
    id: 'sbrchap',
    name: ['sbrchap'],
    description: "Affiche une page d'un chapitre de Jojo's Steel Ball Run",
    options: {
      research: '1044287a-73df-48d0-b0b2-5327f32dd651',
    },
  },
  {
    id: 'ssdc',
    name: ['ssdc'],
    description: "Affiche une page d'un chapitre de Sensei, Suki Desu",
    options: {
      research: '617f648f-1000-4c4e-b1a3-42862f929dfd',
    },
  },
  {
    id: 'sentaichap',
    name: ['sentaichap'],
    description: "Affiche une page d'un chapitre de Sentai Daishikkaku",
    options: {
      research: '7878c129-a33d-4bf9-b5d2-ff98cbe85bd6',
    },
  },
  {
    id: 'stablo',
    name: ['sbc', 'stablochap'],
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
    id: 'umachap',
    name: ['umachap'],
    description: "Affiche une page d'un chapitre de Uma Musume",
    options: {
      research: 'a9dd451c-3c45-4d66-a818-4e1b78855838',
    },
  },
  {
    id: 'yamadac',
    name: ['yamadac'],
    description:
      "Affiche une page d'un chapitre de Yamada-kun to Lv999 no Koi wo Suru",
    options: {
      research: '643561e6-5c27-4382-95d3-8e84894a3fb6',
    },
  },
];

export default details;
