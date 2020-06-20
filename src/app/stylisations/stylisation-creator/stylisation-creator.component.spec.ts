import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationCreatorComponent } from './stylisation-creator.component';

describe('StylisationCreatorComponent', () => {
  let component: StylisationCreatorComponent;
  let fixture: ComponentFixture<StylisationCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylisationCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
