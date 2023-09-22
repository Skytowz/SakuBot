export default class TypeHelp {
  public static readonly ViewManga = new TypeHelp(
    'View Manga',
    "Page d'aide relative au lecteur de manga interne à discord"
  );
  public static readonly ScanR = new TypeHelp(
    'ScanR',
    "Page d'aide ralative à tout ce qui se rapporte à ScanR"
  );
  public static readonly Utils = new TypeHelp(
    'Utils',
    "Page d'aide pour tout ce qui est commade utilitaire"
  );
  public static readonly Autre = new TypeHelp(
    'Autre',
    'Commande fun/troll proposé par les membres du serveur'
  );
  public static readonly Character = new TypeHelp(
    'Character',
    "Commande qui affiche une image d'un personnage"
  );

  constructor(public name: string, public description: string) {}

  static getKeys() {
    return Object.keys(TypeHelp) as Array<keyof TypeHelp>;
  }

  static getValues() {
    return TypeHelp.getKeys().map((typeHelpKey) =>
      TypeHelp.getValue(typeHelpKey)
    );
  }

  static getValue(value: keyof TypeHelp) {
    return Object.entries(TypeHelp).find(
      ([key]) => key === value
    )?.[1] as TypeHelp;
  }
}
