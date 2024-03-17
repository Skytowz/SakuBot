export default class TeamBan {
  constructor(
    public id: string,
    public since?: number,
    public till?: number
  ) {}

  public isBan(numero: number) {
    if (!this.since && !this.till) return true;

    if (this.since && !this.till && this.since <= numero) return true;

    if (!this.since && this.till && this.till >= numero) return true;

    return (
      this.since && this.till && this.since <= numero && this.till >= numero
    );
  }
}
