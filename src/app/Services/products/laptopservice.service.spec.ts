import { TestBed } from '@angular/core/testing';

import { LaptopserviceService } from './laptopservice.service';

describe('LaptopserviceService', () => {
  let service: LaptopserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaptopserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
