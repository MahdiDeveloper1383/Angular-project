import { TestBed } from '@angular/core/testing';

import { ProductAuthService } from './product-auth.service';

describe('ProductAuthService', () => {
  let service: ProductAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
