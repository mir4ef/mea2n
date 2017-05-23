import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  errMsg: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingIndicator: LoadingIndicatorService
  ) {

  }

  login() {
    // show the loading indicator
    this.loadingIndicator.setIndicatorState(true);

    // login the user
    this.authService
      .login(this.user)
      .subscribe(
        res => this.router.navigate([this.authService.requestingURL]),
        err => this.errMsg = err.message,
        () => this.loadingIndicator.setIndicatorState(false)
      );
  }
}
