import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';

import { DataService } from './data.service';

interface IUserData {
  id: number;
  name: string;
  username: string;
}

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less']
})
export class DataComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public userData: IUserData;
  public errMsg: string;

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
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.loadingIndicator.setIndicatorState(false);
          this.userData = data.message;
        },
        err => {
          this.loadingIndicator.setIndicatorState(false);
          this.errMsg = err.message;
        }
      );
  }

  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
