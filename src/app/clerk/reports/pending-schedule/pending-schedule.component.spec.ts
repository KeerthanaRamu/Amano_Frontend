import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingScheduleComponent } from './pending-schedule.component';

describe('PendingScheduleComponent', () => {
  let component: PendingScheduleComponent;
  let fixture: ComponentFixture<PendingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
