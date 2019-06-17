import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {PingTimeMsg} from '../models/PingTimeMsg';
import {PingTimeService} from '../services/ping-time.service';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-ping-chart',
  templateUrl: './ping-chart.component.html',
  styleUrls: ['./ping-chart.component.scss']
})
export class PingChartComponent implements OnInit {
  @Input() domain: string;
  @Input() items: ReplaySubject<PingTimeMsg>;
  localItems$: BehaviorSubject<Array<PingTimeMsg>> = new BehaviorSubject<Array<PingTimeMsg>>([]);

  chartData: Observable<ChartData[]>;

  constructor(private pingService: PingTimeService) { }

  ngOnInit() {
    this.pingService.getPingTimes(this.domain)
      .subscribe((pings) => {
        this.localItems$.getValue().unshift(...pings);
        this.localItems$.next(this.localItems$.getValue());
      });
    this.items.subscribe((item) => {
      this.localItems$.getValue().push(item);
      this.localItems$.next(this.localItems$.getValue());
    });

    this.chartData = this.localItems$.pipe(
        map((items) => {
          const data = new ChartData();
          data.name = items[0].domain;
          data.series = items.map((item) => {
            debugger;
            const seriesData = new SeriesData();
            seriesData.value = parseInt(item.timeInMs, 10);
            seriesData.name = item.dateTimePinged.toISOString();
            return seriesData;
          });
          return [data];
        })
    );
  }
}


class ChartData {
   name: string;
   series: SeriesData[];
}

class SeriesData {
  value: number;
  name: string;
}
