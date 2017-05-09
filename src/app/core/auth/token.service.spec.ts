/**
 * Unit tests for the token service
 */

import { inject, TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('Token Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TokenService ],
    });
  });

  it('should be null when initialized',
    inject([ TokenService ], (tokenService: TokenService) => {
      expect(tokenService.token).toBeNull();

      // clear the token after each assignment
      tokenService.token = '';
    }),
  );

  it('should save a passed token',
    inject([ TokenService ], (tokenService: TokenService) => {
      const token = 'token string';
      tokenService.token = token;
      expect(tokenService.token).toEqual(token);

      // clear the token after each assignment
      tokenService.token = '';
    }),
  );

  it('should delete a saved token',
    inject([ TokenService ], (tokenService: TokenService) => {
      const token = 'token string';
      tokenService.token = token;
      expect(tokenService.token).toEqual(token);

      tokenService.token = '';

      expect(tokenService.token).toBeNull();
    }),
  );
});
