/* eslint-disable @typescript-eslint/ban-ts-comment */
export default class TypeHelp {
  static ViewManga = new TypeHelp(
    'View Manga',
    "Page d'aide relative au lecteur de manga interne à discord"
  );
  static ScanR = new TypeHelp(
    'ScanR',
    "Page d'aide ralative à tout ce qui se rapporte à ScanR"
  );
  static Utils = new TypeHelp(
    'Utils',
    "Page d'aide pour tout ce qui est commade utilitaire"
  );
  static Autre = new TypeHelp(
    'Autre',
    'Commande fun/troll proposé par les membres du serveur'
  );
  static Character = new TypeHelp(
    'Character',
    "Commande qui affiche une image d'un personnage"
  );

  constructor(public name: string, public description: string) {}

  static getValues() {
    return Object.keys(TypeHelp).map((value) => [
      value,
      //FIXME
      //@ts-ignore
      TypeHelp[value].name,
      //@ts-ignore
      TypeHelp[value].description,
    ]);
  }

  static getValue(value: string) {
    //FIXME
    //@ts-ignore
    return TypeHelp[value] ?? null;
  }
}
