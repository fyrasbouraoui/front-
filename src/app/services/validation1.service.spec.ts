import { TestBed } from '@angular/core/testing';

import { Validation1Service } from './validation1.service';

describe('Validation1Service', () => {
  let service: Validation1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Validation1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
