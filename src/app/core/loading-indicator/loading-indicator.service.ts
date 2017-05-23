import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoadingIndicatorService {
  private indicator = new Subject<any>();

  /**
   * @description Set/update the visual state of loading indicator
   * @param {Boolean} show - The indicator visual state
   */
  public setIndicatorState(show: boolean) {
    this.indicator.next(show);
  }

  /**
   * @description Create an observable for the indicator visual state so the component can subscribe and react for changes
   * @return {Observable<boolean>} The current state as an observable
   */
  public getIndicatorState(): Observable<boolean> {
    return this.indicator.asObservable();
  }
}
