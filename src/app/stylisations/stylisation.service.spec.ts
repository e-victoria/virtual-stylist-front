import { TestBed } from '@angular/core/testing';

import { StylisationService } from './stylisation.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import NewStylisation from './models/newStylisation';
import IClothesImage from '../wardrobe/models/clothesImage.model';
import IStylisation from './models/stylisation.model';

describe('StylisationService', () => {
  let service: StylisationService;
  let httpTestingController: HttpTestingController;
  let newStylisation: NewStylisation, clothImageTop: IClothesImage, clothImageBottom: IClothesImage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ]
    }).compileComponents();
    service = TestBed.inject(StylisationService);

    httpTestingController = TestBed.get(HttpTestingController);

    clothImageTop = new class implements IClothesImage {
      id = 0;
      imageName = 'clothTop.png';
    };

    clothImageBottom = new class implements IClothesImage {
      id = 0;
      imageName = 'clothTop.png';
    };

    newStylisation = new class implements NewStylisation {
      clothes: IClothesImage[] = [clothImageTop, clothImageBottom];
      tag = '#myFavouriteDress';
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error when deleting stylisation', () => {
    const error = new ErrorEvent('Forbidden');
    const callback = (err) => {
      expect(err.statusText).toEqual('Forbidden');
    };

    service.deleteStylisation(0, callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization/0');
    req.error(error, { status: 403, statusText: 'Forbidden'});
    expect(req.request.method).toEqual('DELETE');
  });

  it('should delete stylisation', () => {
    const callback = (response) => {
      expect(response).toBe(null);
    };

    service.deleteStylisation(0, callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization/0');
    req.flush(null);
    expect(req.request.method).toEqual('DELETE');
  })

  it('should return stylisation by id', () => {
    const callback = (response) => {
      expect(response).toEqual(newStylisation);
    };

    service.getStylisationsByItemId(0, callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization/0');
    req.flush(newStylisation);
    expect(req.request.method).toEqual('GET');
  });

  it('should get stylisations', () => {
    const callback = (response) => {
      expect(response).toEqual([newStylisation, newStylisation]);
    };

    service.getStylisations(2, 0, callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization?size=2&page=0');
    req.flush([newStylisation, newStylisation]);
    expect(req.request.method).toEqual('GET');
  });

  it('save new stylisation', () => {
    const callback = (response) => {
      // empty callback for test
    };

    service.saveNewStylisation(newStylisation, callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newStylisation);
  });

  it('get list of proposed stylisations', () => {
    const callback = (response) => {
      expect(response).toEqual([clothImageTop]);
    };

    service.getProposedStylisations('0', callback);

    const req = httpTestingController.expectOne('https://virtual-stylist.herokuapp.com/stylization/design/0');
    expect(req.request.method).toEqual('GET');
    req.flush([clothImageTop]);
  });

});
