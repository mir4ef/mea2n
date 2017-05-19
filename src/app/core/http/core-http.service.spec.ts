import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../auth/token.service';

import { CoreHttpService } from './core-http.service';

describe('CoreHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [ CoreHttpService, TokenService ],
    });
  });

  it('should exist', inject([CoreHttpService], (service: CoreHttpService) => {
    expect(service).toBeTruthy();
  }));
});
