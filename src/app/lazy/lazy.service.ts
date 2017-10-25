import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreHttpService, IResponse } from '../core/http/core-http.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class LazyService {

  constructor(private httpService: CoreHttpService) { }

  // example with Observable
  // for an example with Promise, view lazy2 component/service
  getData(): Observable<IResponse | HttpErrorResponse> {
    return this.httpService.apiGet({ path: 'sampleData' });
  }
}
