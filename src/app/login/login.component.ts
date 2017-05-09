import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {

  }

  login() {
    this.authService
      .login(this.user)
      .subscribe(
        res => this.router.navigate(['/protected']),
        err => this.errMsg = err.message
      );
  }
}
