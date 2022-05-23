import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreRequistieComponent } from './edit-pre-requistie.component';

describe('EditPreRequistieComponent', () => {
  let component: EditPreRequistieComponent;
  let fixture: ComponentFixture<EditPreRequistieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPreRequistieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreRequistieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
