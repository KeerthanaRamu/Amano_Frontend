import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequistieListComponent } from './pre-requistie-list.component';

describe('PreRequistieListComponent', () => {
  let component: PreRequistieListComponent;
  let fixture: ComponentFixture<PreRequistieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRequistieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRequistieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
