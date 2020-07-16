import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationCreatorComponent } from './stylisation-creator.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('StylisationCreatorComponent', () => {
  let component: StylisationCreatorComponent;
  let fixture: ComponentFixture<StylisationCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationCreatorComponent ],
      imports: [ HttpClientModule, RouterTestingModule ]
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
