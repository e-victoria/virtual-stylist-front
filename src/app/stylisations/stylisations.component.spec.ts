import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylisationsComponent } from './stylisations.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import IStylisation from './models/stylisation.model';
import IClothesBodyPart from './models/IClothesBodyPart';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StylisationsComponent', () => {
  let component: StylisationsComponent;
  let fixture: ComponentFixture<StylisationsComponent>;
  let stylisation1: IStylisation;
  let stylisation2: IStylisation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylisationsComponent ],
      imports: [ HttpClientModule, RouterTestingModule, HttpClientTestingModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylisationsComponent);
    component = fixture.componentInstance;
    stylisation1 = new class implements IStylisation {
      clothesForDisplayStylization: IClothesBodyPart[];
      id = 0;
    };
    stylisation2 = new class implements IStylisation {
      clothesForDisplayStylization: IClothesBodyPart[];
      id = 1;
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close popup', () => {
    component.isPopup = true;
    component.closePopup('close');
    expect(component.isPopup).toBeFalse();
  });
});
