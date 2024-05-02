import { TestBed } from '@angular/core/testing';

import { SerrviceService } from './serrvice.service';

describe('SerrviceService', () => {
  let service: SerrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
