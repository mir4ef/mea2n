import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenService } from '../core/auth/token.service';
import { CoreHttpService } from '../core/http/core-http.service';

import { LazyService } from './lazy.service';

describe('LazyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [ CoreHttpService, LazyService, TokenService ]
    });
  });

  it('should exist', inject([LazyService], (service: LazyService) => {
    expect(service).toBeTruthy();
  }));
});
