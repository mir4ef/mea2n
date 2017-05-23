import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.token) {
      // logged in so return true
      return true;
    }

    // save the url the user came from, so he/she can be redirected back to it after successful login
    this.authService.requestingURL = state.url;

    // not logged in so redirect to login page
    this.router.navigate(['/login']);

    return false;
  }
}
