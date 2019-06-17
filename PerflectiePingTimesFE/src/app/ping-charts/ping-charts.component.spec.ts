import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingChartsComponent } from './ping-charts.component';

describe('PingChartsComponent', () => {
  let component: PingChartsComponent;
  let fixture: ComponentFixture<PingChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
