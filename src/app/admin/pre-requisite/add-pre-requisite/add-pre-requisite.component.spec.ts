import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreRequistieComponent } from './add-pre-requistie.component';

describe('AddPreRequistieComponent', () => {
  let component: AddPreRequistieComponent;
  let fixture: ComponentFixture<AddPreRequistieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPreRequistieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreRequistieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
