import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LazyService } from './lazy.service';

describe('LazyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ LazyService ]
    });
  });

  it('should ...', inject([LazyService], (service: LazyService) => {
    expect(service).toBeTruthy();
  }));
});
