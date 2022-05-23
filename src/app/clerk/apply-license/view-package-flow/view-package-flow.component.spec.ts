import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackageFlowComponent } from './view-package-flow.component';

describe('ViewPackageFlowComponent', () => {
  let component: ViewPackageFlowComponent;
  let fixture: ComponentFixture<ViewPackageFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPackageFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPackageFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
