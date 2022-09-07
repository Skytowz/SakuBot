module.exports = class TypeHelp{
    static ViewManga = new TypeHelp("View Manga","Page d'aide relative au lecteur de manga interne à discord")
    static ScanR = new TypeHelp("ScanR", "Page d'aide ralative à tout ce qui se rapporte à ScanR")
    static Utils = new TypeHelp("Utils", "Page d'aide pour tout ce qui est commade utilitaire")
    static Autre = new TypeHelp("Autre", "Commande fun/troll proposé par les membres du serveur")
    
    constructor(name,description) {
        this.name = name
        this.description = description
    }

    static getValues() {
        return Object.keys(TypeHelp).map(value => [value,TypeHelp[value].name,TypeHelp[value].description]);
    }

    static getValue(value) {
        return TypeHelp[value] ?? null;
    }
}