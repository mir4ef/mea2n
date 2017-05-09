import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
