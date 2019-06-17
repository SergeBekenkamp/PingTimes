import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PingChartsComponent } from './ping-charts/ping-charts.component';
import { PingChartComponent } from './ping-chart/ping-chart.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import {LineChartModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PingChartsComponent,
    PingChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    ToastModule,
    LineChartModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
