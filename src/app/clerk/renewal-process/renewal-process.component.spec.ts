import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalProcessComponent } from './renewal-process.component';

describe('RenewalProcessComponent', () => {
  let component: RenewalProcessComponent;
  let fixture: ComponentFixture<RenewalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
