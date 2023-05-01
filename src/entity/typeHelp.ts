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
      Object.entries(TypeHelp).find(([key]) => key === value)?.[1]?.name,
      Object.entries(TypeHelp).find(([key]) => key === value)?.[1]?.description,
    ]);
  }

  static getValue(value: string) {
    return Object.entries(TypeHelp).find(([key]) => key === value)?.[1] ?? null;
  }
}
