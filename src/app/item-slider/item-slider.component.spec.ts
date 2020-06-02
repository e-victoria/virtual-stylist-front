import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSliderComponent } from './item-slider.component';

describe('ItemSliderComponent', () => {
  let component: ItemSliderComponent;
  let fixture: ComponentFixture<ItemSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
