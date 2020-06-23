import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedStylizationsComponent } from './featured-stylizations.component';

describe('FeaturedStylizationsComponent', () => {
  let component: FeaturedStylizationsComponent;
  let fixture: ComponentFixture<FeaturedStylizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedStylizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedStylizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
