import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class SampleData {
  constructor(public id: number, public title: string, public bodyText: string) { }
}
export class ResponseFormat {
  constructor(public success: boolean, public message: SampleData) { }
}

@Injectable()
export class LazyService {

  constructor(private http: Http) { }

  // example with Observable
  // for an example with Promise, view lazy2 component/service
  getData(): Observable<ResponseFormat> {
    return this.http
      .get('/api/v1/sampleData')
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(res: Response) {
    return res.json();
  }

  private handleError(err: Response | any) {
    return err.json();
  }
}
