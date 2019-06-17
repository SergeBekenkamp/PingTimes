export class PingTimeMsg {
  constructor(domain: string, timeInMs: string, dateTimePinged: string) {
    this.domain = domain;
    this.timeInMs = timeInMs;
    this.dateTimePinged =  new Date(dateTimePinged);
  }

  public domain: string;
  public timeInMs: string;
  public dateTimePinged: Date;
}
