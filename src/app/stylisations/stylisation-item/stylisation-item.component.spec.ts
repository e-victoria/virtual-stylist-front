import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationItemComponent } from './stylisation-item.component';

describe('StylisationItemComponent', () => {
  let component: StylisationItemComponent;
  let fixture: ComponentFixture<StylisationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylisationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
