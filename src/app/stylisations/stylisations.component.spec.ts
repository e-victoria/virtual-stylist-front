import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationsComponent } from './stylisations.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('StylisationsComponent', () => {
  let component: StylisationsComponent;
  let fixture: ComponentFixture<StylisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationsComponent ],
      imports: [ HttpClientModule, RouterTestingModule ]
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
