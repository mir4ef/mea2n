import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { LoadingIndicatorService } from '../core/loading-indicator/loading-indicator.service';

import { LazyService } from './lazy.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.less']
})

export class LazyComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  data;
  err;

  constructor(private loaderIndicator: LoadingIndicatorService, private dataService: LazyService) { }

  ngOnInit() {
    // show the loading indicator
    this.loaderIndicator.setIndicatorState(true);

    // example with Observable
    // for an example with Promise, view lazy2 component/service
    this.dataService
      .getData()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.loaderIndicator.setIndicatorState(false);
          this.data = data.message;
        },
        err => {
          this.loaderIndicator.setIndicatorState(false);
          this.err = err;
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
