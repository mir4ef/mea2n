import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './data.service';

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less']
})
export class DataComponent implements OnInit {
  userData;
  errMsg: string;

  constructor(private router: Router, private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getUser(123)
      .subscribe(
        data => this.userData = data.message,
        err => this.errMsg = err.message
      );
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }
}
