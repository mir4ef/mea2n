import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';

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
    private loadingIndicator: LoadingIndicatorService,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    // show the loading indicator
    this.loadingIndicator.setIndicatorState(true);

    // get the data from the service
    this.dataService.getUser(123)
      .subscribe(
        data => this.userData = data.message,
        err => this.errMsg = err.message,
        () => this.loadingIndicator.setIndicatorState(false)
      );
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }
}
