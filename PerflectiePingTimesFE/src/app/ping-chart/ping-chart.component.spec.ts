import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingChartComponent } from './ping-chart.component';

describe('PingChartComponent', () => {
  let component: PingChartComponent;
  let fixture: ComponentFixture<PingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
