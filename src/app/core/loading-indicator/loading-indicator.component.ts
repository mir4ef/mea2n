import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.less']
})
export class LoadingIndicatorComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public isLoading: boolean = false;

  constructor(private loaderIndicator: LoadingIndicatorService) {
    this.loaderIndicator.getIndicatorState()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
      state => this.isLoading = state,
      err => this.isLoading = false
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
