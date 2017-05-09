import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = 'app works!';

  constructor(private router: Router, private authService: AuthService) {

  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
