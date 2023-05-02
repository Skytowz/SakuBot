export default [
  {
    name: ['4komachap', '4kc', '4kchap'],
    help: "Affiche une page d'un chapitre du 4koma de Kaguya-sama",
    cmd: '4komachap/4kc/4kchap <chap> [page]',
    chapterId: 'de4b3c43-5243-4399-9fc3-68a3c0747138',
  },
  {
    name: ['bocchichap', 'bc', 'bchap'],
    help: "Affiche une page d'un chapitre de Bocchi the Rock!",
    cmd: 'bocchichap/bc/bchap <chap> [page]',
    chapterId: '2e0fdb3b-632c-4f8f-a311-5b56952db647',
  },
  {
    name: ['cgc', 'cingraychap'],
    help: "Affiche une page d'un chapitre de Uma Musume: Cinderella Gray",
    cmd: 'cgc/cingraychap <chap> [page]',
    chapterId: 'a9dd451c-3c45-4d66-a818-4e1b78855838',
  },
  {
    name: ['crocochap', 'cc'],
    help: "Affiche une page d'un chapitre de Croco",
    cmd: 'crocochap/cc <chap> [page]',
    chapterId: '3395f559-5f90-4049-9dae-75b8918cadb9',
    options: {
      banteam: [
        {
          id: '31a074d2-dc0e-4983-b646-0f6a1a8104a9',
        },
      ],
    },
  },
  {
    name: ['dkaguchap', 'dkc', 'dkchap'],
    help: "Affiche une page d'un chapitre de Kaguya-sama",
    cmd: 'dkaguchap/dkc/dkchap <chap> [page]',
    chapterId: 'a84264f6-a979-4573-89b3-09dd5c050c2b',
  },
  {
    name: ['hdwrchap', 'hdwrc'],
    help: "Affiche une page d'un chapitre de How do we relationship",
    cmd: 'hdwrchap/hdwrc <chap> [page]',
    chapterId: '1783',
    mangaReader: true,
  },
  {
    name: ['kaguchap', 'kc', 'kchap'],
    help: "Affiche une page d'un chapitre de Kaguya-sama",
    cmd: 'kaguchap/kc/kchap <chap> [page]',
    chapterId: '37f5cce0-8070-4ada-96e5-fa24b1bd4ff9',
  },
  {
    name: ['maguschap', 'magusc', 'mc'],
    help: "Affiche une page d'un chapitre de Magus of the library",
    cmd: 'maguschap/magusc/mc <chap> [page]',
    chapterId: '661',
    mangaReader: true,
  },
  {
    name: ['onkchap', 'oc', 'oshichap'],
    help: "Affiche une page d'un chapitre d'Oshi no Ko",
    cmd: 'onkchap/oc/oshichap <chap> [page]',
    chapterId:
      'https://raw.githubusercontent.com/ImSakushi/OshiNoKoFR/master/OshiNoKo.json',
    cubari: 'cmF3L0ltU2FrdXNoaS9Pc2hpTm9Lb0ZSL21hc3Rlci9Pc2hpTm9Lby5qc29u',
  },
  {
    name: ['renaichap', 'renaic', 'rc'],
    help: "Affiche une page d'un chapitre de Renai Daikou",
    cmd: 'renaichap/renaic/rc <chap> [page]',
    chapterId: 'ea3fc681-51fd-44d9-a83d-297c4c28e11b',

    options: {
      banteam: [
        {
          id: 'fca36086-ea94-4d1b-803d-cc22dab6a570',
        },
      ],
    },
  },
  {
    name: ['sbrchap', 'sbrc'],
    help: "Affiche une page d'un chapitre de Jojo's Steel Ball Run",
    cmd: 'sbrchap/sbc <chap> [page]',
    chapterId: '1044287a-73df-48d0-b0b2-5327f32dd651',
  },
  {
    name: ['ssdc', 'senseichap', 'senseic'],
    help: "Affiche une page d'un chapitre de Sensei, Suki Desu",
    cmd: 'ssdc/senseichap/senseic <chap> [page]',
    chapterId: '617f648f-1000-4c4e-b1a3-42862f929dfd',
  },
  {
    name: ['sentaichap', 'stchap', 'stc'],
    help: "Affiche une page d'un chapitre de Sentai Daishikkaku",
    cmd: 'sentaichap/stchap/stc <chap> [page]',
    chapterId: '7878c129-a33d-4bf9-b5d2-ff98cbe85bd6',
  },
  {
    name: ['sbc', 'stablochap'],
    help:
      "Affiche une page d'un chapitre de Uma Musume Pretty Derby: Star Blossom",
    cmd: 'sbc/stablochap <chap> [page]',
    chapterId: '778b8438-af3a-4534-841c-adf923b55ee1',
  },
  {
    name: ['tc', 'tawawachap', 'tchap'],
    help: "Affiche une page d'un chapitre de Tawawa",
    cmd: 'tc/tawawachap/tchap <chap> [page]',
    chapterId: '6b27cbd8-4cc6-40ca-b010-928da4540be8',
  },
  {
    name: ['umachap', 'uc'],
    help: "Affiche une page d'un chapitre de Uma Musume",
    cmd: 'umachap/uc <chap> [page]',
    chapterId: 'a9dd451c-3c45-4d66-a818-4e1b78855838',
  },
  {
    name: ['yamadac', 'yc'],
    help:
      "Affiche une page d'un chapitre de Yamada-kun to Lv999 no Koi wo Suru",
    cmd: 'yamadac/yc <chap> [page]',
    chapterId: '643561e6-5c27-4382-95d3-8e84894a3fb6',
  },
];
