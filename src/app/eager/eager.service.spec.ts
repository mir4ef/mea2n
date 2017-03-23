import { TestBed, inject } from '@angular/core/testing';

import { EagerService } from './eager.service';

describe('EagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ EagerService ]
    });
  });

  it('should ...', inject([EagerService], (service: EagerService) => {
    expect(service).toBeTruthy();
  }));
});
