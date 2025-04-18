import { TestBed } from '@angular/core/testing';

import { AuthUsersService } from './auth-users.service';

describe('AuthUsersService', () => {
  let service: AuthUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
