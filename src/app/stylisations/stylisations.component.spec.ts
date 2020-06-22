import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationsComponent } from './stylisations.component';

describe('StylisationsComponent', () => {
  let component: StylisationsComponent;
  let fixture: ComponentFixture<StylisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
