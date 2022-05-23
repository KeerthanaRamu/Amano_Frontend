import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPacakgeComponent } from './select-pacakge.component';

describe('SelectPacakgeComponent', () => {
  let component: SelectPacakgeComponent;
  let fixture: ComponentFixture<SelectPacakgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPacakgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPacakgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
