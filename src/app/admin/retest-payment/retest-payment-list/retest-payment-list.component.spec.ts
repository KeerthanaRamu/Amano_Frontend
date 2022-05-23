import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetestPaymentListComponent } from './retest-payment-list.component';

describe('RetestPaymentListComponent', () => {
  let component: RetestPaymentListComponent;
  let fixture: ComponentFixture<RetestPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetestPaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetestPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
