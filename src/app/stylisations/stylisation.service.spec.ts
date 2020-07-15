import { TestBed } from '@angular/core/testing';

import { StylisationService } from './stylisation.service';
import {HttpClientModule} from '@angular/common/http';

describe('StylisationService', () => {
  let service: StylisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    }).compileComponents();
    service = TestBed.inject(StylisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
