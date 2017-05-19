import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { Lazy2Service } from './lazy2.service';

describe('Lazy2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ Lazy2Service ]
    });
  });

  it('should exist', inject([Lazy2Service], (service: Lazy2Service) => {
    expect(service).toBeTruthy();
  }));
});
