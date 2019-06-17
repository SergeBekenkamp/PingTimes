import { Component, OnInit } from '@angular/core';
import {PingTimeService} from '../services/ping-time.service';

@Component({
  selector: 'app-ping-charts',
  templateUrl: './ping-charts.component.html',
  styleUrls: ['./ping-charts.component.scss']
})
export class PingChartsComponent implements OnInit {

  constructor(public pingTimeService: PingTimeService) { }

  ngOnInit() {
  }

}
