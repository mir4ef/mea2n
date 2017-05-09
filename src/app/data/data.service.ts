import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TokenService } from '../core/auth/token.service';

@Injectable()
export class DataService {

  constructor(private http: Http, private tokenService: TokenService) { }

  getUser(id: number | string): Observable<Response> {
    return this.http
      .get(`/api/v1/data/${id}`, this.tokenService.authHeaders())
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(res: Response) {
    return res.json().message;
  }

  private handleError(err: Response) {
    return Promise.reject(err.json());
  }
}
