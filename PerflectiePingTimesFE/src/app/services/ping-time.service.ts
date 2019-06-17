import {Injectable} from '@angular/core';
import {PingTimeMsg} from '../models/PingTimeMsg';
import {HubConnection} from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import {BehaviorSubject, combineLatest, merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, flatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PingTimeService {

  private hubConnection: HubConnection;
  private msgSubject = new Subject<PingTimeMsg>();
  public domainList = new BehaviorSubject<DomainList[]>([]);

  constructor(private $http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:44336/notify')
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connected!');
    }).catch((err) => {
      return console.error(err.toString());
    });

    this.hubConnection.on('BroadcastMessage', (domain: string, pingTimeMs: string, dateTimePinged: string) => {
      this.msgSubject.next(new PingTimeMsg(domain, pingTimeMs, dateTimePinged));
    });

    this.msgSubject.pipe(
      map((ping) => {
        const domains = this.domainList.getValue();
        let domain = domains.find(p => p.domain === ping.domain);
        if (!domain) {
          domain = {domain: ping.domain, items: new ReplaySubject<PingTimeMsg>(1000)};
          domains.push(domain);
          this.domainList.next(domains);
        }
        domain.items.next(ping);
      })
    ).subscribe();


  }

  getPingTimes(domain: string): Observable<PingTimeMsg[]> {
    return this.$http.get<PingTimeMsg[]>(`https://localhost:44336/api/ping?domain=${domain}`).pipe(map((items) => items.map(x => new PingTimeMsg(x.domain, x.timeInMs, x.dateTimePinged as any as string))));
  }


}

export class DomainList {
  domain: string;
  items: ReplaySubject<PingTimeMsg>;
}

