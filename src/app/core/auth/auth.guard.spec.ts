import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import {
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreHttpService } from '../http/core-http.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        AuthService,
        TokenService,
        CoreHttpService
      ],
    });
  });

  describe('CanActivate', () => {
    it('should navigate to a login page if a user is not logged in',
      inject([ AuthGuard, Router, TokenService, AuthService ], (authGuard, router, tokenService) => {
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const state: RouterStateSnapshot = router.routerState.snapshot;
        tokenService.token = '';

        spyOn(router, 'navigate');

        expect(authGuard.canActivate(route, state)).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      }),
    );

    it('should allow a logged in user to continue',
      inject([ AuthGuard, Router, TokenService ], (authGuard, router, tokenService) => {
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const state: RouterStateSnapshot = router.routerState.snapshot;
        tokenService.token = 'token string';

        spyOn(router, 'navigate');

        expect(authGuard.canActivate(route, state)).toBe(true);
        expect(router.navigate).toHaveBeenCalledTimes(0);
      }),
    );
  });

  describe('CanActivateChild', () => {
    it('should navigate to a login page if a user is not logged in and tries to go to a protected child route/component',
      inject([ AuthGuard, Router, TokenService ], (authGuard, router, tokenService) => {
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const state: RouterStateSnapshot = router.routerState.snapshot;
        tokenService.token = '';

        spyOn(router, 'navigate');

        expect(authGuard.canActivateChild(route, state)).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
      }),
    );

    it('should allow a logged in user to continue to a child route/component',
      inject([ AuthGuard, Router, TokenService ], (authGuard, router, tokenService) => {
        const route: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        const state: RouterStateSnapshot = router.routerState.snapshot;
        tokenService.token = 'token string';

        spyOn(router, 'navigate');

        expect(authGuard.canActivateChild(route, state)).toBe(true);
        expect(router.navigate).toHaveBeenCalledTimes(0);
      }),
    );
  });

  describe('CanLoad', () => {
    it('should not load a lazy loaded route/component, but navigate to a login page if a user is not logged in',
      inject([ AuthGuard, Router, TokenService ], (authGuard, router, tokenService) => {
        const route: Route = { path: 'someUrl' };
        tokenService.token = '';

        spyOn(router, 'navigate');

        expect(authGuard.canLoad(route)).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith([ '/login' ]);
      }),
    );

    it('should load and navigate to a lazy loaded module if the user is logged in user',
      inject([ AuthGuard, Router, TokenService ], (authGuard, router, tokenService) => {
        const route: Route = { path: 'someUrl' };
        tokenService.token = 'token string';

        spyOn(router, 'navigate');

        expect(authGuard.canLoad(route)).toBe(true);
        expect(router.navigate).toHaveBeenCalledTimes(0);
      }),
    );
  });
});
