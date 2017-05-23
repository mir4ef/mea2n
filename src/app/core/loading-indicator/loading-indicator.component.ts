import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoadingIndicatorService } from './loading-indicator.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.less']
})
export class LoadingIndicatorComponent implements OnDestroy {
  private subscription: Subscription;
  public isLoading: boolean = false;

  constructor(private loaderIndicator: LoadingIndicatorService) {
    this.subscription = this.loaderIndicator.getIndicatorState().subscribe(
      state => this.isLoading = state,
      err => this.isLoading = false
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
