import { TestBed } from '@angular/core/testing';

import { StylisationService } from './stylisation.service';

describe('StylisationService', () => {
  let service: StylisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
