import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLicenseComponent } from './select-license.component';

describe('SelectLicenseComponent', () => {
  let component: SelectLicenseComponent;
  let fixture: ComponentFixture<SelectLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
