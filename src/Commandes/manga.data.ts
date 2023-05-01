export default {
  '4koma': {
    name: ['4komachap', '4kc', '4kchap'],
    help: "Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    cmd: '4komachap/4kc/4kchap <chap> [page]',
    id: 'de4b3c43-5243-4399-9fc3-68a3c0747138',
  },
  bocchi: {
    name: ['bocchichap', 'bc', 'bchap'],
    help: "Affiche une page d'un chapitre de Bocchi the Rock!",
    cmd: 'bocchichap/bc/bchap <chap> [page]',
    id: '2e0fdb3b-632c-4f8f-a311-5b56952db647',
  },
  croco: {
    name: ['crocochap', 'cc'],
    help: "Affiche une page d'un chapitre de Croco",
    cmd: 'crocochap/cc <chap> [page]',
    id: '3395f559-5f90-4049-9dae-75b8918cadb9',
    options: {
      banteam: [
        {
          id: '31a074d2-dc0e-4983-b646-0f6a1a8104a9',
        },
      ],
    },
  },
  'doujin-kaguya': {
    name: ['dkaguchap', 'dkc', 'dkchap'],
    help: "Affiche une page d'un chapitre de Kaguya-sama",
    cmd: 'dkaguchap/dkc/dkchap <chap> [page]',
    id: 'a84264f6-a979-4573-89b3-09dd5c050c2b',
  },
  hdwr: {
    name: ['hdwrchap', 'hdwrc'],
    help: "Affiche une page d'un chapitre de How do we relationship",
    cmd: 'hdwrchap/hdwrc <chap> [page]',
    id: '1783',
    mangaReader: true,
  },
  kaguya: {
    name: ['kaguchap', 'kc', 'kchap'],
    help: "Affiche une page d'un chapitre de Kaguya-sama",
    cmd: 'kaguchap/kc/kchap <chap> [page]',
    id: '37f5cce0-8070-4ada-96e5-fa24b1bd4ff9',
  },
  magus: {
    name: ['maguschap', 'magusc', 'mc'],
    help: "Affiche une page d'un chapitre de Magus of the library",
    cmd: 'maguschap/magusc/mc <chap> [page]',
    id: '661',
    mangaReader: true,
  },
  onk: {
    name: ['onkchap', 'oc', 'oshichap'],
    help: "Affiche une page d'un chapitre d'Oshi no Ko",
    cmd: 'onkchap/oc/oshichap <chap> [page]',
    id: '296cbc31-af1a-4b5b-a34b-fee2b4cad542',
    options: {
      banteam: [
        {
          id: '4bd5fd9a-ee2f-40ae-8551-28e49be30cd2',
          from: 94,
        },
      ],
    },
  },
  renai: {
    name: ['renaichap', 'renaic', 'rc'],
    help: "Affiche une page d'un chapitre de Renai Daikou",
    cmd: 'renaichap/renaic/rc <chap> [page]',
    id: 'ea3fc681-51fd-44d9-a83d-297c4c28e11b',

    options: {
      banteam: [
        {
          id: 'fca36086-ea94-4d1b-803d-cc22dab6a570',
        },
      ],
    },
  },
  sbr: {
    name: ['sbrchap', 'sbrc'],
    help: "Affiche une page d'un chapitre de Jojo's Steel Ball Run",
    cmd: 'sbrchap/sbc <chap> [page]',
    id: '1044287a-73df-48d0-b0b2-5327f32dd651',
  },
  senseisukidesu: {
    name: ['ssdc', 'senseichap', 'senseic'],
    help: "Affiche une page d'un chapitre de Sensei, Suki Desu",
    cmd: 'ssdc/senseichap/senseic <chap> [page]',
    id: '617f648f-1000-4c4e-b1a3-42862f929dfd',
  },
  sentai: {
    name: ['sentaichap', 'stchap', 'stc'],
    help: "Affiche une page d'un chapitre de Sentai Daishikkaku",
    cmd: 'sentaichap/stchap/stc <chap> [page]',
    id: '7878c129-a33d-4bf9-b5d2-ff98cbe85bd6',
  },
  tawawa: {
    name: ['tc', 'tawawachap', 'tchap'],
    help: "Affiche une page d'un chapitre de Tawawa",
    cmd: 'tc/tawawachap/tchap <chap> [page]',
    id: '6b27cbd8-4cc6-40ca-b010-928da4540be8',
  },
  uma: {
    name: ['umachap', 'uc'],
    help: "Affiche une page d'un chapitre de Uma Musume",
    cmd: 'umachap/uc <chap> [page]',
    id: 'a9dd451c-3c45-4d66-a818-4e1b78855838',
  },
};
