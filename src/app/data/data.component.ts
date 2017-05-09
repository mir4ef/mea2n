import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';

import { DataService } from './data.service';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less']
})
export class DataComponent implements OnInit {
  userData;
  errMsg: string;

  constructor(
    private router: Router,
    private autService: AuthService,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.getUser(123)
      .subscribe(
        data => this.userData = data,
        err => this.errMsg = err.message
      );
  }

  logout() {
    this.autService.logout();
    this.router.navigate(['/login']);
  }
}
