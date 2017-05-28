import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { AuthService } from '../core/auth/auth.service';
import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
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
    this.authService.updateLoggedInState();
  }

  login() {
    // show the loading indicator
    this.loadingIndicator.setIndicatorState(true);

    // login the user
    this.authService
      .login(this.user)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        () => {
          this.loadingIndicator.setIndicatorState(false);
          this.router.navigate([this.authService.requestedURL]);
        },
        err => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
